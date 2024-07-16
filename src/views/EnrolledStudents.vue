<template lang="">
     <div class="container-fluid home">
    <div class="row">
            <div class="col-md-2 d-none d-md-block">
                    <SideBar></SideBar>
            </div>
            <div class="col-md-10" style="min-height: 500px">
                <div class="row my-2">
                        <div class="col-12">
                                <h4><i class="fa-solid fa-users"></i> Enrolled students</h4>
                        </div>
                </div>
                <div class="card shadow-sm my-2">
                    <div class="card-body">
                        <div class="row my-5"  v-if="!pageLoading && students.length <=0">
                                <div class="col-12 text-center"><i class="fa-solid fa-circle-info"></i> There are no enrolled students yet.</div>
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
                            <ul class="list-group" v-for="stu in students" :key="stu.id" v-else>
                                    <li class="list-group-item list-group-item-action mb-2 shadow-sm border-5 border-end-0 border-top-0 border-bottom-0" :class="{'border-primary ':stu.course==='wdl1', 'border-info ':stu.course==='wdl2', 'border-success ':stu.course==='wdl3'}">
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
                                                        <div class="text-center small fw-light">Phone</div>
                                                        <div class="text-center small fw-semibold"><a href="#!" @click="callPhone(stu.phone)">{{stu.phone}}</a></div>
                                                </div>
                                                <div class="col-sm-6 col-md-3 mb-2">
                                                        <div class="text-center small fw-light">Education</div>
                                                        <div class="text-center small fw-semibold">{{stu.education}}</div>
                                                </div>
                                                <div class="col-sm-6 col-md-3 mb-2">
                                                        <div class="text-center small fw-light">Course</div>
                                                        <div class="text-center small fw-semibold">
                                                                <span v-if="stu.course==='wd1'">Web Development Level - 1</span>
                                                                <span v-if="stu.course==='wd2'">Web Development Level - 2</span>
                                                                <span v-if="stu.course==='ct1'">Computer Technology, CT - 1</span>
                                                                <span v-if="stu.course==='ct2'">Computer Technology, CT - 2</span>
                                                                <span v-if="stu.course==='pb1'">Programming Basic (From Zero To Moderate)</span>
                                                                <span v-if="stu.course==='bcpkid1'">Basic Coding & Programming For Kids Level -1</span>
                                                                <span v-if="stu.course==='bcpkid2'">Basic Coding & Programming For Kids Level -2</span>
                                                        </div>
                                                </div>
                                                <div class="col-sm-6 col-md-3 mb-2">
                                                        <div class="text-center small fw-light">Enrolled date</div>
                                                        <div class="text-center small fw-semibold">{{stu.created_at}}</div>
                                                </div>
                                                <div class="col-sm-6 col-md-3 mb-2">
                                                        <div class="text-center small fw-light">Actions</div>
                                                        <div class="text-center small fw-semibold">
                                                            <a href="#!" class="text-danger" @click="removeEnrolledStudent(stu)"><i class="fa-solid fa-trash"></i></a>
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
import { doc, setDoc, collection, addDoc, deleteDoc, query, getDocs,orderBy, getCountFromServer } from "firebase/firestore"; 
import db from "../firebase"
export default {
    name : "EnrolledStudents",
    components: {
        SideBar
    },
    data(){
        return{
                students : [],
                pageLoading: true
        }
    },
    mounted(){
        this.fetchStudents();
    },
    methods:{
        callPhone(phone){
               window.location.href=`tel:${phone}`
        },
        async removeEnrolledStudent(stu){
               let doConfirm=confirm(`This enrolled student of  id "${stu.id}" & name "${stu.name}" will remove from database.` )
               if(doConfirm){
                       
                await deleteDoc(doc(db, "enrolled_students", stu.id)).then(()=>{
                        this.students.splice(stu, 1)
                }).catch(()=>{

                });

               }
        },
        async fetchStudents(){
                this.pageLoading=true;
            const q = query(collection(db, "enrolled_students"), orderBy("order_date", "asc"));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                let stu={};

                stu.name=doc.data().name;
                stu.email=doc.data().email;
                stu.phone=doc.data().phone;
                stu.education=doc.data().education;
                stu.course=doc.data().course;
                stu.id=doc.id;
                stu.created_at=doc.data().created_at;
                this.students.unshift(stu);

            })
            this.pageLoading=false;

            
        }
    }
}
</script>
<style lang="">
    
</style>