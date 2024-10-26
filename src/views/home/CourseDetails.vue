<template>
  <div class="home min-vh-100">
    <div class="container mt-4">
      <div v-if="error">
        <ShowError :error="error"   class="post-detail-error"/>
      </div>   
      <div v-if="showSpinner">
        <PreLoading class="post-detail-preloader"/>
      </div>
      <div class="row justify-content-center" v-if="!error && !showSpinner">
        <div class="col-lg-8 mb-2">
          <!--start col-->
          <div class="card shadow-sm border-0" >
            <vue-load-image>
              <template v-slot:image>
                <img :src="course.src" class="img-fluid" />
              </template>
              <template v-slot:preloader>
                    <ImageLoading/>
              </template>
              <template v-slot:error>Image load fails</template>
            </vue-load-image>
            <!--  <img :src="post.src" class="card-img-top" :alt="post.title"> -->
            <div class="card-body px-5">
              <h5 class="card-title text-center mb-4  lh-base">
                {{ course.title }}
              </h5>
              <p v-html="course.content" class="text-wrap lh-lg"></p>
              <div class="my-4">
                <AppAddress />
              </div>
            </div>
          </div>
          <div class="card shadow-sm border-0 mt-1">
          <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <button
                    type="button"
                    class="btn text-dark float-start"
                    @click="goHome"
                  >
                    <i class="fa-solid fa-house"></i> Home
                  </button>
                </div>
                <div class="col-6">
                  <button type="button" class="btn float-end">
                    <iframe
                      :src="
                        'https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fntgtechnology.web.app%2Fpost%2F' +
                        id +
                        '&layout&size&appId=291717897246348&width=80&height=20'
                      "
                      width="80"
                      height="20"
                      style="border: none; overflow: hidden"
                      scrolling="no"
                      frameborder="0"
                      allowfullscreen="true"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></iframe>
                  </button>
                </div>
              </div>
            </div>
            <!--end col-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { collection, doc, setDoc, getDoc, query } from "firebase/firestore";
import { computed, onMounted, onUpdated, getCurrentInstance } from "vue";
import { useHead } from "@unhead/vue";
import VueLoadImage from "vue-load-image";
import { useStore } from 'vuex'
import AppAddress from "@/views/partials/AppAddress"
import AvailableCourse from "@/views/partials/AvailableCourse"
import ImageLoading from "@/views/loaders/ImageLoading"
import PreLoading from "@/views/loaders/PreLoading"
import ShowError from "@/views/partials/ShowError"
import db from "@/firebase/database";
import { getDatabase, ref, set, onValue, remove, query, startAt,endAt, orderByChild ,limitToLast, limitToFirst} from 'firebase/database'

export default {
  setup() {
    onMounted(()=>createHeader())
    onUpdated(()=>createHeader())

    function createHeader(){    
     const store = useStore()     
      const myPost = computed(() => store.getters.course)    
      const id=myPost.value.id;
      const title=myPost.value.title;
      const src=myPost.value.src;     
      if (id !== undefined) {
        useHead({
          title: computed(() => title),
          meta: [
            {
              property: `og:title`,
              content: computed(() => title),
            },
            {
              property: `og:url`,
              content: computed(
                () =>
                  `https://ntgtechnology.web.app/post/${id}`
              ),
            },
            {
              property: `og:image`,
              content: computed(() => src),
            },
          ],
        });
      }
    }
  },

  name: "CourseDetails",
  components: {
    "vue-load-image": VueLoadImage,
    AppAddress, AvailableCourse, ImageLoading,PreLoading, ShowError
  },
  data() {
    return {
      //showSpinner: false,
      id: this.$route.params.id,
      error: null,
      showSpinner :false,
      course:{},
    };
  },

  created() {    
     
        this.$watch(
        () => this.$route,
        this.getCourse,       
        { immediate: true }
        )  
    
  },
  computed:{
      
  },
  methods: {
   
    goHome() {
      this.$router.go(-1);
      //this.$router.go(-1)
    },
   
    getCourse(){    
      try{
            this.showSpinner=true;
            const query_url = query(ref(db, 'courses/' + this.id))
                onValue(query_url, (snapshot) => {                  
                    const data = snapshot.val()
                    if(data ===null){
                        this.$router.push({path: "/"})
                    }else{
                        const course={
                            id: this.id,
                            title: data.title,
                            category: data.category,
                            src : data.src,
                            content: data.content,
                            created_at: data.created_at,
                            course_id:data.course_id,
                            course_fees:data.course_fees
                        }
                        this.course=course;
                        this.error=null;     
                        this.showSpinner=false;      
                      this.$store.dispatch("setCourse", course)       
                    }                   
                })
            }catch(err){
              this.error="Oops..., something went wrong."
               this.showSpinner=false;
           }finally{

           }
     
        }
    
  },
};
</script>
<style>
 .post-detail-preloader{
    margin-top: 250px;
    margin-bottom: 255px;
}
.post-detail-error{
  margin-top: 250px;
    margin-bottom: 290px;
}

</style>