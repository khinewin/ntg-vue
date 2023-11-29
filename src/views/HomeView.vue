<template>
  <div class="home">
        <div class="container mt-4">
          <div v-if="showSpinner" class="row">
              <div class="col-12 text-center py-5">
                <div class="spinner-border text-primary my-5" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div class="text-center mt-2">
                    <span>Fetching data from server...</span>
                  </div>
              </div>
          </div>
          <div class="row" v-else>
            <div v-for="post in posts" :key="post.id" class="col-sm-6 mb-4">
            <!--start col-->
              <div class="card shadow-sm border-0">
                <img :src="post.src" class="card-img-top" :alt="post.title">
                <div class="card-body">
                    <h4 class="card-title text-center mb-4">{{ post.title }}</h4>
                    <!-- <div v-html="post.text_body"></div> -->
                    <div class="d-grid">
                      <button type="button" class="btn btn-primary" @click="viewDetails(post.id)"><i class="fa-brands fa-readme" ></i> View Details</button>
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

export default {
        name: 'HomeView',
        data(){
          return {
              showSpinner :false,
              posts : [],
          }
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
