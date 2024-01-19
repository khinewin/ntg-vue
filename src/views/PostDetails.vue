
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
                  <img :src="post.src" class="card-img-top" :alt="post.title">
                  <div class="card-body">
                      <h4 class="card-title text-center mb-4">{{ post.title }}</h4>
                      <div v-html="post.text_body"></div> 
                      <div class="mt-4">
                        <button type="button" class="btn btn-secondary" @click="goHome"><i class="fa-solid fa-house"></i>    Home</button>
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
    import { collection, doc, setDoc, getDoc , query} from "firebase/firestore";
    import db from '../firebase'
    
  export default {        

       
          name: 'PostDetails',
          data(){
            return {
                showSpinner :false,
                post : {},
                id: this.$route.params.id,
            }
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
          computed: {
  
          }
  }
  </script>
  