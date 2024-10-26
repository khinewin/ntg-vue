<template>
    <div class="home">
      <div class="container my-4 min-vh-100">    
         <!-- category -->
          <div class="row">
            <div class="col-12 mb-2">
              <h5>Computer and Technology Articles</h5>
            </div>
            <div class="col-12">
              <ArticlesMenu @category="changeCategory"   :articles="articles"/>
          </div>
          </div>
          
         <!-- end category -->
          <div v-if="error">
             <ShowError :error="error"  class="articles-error" /> 
          </div>
         <div v-if="showSpinner">          
            <PreLoading class="articles-preloader" />
        </div>
       
        <div class="row g-2" v-if="articles.length > 0">
          <div v-for="a in articles" :key="a[0]" class="col-sm-6 col-md-3">
            <!--start col-->
            <div class="card shadow border-0 bg-secondary  rounded" >
              <div
                class="card-body p-0 py-2 px-2 px-md-2 my-5 mx-2  rounded"
              >
                <div class="bg-body  rounded">
                  <div class="show-image-container  rounded">
                    <vue-load-image>
                      <template v-slot:image>
                        <img :src="a[1].src" class="img-fluid show-image" @click="viewDetails(a[0])"  />
                      </template>
                      <template v-slot:preloader>
                          <ImageLoading />
                      </template>
                      <template v-slot:error>Loading image failed.</template>
                    </vue-load-image>
                  </div>
                
                </div>
              </div>
            </div>
            <!--end col-->
          </div>
          <div class="row justify-content-center mt-3" v-if="isShowBtn">
              <div class="col-sm-6 col-md-4 d-grid">
                <button class="btn btn-primary rounded" type="button"  @click="getNextArticles">
                  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" v-if="btnSpinner"></span>
                  More articles <i class="fa-solid fa-circle-chevron-down"></i>
                </button>
              </div>
          </div>
        </div>  
         
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, computed , onUpdated} from "vue";
  import VueLoadImage from "vue-load-image";
  import { useHead } from "@unhead/vue";
  import PreLoading from "@/views/loaders/PreLoading"
  import ImageLoading from "@/views/loaders/ImageLoading"
  import ArticlesMenu from "@/views/partials/ArticlesMenu"
  import ShowError from "@/views/partials/ShowError"
  //import { doc, setDoc, getDoc, collection, where, addDoc,limit, query, getDocs, startAfter,orderBy, getCountFromServer } from "firebase/firestore"; 
  import db from "@/firebase/database"
  import { getDatabase, ref, set, onValue, remove, query, startAt,endAt, orderByChild ,limitToLast, limitToFirst} from 'firebase/database'

  export default {

    
    setup() {
    onMounted(()=>createHeader())
    onUpdated(()=>createHeader())
    function createHeader() {
      let title = "Articles | New Tech Group Mawlamyine";
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
                  `https://ntgtechnology.web.app/articles`
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
   
    name: "AppArticles",
    components:{
      "vue-load-image": VueLoadImage,PreLoading, ImageLoading, ArticlesMenu,
      ShowError
    },
    data() {
      return { 
        cat: null,  
        articles:[],
        error:null,
        showSpinner: false,      
        btnSpinner: false,
        limitTo: 8,
        articlesCount: 0,
        isShowBtn: false,
      };
    },
   
 
    created() {
      if(this.storeArticleLimitTo > 0){
            this.limitTo=this.storeArticleLimitTo;
        }
        if(this.storeCategory !==null){
            this.cat=this.storeCategory;
        }
        
         this.$watch(
            ()=>this.$route,
            this.getArticlesCount,
            {immediate: true}
         )  
         this.$watch(
            ()=>this.$route,
            this.getArticles,
            {immediate: true}
         ) 
         
    
    },    

    computed:{
      storeArticleLimitTo(){
            return this.$store.getters.articleLimitTo;    
      },
      storeCategory(){
        return this.$store.getters.category;
      }
    },   
    methods: {        

      changeCategory(cat){             
         this.cat=cat;
         this.getArticlesCount();     
         this.$store.dispatch("setCategory", cat)   
         this.getArticles();
      },

      getNextArticles(){
            this.btnSpinner=true;
            this.limitTo += this.limitTo;
            this.getArticles();            
            this.$store.dispatch("setArticleLimitTo", this.limitTo)
        },

        getArticlesCount(){
          let query_url=""; 
            if(this.cat===null || this.cat ==="home"){
              query_url= query(ref(db, 'articles/'))
            }else{
              query_url = query(ref(db, 'articles/'), orderByChild("category"), startAt(this.cat), endAt(this.cat))
            }         
            onValue(query_url, (snapshot) => {
                const data = snapshot.val()
                if(data===null){
                  this.articlesCount=0;
                }else{
                  const count=Object.keys(data).length;
                  this.articlesCount=count;
                 // this.getArticles();
                }               
            })
        },
      
        getArticles(){            
            try{           
              let query_url="";
              this.showSpinner=true;
              this.btnSpinner=true;
              if(this.cat===null || this.cat ==="home"){
                query_url= query(ref(db, 'articles/'),orderByChild("created_at"), limitToLast(this.limitTo))
              }else{
                query_url= query(ref(db, 'articles/'),orderByChild("category"), startAt(this.cat), endAt(this.cat), limitToLast(this.limitTo))
              }
             
                onValue(query_url, (snapshot) => {
                    const data = snapshot.val()
                   
                    this.btnSpinner=false;
                    this.showSpinner=false;
                    if(data ===null){
                        this.articles=[]
                        this.error="No article found."
                    }else{
                        const articles=Object.entries(data);
                        this.articles=articles.reverse();   
                        this.error=null;
                        const count=Object.keys(data).length;
                        if(this.articlesCount===count){
                                this.isShowBtn=false;
                        }else{
                                this.isShowBtn=true;
                        }
                        }                   
                })
            }catch(err){
              this.error="Oops..., something went wrong."
               this.btnSpinner=false;
           }finally{
                
            }
        },

      viewDetails(id) { 
        this.$router.push({ name: "ArticleDetails", params: { id: id } });
      }, 
      
   }
}
 
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
 
  .articles-error{
    margin-top: 165px;
    margin-bottom: 220px;
  }
   .articles-preloader{
    margin-top: 165px;
    margin-bottom: 180px;
}


  </style>
  