<template>
  <div class="home">
    <div class="container my-4">
      <div class="row mb-2">
        <div class="col-12">
              <AppBanner />
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-12 mb-2">
          <h5>Intensive Training Courses</h5>
        </div>
        <div class="col-12">
              <HomeMenu :articles="posts" @category="changeCategory" /> 
        </div>
      </div>
      <div v-if="error">
          <ShowError :error="error"  @tryAgain="tryAgain" class="home-error"/>
      </div>
      <div v-if="showSpinner">
            <PreLoading class="home-preloader" />
      </div>
      <div class="row g-2" v-else>
        
        <div v-for="post in posts" :key="post.id" class="col-sm-6 col-md-4">
          <!--start col-->
          <div class="card shadow border-0 bg-secondary rounded-0 rounded-top">
            <div
              class="card-body p-0 pt-5 px-2 px-md-2 mt-5 mx-2 rounded-0 rounded-top"
            >
              <div class="bg-body rounded-0 rounded-top">
                <!-- <h5 class="card-title text-center mb-5 mt-4 title">{{ post.title }}</h5> -->
                <!-- <div v-html="post.text_body"></div> -->

                <div class="show-image-container rounded-top">
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
                <div class="row mt-2">
                    <div class="col-12">
                          <h6 class="text-center">{{post.title}}</h6>
                          <div class="text-center"><span>Fees </span> : <span class="badge bg-secondary">{{post.course_fees.toLocaleString('en-US')}} MMK</span></div>
                    </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col-12 d-grid mb-2 mt-md-2">
                    <button
                      type="button"
                      class="btn text-primary"
                      @click="viewDetails(post.id, post.title, post.src)"
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
  import { doc, setDoc, getDoc, collection, where, addDoc,limit, query, getDocs, startAfter,orderBy, getCountFromServer } from "firebase/firestore"; 
  import db from "@/firebase"
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
          genre : null,
          posts : [],
          showSpinner: false,
          error: null
    }
  },

  
  created() {   
    if(this.storePosts.length <= 0){
          this.$watch(
            ()=>this.$route,
            this.fetchPosts,
            {immediate: true}
         )           
      }else{
          this.posts=this.storePosts
       
      }    
  },
  
  computed:{
    storePosts(){
          return this.$store.getters.posts;
        },
  },

  methods: {   
  
    tryAgain(){
      if(this.genre===null){
          this.fetchPosts();
        }else{
          this.fetchPostsByGenre();
        }
    },

    viewDetails(id) {
      this.$router.push({ name: "PostDetails", params: { id: id } });
    },

    changeCategory(cat){      
              this.posts=[]
              this.showSpinner=false;
              this.$store.dispatch("setPosts", {posts: [], hasPosts: false})
          if(cat==="home"){
                this.fetchPosts();
            }else{
                this.genre=cat;
                this.fetchPostsByGenre();
            }     

      },

    async fetchPostsByGenre(){  
     
       try{        
         this.error=false;     
          this.showSpinner=true;
         //first display data from firestore
         const first = query(collection(db, "contents"), where("category","==", this.genre), orderBy("content_id", "desc"));
         let documentSnapshots = await getDocs(first);  
         //end first display data from firestore             
         let data=documentSnapshots._snapshot.docChanges;
           if(data.length <= 0 ){
               this.error="Oops..., something went wrong."
           }else{
               let arts=[]
               documentSnapshots.forEach((doc) => {         
                 let post = {
                     id: doc.id,
                     title: doc.data().title,
                     text_body: doc.data().text_body,
                     src: doc.data().src,
                     category: doc.data().category,
                     course_fees: doc.data().course_fees
                 };
                 arts.push(post);   
             
             });
             
                 this.posts=arts;
                 this.error=null;              

                 //store articles on vuex store;
                 this.$store.dispatch("setPosts", {posts: arts})                
           }

       }catch(err){
         this.error="Oops..., something went wrong.";
       }finally{
         this.showSpinner=false;
       }
},


 async fetchPosts(){     
       try{        
         this.error=false;
         if(this.posts.length > 0){
             this.showSpinner=false;
         }else{
           this.showSpinner=true;
         }     

         //first display data from firestore
         const first = query(collection(db, "contents"), orderBy("content_id", "desc"));
         let documentSnapshots = await getDocs(first);     
         //end first display data from firestore
             
         let data=documentSnapshots._snapshot.docChanges;
           if(data.length <= 0 ){
               this.error="Oops..., something went wrong."
               this.hasPosts=false;                  
           }else{
               let arts=[]
               documentSnapshots.forEach((doc) => {         
                 let post = {
                     id: doc.id,
                     title: doc.data().title,
                     text_body: doc.data().text_body,
                     src: doc.data().src,
                     category: doc.data().category,
                     course_fees: doc.data().course_fees
                 };
                 arts.push(post);          
             
             });
                 this.posts=arts;
                 this.error=null;              

                 //store articles on vuex store;
                 this.$store.dispatch("setPosts", {posts: arts})                
           }

       }catch(err){
         this.error="Oops..., something went wrong.";
       }finally{
         this.showSpinner=false;
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
