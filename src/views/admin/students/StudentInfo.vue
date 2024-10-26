<template lang="">
    <div class="container-fluid home min-vh-100">
        <div class="row">           
                <div class="col-md-12">
                    <div class="row g-2">
                   
                            <div class="col-2 col-sm-1 ">                                                             
                                  <a href="#!" class="ms-2 d-block circle" type="button" @click="goBack">
                                        <span class="text-dark">
                                            <i class="fa-solid fa-circle-chevron-left"></i>
                                         </span>
                                   </a> 
                              </div>
                               <div class="col-10 col-sm-11 col-lg-5">                   
                                     <h4  class="h4 change-cursor" > Student details  </h4>
                                </div>  
                                <div class="col-lg-6">
                                    <button @click="goEdit" class="btn"><i class="fa-solid fa-edit"></i></button>
                                </div>
                                                          
                        </div>                                   
                     <div class="card shadow-sm my-2 min-vh-100"  style="min-height: 420px;">                        
                        <div class="card-body table-responsive">  
                            <table class="table table-bordered table-hover">                       
                                        <tbody>
                                            <tr class="small text-center table-secondary">
                                                <td>ID</td>
                                                <td>Name</td>
                                                <td>E-mail</td>
                                                <td>Phone</td>
                                                <td>Join date</td>
                                                <td>Remark</td>
                                            </tr>   
                                                <tr  class="shadow-sm mb-1 text-center">
                                                        <td>{{id}}</td>
                                                        <td>{{stu.name}}</td>
                                                        <td>{{stu.email}}</td>
                                                        <td>{{stu.phone}}</td>
                                                        <td>{{showTime(stu.created_at)}}</td>
                                                        <td>{{stu.remark}}</td>                                                
                                                    </tr>
                                        </tbody>
                            </table>
                            <div>
                                <h6 class="fw-bold">Courses attended</h6>
                            </div>                                               
                           <ul class="list-group">                                    
                                    <li class="list-group-item p-0 mb-2" v-for="course in stu.courses" :key="course.id" >
                                        <div class="card">
                                            <div class="card-body">
                                                    <h6 class="card-title fw-bold">{{course.course.name}} , Batch # {{course.batch}}</h6>
                                                    <table class="table table-bordered table-hover">                                                            
                                                            <tbody>
                                                                <tr class="text-center small table-secondary ">                                                                    
                                                                    <td>Code name</td>
                                                                    <td>Course fees</td>
                                                                    <td>Join date</td>
                                                                    <td>Start date</td>
                                                                    <td>End date</td>
                                                                    <td>Course details</td>
                                                                    <td>Certificate</td>
                                                                </tr>
                                                                <tr class="text-center small">                                                                    
                                                                    <td>{{course.course.code.toUpperCase()}}</td>
                                                                    <td class="fw-bold">{{course.course.course_fees.toLocaleString('en-US')}} MMK</td>
                                                                    <td>{{course.created_at ? showTime(course.created_at) : ""}}</td>
                                                                    <td>{{course.started_at ? showTime(course.started_at) : ""}}</td>
                                                                    <td>{{course.ended_at ? showTime(course.ended_at) : ""}}</td>
                                                                    <td><span v-if="course.course_details"><router-link :to="'/course/' + course.course_details">View</router-link></span></td>
                                                                    <td><a v-show="course.cert_src" :href="course.cert_src" target="_blank">Download</a></td>
                                                                </tr>
                                                                <tr class="text-end">
                                                                    <td colspan="5">Deposits</td>
                                                                </tr>
                                                            </tbody>                                                          
                                                            
                                                        <tbody v-if="course.deposit">                                                         
                                                            <tr v-for="(d, i) in course.deposit" :key="d.date" >
                                                                <td colspan="5" class="text-end">#{{i+1}}</td>
                                                                <td  colspan="1" class="text-center">{{showTime(d.date)}}</td>
                                                                <td colspan="1" class="text-end">{{d.amount.toLocaleString('en-US')}}</td>                                                                    
                                                            </tr>
                                                            <tr>
                                                                <td colspan="6" class="text-end">Total deposit</td>
                                                                <td colspan="1" class='text-end fw-bold' :class="[course.course.course_fees <= totalDeposit(course.deposit) ? 'text-success' : 'text-danger' ]">{{totalDeposit(course.deposit).toLocaleString('en-US')}}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    
                                            </div>
                                        </div>
                                       
                                    </li>
                           </ul>
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
    name : "StudentInfo",
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
        goEdit(){
               this.$router.push({name: "AppEditStudent", params : {id:this.id}})
        },
        goBack(){
            this.$router.push({name: "AppStudents"})
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