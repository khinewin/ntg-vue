<template>
  <div class="home">
        <div class="container mt-4 ">
            <div class="row mt-5 pt-5" v-if="showSpinner">
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
          <div class="row" v-else>
            <div v-for="post in posts" :key="post.id" class="col-sm-6 mb-4">
            <!--start col-->
              <div class="card shadow-sm border-0">
                <vue-load-image>
                    <template v-slot:image>
                        <div class="show-image-container">
                            <img :src="post.src" class="img-fluid show-image"/>
                        </div>
                    </template>
                    <template v-slot:preloader> 
                      <div class="row my-5" >
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
                                </div>
                    </template>
                    <template v-slot:error>Image load fails</template>
              </vue-load-image>
                <div class="card-body">
                    <h4 class="card-title text-center mb-4 fw-bold">{{ post.title }}</h4>
                    <!-- <div v-html="post.text_body"></div> -->
                    <div class="row justify-content-center">
                        <div class="col-md-6 col-lg-4 d-grid">
                                <button type="button" class="btn btn-primary" @click="viewDetails(post.id, post.title, post.src)">Details <i class="fa-solid fa-circle-right"></i> </button>

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
  import { onMounted, computed } from 'vue'
  import { collection, doc, setDoc, getDocs , query, orderBy} from "firebase/firestore";
  import db from '../firebase'
  import VueLoadImage from 'vue-load-image'
  import { useHead } from '@unhead/vue'


export default {
        setup() {           
              onMounted(()=>{
                      let title="New Tech Group - NTG Mawlamyine";
                      let src="/ntg-social-logo.png";
                      if(title !== undefined){
                         useHead({
                          title: computed(() => title),
                          meta: [
                                    {
                                      property: `og:title`,
                                      content: computed(() => title),
                                    },
                                    {
                                      property: `og:url`,
                                      content: computed(() =>`https://ntgtechnology.web.app`),
                                    },
                                    {
                                      property: `og:image`,
                                      content: computed(() =>src),
                                    },
                                    ],
                         })
                      }
                })
                
            
            },
        name: 'HomeView',
        data(){
          return {
              showSpinner :false,
              posts : [],
          }
        },
        components: {
          'vue-load-image': VueLoadImage
        },

        mounted(){
            this.getContents();
        },
       
        methods:{
          viewDetails(id, title, img_url){            
               this.$router.push({name: "PostDetails",  params: {id:id}})
          },
           async getContents(){    
                  this.showSpinner=true;    
                    const q = query(collection(db, "contents"), orderBy("title"));  
                    const snapShot=await getDocs(q)  
                    
                    snapShot.forEach((doc)=>{
                        let post={
                            id :doc.id,
                            title : doc.data().title,
                            text_body: doc.data().text_body,
                            src: doc.data().src
                        }
                        this.posts.unshift(post)
                    })
                    if(this.posts.length > 0){
                      this.showSpinner=false;
                    }
            }
        },
        computed: {

        }
}
</script>

<style>
  .show-image-container{
    overflow: hidden;

  }
  .show-image{
    transition: all .4s linear;
  }
    .show-image:hover{
        transform: scale(1.1);
        cursor: zoom-in
    }
</style>
