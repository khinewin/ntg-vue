<template>
    <div class="container home">
            <div class="row justify-content-center">
                <div class="col-md-6 mt-2 mb-4">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                        <h5 class="text-center text-dark  mb-5">Student Registration Form</h5>
                                        <form @submit.prevent="submitRegister">
                                            <div class="mb-3">
                                                <label for="name" class="form-label small">Name</label>
                                                <input @keydown="clearError('name')" type="text" class="form-control form-control-sm" id="name" v-model="name" :class="{'is-invalid' : errors.name}">
                                                <span v-if="errors.name" class="text-danger small">{{ errors.name }}</span>
                                            </div>
                                            <div class="mb-3">
                                                <label for="email" class="form-label small">E-mail</label>
                                                <input @keydown="clearError('email')" type="email" class="form-control form-control-sm" id="email" v-model="email"  :class="{'is-invalid' : errors.email}">
                                                <span v-if="errors.email" class="text-danger small">{{ errors.email }}</span>
                                            </div>
                                            <div class="mb-3">
                                                <label for="phone" class="form-label small">Phone</label>
                                                <input @keydown="clearError('phone')" type="tel" class="form-control form-control-sm" id="phone" v-model="phone" :class="{'is-invalid' : errors.phone}">
                                                <span v-if="errors.phone" class="text-danger small">{{ errors.phone }}</span>
                                            </div>
                                            <div class="mb-3">
                                                <label for="eduction" class="form-label small">Education</label>
                                                <textarea @keydown="clearError('education')" id="education" class="form-control form-control-sm" :class="{'is-invalid' : errors.education}" v-model="education" placeholder="e.g., Technology or Computer University, Second Year. or Any Graduate"></textarea>
                                                <span v-if="errors.education" class="text-danger small">{{ errors.education }}</span>
                                            </div>
                                            <div class="mb-3">
                                                <label  class="form-label small" > Training Course</label>
                                                <select @click="clearError('course')" class="form-select"  :class="{'is-invalid' : errors.course}" v-model="course">
                                                        <option value="">Select the course</option>
                                                        <option v-for="sc in select_course" :key="sc.id" :value="sc.code">{{sc.course}}</option>
                                                </select>                                               
                                                <span v-if="errors.course" class="text-danger small">{{ errors.course }}</span>
                                            </div>
                                            <div class="my-4">
                                                    <button class="btn btn-outline-secondary btn-lg" type="button" @click="closeReg" >Close</button>
                                                    <button type="submit" class="btn btn-primary btn-lg float-end" :class="{disabled: isLoading}">
                                                        <div class="spinner-border text-light spinner-border-sm" role="status" v-if="isLoading">
                                                            <span class="visually-hidden">Loading...</span>
                                                         </div>
                                                        Submit
                                                    </button>
                                            </div>
                                        </form>
                            </div>
                        </div>
                </div>
            </div>
    </div>
    <!--loading modal-->
    <div class="modal fade"  id="loadingModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center" v-if="showSpinner">
                        <div class="spinner-border text-info m-5" role="status" style="width: 50px; height: 50px;" >
                            <span class="visually-hidden">Loading...</span>
                        </div>                        
                    </div>
                    <div v-else>
                        <div class="modal-body">
                            <h5 class="text-center text-success mb-2">Registration successful.</h5>
                            <h6 class="text-center mb-4 mt-4 lh-base">သင်တန်းတက်ရန် စာရင်းသွင်းထားသော သင်၏အချက်အလက်မှာ အောက်ပါအတိုင်းဖြစ်ပါသည်။</h6>
                                <table class="table table-borderless">
                                    <tr><td class="col-5">Name : </td><td>{{ student.name }}</td></tr>
                                    <tr><td class="col-5">Email : </td><td>{{ student.email }}</td></tr>
                                    <tr><td class="col-5">Phone : </td><td>{{ student.phone }}</td></tr>
                                    <tr><td class="col-5">Training course : </td>
                                            <td v-if="student.course==='wd1'">Web Development Level-1</td>
                                            <td v-if="student.course==='wd2'">Web Development Level-2</td>
                                            <td v-if="student.course==='ct1'">Computer Technology, CT-1</td>
                                            <td v-if="student.course==='ct2'">Computer Technology, CT-2</td>
                                            <td v-if="student.course==='ct3'">Computer Technology, CT-3</td>
                                            <td v-if="student.course==='pb1'">Programming Basic (From Zero To Moderate)</td>
                                            <td v-if="student.course==='bcpkid1'">Basic Coding & Programming For Kids Level-1</td>
                                            <td v-if="student.course==='bcpkid2'">Basic Coding & Programming For Kids Level-1</td>
                                     
                                    </tr>

                                </table>
                            <p>
                                အသေးစိတ်သိရှိလိုသည်များကို ဖုန်းနံပါတ် : <a href="tel:09970488345">09970488345</a> သို့ဆက်သွယ်ပြီးစုံစမ်းနိုင်ပါသည်။
                            </p>
                            <div class=" d-grid mt-5">
                                <button type="button" @click="cancelRegData" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            </div>
            <!--end loading modal-->
</template>
<script>
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; 
import db from "@/firebase"

export default {
    name: "StudentRegistration",
    data(){
        return{
            name: "",
            email: "",
            phone:"",
            education:"",
            select_course: [
                    {id: 1, course : "Computer Technology, CT-1", code: "ct1"},
                    {id: 2, course : "Computer Technology, CT-2", code: "ct2"},
                    {id: 8, course : "Computer Technology, CT-3", code: "ct3"},
                    {id: 3, course : "Programming Basic (From Zero To Moderate)", code: "pb1"},
                    {id: 4, course : "Web Development Level-1", code: "wd1"},
                    {id: 5, course : "Web Development Level-2", code: "wd2"},                   
                    {id: 6, course : "Basic Coding & Programming For Kids Level-1", code :"bcpkid1"},
                    {id: 7, course : "Basic Coding & Programming For Kids Level-2", code :"bcpkid2"},
            ],
            course: "",
            errors: {
                name: "",
                email: "",
                phone :"",
                education:"",
                course:""
            },
          showSpinner:false,
          student : {
                name: "",
                email:"",
                phone: "",
                course :""
          },
          isLoading: false,

        }
    },
    created(){
    },

    methods:{
        closeReg(){
            this.$router.go("-1")
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
                        case "education":
                            this.errors.education="";
                            break;
                        case "course":
                            this.errors.course="";
                            break;              
                }
        },

        toggleLoadingModal(action){
                const myModal = new bootstrap.Modal('#loadingModal', {
                keyboard: false
            })
            if(action==="show"){
                myModal.show();
            }
        },

        cancelRegData(){
                this.student.name="";
                this.student.email="";
                this.student.phone="";
                this.student.course="";
        },

        async submitRegister(){
         //   this.toggleLoadingModal("show");
           
            this.checkValidataion();
            if(!this.errors.name && !this.errors.email && !this.errors.phone && !this.errors.education && !this.errors.course){
                this.isLoading=true;
                this.toggleLoadingModal("show");
                this.showSpinner=true
                const saveCollection=collection(db, "enrolled_students")
              let saveData=await addDoc(saveCollection, {
                name: this.name,
                email: this.email,
                phone : this.phone,
                education: this.education,
                course: this.course,
                created_at : new Date().toLocaleDateString() + ", " + new Date().toLocaleTimeString(),
                order_date: new Date(),
                })
               if(saveData.id){
                this.isLoading=false;
                this.student.name=this.name;
                this.student.email=this.email;
                this.student.phone=this.phone;
                this.student.course=this.course;

                this.name="";
                this.email="";
                this.phone="";
                this.education="";
                this.course="";
                this.showSpinner=false;
               }

            
            }
            
        },
        checkValidataion(){
            if(!this.name){
                    this.errors.name="Name field is required."
            }else{
                this.errors.name="";
            }
            if(!this.email){
                    this.errors.email="E-mail field is required."
            }else{
               if(! this.validEmail(this.email)){
                        this.errors.email="Valid email required."
               }else{
                this.errors.email="";
               }
            }
            if(!this.phone){
                    this.errors.phone="Phone field is required."
            }else{
                    this.errors.phone="";
            }
            if(!this.education){
                    this.errors.education="Education field is required."
            }else{
                this.errors.education="";
            }
            if(!this.course){
                this.errors.course="Training course is selected required."
            }else{
                this.errors.course="";
            }
        },
        validEmail:function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
}
</script>
