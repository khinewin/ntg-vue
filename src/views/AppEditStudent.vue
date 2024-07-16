<template lang="">
    <div class="container-fluid home">
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
                                            <div class="text-danger small ms-2 mb-2" v-if="errors.deposit">{{errors.deposit}}</div>
                                            <div class="mb-3 form-floating">
                                                <input type="number" @keydown="clearError('course_fees')" v-model="deposit" :class="{'is-invalid' : errors.deposit}" class="form-control form-control-sm" id="deposit" placeholder="Course fees (Deposit)">
                                                <label for="deposit" class="small">Course fees (Deposit={{course_fees_label}})</label>
                                            </div>
                                            <div class="mb-3 form-floating">
                                                <select class="form-control" id="batch" v-model="batch">
                                                    <option v-for="b in batchs" :value="b" :key="b" >Batch #{{b}}</option>
                                                </select>
                                                <label for="batch" class="small">Batch</label>
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
import { doc, getDoc, collection, setDoc,query,orderBy, getDocs } from "firebase/firestore"; 
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
            deposit: "",
            old_deposit:"",
            course_fees_label:"",
            order_date:"",
            current_batch:"",
            batch:"",
            batchs:[],
            remark:"",
            errors: {
                name: "",
                email: "",
                phone: "",
                course: "",
                deposit: "",
                remark:"",
            },
            isLoading: false,
            id: "",
            created_at: "",
        }
    },
    mounted(){
       // console.log(this.$route.params.id)
        this.id=this.$route.params.id;
        this.fetchStudent();
        this.fetchBatch();
    },
    methods:{
        async fetchBatch(){
            const q = query(collection(db, "training"), orderBy("batch", "asc"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let batch={};   
                batch=doc.data().batch;
                this.batchs.unshift(batch)
            })
            this.batch=this.current_batch;
        },
        async fetchStudent(){
            const docRef = doc(db, "students", this.id);
            const stuData = await getDoc(docRef);
            const stu=stuData.data();
            this.name=stu.name;
            this.email=stu.email;
            this.phone=stu.phone;
            this.course=stu.course;
            this.remark=stu.remark;
            this.course_fees_label=stu.deposit.reduce((s,r)=>s+r);
            this.course_fees=stu.course_fees;
            this.old_deposit=stu.deposit;
            this.created_at =stu.created_at;
            this.order_date=stu.order_date;
            this.current_batch=stu.batch;
            
            
        },
        async updateStudent(){
                this.checkValidation();
                if(!this.errors.name && !this.errors.email && !this.errors.phone && !this.errors.course && !this.errors.deposit && !this.errors.remark){
                    this.isLoading=true;
                    const saveDoc=doc(db, "students", this.id)
                  
                    
                    
                    await setDoc(saveDoc, {
                        name: this.name,
                        email: this.email,
                        phone : this.phone,
                        course: this.course,
                        deposit: this.deposit ?  [...this.old_deposit, this.deposit] : this.old_deposit,
                       created_at : this.created_at,
                        remark : this.remark,
                        order_date: this.order_date,
                        course_fees: this.course_fees,
                        batch: this.batch,
                        }).then(()=>{
                            this.isLoading=false;                  

                            this.showSpinner=false;
                            this.course_fees_label += this.deposit;
                            this.deposit="";

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
                            this.errors.deposit="";
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
            const old_deposit=this.old_deposit.reduce((accu, cur)=> accu + cur)
            const new_deposit=Number(old_deposit) + Number(this.deposit)
            if(new_deposit > this.course_fees){
                        this.errors.deposit="Invalid deposit amount.";
                        this.deposit=""
             }else{
                this.errors.deposit=""
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