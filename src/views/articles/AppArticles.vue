<template>
    <div class="home">
      <div class="container my-4">    
         <!-- category -->
          <div class="row">
            <div class="col-12 mb-2">
              <h5>Computer and Technology Articles</h5>
            </div>
            <div class="col-12">
              <ArticlesMenu @category="changeCategory" @search-article="searchArticles"  :articles="articles"/>
          </div>
          </div>
          
         <!-- end category -->
          <div v-if="error">
             <ShowError :error="error" @tryAgain="tryAgain" class="articles-error" /> 
          </div>
         <div v-if="showSpinner">          
            <PreLoading class="articles-preloader" />
        </div>
       
        <div class="row g-2">
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
                        <img :src="post.src" class="img-fluid show-image" @click="viewDetails(post.id, post.title, post.src)"  />
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
        genre: null,  
        articles:[],
        error:null,
        hasArticles:false,
        showSpinner: false,      
        btnSpinner: false,
        lastDoc: null
      };
    },
   
 
    created() {
      
      if(this.storeArticles.length <= 0){
          this.$watch(
            ()=>this.$route,
            this.fetchArticles,
            {immediate: true}
         )           
      }else{
          this.articles=this.storeArticles
          this.lastDoc=this.storeLastDoc
          this.hasArticles=this.storeHasArticles;
      }  
    
    },    

    computed:{
        storeArticles(){
          return this.$store.getters.articles;
        },
        storeLastDoc(){
          return this.$store.getters.lastDoc
        },
        storeHasArticles(){
          return this.$store.getters.hasArticles;
        }
    },   
    methods: {    

      tryAgain(){
        if(this.genre===null){
          this.fetchArticles();
        }else{
          this.fetchArticlesByGenre();
        }
          
      },

      changeCategory(cat){
              this.articles=[]
              this.lastDoc=null
              this.hasArticles=false;
              this.showSpinner=false;
              this.btnSpinner=false;
              this.$store.dispatch("setArticles", {articles: [],lastDoc: null, hasArticles: false})
          if(cat==="home"){
                this.fetchArticles();
            }else{
                this.genre=cat;
                this.fetchArticlesByGenre();
            }     

      },

      async searchArticles(searchTitle){
        
        try{
          this.error=false;
          this.showSpinner=true;
          this.articles=[]
          this.lastDoc=null
          this.$store.dispatch("setArticles", {articles: [], hasArticles: false, lastDoc: null})

          const docsSnapshot = query(collection(db, "articles"), orderBy("created_at", "desc"), limit(20));
          let documentSnapshots = await getDocs(docsSnapshot); 
          let data=documentSnapshots._snapshot.docChanges;
                if(data.length <= 0 ){
                    this.error="No articles found."
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
                      return art.title.toLowerCase().includes(searchTitle.toLowerCase())
                      })
                      if(result.length === 0){
                        this.error=`Result not found for ${searchTitle}.`
                        this.hasArticles=false; 
                      }
                    this.articles=result;    
                }
        }catch(err){
              this.error="Oops..., something went wrong.";
              this.hasArticles=false;    
        }finally{
              this.showSpinner=false;
        }
        
      },
     
      async fetchArticlesByGenre(){   
       
            try{        
              this.error=false;
              this.btnSpinner=true;

              if(this.articles.length > 0){
                  this.showSpinner=false;
              }else{
                this.showSpinner=true;
              }
              //get articles count from firestore
              const coll = query(collection(db, "articles"), where("category","==", this.genre));
              const countSnapshot=await getCountFromServer(coll);
              const articlesCount=countSnapshot.data().count;
              //end get articles count from firestore

              //first display data from firestore
              const first = query(collection(db, "articles"), where("category","==", this.genre), orderBy("created_at", "desc"), limit(12));
              let documentSnapshots = await getDocs(first);  
              //end first display data from firestore

              if(this.lastDoc !== null){      //check if first display of last item has or not
                const next = query(collection(db, "articles"), where("category","==", this.genre), orderBy("created_at", "desc"),startAfter(this.lastDoc), limit(12));
                documentSnapshots=await getDocs(next)
              }     
              
              //first display data of last item from firestore
            const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length-1];
            this.lastDoc=lastDoc;  
            //end first display data of last item from firestore
                  
              let data=documentSnapshots._snapshot.docChanges;
                if(data.length <= 0 ){
                    this.error="Oops..., something went wrong."
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
                      const newArticles=[...this.articles, ...arts]
                      this.articles=newArticles;
                      this.error=null;              

                      if(articlesCount=== newArticles.length){
                        this.hasArticles=false;
                      }else{
                        this.hasArticles=true;  
                      }
                      //store articles on vuex store;
                      this.$store.dispatch("setArticles", {articles: newArticles, lastDoc: this.lastDoc, hasArticles: this.hasArticles})                
                }

            }catch(err){
              this.error="Oops..., something went wrong.";
              this.hasArticles=false;    
            }finally{
              this.showSpinner=false;
              this.btnSpinner=false;
            }
    },

     
      async fetchArticles(){        
            try{        
              this.error=false;
              this.btnSpinner=true;

              if(this.articles.length > 0){
                  this.showSpinner=false;
              }else{
                this.showSpinner=true;
              }
              //get articles count from firestore
              const coll = collection(db, "articles");
              const countSnapshot=await getCountFromServer(coll);
              const articlesCount=countSnapshot.data().count;
              //end get articles count from firestore

              //first display data from firestore
              const first = query(collection(db, "articles"), orderBy("created_at", "desc"), limit(12));
              let documentSnapshots = await getDocs(first);       
              //end first display data from firestore

              if(this.lastDoc !== null){      //check if first display of last item has or not
                const next = query(collection(db, "articles"), orderBy("created_at", "desc"),startAfter(this.lastDoc), limit(12));
                documentSnapshots=await getDocs(next)
              }     
              
              //first display data of last item from firestore
            const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length-1];
            this.lastDoc=lastDoc;  
            //end first display data of last item from firestore
                  
              let data=documentSnapshots._snapshot.docChanges;
                if(data.length <= 0 ){
                    this.error="Oops..., something went wrong."
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
                      const newArticles=[...this.articles, ...arts]
                      this.articles=newArticles;
                      this.error=null;              

                      if(articlesCount=== newArticles.length){
                        this.hasArticles=false;
                      }else{
                        this.hasArticles=true;  
                      }
                      //store articles on vuex store;
                      this.$store.dispatch("setArticles", {articles: newArticles, lastDoc: this.lastDoc, hasArticles: this.hasArticles})                
                }

            }catch(err){
              this.error="Oops..., something went wrong.";
              this.hasArticles=false;    
            }finally{
              this.showSpinner=false;
              this.btnSpinner=false;
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


  </style>
  