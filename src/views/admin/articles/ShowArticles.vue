<template lang="">
    <div class="container-fluid home">
    <div class="row">
           
            <div class="col-md-12 content-block" style="min-height: 500px">
                <div class="row my-2">
                    <SideBar />  
                        <div class="col-2 col-md-1">                                                             
                                <a href="#!" class="ms-2 d-block circle" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar" aria-label="Toggle navigation">
                                    <span class="text-dark">
                                    <i class="fa-solid fa-bars"></i>
                                    </span>
                                </a> 
                        </div>
                        <div class="col-10 col-md-4">                   
                            <h4 class="h4 pt-1">Articles</h4>
                        </div>
                        
                        <div class="col-md-7">
                                <h4 v-if="message" class="text-success text-center h4 pt-1"><i class="fa-solid fa-check"></i> {{message}}</h4>
                        </div>
                </div>
                
                 <div class="card shadow-sm mb-2">
                        <div class="card-body p-0">
                            <div v-if="showSpinner">
                                    <PreLoading class="preLoading" />
                            </div>
                            <div v-if="error">
                                <ShowError :error="error" class="error"/>
                        </div>
                            <div v-if="courses.length > 0">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item mb-1 shadow-sm" v-for="c in courses" :key="c.id">
                                            <div class="row">
                                                <div class="col-md-1">
                                                    <div class="fw-light small">Date</div>
                                                    <div class="small">
                                                        {{showTime(c.created_at)}}
                                                    </div>
                                                </div>
                                                    <div class="col-md-2">
                                                        <div class="fw-light small">Image</div>
                                                        <div>
                                                            <vue-load-image>
                                                                <template v-slot:image>
                                                                  <img :src="c.src" class="img-fluid" />
                                                                </template>
                                                                <template v-slot:preloader>
                                                                    <ImageLoading />
                                                                </template>
                                                                <template v-slot:error>Loading image failed.</template>
                                                              </vue-load-image>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="fw-light small">Title</div>
                                                        <div class="small ">
                                                            <div class="fw-bold mb-2">{{c.title}}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="fw-light small">Contents</div>
                                                        <div class="small" >
                                                            {{c.content.substring(0, 200)}}
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="fw-light small">Category</div>
                                                        <div class="small fw-bold">
                                                            {{c.category}}
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="fw-light small">Actions</div>
                                                        <div class="small fw-bold">
                                                            <button class="btn text-primary" @click="goDetail(c.id)"><i class="fa-solid fa-earth-asia"></i></button>

                                                            <button class="btn text-primary" @click="goEdit(c.id)"><i class="fa-solid fa-pen-to-square"></i></button>
                                                            <button class="btn text-danger" @click="delCourse(c)"><i class="fa-solid fa-trash-can"></i></button>
                                                        </div>
                                                    </div>
                                            </div>
                                    </li>
                                </ul>
                                <div class="row justify-content-center mt-3 mb-2" v-if="hasCourses">
                                    <div class="col-sm-6 col-md-4 d-grid">
                                      <button class="btn btn-primary rounded" type="button" :disabled="error || !hasCourses || btnSpinner" @click="getCourses">
                                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" v-if="btnSpinner"></span>
                                        More articles <i class="fa-solid fa-circle-chevron-down"></i>
                                      </button>
                                    </div>
                                </div>
                            </div>
                                
                        </div>
                </div>
            </div>
    </div>
   </div>
</template>
<script>
import SideBar from '@/views/admin/partials/SideBar.vue'
import { doc, setDoc, collection, query, getDocs, deleteDoc, docs,orderBy, limit, where , startAfter, updateDoc, getCountFromServer} from "firebase/firestore"; 
import db from "@/firebase"
import PreLoading from "@/views/loaders/PreLoading.vue"
import ShowError from "@/views/partials/ShowError.vue"
import ImageLoading from "@/views/loaders/ImageLoading"


export default {
    name : "ShowArticles",
    components: {
        SideBar, PreLoading, ShowError, ImageLoading
        
    },
    data(){
        return {
            error: null,
            showSpinner: false,
            courses:[],
            lastDoc:null,
            hasCourses: false,
            btnSpinner: false,
            message:null
        }
    },

    created(){

        this.$watch(
            ()=>this.$route,
            this.getCourses,
            {immediate: true}
         )  
        /*
        if(this.storeCourses.length <= 0){
          this.$watch(
            ()=>this.$route,
            this.getCourses,
            {immediate: true}
         )           
      }else{
          this.courses=this.storeCourses
          this.lastDoc=this.storeLastDoc
          this.hasCourses=this.storeHasCourses;
       
      }  

    */
    },
 
 

    computed:{
        storeCourses(){
            return  this.$store.getters.courses;
        },
        storeLastDoc(){
            return this.$store.getters.lastDocCourse;
        },
        storeHasCourses(){
            return this.$store.getters.hasCourses;
        }
    },
   
    methods:{    
        goDetail(id){
            this.$router.push({ name: "ArticleDetails", params: { id: id } });
        },
        showTime(t){
            const date=t.toDate()
           const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
            return formattedDate;
        },
       goEdit(id){
            this.$router.push({name:`EditArticle`, params:{id:id}})
       }, 
       async delCourse(c){
            const conF=confirm(`Want to delete this course ID : ${c.id} `)
            if(conF){
                await deleteDoc(doc(db, "articles", c.id)).then(()=>{
                       this.courses=[];
                       this.showSpinner=true; 
                       this.hasCourses=null;
                       this.lastDoc=null;
                       this.getCourses();
                        this.message="The selected article has been deleted."
                })
            }
        },
       async getCourses(){
            try{        
                    this.btnSpinner=true;
                    this.error=false;
                    if(this.courses.length > 0){
                        this.showSpinner=false;
                    }else{
                    this.showSpinner=true;
                    }     

                     //get articles count from firestore
                    const coll = collection(db, "articles");
                    const countSnapshot=await getCountFromServer(coll);
                    const coursesCount=countSnapshot.data().count;
                    //end get articles count from firestore

                    //first display data from firestore
                    const first = query(collection(db, "articles"), orderBy("created_at", "desc"), limit(4));
                    let documentSnapshots = await getDocs(first);       
                    //end first display data from firestore

                    if(this.lastDoc !== null){      //check if first display of last item has or not
                        const next = query(collection(db, "articles"), orderBy("created_at", "desc"),startAfter(this.lastDoc), limit(4));
                        documentSnapshots=await getDocs(next)
                    }     

                    const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length-1];
                    this.lastDoc=lastDoc;  
                        
                    let data=documentSnapshots._snapshot.docChanges;
                    if(data.length <= 0 ){
                        this.error="Oops..., something went wrong."
                    }else{
                        let arts=[]
                        documentSnapshots.forEach((doc) => {         
                            let post = {
                                id: doc.id,
                                title: doc.data().title,
                                content: doc.data().content,
                                src: doc.data().src,
                                category: doc.data().category,
                                created_at: doc.data().created_at,
                            };
                            arts.push(post);          
                        
                        });
                        const newCourses=[...this.courses, ...arts]
                        this.courses=newCourses;
                        this.error=null;              

                        if(coursesCount=== newCourses.length){
                            this.hasCourses=false;
                        }else{
                            this.hasCourses=true;  
                        }             

                            //store courses on vuex store;
                        this.$store.dispatch("setCourses", {courses: arts, lastDoc: this.lastDoc, hasCourses: this.hasCourses})                
                    }

                }catch(err){
                    this.error="Oops..., something went wrong.";
                }finally{
                    this.showSpinner=false;
                    this.btnSpinner=false;
                }
        }
   }
}
</script>
<style lang="css">
    .error, .preLoading{
         margin-top: 100px;
         margin-bottom: 250px;
    }
</style>