<template>
  <div class="home min-vh-100">
    <div class="container my-4">
      <div class="row mb-2" v-show="isNewUser">
        <div class="col-12" >
              <AppBanner :disappearCount="disappearCount" />
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-12 mb-2">
          <h5>Intensive Training Courses</h5>
        </div>
        <div class="col-12" >
              <HomeMenu :courses="courses"  @category="changeCategory" />  
        </div>
      </div>
      <div v-if="error">
          <ShowError :error="error"   class="home-error"/>
      </div>
      <div v-if="showSpinner">
            <PreLoading class="home-preloader" />
      </div>
      <div class="row g-2" v-if="courses.length > 0">        
        <div v-for="c in courses" :key="c[0]" class="col-sm-6 col-md-4">
          <!--start col-->
          <div class="card shadow border-0 bg-secondary rounded-0 rounded-top">
            <div
              class="card-body p-0 pt-5 px-2 px-md-2 mt-5 mx-2 rounded-0 rounded-top"
            >
              <div class="bg-body rounded-0 rounded-top">
                <!-- <h5 class="card-title text-center mb-5 mt-4 title">{{ c.title }}</h5> -->
                <!-- <div v-html="c.text_body"></div> -->

                <div class="show-image-container rounded-top">
                  <vue-load-image>
                    <template v-slot:image>
                      <img :src="c[1].src" class="img-fluid show-image" @click="viewDetails(c[0])" />
                    </template>
                    <template v-slot:preloader>
                        <ImageLoading />
                    </template>
                    <template v-slot:error>Loading image failed.</template>
                  </vue-load-image>
                </div>
                <div class="row mt-2">
                    <div class="col-12">
                          <h6 class="text-center">{{c[1].title}}</h6>
                          <div class="text-center"><span>Fees </span> : <span class="badge bg-secondary">{{c[1].course_fees.toLocaleString('en-US')}} MMK</span></div>
                    </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col-12 d-grid mb-2 mt-md-2">
                    <button
                      type="button"
                      class="btn text-primary"
                      @click="viewDetails(c[0])"
                    >
                     Course details <i class="fa-solid fa-circle-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end col-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed,onUpdated } from "vue";

import { useHead } from "@unhead/vue";
import ImageLoading from "@/views/loaders/ImageLoading"
import PreLoading from "@/views/loaders/PreLoading"
import AppBanner from "@/views/partials/AppBanner"
import HomeMenu from "@/views/partials/HomeMenu"
import ShowError from "@/views/partials/ShowError"
  //import { doc, setDoc, getDoc, collection, where, addDoc,limit, query, getDocs, startAfter,orderBy, getCountFromServer } from "firebase/firestore"; 
  import db from "@/firebase/database"
  import { getDatabase, ref, set, onValue, remove, query, startAt,endAt, orderByChild ,limitToLast, limitToFirst} from 'firebase/database'


export default {  
  
  setup() {
    onMounted(()=>createHeader())
    onUpdated(()=>createHeader())
    function createHeader() {
      let title = "New Tech Group Mawlamyine";
      let src = "https://ntgtechnology.web.app/ntg_social_logo.png";
      
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
                  `https://ntgtechnology.web.app`
              ),
            },
            {
              property: `og:image`,
              content: computed(() => src),
            },
          ],
        });
      
    };
  },

  name: "HomeView",
  components : {
      ImageLoading, PreLoading, AppBanner, HomeMenu, ShowError
  },
  

  data(){
    return{
          cat : null,
          courses : [],
          showSpinner: false,
          error: null,
          disappearCount: 9,
    }
  },

  
  created() {   
    if(this.storeCategory !==null){
        this.cat=this.storeCategory;
    }
    this.$watch(
            ()=>this.$route,
           this.getCourses,
            {immediate: true}
         )  

       if(this.isNewUser){
      //  this.handleDisappear();
       }
  },
  
  computed:{
      storeCategory(){
        return this.$store.getters.courseCategory;
      },
      isNewUser(){
        return  this.$store.getters.isNewUser;
      }
      
  },

  methods: {   
  
    handleDisappear(){
      if(this.isNewUser){          
           const int= setInterval(()=>{
                this.disappearCount=this.disappearCount -1;
                if(this.disappearCount <=0){
                    clearInterval(int)
                    this.$store.dispatch("setIsNewUser", false)
                }
            },1000)
            

       }  

    },

    viewDetails(id) {
      this.$router.push({ name: "CourseDetails", params: { id: id } });
    },

    changeCategory(cat){      
        this.cat=cat;
         this.$store.dispatch("setCategory", cat)   
         this.getCourses();      

      },   

      getCourses(){            
            try{           
              let query_url="";
              this.showSpinner=true;
              this.btnSpinner=true;
              if(this.cat===null || this.cat ==="home"){
                query_url= query(ref(db, 'courses/'),orderByChild("course_id"))
              }else{
                query_url= query(ref(db, 'courses/'),orderByChild("category"), startAt(this.cat), endAt(this.cat))
              }
             
                onValue(query_url, (snapshot) => {
                    const data = snapshot.val()                   
                    this.btnSpinner=false;
                    this.showSpinner=false;
                    if(data ===null){
                        this.courses=[]
                        this.error="No course found."
                    }else{
                        const courses=Object.entries(data);
                        this.courses=courses.reverse();   
                        this.error=null;
                        const count=Object.keys(data).length;
                        this.$store.dispatch("setCourseCategory", this.cat)  

                      }                   
                })
            }catch(err){
              this.error="Oops..., something went wrong."
               this.btnSpinner=false;
           }finally{
                
            }
        },   
 
  },  
};
</script>

<style>
.title {
  font-family: "Kanit", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #005b80 !important;
}

.show-image-container {
  overflow: hidden;
}
.show-image {
  transition: all 0.4s linear;
}
.show-image:hover {
  transform: scale(1.1);
  cursor: grab;
}
.home-error, .home-preloader{
    margin-top: 140px;
    margin-bottom: 180px;
}

</style>
