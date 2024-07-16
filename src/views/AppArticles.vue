<template>
    <div class="home">
      <div class="container my-4">    
         <!-- category -->
         <div class="gy-1 row justify-content-md-center mb-2" >
            <div v-for="cat in categories" :key="cat.id" class="col-6 col-sm-3 col-md-2 d-grid">
                <a href="#" class="btn btn-sm " :class="{'active-category' : cat.active}" @click="filterArticles(cat.text)">{{cat.title}}</a>
            </div>
            <div class="col-6 col-sm-3 col-md-2 d-grid">
                  <input type="search" class="form-control" v-model="searchArticle" @keypress.enter="doSearch()" placeholder="Search the articles">
            </div>
         </div>
         <!-- end category -->
        <div
          class="row"
          v-if="showSpinner"
          style="margin-top: 200px; margin-bottom: 250px"
        >
          <div class="col-6">
            <div class="spinner-grow text-success float-end" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div class="col-6">
            <div class="spinner-grow text-danger" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div class="col-6">
            <div class="spinner-grow text-warning float-end" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div class="col-6">
            <div class="spinner-grow text-info" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div class="text-center mt-2">
            <span>Fetching data from server...</span>
          </div>
        </div>
       
        <div class="row g-2" v-else>
          <div v-for="post in posts" :key="post.id" class="col-sm-6 col-md-3">
            <!--start col-->
            <div class="card shadow border-0 bg-secondary rounded-0 rounded-top">
              <div
                class="card-body p-0 pt-2 px-2 px-md-2 mt-5 mx-2 rounded-0 rounded-top"
              >
                <div class="bg-body rounded-0 rounded-top">
                  <!-- <h5 class="card-title text-center mb-5 mt-4 title">{{ post.title }}</h5> -->
                  <!-- <div v-html="post.text_body"></div> -->
  
                  <div class="show-image-container  rounded-top">
                    <vue-load-image>
                      <template v-slot:image>
                        <img :src="post.src" class="img-fluid show-image" />
                      </template>
                      <template v-slot:preloader>
                        <div class="row my-5 justify-content-center">
                          <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>      
                          <div class="text-center mt-2">Loading image ...</div>                    
                        </div>
                      </template>
                      <template v-slot:error>Loading image failed.</template>
                    </vue-load-image>
                  </div>
                  <div class="row justify-content-center">
                    <div class="col-md-10  d-grid my-2 mt-md-4">
                      <button
                        type="button"
                        class="btn text-primary rounded-0 rounded-top"
                        @click="viewDetails(post.id, post.title, post.src)"
                      >
                        Read more <i class="fa-solid fa-circle-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end col-->
          </div>
        </div>
        <div class="row g-2" v-if="filterError !==null" style="margin-top: 200px; margin-bottom: 200px">
              <div class="col-12 text-center my-5">{{filterError}}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, computed } from "vue";
  import VueLoadImage from "vue-load-image";
  import {
    collection,
    doc,
    setDoc,
    getDocs,
    query,
    orderBy,
    where,limit
  } from "firebase/firestore";
  import db from "../firebase";
  
  export default {
   
    name: "AppArticles",
    components:{
      "vue-load-image": VueLoadImage,
    },
    data() {
      return {
        showSpinner: false,
        loadingPromotion: false,
        posts: [],
        filterByCategory: "all",
        filterError: null,
        searchArticle: "",
        categories: [
            {id: 0, title: "All articles", text : "all", active: true},
            {id: 1, title: "Database", text : "database",active: false},
            {id: 2, title: "Programming", text : "programming",active: false},
            {id: 3, title: "Networking", text : "networking",active: false},
            {id: 4, title: "Computer", text : "computer",active: false}
        ]
      };
    },
    components: {},
  
    mounted() {
      this.getContents();
      //this.refetchContent();
    },
  
    methods: {     

    doSearch(){
        this.posts=[];
        this.filterByCategory=null;
        this.searchByTitle();
    } , 

    filterArticles(text){
            this.categories.map((c)=>{
                    if(c.text===text)  return c.active=true;                
                     if(c.text !==text)  return c.active=false;                                  
            })
            this.searchArticle="";
            this.filterByCategory=text;
            this.posts=[];
            this.getContents();
    },
  
     
      viewDetails(id, title, img_url) {
        this.$router.push({ name: "ArticleDetails", params: { id: id } });
      },

      async searchByTitle(){
            this.showSpinner=true;
            const q = query(collection(db, "articles"), orderBy("created_at", "asc"));            
            const querySnapshot = await getDocs(q);
            let data=querySnapshot._snapshot.docChanges;
            if(data)   this.showSpinner=false;
                let articles=[];
                querySnapshot.forEach((doc) => {
                let post={};              
           
                post.title=doc.data().title;
                post.content=doc.data().content;
                post.src=doc.data().src;
                post.created_at=doc.data().created_at;
                post.id=doc.id;              
                articles.unshift(post);

            })
            let search=articles.filter((a)=>{
                return a.title.toLowerCase().includes(this.searchArticle.toLowerCase())
            })
            this.posts=search;
            if(search.length < 1){
              this.filterError=`No articles found for "${this.searchArticle}".`;  
            }else{
              this.filterError=null;
            }
           // this.showSpinner=false;
        },
      
      async getContents() {
        this.showSpinner = true;
        let q;
        if(this.filterByCategory==="all"){
           q = query(collection(db, "articles"), orderBy("created_at"), limit(8));
        }else{
          q=query(collection(db, "articles"), where("category", "==", this.filterByCategory), orderBy("created_at"), limit(8));
        }        
        const snapShot = await getDocs(q);   
        let data=snapShot._snapshot.docChanges;
        if(data)   this.showSpinner=false;
        if(data.length > 0){
          this.filterError=null;
          snapShot.forEach((doc) => {         
          let post = {
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            src: doc.data().src,
          };
          this.posts.unshift(post);
        });
          }else{            
                this.filterError="No articles found for this category.";              
          }        
        
        
      },
    },
    computed: {},
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
    cursor: zoom-in;
  }
  .active-category{
        color: rgb(132, 71, 2) !important;
  }
  </style>
  