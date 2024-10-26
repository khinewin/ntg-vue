<template lang="">
    <div class="container-fluid home min-vh-100">
    <div class="row">
           
            <div class="col-md-12 content-block">
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
                            <h4 class="h4 pt-1">Courses</h4>
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
                                    <li class="list-group-item mb-1 shadow-sm" v-for="c in courses" :key="c[0]">
                                            <div class="row">
                                                    <div class="col-md-1">
                                                        <div class="fw-light small">CT-ID</div>
                                                        <div class="small">
                                                            {{c[1].course_id}}
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="fw-light small">Image</div>
                                                        <div>
                                                            <vue-load-image>
                                                                <template v-slot:image>
                                                                  <img :src="c[1].src" class="img-fluid" />
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
                                                            <div>{{c[1].course_fees.toLocaleString("en-US")}} MMK</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="fw-light small">Contents</div>
                                                        <div class="small" >
                                                            {{c[1].content.substring(0, 200)}}
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="fw-light small">Category</div>
                                                        <div class="small fw-bold">
                                                            {{c[1].category}}
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="fw-light small">Actions</div>
                                                        <div class="small fw-bold">
                                                            <button class="btn text-primary" @click="goEdit(c[0])"><i class="fa-solid fa-pen-to-square"></i></button>
                                                            <button class="btn text-danger" @click="delCourse(c)"><i class="fa-solid fa-trash-can"></i></button>
                                                        </div>
                                                    </div>
                                            </div>
                                    </li>
                                </ul>
                               
                            </div>
                                
                        </div>
                </div>
            </div>
    </div>
   </div>
</template>
<script>
import SideBar from '@/views/admin/partials/SideBar.vue'
//import { doc, setDoc, collection, query, getDocs, deleteDoc, docs,orderBy, limit, where , startAfter, updateDoc, getCountFromServer} from "firebase/firestore"; 
import db from "@/firebase/database"
import PreLoading from "@/views/loaders/PreLoading.vue"
import ShowError from "@/views/partials/ShowError.vue"
import ImageLoading from "@/views/loaders/ImageLoading"
import { getDatabase, ref, set, onValue, remove, query, startAt,endAt, orderByChild ,limitToLast, limitToFirst} from 'firebase/database'


export default {
    name : "ShowCourses",
    components: {
        SideBar, PreLoading, ShowError, ImageLoading
        
    },
    data(){
        return {
            error: null,
            showSpinner: false,
            courses:[],       
            message:null
        }
    },

    created(){

        this.$watch(
            ()=>this.$route,
            this.getCourses,
            {immediate: true}
         )  
 
    },
 
 
    methods:{    
       goEdit(id){
            this.$router.push({name:`EditCourse`, params:{id:id}})
       }, 
        delCourse(c){
            const conF=confirm(`Want to delete this course  : ${c[1].title} `)
            if(conF){
                const query_url = ref(db, 'courses/' + c[0])
                remove(query_url).then(()=>{
                        this.message="The selected course has been deleted."
                }).catch(()=>{
                    this.error="Oops.., something went wrong."
                })     
            }
        },
        getCourses(){
            try{
                this.showSpinner=true;
                const query_url = query(ref(db, 'courses/'))
                onValue(query_url, (snapshot) => {
                    const data = snapshot.val()                   
                    this.showSpinner=false;
                    if(data ===null){
                        this.courses=[];
                        this.error="Add new course."
                    }else{
                        this.error=null;
                        const courses=Object.entries(data);
                        this.courses=courses.reverse();                         
                        const count=Object.keys(data).length;
                       
                    }                   
                })
            }catch(err){
                this.error="Oops..., something went wrong."
                this.showSpinner=false;

            }finally{
                //this.showSpinner=false;
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