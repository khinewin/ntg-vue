
<template>
   
    <div class="home">     
          <div class="container mt-4">
            <div v-if="showSpinner" class="row">
                <div class="col-12 text-center py-5">
                  <div class="spinner-border text-primary mt=y-5" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="text-center mt-2">
                      <span>Fetching data from server...</span>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center" v-else>
              <div  class="col-sm-8 mb-4">
              <!--start col-->
                <div class="card shadow-sm border-0">
                  <vue-load-image>
                    <template v-slot:image>
                        <img :src="post.src" class="img-fluid"/>
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
                <!--  <img :src="post.src" class="card-img-top" :alt="post.title"> -->
                  <div class="card-body">
                      <h4 class="card-title text-center mb-4 fw-bold">{{ post.title }}</h4>
                      <div v-html="post.text_body" class="text-wrap lh-base"></div> 
                      <div class="mt-4 row">
                        <div class="col-6">
                          <button type="button" class="btn btn-secondary" @click="goHome"><i class="fa-solid fa-house"></i>    Home</button>

                        </div>
                        <div class="col-6 d-grid">
                              <button type="button" class="btn">
                               <iframe :src="'https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fntgtechnology.web.app%2Fpost%2F'+id+'&layout&size&appId=291717897246348&width=80&height=20'" width="80" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>                 
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
    import { collection, doc, setDoc, getDoc , query} from "firebase/firestore";
    import db from '../firebase'
    import {computed, onMounted, onUpdated, getCurrentInstance,  } from 'vue'
 import { useHead } from '@unhead/vue'
 import VueLoadImage from 'vue-load-image'



  export default {        
              setup() {           
              onUpdated(()=>{
                      let ci= getCurrentInstance();
                      let title=ci.data.post.title;
                     let src=ci.data.post.src;
                      let id=ci.data.id;
                      if(id !== undefined){
                         useHead({
                          title: computed(() => title),
                          meta: [
                                    {
                                      property: `og:title`,
                                      content: computed(() => title),
                                    },
                                    {
                                      property: `og:url`,
                                      content: computed(() =>`https://ntgtechnology.web.app/post/${id}?title=${title}&img_url=${src}`),
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
    
          name: 'PostDetails',
          components: {
          'vue-load-image': VueLoadImage
        },
          data(){
            return {
                showSpinner :false,
                post : {},
                id: this.$route.params.id,
               

            }
          },
       
          computed:{
              
          },
        
          mounted(){
            this.getPost();
          },
         
          methods:{
            goHome(){
                this.$router.push("/")
            },
              async  getPost(){
                this.showSpinner=true;
                    const docRef = doc(db, "contents", this.id);
                    const docSnap = await getDoc(docRef);
                    let post={
                            title : docSnap.data().title,
                            text_body: docSnap.data().text_body,
                            src: docSnap.data().src
                        }
                        this.post=post;
                        this.showSpinner=false;

                }
          },
         
  }
  </script>
  