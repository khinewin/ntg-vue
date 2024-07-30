<template>
  <div class="home">
    <div class="container mt-4">
        <div v-if="error">
          <ShowError :error="error" @tryAgain="tryAgain" class="article-error" />
        </div>
      <div v-if="showSpinner">
          <PreLoading class="article-preloader" />
      </div>
      <div class="row justify-content-center" v-if="!error && !showSpinner">
        <div class="col-md-10 col-lg-8 mb-2">
          <!--start col-->
          <div class="card shadow-sm border-0">
            <vue-load-image>
              <template v-slot:image>
                <img :src="article.src" class="img-fluid" />
              </template>
              <template v-slot:preloader>
                <ImageLoading />
              </template>
              <template v-slot:error>Loading image failed.</template>
            </vue-load-image>
            <!--  <img :src="post.src" class="card-img-top" :alt="post.title"> -->
            <div class="card-body">
              <h5 class="card-title text-center mb-4 lh-base">
                {{ article.title }}
              </h5>
              <div  class="text-wrap lh-lg" v-html="article.content"></div>
              </div>
              </div>
              <div class="card shadow-sm border-0 mt-1">
              <div class="card-body">
              <div class="row">
                <div class="col-3">
                  <button
                    type="button"
                    class="btn "
                    @click="goHome"
                  >
                    <i class="fa-solid fa-house"></i> Home
                  </button>
                </div>
                <div class="col-3">
                  <button
                    type="button"
                    class="btn "
                    @click="goArticles"
                  >
                  <i class="fa-regular fa-newspaper"></i> Articles
                  </button>
                </div>
                <div class="col-3 d-grid">
                  <button v-if="isAuth" class="btn text-primary" @click="goEdit(article.id)"><i class="fa-solid fa-pen-to-square"></i></button>

                </div>
                <div class="col-3 d-grid">
                  <button type="button" class="btn">
                    <iframe
                      :src="
                        'https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fntgtechnology.web.app%2Farticle%2F' +
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
import { collection, doc, setDoc, getDoc, query } from "firebase/firestore";
import db from "@/firebase";
import { computed, onMounted, onUpdated, getCurrentInstance } from "vue";
import { useHead } from "@unhead/vue";
import VueLoadImage from "vue-load-image";
import ShowError from "@/views/partials/ShowError";
import PreLoading from "@/views/loaders/PreLoading"
import { useStore } from 'vuex'
import ImageLoading from "@/views/loaders/ImageLoading"

export default {
  
  setup() {
    onMounted(()=>createHeader())
    onUpdated(()=>createHeader())

    function createHeader(){    
     const store = useStore()     
      const myPost = computed(() => store.getters.article)    
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
                  `https://ntgtechnology.web.app/article/${id}`
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


  name: "ArticleDetails",
  components: {
    "vue-load-image": VueLoadImage,ShowError, PreLoading
  },
  data() {
    return {
      id: this.$route.params.id,
      error: null,
      showSpinner :false,
      article:{},
    };
  },



  created() {
    this.$watch(
      () => this.$route,
      this.getArticle,
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
  computed:{
      articles(){
        return this.$store.getters.articles;
      },
      isAuth() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    goEdit(id){
            this.$router.push({name:`EditArticle`, params:{id:id}})
       }, 
    goHome() {
      this.$router.push("/");
    },

    goArticles(){
      this.$router.push("/articles");
    },    

    async getArticle(){
      if(this.articles.length > 0){
          const article=this.articles.filter((a)=>{
              return a.id === this.id;
          })
          let newArticle = {
            id: article[0].id,
            title: article[0].title,
            content: article[0].content,
            src: article[0].src,
            category: article[0].category,
          };  
          this.article=newArticle;   
        }

        if(this.articles.length===0){
          try{
                this.showSpinner=true
                const docRef = doc(db, "articles", this.id);
                const docSnap = await getDoc(docRef);
                let post = {
                  id: docSnap.id,
                  title: docSnap.data().title,
                  content: docSnap.data().content,
                  src: docSnap.data().src,
                  category: docSnap.data().category,
                };
                this.error=null;
                this.article=post;
                
            }catch(err){
                //console.log(error.toString())
                this.error="Oops..., Something went wrong."
                
            }finally{
                this.showSpinner=false;
            }
        }
        this.$store.dispatch("setArticle", {article: this.article})
    }
  },

};
</script>
<style>
   .article-error{
    margin-top: 250px;
    margin-bottom: 255px;
  }
   .article-preloader{
    margin-top: 250px;
    margin-bottom: 265px;
}
</style>