<template lang="">
     <div class="container-fluid home min-vh-100">
    <div class="row">
           
            <div class="col-md-12" style="min-height: 500px">
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
                                <h4 class="h4 pt-1"> Enrolled students</h4>
                            </div>
                            
                            <div class="col-md-7">
                                    <h4 v-if="message" class="text-success text-center h4 pt-1"><i class="fa-solid fa-check"></i> {{message}}</h4>
                            </div>
                    </div>
                    
                <div class="card shadow-sm my-2 min-vh-100">
                    <div class="card-body ">
                        <div   v-if="!showSpinner && students.length <=0" style="margin-top: 150px; margin-bottom: 250px;">
                                <div class="text-center"><i class="fa-solid fa-circle-info"></i> There are no enrolled students yet.</div>
                        </div>
                        <div  v-if="showSpinner" style="margin-top: 150px; margin-bottom: 200px;">
                                <PreLoading />             
                        </div>
                            <ul class="list-group" v-for="stu in students" :key="stu[0]" v-if="students.length > 0">
                                    <li class="list-group-item list-group-item-action mb-2 shadow-sm border-5 border-end-0 border-top-0 border-bottom-0" :class="{'border-primary ':stu.course==='wdl1', 'border-info ':stu.course==='wdl2', 'border-success ':stu.course==='wdl3'}">
                                            <div class="row">
                                                
                                                <div class="col-sm-6 col-md-3 mb-2">
                                                        <div class="text-center small fw-light">Name</div>
                                                        <div class="text-center small fw-semibold">{{stu[1].name}}</div>
                                                </div>
                                                <div class="col-sm-6 col-md-3 mb-2">
                                                        <div class="text-center small fw-light">E-mail</div>
                                                        <div class="text-center small fw-semibold">{{stu[1].email}}</div>
                                                </div>
                                                <div class="col-sm-6 col-md-3 mb-2">
                                                        <div class="text-center small fw-light">Phone</div>
                                                        <div class="text-center small fw-semibold"><a href="#!" @click="callPhone(stu[1].phone)">{{stu[1].phone}}</a></div>
                                                </div>
                                                <div class="col-sm-6 col-md-3 mb-2">
                                                        <div class="text-center small fw-light">Education</div>
                                                        <div class="text-center small fw-semibold">{{stu[1].education}}</div>
                                                </div>
                                                <div class="col-sm-6 col-md-3 mb-2">
                                                        <div class="text-center small fw-light">Course</div>
                                                        <div class="text-center small fw-semibold">
                                                                <span v-if="stu[1].course==='wd1'">Web Development Level - 1</span>
                                                                <span v-if="stu[1].course==='wd2'">Web Development Level - 2</span>
                                                                <span v-if="stu[1].course==='ct1'">Computer Technology, CT - 1</span>
                                                                <span v-if="stu[1].course==='ct2'">Computer Technology, CT - 2</span>
                                                                <span v-if="stu[1].course==='pb1'">Programming Basic (From Zero To Moderate)</span>
                                                                <span v-if="stu[1].course==='bcpkid1'">Basic Coding & Programming For Kids Level -1</span>
                                                                <span v-if="stu[1].course==='bcpkid2'">Basic Coding & Programming For Kids Level -2</span>
                                                        </div>
                                                </div>
                                                <div class="col-sm-6 col-md-3 mb-2">
                                                        <div class="text-center small fw-light">Enrolled date</div>
                                                        <div class="text-center small fw-semibold">{{showTime(stu[1].created_at)}}</div>
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
import SideBar from "@/views/admin/partials/SideBar.vue"
//import { doc, setDoc, collection, addDoc, deleteDoc, query, getDocs,orderBy, getCountFromServer } from "firebase/firestore"; 
import db from "@/firebase/database"
import { getDatabase, ref, set, onValue, remove, query, startAt,endAt, orderByChild ,limitToLast, limitToFirst} from 'firebase/database'
import PreLoading from "@/views/loaders/PreLoading"

export default {
    name : "EnrolledStudents",
    components: {
        SideBar, PreLoading
    },
    data(){
        return{
                students : [],
                showSpinner: false,
                message: null
        }
    },
    created(){
        this.$watch(()=>this.$route,
        this.getEnrolled,
        {immediate:true}
        )
       // this.fetchStudents();
    },
    methods:{
        showTime(t){
            //const date=t.toDate()
           const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(t);
            return formattedDate;
        },
        callPhone(phone){
               window.location.href=`tel:${phone}`
        },
        async removeEnrolledStudent(stu){
               let doConfirm=confirm(`This enrolled student Name : "${stu[1].name}" & Phone : "${stu[1].phone}" will remove from database.` )
               if(doConfirm){
                       
                const query_url = ref(db, 'enrolledStudents/' + stu[0])
                remove(query_url).then(()=>{
                        this.message="The selected enrolled student has been deleted."
                }).catch(()=>{
                    this.error="Oops.., something went wrong."
                }) 

               }
        },
        getEnrolled(){
            try{
                this.showSpinner=true;
                const query_url = query(ref(db, 'enrolledStudents/'))
                onValue(query_url, (snapshot) => {
                    const data = snapshot.val()                   
                    this.showSpinner=false;
                    if(data ===null){
                        this.students=[];
                        this.error="No enrolled student found."
                    }else{
                        this.error=null;
                        const students=Object.entries(data);
                        this.students=students.reverse();                         
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
<style lang="">
    
</style>