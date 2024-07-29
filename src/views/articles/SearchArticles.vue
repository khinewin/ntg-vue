<template>
    <div class="home">
      <div class="container my-4">    
         <!-- category -->
          <div class="row">        
            <div class="col-12">
              <div><button class="btn btn-lg mb-2" @click="goBack"><i class="fa-solid fa-circle-left"></i></button> <span class="h5"> Search articles</span> <span class=" badge rounded-pill bg-dark ms-4" style="font-size: 14px;" v-show="articles.length > 0">{{articles.length}}</span></div>
            </div>
            <div class="col-12">
                    <input type="search" @click="searchArticle=''" autofocus class="form-control" v-model="searchArticle" @keypress.enter="searchArticles"   placeholder="Search">
            </div>
          </div>
          
         <!-- end category -->
          <div v-if="error" class="row ">
                <div class="col-12 text-center  initial-search-result">
                        {{error}}
                </div>
          </div>
         <div v-if="showSpinner">          
            <PreLoading class="articles-preloader" />
        </div>
        <div class="row" v-if="message">
            <div class="col-12 text-center initial-search-result" >
                    Result is display here.
            </div>
        </div>
        <div class="row g-2" v-show="articles.length > 0" >
            <div class="col-12 my-2 pt-2">
                    Result for "<strong>{{oldKeyword}}"</strong>
            </div>
          <div v-for="post in articles" :key="post.id" class="col-sm-6 col-md-3">
            <!--start col-->
            <div class="card shadow border-0 bg-secondary  rounded" >
              <div
                class="card-body p-0 py-2 px-2 px-md-2 my-5 mx-2  rounded"
              >
                <div class="bg-body  rounded">
                  <div class="show-image-container  rounded">
                    <vue-load-image>
                      <template v-slot:image>
                        <img :src="post.src" class="img-fluid show-image" @click="viewDetails(post.id, post.title, post.src)" />
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
          <div class="row justify-content-center mt-3" v-if="hasArticles">
              <div class="col-sm-6 col-md-4 d-grid">
                <button class="btn btn-primary rounded" type="button" :disabled="error || !hasArticles || btnSpinner" @click="fetchArticles">
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
  import { doc, setDoc, getDoc, collection, where, addDoc,limit, query, getDocs, startAfter,orderBy, getCountFromServer } from "firebase/firestore"; 
  import db from "@/firebase"
  
  export default {

    
    setup() {
    onMounted(()=>createHeader())
    onUpdated(()=>createHeader())
    function createHeader() {
      let title = "Search Articles | New Tech Group Mawlamyine";
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
   
    name: "SearchArticles",
    components:{
      "vue-load-image": VueLoadImage,PreLoading, ImageLoading, ArticlesMenu,
      ShowError
    },
    data() {
      return { 
      
        articles:[],
        error:null,      
        showSpinner: false,      
        message:true,
        searchArticle:"",
        oldKeyword:""
      };
    },
   
 
    created() {
     
    
    },    

    computed:{
        /*
        storeArticles(){
          return this.$store.getters.articles;
        },
        storeLastDoc(){
          return this.$store.getters.lastDoc
        },
        storeHasArticles(){
          return this.$store.getters.hasArticles;
        }
          */
    },   
    methods: {    

   
      goBack(){
            this.$router.go(-1)          
      },      

      async searchArticles(searchTitle){
        
        try{
          this.error=false;
          this.showSpinner=true;
          this.message=false;  
          this.oldKeyword=this.searchArticle;

          const docsSnapshot = query(collection(db, "articles"), orderBy("created_at", "desc"), limit(40));
          let documentSnapshots = await getDocs(docsSnapshot); 
          let data=documentSnapshots._snapshot.docChanges;
                if(data.length <= 0 ){
                    this.error="Oops..., something went wrong.";
                    this.hasArticles=false;                  
                }else{ 
                    let arts=[]
                              documentSnapshots.forEach((doc) => {         
                                let post = {
                                    id: doc.id,
                                    title: doc.data().title,
                                    content: doc.data().content,
                                    src: doc.data().src,
                                    category: doc.data().category,
                                };
                                arts.push(post);  
                              });
                     const result=arts.filter((art)=>{
                      return art.title.toLowerCase().includes(this.searchArticle.toLowerCase())
                      })
                      if(result.length === 0){
                        this.error=`No result found for "${this.searchArticle}".`
                        this.hasArticles=false; 
                      }
                    this.articles=result;    
                }
        }catch(err){
              this.error="Oops..., something went wrong.";
              this.hasArticles=false;    
        }finally{
              this.showSpinner=false;
              this.searchArticle="";
        }
        
      },
     
   
      viewDetails(id, title, img_url) {
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

.initial-search-result{
    min-height: 400px;
    line-height: 400px;
}

  </style>
  