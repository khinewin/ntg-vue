<template lang="">
    <div class="container-fluid home min-vh-100">
    <div class="row">
           
            <div class="col-md-12 content-block" style="min-height: 500px">
                <div class="row my-2">
                        <SideBar />  
                                       <div class="col-2 col-sm-1 ">                                                             
                                             <a href="#!" class="ms-2 d-block circle" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar" aria-label="Toggle navigation">
                                                   <span class="text-dark">
                                                       <i class="fa-solid fa-bars"></i>
                                                    </span>
                                              </a> 
                                         </div>
                        <div class="col-10 col-sm-11 col-lg-5">
                                <h4>Edit student info</h4>
                        </div>
                        <div class="col-12 col-lg-6">
                            <h4 v-if="message" class="text-success text-center h4 pt-1"><i class="fa-solid fa-check"></i> {{message}}</h4>

                        </div>
                </div>
                
                 <div class="card shadow-sm mb-2 min-vh-100">
                        <div class="card-body" style="min-height: 450px;">
                            <div class="row my-2 " >
                                 <div class="col-12">                            
                                    
                                        <form @submit.prevent="updateStudent">
                                            <div class="mb-3">
                                                <router-link to="/admin/students" class="btn btn-secondary" :class="{disabled: isLoading}">Close</router-link>

                                                <button type="submit" class="btn btn-primary float-end" :class="{disabled: isLoading}">
                                                    <div class="spinner-border text-light spinner-border-sm" role="status" v-if="isLoading">
                                                        <span class="visually-hidden">Loading...</span>
                                                     </div>
                                                    Update
                                                </button>
                                            </div>

                                            <div class="row my-2 g-2">                                               
                                                <div class="col-sm-4">
                                                    <div class="text-danger small ms-2 mb-2" v-if="errors.name">{{errors.name}}</div>
                                                    <div class="form-floating mb-3">                                                
                                                        <input @keydown="clearError('name')" type="text" class="form-control form-control-sm" :class="{'is-invalid' : errors.name}" id="name" placeholder="Name" v-model="name">
                                                        <label for="name" class="small">Name</label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4">
                                                    <div class="text-danger small ms-2 mb-2" v-if="errors.email">{{errors.email}}</div>
                                                    <div class="form-floating mb-3">
                                                        <input @keydown="clearError('email')" v-model="email" type="email" :class="{'is-invalid' : errors.email}" class="form-control form-control-sm" id="email" placeholder="E-mail">
                                                        <label for="email" class="small">E-mail</label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4">
                                                    <div class="text-danger small ms-2 mb-2" v-if="errors.phone">{{errors.phone}}</div>
                                                    <div class="form-floating mb-3">
                                                        <input @keydown="clearError('phone')" v-model="phone" type="tel" class="form-control form-control-sm" :class="{'is-invalid' : errors.phone}" id="phone" placeholder="Phone">
                                                        <label for="phone" class="small">Phone</label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="text-danger small ms-2 mb-2" v-if="errors.student_photo">{{errors.student_photo}}</div>
                                                    <div class="mb-3 form-floating">
                                                        <input type="url" @keydown="clearError('student_photo')" v-model="student_photo" :class="{'is-invalid' : errors.student_photo}" class="form-control form-control-sm" id="student_photo" placeholder="Photo">
                                                        <label for="student_photo" class="small">Photo</label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="mb-3">
                                                        <div class="text-danger small ms-2 mb-2" v-if="errors.remark">{{errors.remark}}</div>
                                                        <div class="form-floating">
                                                            <textarea   @keydown="clearError('remark')" v-model="remark" id="remark" class="form-control form-control-sm" :class="{'is-invalid' : errors.remark}" placeholder="Remark"></textarea>
                                                            <label for="remark" class="small">Remark</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--for new or update course-->
                                             <div class="row">
                                                <div class="col-6 col-sm-3 ">
                                                    <button @click="handleNewCourse" class="btn btn-outline-primary">New course</button>
                                                </div>
                                                <div class="col-6 col-sm-3 " >
                                                    <select class="form-select" @change="handleSelectCourse" v-model="select_edit_course">
                                                        <option value="initial">Select the edit course</option>
                                                        <option v-for="c in courses" :key="c.id" :value="c">{{c.course.name}}</option>
                                                    </select>
                                                        
                                                </div>
                                             </div> 
                                             <div class="row mt-3">
                                                <div class="col-sm-6">
                                                    <div class="text-danger small ms-2 mb-2" v-if="errors.select_course">{{errors.select_course}}</div>
                                                    <div class="form-floating mb-3">
                                                
                                                        <select @change="setCourseData" @click="clearError('select_course')" class="form-select form-select-sm"  :class="{'is-invalid' : errors.select_course}" v-model="select_course">
                                                            <option value="">Select  course</option>
                                                            <option v-for="sc in select_courses" :key="sc.id" :value="sc.code">{{sc.course}}, {{sc.course_fees}} MMK</option>
                                                        </select>
                                                        <label for="course" class="small">Course</label>
                                                    </div>
                                                </div>
                                             
                                                    
                                                    <div class="col-sm-6" v-if="!course_id">
                                                        <div class="form-floating mb-3 input-group" >                                                        
                                                            <input  :disabled="!isAddBatch" type="number" @click="clearError('batchName')" v-model="batchName" class="form-control form-control-sm" :class="{'is-invalid' : errors.batchName}" placeholder="Batch name">
                                                            <label for="batchName" class="small">Batch name</label>
                                                            <span @dblclick="handleAddBatch"  class="input-group-text"><button :disabled="!isAddBatch" class="btn text-primary" @click="addBatch">Add</button></span>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="text-danger small ms-2 mb-2" v-if="errors.batch">{{errors.batch}}</div>
                                                        <div class="form-floating mb-3">
                                                            <select class="form-select form-select-sm" id="batch" @click="clearError('batch')" v-model="batch" :class="{'is-invalid' : errors.batch}">
                                                                <option value="">Select Batch</option>    
                                                                <option v-for="b in batchs" :key="b[0]">{{b[1].name}}</option>
                                                            </select>
                                                            <label for="batch" class="small">Batch</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="text-danger small ms-2 mb-2" v-if="errors.deposit">{{errors.deposit}}</div>
                                                        <div class="mb-3 form-floating">
                                                            <input type="number" @keydown="clearError('deposit')" v-model="deposit" :class="{'is-invalid' : errors.deposit}" class="form-control form-control-sm" id="deposit" placeholder="Course fees (Deposit = {{deposit_label}})">
                                                            <label for="deposit" class="small">Course fees (Deposit = {{deposit_label}})</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6" v-if="!course_id">
                                                        <div class="text-danger small ms-2 mb-2" v-if="errors.course_start_date">{{errors.course_start_date}}</div>
                                                        <div class="mb-3 form-floating">
                                                            <input type="date" @keydown="clearError('course_start_date')" v-model="course_start_date" :class="{'is-invalid' : errors.course_start_date}" class="form-control form-control-sm" id="course_start_date" placeholder="Course start date">
                                                            <label for="course_start_date" class="small">Course start date</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6" v-if="course_id">
                                                        <div class="text-danger small ms-2 mb-2" v-if="errors.course_end_date">{{errors.course_end_date}}</div>
                                                        <div class="mb-3 form-floating">
                                                            <input type="date" @keydown="clearError('course_end_date')" v-model="course_end_date" :class="{'is-invalid' : errors.course_end_date}" class="form-control form-control-sm" id="course_start_date" placeholder="Course end date">
                                                            <label for="course_end_date" class="small">Course end date</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6" v-if="course_id">
                                                        <div class="text-danger small ms-2 mb-2" v-if="errors.cert_src">{{errors.cert_src}}</div>
                                                        <div class="mb-3 form-floating">
                                                            <input type="url" @keydown="clearError('cert_src')" v-model="cert_src" :class="{'is-invalid' : errors.cert_src}" class="form-control form-control-sm" id="cert_src" placeholder="Certificate">
                                                            <label for="cert_src" class="small">Certificate</label>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="col-sm-6" v-if="course_id">
                                                        <div class="text-danger small ms-2 mb-2" v-if="errors.course_details">{{errors.course_details}}</div>
                                                        <div class="form-floating mb-3">
                                                            <select class="form-select form-select-sm" id="couse_details" @click="clearError('course_details')" v-model="course_details" :class="{'is-invalid' : errors.course_details}">
                                                                <option value="">Select course</option>    
                                                                <option v-for="c in available_courses" :key="c[0]" :value="c[0]">{{c[1].title}}</option>
                                                            </select>
                                                            <label for="course_details" class="small">Course details</label>
                                                        </div>
                                                    </div>
                                             </div>  
                                        </form>
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
//import { doc, getDoc, collection, setDoc,query,orderBy, getDocs } from "firebase/firestore"; 
import db from "@/firebase/database"
import {ref, set, onValue, remove, query, startAt,endAt, orderByChild } from 'firebase/database'

export default {
    name : "AppEditStudent",
    components: {
        SideBar
    },
    data(){
        return {
             
            name: "",
            email: "",
            phone: "",            
            remark:"",  
            id: "",
            created_at: "",
            old_course_selected: {},
            old_course_backup:[],

            old_deposit:[],
            
            started_at:"",
            created_at:"",
            course_end_date:"",

            course_id: "",
            courses : [],
            course : {},
            batchs:[],
            batch:"",

            deposit_label : 0,

            deposit: "",
            course_start_date:"",
            cert_src:"",

            message:null,          
            select_edit_course:"initial",

            errors: {
                name: "",
                email: "",
                phone: "",              
                remark:"",
            },
            isLoading: false,
            available_courses:[],
            course_details:"",
            student_photo:"",
            student_id:"",
           
        }
    },
    created(){
       // console.log(this.$route.params.id)
        this.id=this.$route.params.id;
        this.fetchBatch();
        this.fetchStudent();
        this.fetchCourses();
        
    },
    computed:{
        select_courses(){
            return this.$store.getters.select_courses
        }
    },
    
    methods:{
        handleAddBatch(){
            this.isAddBatch=!this.isAddBatch
            this.errors.batchName="";
        },
        fetchCourses(){
            const query_url = query(ref(db, 'courses'))
            onValue(query_url, (snapshot) => {
                const data = snapshot.val()
                if(data===null) return;
                const courses=Object.entries(data);
                this.available_courses=courses;
            })
        },
        addBatch(e){
            e.preventDefault();
            if(!this.batchName){
               return this.errors.batchName="Batch name must be number."
            }
                const b={name : this.batchName}
                const id = Date.now()
                const query = ref(db, 'batchs/' + id)
                set(query, b)
                .then(()=>{
                    this.batchName="";
                })
        },
        handleSelectCourse(){
            const c=this.select_edit_course;
            
            this.course_id="";
            this.old_course_selected="";
            this.course="";
            this.select_course="";
            this.batch="";

            if(c==="initial") return false;

            this.course_id=c.id;
            this.old_course_selected=c;
            this.course=c.course;
            this.select_course=c.course.code;
            this.batch=c.batch;
            const backup=this.courses.filter((f)=>f.id !== c.id );
            this.old_course_backup=backup;
            this.old_deposit=c.deposit ? c.deposit : [];
            this.started_at=c.started_at;
            this.created_at=c.created_at;
            this.course_details=c.course_details;
            this.cert_src=c.cert_src;
            this.course_end_date=c.ended_at;
            this.deposit_label = c.deposit.reduce((accu, cur)=>accu + cur.amount,0);
            this.student_id=c.student_id;
            
            
        },
        handleNewCourse(e){
            e.preventDefault();
            this.course_id="";
            this.select_edit_course="initial";
        },
        fetchBatch(){
            const query_url = query(ref(db, 'batchs'))
            onValue(query_url, (snapshot) => {
                const data = snapshot.val()
                if(data===null) return;
                const batchs=Object.entries(data);
                this.batchs=batchs;
            })
        },
        fetchStudent(){            
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
                        this.name=data.name;
                        this.email=data.email;
                        this.phone=data.phone;                    
                        this.remark=data.remark;       
                        this.created_at=data.created_at    
                        this.courses=data.courses;
                        this.student_photo=data.student_photo
                      
                    }                   
                })
            }catch(err){
               // this.error="Oops..., something went wrong."
            }finally{
               
            }  
            
      },
      setCourseData(){
            this.message=null;
            const data=this.select_courses.filter((c)=>this.select_course === c.code)
            if(data.length > 0){
                const course={
                name : data[0].course,
                code : data[0].code,
                course_fees : data[0].course_fees,
                teacherFees: data[0].teacherFees,
                }
                this.course=course;
            }
        },
        updateStudent(){
                this.checkValidation();
                if(!this.errors.name && !this.errors.email && !this.errors.phone  && !this.errors.remark){
                    this.isLoading=true;
                    const newDate=new Date(this.course_start_date).getTime();
                    const newEndDate=new Date(this.course_end_date).getTime();
                    let data="";
                    const id=new Date().getTime();
                    if(!this.course_id){
                        data={
                            id:id,
                            name: this.name,
                            email: this.email,
                            phone : this.phone,
                            created_at : this.created_at,
                            remark : this.remark,    
                            student_photo: this.student_photo ? this.student_photo : null, 
                            courses: this.select_course ?  [...this.courses,
                                {
                                    student_id: id,
                                    id: id, 
                                    course : this.course,
                                    deposit : this.deposit ? [                                    
                                            {amount : this.deposit ,date: new Date().getTime()}
                                    ] : [],
                                    batch: Number(this.batch),  
                                    started_at: newDate, 
                                    created_at : new Date().getTime(),           

                                }
                            ] : [...this.courses],   
                                      
                        }       
                    }else{
                        data={
                            id: this.student_id,
                            name: this.name,
                            email: this.email,
                            phone : this.phone,
                            created_at : this.created_at,
                            remark : this.remark,    
                            student_photo: this.student_photo ? this.student_photo : null, 
                            courses: [
                                {
                                    student_id: this.student_id,
                                    id: this.course_id, 
                                    course : this.course,
                                    deposit : this.deposit ? [...this.old_deposit ,{amount : this.deposit ,date: new Date().getTime()}] : [...this.old_deposit],
                                    batch: Number(this.batch),  
                                    started_at: this.started_at, 
                                    ended_at : this.course_end_date ? newEndDate : null,
                                    created_at : this.created_at,    
                                    cert_src : this.cert_src ? this.cert_src : null,  
                                    course_details : this.course_details ? this.course_details : null, 
                                      

                                }, ...this.old_course_backup
                            ],   
                                      
                        }     
                    }
                
                    const query = ref(db, 'students/' + this.id)
                    set(query, data)
                    .then(()=>{                      
                   
                        this.isLoading=false;
                        this.deposit="";
                        this.message="The student has been updated."

                        this.old_course_selected= {}
                        this.old_course_backup=[]
                        this.old_deposit=[]            
                        this.started_at=""
                        this.course_end_date=""
                        this.course_id= ""
                        this.course ={}
                        this.batch=""
                        this.deposit=""
                        this.course_start_date=""
                        this.course_details="";
                        this.cert_src="";
                        this.select_edit_course="initial"
                    })
                    .catch()     
              
            }
        },
        clearError(error){
                switch(error){
                        case "name":
                            this.errors.name="";
                            break;
                         case "email":
                            this.errors.email="";
                            break;
                         case "phone":
                            this.errors.phone="";
                            break;                       
                        case "remark":
                            this.errors.remark="";
                            break;        
                }
        },
        checkValidation(){
            if(!this.name){
                    this.errors.name="The name field is required.";
            }else{
                this.errors.name="";
            }
            if(!this.email){
                    this.errors.email="The email field is required.";
            }else{
                if(! this.validEmail(this.email)){
                        this.errors.email="Valid email required."
               }else{
                this.errors.email="";
               }
            }
            if(!this.phone){
                    this.errors.phone="The phone number field is required.";
            }else{
                this.errors.phone="";
            }
          
            if(!this.remark){
                    this.errors.remark="The remark field is required.";
            }else{
                this.errors.remark="";
            }
           
        },
        validEmail:function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
           // console.log(re.test(email))
        }
    }
}
</script>
<style lang="css">
       
</style>