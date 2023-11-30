<template>
    <div class="container">
            <div class="row justify-content-center">
                <div class="col-sm-6 my-4">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                        <h5 class="text-center text-primary mb-5">Student Registration Form</h5>
                                        <form @submit.prevent="submitRegister">
                                            <div class="mb-3">
                                                <label for="name" class="form-label">Name</label>
                                                <input type="text" class="form-control" id="name" v-model="name" :class="{'is-invalid' : errors.name}">
                                                <span v-if="errors.name" class="text-danger small">{{ errors.name }}</span>
                                            </div>
                                            <div class="mb-3">
                                                <label for="email" class="form-label">E-mail</label>
                                                <input type="email" class="form-control" id="email" v-model="email"  :class="{'is-invalid' : errors.email}">
                                                <span v-if="errors.email" class="text-danger small">{{ errors.email }}</span>
                                            </div>
                                            <div class="mb-3">
                                                <label for="phone" class="form-label">Phone</label>
                                                <input type="tel" class="form-control" id="phone" v-model="phone" :class="{'is-invalid' : errors.phone}">
                                                <span v-if="errors.phone" class="text-danger small">{{ errors.phone }}</span>
                                            </div>
                                            <div class="mb-3">
                                                <label for="eduction" class="form-label">Education</label>
                                                <textarea id="education" class="form-control" :class="{'is-invalid' : errors.education}" v-model="education" placeholder="e.g., Technology or Computer University, Second Year. or Any Graduate"></textarea>
                                                <span v-if="errors.education" class="text-danger small">{{ errors.education }}</span>
                                            </div>
                                            <div class="mb-3">
                                                <label  class="form-label" > Training Course</label>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" :class="{'is-invalid' : errors.course}"  v-model="course" value="Web Development Programming Level - 1 " name="flexRadioDefault" id="flexRadioDefault1">
                                                    <label class="form-check-label" for="flexRadioDefault1">Web Development Programming Level - 1 </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio"  :class="{'is-invalid' : errors.course}" v-model="course" value="Web Development Programming Level - 2" name="flexRadioDefault" id="flexRadioDefault2" >
                                                    <label class="form-check-label" for="flexRadioDefault2">Web Development Programming Level - 2  </label>
                                                </div>
                                                <span v-if="errors.course" class="text-danger small">{{ errors.course }}</span>
                                            </div>
                                            <div class="mb-5">
                                                    <button type="submit" class="btn btn-primary btn-lg">Submit</button>
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
                            <h6 class="text-center mb-5">သင်တန်းတက်ရန် စာရင်းသွင်းထားသော သင်၏အချက်အလက်မှာ အောက်ပါအတိုင်းဖြစ်ပါသည်။</h6>
                                <table class="table table-borderless">
                                    <tr><td>Name : </td><td>{{ student.name }}</td></tr>
                                    <tr><td>Email : </td><td>{{ student.email }}</td></tr>
                                    <tr><td>Phone : </td><td>{{ student.phone }}</td></tr>
                                    <tr><td>Training course : </td><td>{{ student.course }}</td></tr>

                                </table>
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
import db from "../firebase"

export default {
    name: "StudentRegistration",
    data(){
        return{
            name: "",
            email: "",
            phone:"",
            education:"",
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
          }

        }
    },
    mounted(){
    },

    methods:{

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
           
            this.checkValidataion();
            if(!this.errors.name && !this.errors.email && !this.errors.phone && !this.errors.education && !this.errors.course){
                this.toggleLoadingModal("show");
                this.showSpinner=true
                const saveCollection=collection(db, "students")
              let saveData=await addDoc(saveCollection, {
                name: this.name,
                email: this.email,
                phone : this.phone,
                eduction: this.education,
                course: this.course,
                created_at : new Date().toLocaleDateString() + ", " + new Date().toLocaleTimeString()
                })
               if(saveData.id){
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
