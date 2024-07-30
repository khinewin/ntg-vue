<template lang="">
   <div class="container-fluid home">
    <div class="row">           
            <div class="col-md-12">
                <div class="row my-2">
                        <div class="col-12">
                                <div class="row">
                                   <SideBar />  
                                       <div class="col-2 col-md-1">                                                             
                                             <a href="#!" class="ms-2 d-block circle" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar" aria-label="Toggle navigation">
                                                   <span class="text-dark">
                                                       <i class="fa-solid fa-bars"></i>
                                                    </span>
                                              </a> 
                                         </div>
                                          <div class="col-10 col-md-2">                   
                                                <h4 @click="getAllStudents" class="h4 change-cursor" > Students</h4>
                                           </div>                                 
                                     <div class="col-md-3">
                                               <div class="input-group">
                                                <select class="form-control form-control-sm" @change="filterByCourse" v-model="filter_by_course">
                                                                        <option value="">Filter by course</option>
                                                                       
                                                                        <option v-for="sc in select_courses" :key="sc.id" :value="sc.code">{{sc.code}}</option>
                                                                </select>        
                                                                <div class="input-group-text" @click=clearFilter><i class="fa-solid fa-circle-xmark d-block"></i></div>     
                                               </div>                                          
                                        </div>
                                        <div class="col-md-3">
                                               <div class="input-group">
                                                <select class="form-control form-control-sm" @change="filterByBatch" v-model="filter_by_batch">
                                                                        <option value="">Filter by batch</option>
                                                                        <option v-for="b in batchs" :value="b">Batch #{{b}}</option>
                                                                </select>        
                                                                <div class="input-group-text" @click=clearFilter><i class="fa-solid fa-circle-xmark d-block"></i></div>     
                                               </div>                                          
                                        </div>
                                        <div class="col-sm-3">
                                                <div class="input-group">
                                                        <input @keydown.enter="searchByName" type="search" class="form-control form-control-sm" id="search_by_name" placeholder="Search by name" v-model="search_by_name">
                                                        <div class="input-group-text" @click=clearFilter><i class="fa-solid fa-circle-xmark d-block"></i></div>   
                                                </div>  
                                        </div>
                                </div>
                        </div>
                </div>
                <div v-if="pageLoading">
                        <PreLoading class="preLoading" />
                </div>
                <div v-if="students.length ==0 && !pageLoading" class="readyClass">
                        <div class="text-center">Ready to add students record to database.</div>
                </div>
                <div class="card shadow-sm mb-2 p-0" v-if="students.length > 0" style="min-height: 450px;">
                        <div class="card-body p-0">                                                             
                       <ul class="list-group">                           
                           <li v-for="stu in students" :key="stu.id" class="list-group-item p-0 my-1 list-group-item-action shadow border-5 border-end-0 border-top-0 border-bottom-0" :class="{ 'border-warning': stu.course_fees > stu.deposit, 'border-success': stu.deposit >= stu.course_fees}">
                                   <div class="row">                                                
                                       <div class="col-sm-6 col-md-3  py-1">
                                               <div class="text-center small fw-light">Name</div>
                                               <div class="text-center small fw-semibold">{{stu.name}}</div>
                                       </div>
                                       <div class="col-sm-6 col-md-3  py-1">
                                               <div class="text-center small fw-light">E-mail</div>
                                               <div class="text-center small fw-semibold">{{stu.email}}</div>
                                       </div>
                                       <div class="col-sm-6 col-md-3  py-1">
                                               <div class="text-center small fw-light">Course / Batch</div>
                                               <div class="text-center small fw-semibold">{{stu.course}} / batch#{{stu.batch}}</div>
                                       </div>
                                       <div class="col-sm-6 col-md-3  py-1">
                                               <div class="text-center small fw-light">Phone</div>
                                               <div class="text-center small fw-semibold">{{stu.phone}}</div>
                                       </div>
                                       
                                       <div class="col-sm-6 col-md-3  py-1">
                                               <div class="text-center small fw-light">Course fees (Deposit)</div>
                                               <div class="text-center small fw-semibold">{{stu.deposit}} MMK</div>
                                       </div>
                                       <div class="col-sm-6 col-md-3  py-1">
                                               <div class="text-center small fw-light">Date</div>
                                               <div class="text-center small fw-semibold">{{stu.created_at}}</div>
                                       </div>
                                       <div class="col-sm-6 col-md-3 py-1">
                                               <div class="text-center small fw-light">Remark</div>
                                               <div class="text-center small fw-semibold">{{stu.remark}}</div>
                                       </div>
                                       <div class="col-sm-6 col-md-3 py-1">
                                               <div class="text-center small fw-light">Actions</div>
                                               <div class="text-center small fw-semibold">
                                                       <a href="#!" class="text-primary me-3" @click="editStudent(stu.id)" ><i class="fa-solid fa-edit"></i></a>
                                                   <a href="#!" class="text-danger" @click="removeStudent(stu)"><i class="fa-solid fa-trash"></i></a>
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
</template>
<script>
import SideBar from "@/views/admin/partials/SideBar.vue"
import { doc, setDoc, collection, addDoc, deleteDoc, query, getDocs,orderBy,startAt, endAt, getCountFromServer, sum, where, limit } from "firebase/firestore"; 
import db from "@/firebase"
import PreLoading from '@/views/loaders/PreLoading.vue'

export default {
    name : "AppStudents",
    components: {
        SideBar,PreLoading
    },
    data(){
        return {
                students : [],
                pageLoading:true,
                filter_by_course: "",
                search_by_name:"",
                level1_price: 150000,
                level2_price: 250000,
                batchs:[],
                filter_by_batch:"",
                current_batch:"",
        }
    },
    
    created(){        
        this.$watch(()=>this.$route,
        this.fetchBatch,
        {immediate:true}
        )
        this.$watch(()=>this.$route,
        this.fetchStudents,
        {immediate:true}
        )
    },
    computed:{
        allStudents(){
                return this.students;
        },   

        select_courses(){
                return this.$store.getters.select_courses;
        }
       
    },    
    methods :{        
        async fetchBatch(){
            const q = query(collection(db, "training"), orderBy("batch", "asc"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let batch={};   
                batch=doc.data().batch;
                this.batchs.unshift(batch);
                if(doc.data().active){
                        this.current_batch=doc.data().batch;
                       
                }
            })
        },

        getAllStudents(){
                this.clearFilter();
                this.fetchStudents();
        },
        
        clearFilter(){
                this.filter_by_course="";
                this.filter_by_batch="";
                this.search_by_name="";
        },
        getStudentsByBatch(bat){        
                this.filter_by_batch=bat;
               this.fetchStudents();
        },
        filterByBatch(){
                this.fetchStudents();
                this.filter_by_course="";
                this.search_by_name="";
        },
        filterByCourse(){
                this.fetchStudents();
              this.filter_by_batch="";
              this.search_by_name="";
        },
       async searchByName(){
        this.filter_by_batch="";
        this.filter_by_course="";
        this.pageLoading=true;
                const q = query(collection(db, "students"), orderBy("order_date", "asc"));
            
            const querySnapshot = await getDocs(q);
                 let stus=[];
            querySnapshot.forEach((doc) => {
                let stu={};              
           
                stu.name=doc.data().name;
                stu.email=doc.data().email;
                stu.phone=doc.data().phone;
                stu.deposit=doc.data()["deposit"].reduce((a,b)=>a+b);
                stu.course=doc.data().course;
                stu.remark=doc.data().remark;
                stu.id=doc.id;
                stu.created_at=doc.data().created_at;
                stu.course_fees=doc.data().course_fees;
                stu.batch=doc.data().batch;
                stus.unshift(stu);

            })
            let filter_s=stus.filter((s)=>{
                return s.name.toLowerCase().includes(this.search_by_name.toLowerCase())
            })
            this.students=filter_s;
            this.pageLoading=false;
        },
       
        async fetchStudents(){
            this.pageLoading=true;
            this.students=[];
            let q;
            if(this.filter_by_batch){
                 q = query(collection(db, "students"), where("batch", "==", this.filter_by_batch), orderBy("order_date", "asc"));
            }
            if(this.filter_by_course){
                 q = query(collection(db, "students"), where("course", "==", this.filter_by_course), orderBy("order_date", "asc"));
            }
                  
            if(!this.filter_by_batch && !this.filter_by_course && !this.search_by_name){
                 q = query(collection(db, "students"), orderBy("order_date", "asc"), limit(50));
            }
            
            const querySnapshot = await getDocs(q);
            let stus=[];
            querySnapshot.forEach((doc) => {
                let stu={};             
           
                stu.name=doc.data().name;
                stu.email=doc.data().email;
                stu.phone=doc.data().phone;
                stu.deposit=doc.data()["deposit"].reduce((a,b)=>a+b);
                stu.course=doc.data().course;
                stu.remark=doc.data().remark;
                stu.id=doc.id;
                stu.created_at=doc.data().created_at;
                stu.course_fees=doc.data().course_fees;
                stu.batch=doc.data().batch;               
                stus.unshift(stu);              

            })
            this.pageLoading=false;
            this.students=stus;
            
        },
        editStudent(id){
               this.$router.push(`edit-student/${id}`)
        },
        async removeStudent(stu){
               let doConfirm=confirm(`This selected student of  id "${stu.id}" & name "${stu.name}" will remove from database.` )
               if(doConfirm){
                       
                await deleteDoc(doc(db, "students", stu.id)).then(()=>{
                        this.students.splice(stu, 1)
                }).catch(()=>{

                });

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