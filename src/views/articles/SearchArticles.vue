<template>
    <div class="home">
      <div class="container my-4 min-vh-100">    
         <!-- category -->
          <div class="row">        
            <div class="col-12">
              <div><button class="btn btn-lg mb-2" @click="goBack"><i class="fa-solid fa-circle-left"></i></button> <span class="h5"> Search articles</span> <span class=" badge rounded-pill bg-dark ms-4" style="font-size: 14px;" v-show="articles.length > 0">{{articles.length}}</span></div>
            </div>
            <div class="col-12">
                    <input  id="searchArticle" type="search" @click="searchArticle=''" :disabled="showSpinner"  class="form-control" v-model="searchArticle" @keypress.enter="searchArticles"   placeholder="Search">
            </div>
          </div>
          
         <!-- end category -->
          <div  class="row">
                <div class="col-12 mt-5" v-if="error">
                        <ShowError :error="error" />
                </div>
                <div v-if="showSpinner" class="col-12 mt-5">          
                  <PreLoading  />
              </div>
              <div class="col-12 mt-5" v-if="!error && !showSpinner && articles.length <=0 ">
                    <div class="text-center">Enter the keyword in search box and press enter or go.</div>
              </div>
          </div>
         
        
        <div class="row g-2" v-show="articles.length > 0" >
            <div class="col-12 my-2 pt-2">
                    Result for "<strong>{{oldKeyword}}"</strong>
            </div>
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
                        <img :src="a[1].src" class="img-fluid show-image" @click="viewDetails(a[0])" />
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
        oldKeyword:"",
         articlesData:[],
      };
    },
   
 
    created() {
        this.preFetchArticles();
    },    
    mounted() {
      
    },

    computed:{
      
    },   
    methods: {    

   
      goBack(){
            this.$router.go(-1)          
      },      

      preFetchArticles(){
     
          try{
            this.showSpinner=true;
            const query_url=query(ref(db, 'articles/'))
            onValue(query_url, (snapshot) => {
                const data = snapshot.val()
                this.showSpinner=false; 
                if(data===null)  return null;        
            
                  const count=Object.keys(data).length;
                  const arts=Object.entries(data);
                 this.articlesData=arts;   
            })
          }catch(err){
              this.error="Oops..., something went wrong.";
          }finally{

          }
      },

       searchArticles(searchTitle){
                 this.error=null;
                if(!this.searchArticle) return false;
                
                this.oldKeyword=this.searchArticle; 
                this.articles=[];             
            
                const result=this.articlesData.filter((art)=>{
                      return art[1].title.toLowerCase().includes(this.searchArticle.toLowerCase())
                })
                if(result.length === 0){
                  this.error=`No result found for "${this.searchArticle}".`
                }else{
                  this.articles=result; 
                }    
                
                this.searchArticle="";
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
  