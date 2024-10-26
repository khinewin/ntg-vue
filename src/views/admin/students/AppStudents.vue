<template lang="">
   <div class="container-fluid home min-vh-100">
    <div class="row">           
            <div class="col-md-12">
                <div class="row g-2">
                        <SideBar />  
                            <div class="col-2 col-sm-1 ">                                                             
                                  <a href="#!" class="ms-2 d-block circle" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar" aria-label="Toggle navigation">
                                        <span class="text-dark">
                                            <i class="fa-solid fa-bars"></i>
                                         </span>
                                   </a> 
                              </div>
                               <div class="col-10 col-sm-11 col-lg-5">                   
                                     <h4 @click="getAllStudents" class="h4 change-cursor" > Students <span class="badge bg-dark">{{students.length}}</span></h4>
                                </div>                            
                   </div>                              
                        
                <div class="row my-2 gx-1">                     
                        <div class="col-sm-6 col-lg-4">
                                <div class="input-group">
                                        <input @keydown.enter="searchByName" type="search" class="form-control form-control-sm" id="search_by_name" placeholder="Search by name" v-model="search_by_name">
                                        <div class="input-group-text" @click=clearFilter><i class="fa-solid fa-circle-xmark d-block"></i></div>   
                                </div>  
                        </div>
                        <div class="col-sm-6 col-lg-4">
                                <div class="input-group">
                                        <input @keydown.enter="filterById" type="number"  class="form-control form-control-sm" id="filter_by_id" placeholder="Search by ID" v-model="filter_by_id">
                                        <div class="input-group-text" @click=clearFilter><i class="fa-solid fa-circle-xmark d-block"></i></div>   
                                </div>  
                        </div>
                </div>
               
                <div class="row gx-1">
                        <div class="col-lg-8">
                                <div class="card shadow-sm mb-2 min-vh-100" >                        
                                        <div class="card-body table-responsive">  
                                       <table class="table table-bordered table-hover">
                                        <thead>
                                                <tr class="small text-center table-secondary">
                                                        <td>ID</td>
                                                        <td>Name</td>
                                                        <td>E-mail</td>
                                                        <td>Phone</td>
                                                        <td>Join date</td>
                                                        <td>Remark</td>
                                                        <td>Actions</td>
                                                </tr>
                                                <tr v-if="error">
                                                        <td colspan="6">
                                                                <ShowError :error="error" /> 
                                                        </td>
                                                </tr>
                                        </thead>
                                       
                                                <tbody class="small" v-if="students.length > 0" style="cursor:context-menu">
                                                        <tr v-for="student in students" :key="stu[0]" class="shadow-sm mb-1" @click="viewBeside(student[0])" :class="[student[0] === viewBesideId ? 'table-primary fw-bold' : '' ]">
                                                                <td>{{student[0]}} </td>
                                                                <td>{{student[1].name}}</td>
                                                                <td>{{student[1].email}}</td>
                                                                <td>{{student[1].phone}}</td>
                                                                <td>{{showTime(student[1].created_at)}}</td>
                                                                <td>{{student[1].remark}}</td>
                                                                <td class="text-center">
                                                                        <a href="#!" class="text-primary mx-2" @click="publicInfo(student[0])" ><i class="fa-solid fa-globe"></i></a>
                
                                                                        <a href="#!" class="text-primary mx-2" @click="studentInfo(student[0])" ><i class="fa-solid fa-wand-magic-sparkles"></i></a>
                
                                                                        <a href="#!" class="text-primary mx-2" @click="editStudent(student[0])" ><i class="fa-solid fa-edit"></i></a>
                                                                        <a href="#!" class="text-danger mx-2" @click="removeStudent(student)"><i class="fa-solid fa-trash"></i></a>
                                                                </td>
                
                                                        </tr>
                                                </tbody>
                                       </table>                                                                    

                                       <div v-if="pageLoading" class="mt-5">
                                                <PreLoading />
                                       </div>
                                    </div>
                               </div>  
                        </div>
                        <div class="col-lg-4 mb-2 " >
                                <div v-if="isViewBeside && Object.keys(stu).length > 0" class="row overflow-y-scroll">
                                        <div class="col-12">
                                                <div class="card">
                                                        <div class="card-body text-center fw-bold">
                                                                <div class="h5">{{stu[0][1].name}}</div>
                                                                <div>{{stu[0][0]}}</div>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="col-12" v-for="course in stu[0][1].courses">
                                                <div class="card">
                                                        <div class="card-body">
                                                                <h6 class="card-title fw-bold">{{course.course.name}} , Batch # {{course.batch}}</h6>
                                                                <table class="table table-bordered table-hover">                                                            
                                                                        <tbody>
                                                                            <tr class="text-center small table-secondary ">                                                                    
                                                                                <td>Code</td>
                                                                                <td>Fees</td>
                                                                                <td>S-date</td>
                                                                                <td>E-date</td>
                                                                                <td>Details</td>
                                                                                <td>Certificate</td>
                                                                            </tr>
                                                                            <tr class="text-center small">                                                                    
                                                                                <td>{{course.course.code.toUpperCase()}}</td>
                                                                                <td >{{course.course.course_fees.toLocaleString('en-US')}}</td>
                                                                                <td>{{course.started_at ? showTime(course.started_at) : ""}}</td>
                                                                                <td>{{course.ended_at ? showTime(course.ended_at) : ""}}</td>
                                                                                <td><span v-if="course.course_details"><router-link :to="'/course/' + course.course_details">View</router-link></span></td>
                                                                                <td><a v-show="course.cert_src" :href="course.cert_src" target="_blank">Download</a></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td colspan="6">Deposits</td>
                                                                            </tr>
                                                                        </tbody>
                                                                        
                                                                    <tbody v-if="course.deposit">                                                         
                                                                        <tr v-for="(d, i) in course.deposit" :key="d.date" class="text-center small">
                                                                            <td >#{{i+1}}</td>
                                                                            <td class="text-start" colspan="2">{{showTime(d.date)}}</td>
                                                                            <td colspan="3" class="text-end">{{d.amount.toLocaleString('en-US')}}</td>                                                                    
                                                                        </tr>
                                                                        <tr class="small">
                                                                            <td colspan="3" class="text-end">Total deposit</td>
                                                                            <td colspan="3" class='fw-bold text-end' :class="[course.course.course_fees <= totalDeposit(course.deposit) ? 'text-success' : 'text-danger' ]">{{totalDeposit(course.deposit).toLocaleString('en-US')}}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                
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
//import { doc, setDoc, collection, addDoc, deleteDoc, query, getDocs,orderBy,startAt, endAt, getCountFromServer, sum, where, limit } from "firebase/firestore"; 
import db from "@/firebase/database"
import PreLoading from '@/views/loaders/PreLoading.vue'
import { getDatabase, ref, set, onValue, remove,query, startAt, endAt, orderByChild, limitToLast } from 'firebase/database'
import ShowError from "@/views/partials/ShowError"

export default {
    name : "AppStudents",
    components: {
        SideBar,PreLoading, ShowError
    },
    data(){
        return {
                students : [],
                pageLoading:false,
                search_by_name:"",          
                filter_by_id:"",
                error: null,
                stu: {},
                isViewBeside:false,
                viewBesideId: "",
                searchData:[],
        }
    },
    
    created(){        
        
        this.$watch(()=>this.$route,
        this.fetchStudents,
        {immediate:true}
        )
    },
    computed:{
       
       
    },    
    methods :{   
        showTime(t){
           const options = { year: '2-digit', month: 'numeric', day: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('en-UK', options).format(t);
            return formattedDate;
        },
        totalDeposit(dep){
           return dep.reduce((accu, cur)=>accu + cur.amount, 0)
        },
        viewBeside(id){
             this.viewBesideId=id;
             const stu= this.students.filter((st)=>{
                       return st[0] ==id;
              }) 
              this.stu={...stu};
              this.isViewBeside=true;
        },

        publicInfo(id){
                this.$router.push({name: "StudentDetails", params: {id:id}})
        },
        showDeposit(d){
                return d.reduce((accu, cur)=>accu + cur)        
        },  
        fetchStudents(){
            this.pageLoading=true;          
            const query_url=query(ref(db, 'students'), orderByChild("created_at"));     
                              
            onValue(query_url, (snapshot) => {
                const data = snapshot.val()
                this.pageLoading=false;
                if(data===null) {
                        this.students=[];                       
                        this.error=`No result found.`;
                }else{
                        const students=Object.entries(data);
                        //console.log(students)
                        this.students=students.reverse();     
                        this.searchData=students;                   
                        this.error=null;
                }
            })
        },
        filterById(){
                this.search_by_name="";
                if(!this.filter_by_id) return false;
                this.pageLoading=true;
                this.pageLoading=true;  
                let filter_s=this.searchData.filter((s)=>{
                         return s[1].id === this.filter_by_id;
                         })
                         if(filter_s.length > 0){
                                 this.students=filter_s;
                                 this.error=null;
                         }else{
                                 this.students=[];
                                 this.error="No result found."
                         }
                        
                         this.pageLoading=false;           
           
        },
        searchByName(){
                this.filter_by_id="";
                if(!this.search_by_name) return false;
                this.pageLoading=true;
                this.pageLoading=true;  
                let filter_s=this.searchData.filter((s)=>{
                         return s[1].name.toLowerCase().includes(this.search_by_name.toLowerCase())
                         })
                         if(filter_s.length > 0){
                                 this.students=filter_s;
                                 this.error=null;
                         }else{
                                 this.students=[];
                                 this.error="No result found."
                         }
                        
                         this.pageLoading=false;           
           
        },
        clearFilter(){
                this.search_by_name="";
                this.filter_by_id="";
                this.fetchStudents();
        },
       
       studentInfo(id){
                this.$router.push({name: "StudentInfo", params : {id:id}})
       },
        editStudent(id){
               this.$router.push({name: "AppEditStudent", params : {id:id}})
        },
         removeStudent(stu){
               let doConfirm=confirm(`This selected student Name : "${stu[1].name}" & Phone : "${stu[1].phone}" will remove from database.` )
               if(doConfirm){
                const query_url = ref(db, 'students/' + stu[0])
                remove(query_url).then(()=>{
                        this.message="The selected student has been deleted."
                }).catch(()=>{
                    this.error="Oops.., something went wrong."
                })                  
               }
        },
    }
}
</script>
<style lang="css">
    .change-cursor{
        cursor:pointer;
    }
    .preLoading{
        margin-top: 200px;
        margin-bottom: 200px;
    }
    .readyClass{
        margin-top: 200px;
        margin-bottom: 220px;
    }
</style>