<template lang="">
    <div class="container-fluid">
    <div class="row">
            <div class="col-md-2 d-none d-md-block sidebar-block">
                    <SideBar></SideBar>
            </div>
            <div class="col-md-10 content-block" style="min-height: 500px">
                <div class="row my-2">
                        <div class="col-12">
                                <h4><i class="fa-solid fa-edit"></i> Edit student info</h4>
                        </div>
                </div>
                
                 <div class="card shadow-sm mb-4">
                        <div class="card-body">
                            <div class="row my-2 justify-content-center">
                                 <div class="col-sm-6">                             
                                    
                                        <form @submit.prevent="updateStudent">
                                            <div class="text-danger small ms-2 mb-2" v-if="errors.name">{{errors.name}}</div>
                                            <div class="form-floating mb-3">                                                
                                                <input @keydown="clearError('name')" type="text" class="form-control form-control-sm" :class="{'is-invalid' : errors.name}" id="name" placeholder="Name" v-model="name">
                                                <label for="name" class="small">Name</label>
                                            </div>
                                            <div class="text-danger small ms-2 mb-2" v-if="errors.email">{{errors.email}}</div>
                                            <div class="form-floating mb-3">
                                                <input @keydown="clearError('email')" v-model="email" type="email" :class="{'is-invalid' : errors.email}" class="form-control form-control-sm" id="email" placeholder="E-mail">
                                                <label for="email" class="small">E-mail</label>
                                            </div>
                                            <div class="text-danger small ms-2 mb-2" v-if="errors.phone">{{errors.phone}}</div>
                                            <div class="form-floating mb-3">
                                                <input @keydown="clearError('phone')" v-model="phone" type="tel" class="form-control form-control-sm" :class="{'is-invalid' : errors.phone}" id="phone" placeholder="Phone">
                                                <label for="phone" class="small">Phone</label>
                                            </div>
                                            <div class="text-danger small ms-2 mb-2" v-if="errors.course">{{errors.course}}</div>
                                            <div class="form-floating mb-3">
                                                <select class="form-select form-select-sm" id="course" @click="clearError('course')" v-model="course" :class="{'is-invalid' : errors.course}">
                                                        <option value="">Select course</option>
                                                        <option>Web Development Level - 1</option>
                                                        <option>Web Development Level - 2</option>
                                                        <option>Web Development Level - 3</option>
                                                </select>
                                                <label for="course" class="small">Course</label>
                                            </div>
                                            <div class="text-danger small ms-2 mb-2" v-if="errors.course_fees">{{errors.course_fees}}</div>
                                            <div class="mb-3 form-floating">
                                                <input type="number" @keydown="clearError('course_fees')" v-model="course_fees" :class="{'is-invalid' : errors.course_fees}" class="form-control form-control-sm" id="course_fees" placeholder="Course fees (Deposit)">
                                                <label for="course_fees" class="small">Course fees (Deposit={{course_fees_label}})</label>
                                            </div>
                                            <div class="text-danger small ms-2 mb-2" v-if="errors.remark">{{errors.remark}}</div>
                                            <div class="mb-3 form-floating">
                                                <textarea   @keydown="clearError('remark')" v-model="remark" id="remark" class="form-control form-control-sm" :class="{'is-invalid' : errors.remark}" placeholder="Remark"></textarea>
                                                <label for="remark" class="small">Remark</label>
                                            </div>
                                            <div class="mb-3">
                                                <button type="submit" class="btn btn-primary btn-lg" :class="{disabled: isLoading}">
                                                        <div class="spinner-border text-light spinner-border-sm" role="status" v-if="isLoading">
                                                            <span class="visually-hidden">Loading...</span>
                                                         </div>
                                                        Update
                                                    </button>
                                                    <router-link to="/students" class="btn btn-secondary btn-lg float-end" :class="{disabled: isLoading}">Close</router-link>
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
import SideBar from '@/views/SideBar.vue'
import { doc, getDoc, collection, setDoc,query } from "firebase/firestore"; 
import db from "../firebase"

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
            course: "",
            course_fees: "",
            old_course_fees:"",
            course_fees_label:"",
            order_date:"",
            remark:"",
            errors: {
                name: "",
                email: "",
                phone: "",
                course: "",
                course_fees: "",
                remark:"",
            },
            isLoading: false,
            id: "",
            created_at: "",
        }
    },
    created(){
       // console.log(this.$route.params.id)
        this.id=this.$route.params.id;
        this.fetchStudent();
    },
    methods:{
        async fetchStudent(){
            const docRef = doc(db, "students", this.id);
            const stuData = await getDoc(docRef);
            const stu=stuData.data();
            this.name=stu.name;
            this.email=stu.email;
            this.phone=stu.phone;
            this.course=stu.course;
            this.remark=stu.remark;
            this.course_fees_label=stu.course_fees.reduce((s,r)=>s+r);
            this.old_course_fees=stu.course_fees;
            this.created_at =stu.created_at;
            this.order_date=stu.order_date;
            
        },
        async updateStudent(){
                this.checkValidation();
                if(!this.errors.name && !this.errors.email && !this.errors.phone && !this.errors.course && !this.errors.course_fees && !this.errors.remark){
                    this.isLoading=true;
                    const saveDoc=doc(db, "students", this.id)
                    await setDoc(saveDoc, {
                        name: this.name,
                        email: this.email,
                        phone : this.phone,
                        course: this.course,
                        course_fees: this.course_fees ? [...this.old_course_fees, this.course_fees] : this.old_course_fees,
                       created_at : this.created_at,
                        remark : this.remark,
                        order_date: this.order_date,
                        }).then(()=>{
                            this.isLoading=false;                  

                            this.showSpinner=false;
                            this.course_fees_label += this.course_fees;
                            this.course_fees="";

                        })
                        .catch(()=>{

                        })
                   
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
                        case "course":
                            this.errors.course="";
                            break;
                        case "course_fees":
                            this.errors.course_fees="";
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
            if(!this.course){
                    this.errors.course="The course field is required.";
            }else{
                this.errors.course="";
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