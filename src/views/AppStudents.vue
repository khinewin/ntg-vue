<template lang="">
   <div class="container-fluid">
    <div class="row">
            <div class="col-md-2 d-none d-md-block">
                    <SideBar></SideBar>
            </div>
            <div class="col-md-10" style="min-height: 500px">
                <div class="row my-2">
                        <div class="col-12">
                                <div class="row">
                                        <div class="col-sm-3">
                                                <h4><i class="fa-solid fa-users-line"></i> Students</h4>
                                        </div>
                                        <div class="col-sm-3">
                                               <div class="input-group">
                                                <select class="form-control form-control-sm" @change="filterByCourse" v-model="filter_by_course">
                                                                        <option value="">Filter by course</option>
                                                                        <option value="Web Development Level - 1" >WD L-1</option>
                                                                        <option value="Web Development Level - 2">WD L-2</option>
                                                                        <option value="Web Development Level - 3">WD L-3</option>
                                                                </select>        
                                                                <div class="input-group-text" @click=clearFilterByCourse><i class="fa-solid fa-circle-xmark d-block"></i></div>     
                                               </div>                                          
                                        </div>
                                        <div class="col-sm-3">
                                               <div class="input-group">
                                                <select class="form-control form-control-sm" @change="filterByBatch" v-model="filter_by_batch">
                                                                        <option value="">Filter by batch</option>
                                                                        <option v-for="b in batchs" :value="b">Batch #{{b}}</option>
                                                                </select>        
                                                                <div class="input-group-text" @click=clearFilterByBatch><i class="fa-solid fa-circle-xmark d-block"></i></div>     
                                               </div>                                          
                                        </div>
                                        <div class="col-sm-3">
                                                <div class="input-group">
                                                        <input @keydown.enter="searchByName" type="search" class="form-control form-control-sm" id="search_by_name" placeholder="Search by name" v-model="search_by_name">
                                                        <div class="input-group-text" @click=clearSearchByName><i class="fa-solid fa-circle-xmark d-block"></i></div>   
                                                </div>  
                                        </div>
                                </div>
                        </div>
                </div>
                <div class="card mb-4 shadow-sm">
                        <div class="card-body">
                                <div class="row my-5"  v-if="!pageLoading && students.length <=0">
                                        <div class="col-12 text-center"><i class="fa-solid fa-circle-info"></i> There are no result.</div>
                                </div>
                                <div class="row my-5" v-if="pageLoading">
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
                                <div v-for="bat in batchs" :key="bat" class="card shadow-sm mb-2" v-else>
                                 <div class="card-body">
                                <h5 class="card-title" @click="getStudentsByBatch(bat)">Batch #{{bat}}</h5>                                 
                                <ul class="list-group" v-for="stu in allStudents" :key="stu.id" >
                                    
                                    <li v-if="bat===stu.batch"  class="list-group-item list-group-item-action mb-2 shadow-sm border-5 border-end-0 border-top-0 border-bottom-0" :class="{ 'border-warning': stu.course_fees > stu.deposit, 'border-success': stu.deposit >= stu.course_fees}">
                                            <div class="row">                                                
                                                <div class="col-sm-6 col-md-3 mb-2">
                                                        <div class="text-center small fw-light">Name</div>
                                                        <div class="text-center small fw-semibold">{{stu.name}}</div>
                                                </div>
                                                <div class="col-sm-6 col-md-3 mb-2">
                                                        <div class="text-center small fw-light">E-mail</div>
                                                        <div class="text-center small fw-semibold">{{stu.email}}</div>
                                                </div>
                                                <div class="col-sm-6 col-md-3 mb-2">
                                                        <div class="text-center small fw-light">Course</div>
                                                        <div class="text-center small fw-semibold">{{stu.course}}</div>
                                                </div>
                                                <div class="col-sm-6 col-md-3 mb-2">
                                                        <div class="text-center small fw-light">Phone</div>
                                                        <div class="text-center small fw-semibold">{{stu.phone}}</div>
                                                </div>
                                                
                                                <div class="col-sm-6 col-md-3 mb-2">
                                                        <div class="text-center small fw-light">Course fees (Deposit)</div>
                                                        <div class="text-center small fw-semibold">{{stu.deposit}} MMK</div>
                                                </div>
                                                <div class="col-sm-6 col-md-3 mb-2">
                                                        <div class="text-center small fw-light">Date</div>
                                                        <div class="text-center small fw-semibold">{{stu.created_at}}</div>
                                                </div>
                                                <div class="col-sm-6 col-md-3 mb-2">
                                                        <div class="text-center small fw-light">Remark</div>
                                                        <div class="text-center small fw-semibold">{{stu.remark}}</div>
                                                </div>
                                                <div class="col-sm-6 col-md-3 mb-2">
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
    </div>
   </div>
</template>
<script>
import SideBar from './SideBar.vue';
import { doc, setDoc, collection, addDoc, deleteDoc, query, getDocs,orderBy,startAt, endAt, getCountFromServer, sum, where, limit } from "firebase/firestore"; 
import db from "../firebase"

export default {
    name : "AppStudents",
    components: {
        SideBar
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
    
    mounted(){        
       this.fetchBatch();
    },
    computed:{
        allStudents(){
                return this.students;
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
                        this.fetchStudents();
                }
            })
        },
        clearSearchByName(){
                this.search_by_name="";
                this.fetchStudents();
            
        },
        clearFilterByCourse(){
                this.filter_by_course="";
                this.fetchStudents();
        },
        clearFilterByBatch(){
                this.filter_by_batch="";
                this.fetchStudents();
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
                const q = query(collection(db, "students"), orderBy("created_at", "asc"));
            
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
            let q;
            if(this.filter_by_batch){
                 q = query(collection(db, "students"), where("batch", "==", this.filter_by_batch), orderBy("created_at", "asc"));
            }
            if(this.filter_by_course){
                 q = query(collection(db, "students"), where("course", "==", this.filter_by_course), orderBy("created_at", "asc"));
            }
                  
            if(!this.filter_by_batch && !this.filter_by_course && !this.search_by_name){
                 q = query(collection(db, "students"), orderBy("created_at", "asc"), limit(50));
            }
            
            const querySnapshot = await getDocs(q);
            this.students=[];
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
                this.students.unshift(stu);

            })
            this.pageLoading=false;

            
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
<style lang="">
    
</style>