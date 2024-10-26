<template lang="">
    <div class="container home min-vh-100">
        <div class="row">           
                <div class="col-md-12">
                    <div class="row g-2">
                   
                            <div class="col-2 col-sm-1 ">                                                             
                                  <a href="#!" class="ms-2 d-block circle" type="button" @click="goHome">
                                        <span class="text-dark">
                                            <i class="fa-solid fa-house"></i>
                                         </span>
                                   </a> 
                              </div>
                               <div class="col-10 col-sm-11 col-lg-5">                   
                                     <h4  class="h4" > Student Information  </h4>
                                </div>  
                                     
                        </div>                                   
                     <div class=" row min-vh-100"  style="min-height: 450px;">                        
                        <div class="col-12 p-2"> 
                            <div class="card shadow-sm">
                                <div class="card-body p-0">
                                    <div class="row justify-content-center">
                                        <div class="col-sm-8 col-md-6 text-center">
                                                <div class="row justify-content-center mb-2">
                                                        <div class="col-10 col-sm-8 col-md-6">
                                                            <img  class="img-fluid rounded" :src="[stu.student_photo ? stu.student_photo : 'https://firebasestorage.googleapis.com/v0/b/ntg-vue-data-fc4eb.appspot.com/o/students%2Fstudent.png?alt=media&token=08a42d4e-1413-4c32-9280-52f25a848b4e']" :alt="'Photo of ' + stu.name">
                                                        </div>
                                                </div>
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item text-center">
                                                        <div class=" small">Student ID</div>
                                                        <div class="fw-bold">{{id}}</div>
                                                    </li>
                                                    <li class="list-group-item text-center">
                                                        <div class=" small">Name</div>
                                                        <div class="fw-bold">{{stu.name}}</div>
                                                    </li>
                                                    <li class="list-group-item text-center">
                                                        <div class=" small">E-mail</div>
                                                        <div class="fw-bold">{{stu.email}}</div>
                                                    </li>
                                                    <li class="list-group-item text-center">
                                                        <div class=" small">Join Date</div>
                                                        <div class="fw-bold">{{showTime(stu.created_at)}}</div>
                                                    </li>
                                                </ul>                                    
                                        </div>
                                    </div> 
                                </div>
                            </div>
                         
                                                                         
                           <div class="row">    
                                    <div class="col-12">
                                        <div class="mt-2 pb-0">
                                            <div class="fw-bold">Courses Attended</div>
                                        </div>  
                                    </div>                                
                                    <div class="col-12 p-2 mb-2" v-for="course in stu.courses" :key="course.id" >
                                        <div class="card shadow mb-0">
                                            <div class="card-body border-start border-5 border-success">
                                                <div class="row text-center g-2">
                                                    <div class="col-12 col-md-6">
                                                            <div class="small ">Course</div>
                                                            <div class="fw-bold">{{course.course.name}}</div>
                                                    </div>
                                                    <div class="col-6 col-md-3">
                                                        <div class="small ">Code Name</div>
                                                        <div class="fw-bold">{{course.course.code.toUpperCase()}}</div>
                                                    </div>
                                                    <div class="col-6  col-md-3">
                                                        <div class="small ">Batch</div>
                                                        <div class="fw-bold">Batch#{{course.batch}}</div>
                                                    </div>
                                                    <div class="col-12  col-md-6">
                                                        <div class="small ">Course period</div>
                                                        <div class="fw-bold">{{course.started_at ? showTime(course.started_at) : ""}} - {{course.ended_at ? showTime(course.ended_at) : ""}}</div>
                                                    </div>
                                                    <div class="col-6  col-md-3">
                                                        <div class="small ">Course details</div>
                                                        <div class="fw-bold"><span v-if="course.course_details"><router-link :to="'/course/' + course.course_details">View</router-link></span></div>
                                                    </div>
                                                    <div class="col-6  col-md-3">
                                                        <div class="small ">Certificate</div>
                                                        <div><a href="#!" class="fw-bold" v-show="course.cert_src" @click=viewCert(course)>View</a></div>
                                                    </div>
                                                </div>                                                 
                                                    
                                                    
                                            </div>
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
import SideBar from "@/views/admin/partials/SideBar.vue"
//import { doc, setDoc, collection, query, getDocs, getDoc,orderBy, addDoc, where , updateDoc, getDocFromCache} from "firebase/firestore"; 
import db from "@/firebase/database"
import {ref, set, onValue, remove,query, startAt, endAt, orderByChild } from 'firebase/database'
export default {
    name : "StudentDetails",
    components:{
        SideBar
    },
    data(){
        return{
            id: "",
            stu : {},
        }
    },
    created(){
      
     
        this.id=this.$route.params.id;
        this.getStudent();
        
        
    },
    methods:{
       viewCert(course){
            this.$router.push({name: "ViewCertificate", params: {id:this.id, cert_src: course.cert_src}})
       },
        goHome(){
            this.$router.push({path: "/"})
        },
        showTime(t){
            //const date=t.toDate()
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('en-UK', options).format(t);
            return formattedDate;
        },
        totalDeposit(dep){
           return dep.reduce((accu, cur)=>accu + cur.amount, 0)
        },
        getStudent(){
            try{
            this.isLoading=true;
            //this.showSpinner=true;
            const query_url = query(ref(db, 'students/' + this.id))
                onValue(query_url, (snapshot) => {
                    const data = snapshot.val()
                    if(data ===null){
                        this.$router.push({path: "/admin/students"})
                    }else{
                        this.isLoading=false;
                        this.stu=data;                
                      
                    }                   
                })
            }catch(err){
               // this.error="Oops..., something went wrong."
            }finally{
               
            }  
         }
    }
}
</script>
<style lang="">
    
</style>