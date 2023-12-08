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
                                                <select class="form-control form-control-sm" @change="filterByCourse" v-model="filter_by_course">
                                                                        <option value="">Filter by course</option>
                                                                        <option value="Web Development Level - 1">WD L-1</option>
                                                                        <option value="Web Development Level - 2">WD L-2</option>
                                                                        <option value="Web Development Level - 3">WD L-3</option>
                                                                </select>                                                       
                                        </div>
                                        <div class="col-sm-3">
                                                <input @keyup="searchByName" type="search" class="form-control form-control-sm" id="search_by_name" placeholder="Search by name" v-model="search_by_name">
                                        </div>
                                </div>
                        </div>
                </div>
                <div class="card mb-4 shadow-sm">
                        <div class="card-body">
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
                                <ul class="list-group" v-for="stu in allStudents" :key="stu.id" v-else>
                                    <li class="list-group-item list-group-item-action mb-2 shadow-sm border-5 border-end-0 border-top-0 border-bottom-0 border-success">
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
                                                        <div class="text-center small fw-semibold">{{stu.course_fees}} MMK</div>
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
</template>
<script>
import SideBar from './SideBar.vue';
import { doc, setDoc, collection, addDoc, deleteDoc, query, getDocs,orderBy, getCountFromServer, sum } from "firebase/firestore"; 
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
                cacheStudents:[],
                search_by_name:"",
        }
    },
    
    mounted(){
        this.fetchStudents();
       
    },
    computed:{
        allStudents(){
                return this.students;
        }
    },
    methods :{
        filterByCourse(){
                let filter;
              if(this.filter_by_course){
                filter=this.cacheStudents.filter((stu)=>stu.course===this.filter_by_course);
              }else{
                filter=this.cacheStudents;
              }
              this.students=filter;
              
        },
        searchByName(){
                let filter;
              if(this.search_by_name){
                filter=this.cacheStudents.filter((stu)=>{
                        return stu.name.toLowerCase().includes(this.search_by_name.toLowerCase())
                })
              }else{
                filter=this.cacheStudents;
              }
              this.students=filter;
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
        async fetchStudents(){
                this.pageLoading=true;
            const q = query(collection(db, "students"), orderBy("order_date", "asc"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let stu={};               
           
                stu.name=doc.data().name;
                stu.email=doc.data().email;
                stu.phone=doc.data().phone;
                stu.course_fees=doc.data()["course_fees"].reduce((a,b)=>a+b);
                stu.course=doc.data().course;
                stu.remark=doc.data().remark;
                stu.id=doc.id;
                stu.created_at=doc.data().created_at;
                this.students.unshift(stu);
                this.cacheStudents.unshift(stu);

            })
            this.pageLoading=false;

            
        }
    }
}
</script>
<style lang="">
    
</style>