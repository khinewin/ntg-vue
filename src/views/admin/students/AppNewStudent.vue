<template lang="">
    <div class="container-fluid home min-vh-100">
    <div class="row">
          
            <div class="col-md-12 content-block" style="min-height: 500px">
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
                            <h4 class="h4"> Add student</h4>
                        </div>
                        
                        <div class="col-md-7">
                                <h4 v-if="message" class="text-success text-center h4 pt-1"><i class="fa-solid fa-check"></i> {{message}}</h4>
                        </div>
                </div>
                
                
                 <div class="card shadow-sm mb-2 min-vh-100">
                        <div class="card-body">                                                                                     
                                    
                                        <form @submit.prevent="saveStudent">
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
                                                <div class="text-danger small ms-2 mb-2" v-if="errors.select_course">{{errors.select_course}}</div>
                                                <div class="form-floating mb-3">
                                            
                                                    <select @change="setCourseData" @click="clearError('select_course')" class="form-select form-select-sm"  :class="{'is-invalid' : errors.select_course}" v-model="select_course">
                                                        <option value="">Select  course</option>
                                                        <option v-for="sc in select_courses" :key="sc.id" :value="sc.code">{{sc.course}}, {{sc.course_fees}} MMK</option>
                                                    </select>
                                                    <label for="course" class="small">Course</label>
                                                </div>
                                            </div>
                                         
                                                
                                                <div class="col-sm-6" >
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
                                                        <input type="number" @keydown="clearError('deposit')" v-model="deposit" :class="{'is-invalid' : errors.deposit}" class="form-control form-control-sm" id="deposit" placeholder="Course fees (Deposit)">
                                                        <label for="deposit" class="small">Course fees (Deposit)</label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="text-danger small ms-2 mb-2" v-if="errors.course_start_date">{{errors.course_start_date}}</div>
                                                    <div class="mb-3 form-floating">
                                                        <input type="date" @keydown="clearError('course_start_date')" v-model="course_start_date" :class="{'is-invalid' : errors.course_start_date}" class="form-control form-control-sm" id="course_start_date" placeholder="Course start date">
                                                        <label for="course_start_date" class="small">Course start date</label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="mb-3">
                                                        <div class="text-danger small ms-2 mb-2" v-if="errors.remark">{{errors.remark}}</div>
                                                        <div class="form-floating">
                                                            <textarea   @keydown="clearError('remark')" v-model="remark" id="remark" class="form-control form-control-sm " :class="{'is-invalid' : errors.remark}" placeholder="Remark"></textarea>
                                                            <label for="remark" class="small">Remark</label>
                                                        </div>
                                                    </div>
                                                </div>                                       
                                                <div class="mb-3">
                                                    <button type="submit" class="btn btn-primary btn-lg me-2" :class="{disabled: isLoading}">
                                                            <div class="spinner-border text-light spinner-border-sm" role="status" v-if="isLoading">
                                                                <span class="visually-hidden">Loading...</span>
                                                            </div>
                                                            Save
                                                    </button>
                                                    <router-link to="/admin/students" class="btn  float-end" :class="{disabled: isLoading}"><i class="fa-solid fa-users-line"></i> Students</router-link>
                                                </div>
                                        </div>
                                    </form>
                                   
                                
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
import { getDatabase, ref, set, onValue, remove,query, startAt, endAt, orderByChild } from 'firebase/database'

export default {
    name : "AppNewStudent",
    components: {
        SideBar
    },
    data(){
        return {
            message:null,
           

            name: "",
            email: "",
            phone: "",
            remark:"",

            course: "",
            course_fees: "",
            teacherFees:0,
            deposit:"",            
            select_course:"",
            course_start_date :"",

            batchName:"",
            isAddBatch:false,
            
            errors: {
                name: "",
                email: "",
                phone: "",
                remark:"",

                course: {},
                select_course: "",
                deposit: "",
                course_start_date:"",

              
                batch:"",
                batchName:""
            },
            isLoading: false,
            batch: "",
            batchs:[]
        }
    },
    created(){
        this.fetchBatch();
    },
    computed:{
        select_courses(){
            return this.$store.getters.select_courses;
        },
       
    },
    methods:{
        handleAddBatch(){
            this.isAddBatch=!this.isAddBatch
            this.errors.batchName="";
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
        fetchBatch(){
            const query_url = query(ref(db, 'batchs'))
            onValue(query_url, (snapshot) => {
                const data = snapshot.val()
                if(data===null) return;
                const batchs=Object.entries(data);
                this.batchs=batchs;
            })
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
        showTime(t){
            //const date=t.toDate()
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(t);
            return formattedDate;
        },
      
         saveStudent(){
                this.checkValidation();
                if(!this.errors.batch && !this.errors.name && !this.errors.email && !this.errors.phone && !this.errors.select_course && !this.errors.remark){
                    this.isLoading=true;
                    const newDate=new Date(this.course_start_date).getTime()
                    const id = new Date().getTime()
                    const data={
                            id: id,
                            name: this.name,
                            email: this.email,
                            phone : this.phone,
                            courses: [
                                {
                                    student_id: id,
                                    id: new Date().getTime(), 
                                    course : this.course,
                                    deposit : this.deposit ? [                                    
                                            {amount : this.deposit ,date: new Date().getTime()}
                                    ] : [],
                                    batch: Number(this.batch),  
                                    started_at: newDate, 
                                    created_at : new Date().getTime(),           

                                }
                            ],
                            created_at : new Date().getTime(),
                            remark : this.remark,       
                     }
                   //  console.log(data)               
                   
                    const query = ref(db, 'students/' + id)
                    set(query, data)
                    .then(()=>{
                        this.name="";
                        this.email="";
                        this.phone="";
                        this.course="";
                        this.select_course="";
                        this.deposit="";
                        this.remark="";
                        this.teacherFees=0;
                        this.isLoading=false;
                        this.course_start_date="";
                        this.message="The student has been saved."

                    })
                    .catch()   
                       
              
            }
                    
        },
        clearError(error){
                switch(error){
                        case "name":
                            this.errors.name="";
                            break;
                        case "batchName":
                            this.errors.batchName="";
                            break;    
                         case "email":
                            this.errors.email="";
                            break;
                         case "phone":
                            this.errors.phone="";
                            break;
                        case "select_course":
                            this.errors.select_course="";
                            break;
                        case "course_start_date":
                            this.errors.course_start_date="";
                            break;
                        case "deposit":
                            this.errors.deposit="";
                            break;      
                        case "remark":
                            this.errors.remark="";
                            break;  
                        case "batch":
                            this.errors.batch="";
                            break;        
                }
        },
        checkValidation(){
            if(!this.name){
                    this.errors.name="The name field is required.";
            }else{
                this.errors.name="";
            }
            if(!this.course_start_date){
                    this.errors.course_start_date="The course start date field is required.";
            }else{
                this.errors.course_start_date="";
            }
            /*
            if(!this.deposit){
                    this.errors.deposit="The initial deposit field is required.";
            }else{
                this.errors.deposit="";
            }
                */
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
            if(!this.select_course){
                    this.errors.select_course="The course field is required.";
            }else{
                this.errors.select_course="";
            }
            
            if(!this.batch){
                    this.errors.batch="The batch  field is required.";
            }else{
                this.errors.batch="";
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