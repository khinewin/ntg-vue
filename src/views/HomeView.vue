<template>
  <div class="home">
        <div class="container mt-4">
                                <div class="row my-5" v-if="showSpinner">
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
          <div class="row" v-else>
            <div v-for="post in posts" :key="post.id" class="col-sm-6 mb-4">
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
                <div class="card-body">
                    <h4 class="card-title text-center mb-4">{{ post.title }}</h4>
                    <!-- <div v-html="post.text_body"></div> -->
                    <div class="d-grid">
                      <button type="button" class="btn" @click="viewDetails(post.id)"> <i class="fa-solid fa-angles-right"></i>  View Details</button>
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
  import { onMounted } from 'vue'
  import { collection, doc, setDoc, getDocs , query} from "firebase/firestore";
  import db from '../firebase'
  import VueLoadImage from 'vue-load-image'

export default {
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
          viewDetails(id){
               this.$router.push(`post/${id}`)
          },
           async getContents(){    
                  this.showSpinner=true;    
                    const q = query(collection(db, "contents"));  
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
                    this.showSpinner=false;
            }
        },
        computed: {

        }
}
</script>
