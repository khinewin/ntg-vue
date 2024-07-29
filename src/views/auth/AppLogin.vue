<template>
    <div class="container-fluid home">
        <div class="row">
            <div class="col-12">
                <div class="row justify-content-center my-4">
                    <div class="col-sm-10 col-md-8 col-lg-4">
                       <div class="text-center  mb-2">
                        <img src="@/assets/ntg-logo.png" class="img-fluid" width="100px" alt="NTG TECHNOLOGY">

                        <h5 class="text-secondary mt-2" v-if="!isAuth">Login</h5>
                       </div>
                       <div class="mb-2">
                            <div v-if="login_msg" class="text-success text-center small">{{ login_msg }}</div>
                            <div v-if="firebase_msg" class="text-danger text-center small">{{ firebase_msg }}</div>
                       </div>

                        <div class="card shadow-sm" v-show="!isAuth">
                            <div class="card-body">                                    
                                    <form  @submit.prevent="doSignin">
                                        
                                            <div class="mb-3">
                                                <label for="email" class="form-label">E-mail</label>
                                                <input type="email" class="form-control" id="email" v-model="email"  :class="{'is-invalid' : errors.email}">
                                                <span v-if="errors.email" class="text-danger small">{{ errors.email }}</span>
                                            </div>
                                            <div class="mb-3">
                                                <label for="password" class="form-label">Password</label>
                                                <div class="input-group">
                                                    <input :type="isShowPassword ? 'text' : 'password' " class="form-control" id="password" v-model="password" :class="{'is-invalid' : errors.password}">
                                                            <span class="input-group-text" @click="handleShowPassword">
                                                                <span   v-show="isShowPassword">
                                                                    <i class="fa-solid fa-eye-slash"></i>
                                                                </span>
                                                                <span  v-show="!isShowPassword">
                                                                    <i class="fa-solid fa-eye"></i>                                                        
                                                                </span>
                                                            </span>
                                                    <span v-if="errors.password" class="text-danger small">{{ errors.password }}</span>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <button type="submit" class="btn btn-primary" :class="{disabled: isLoading}">
                                                    <div class="spinner-border text-light spinner-border-sm" role="status" v-if="isLoading">
                                                        <span class="visually-hidden">Loading...</span>
                                                    </div>
                                                    Signin
                                                </button>
                                            </div>
                                    </form>                                    
                            </div>                          

                        </div>
                        <div class="card" v-show="isAuth">
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item list-group-item-action bg-secondary text-white"><router-link to="/" class="nav-link"><i class="fa-solid fa-house"></i> Home</router-link></li>
       
                                    <li class="list-group-item bg-secondary text-white"><router-link to="/admin/dashboard" class="nav-link"><i class="fa-solid fa-earth-americas"></i> Dashboard</router-link></li>
                                    <li class="list-group-item bg-secondary text-white" ><router-link to="/admin/enrolled-students" class="nav-link"><i class="fa-solid fa-users"></i> Enrolled students <span class="badge rounded-pill bg-dark float-end">{{enrolledStudents}}</span></router-link></li>
                                    <li class="list-group-item bg-secondary text-white"><router-link to="/admin/new-student" class="nav-link"><i class="fa-solid fa-user-plus"></i> Add student</router-link></li>
                 
                                    <li class="list-group-item bg-secondary text-white"><router-link to="/admin/students" class="nav-link"><i class="fa-solid fa-users-line"></i> Students <span class="badge rounded-pill bg-dark float-end">{{studentsCount}}</span></router-link></li>
                                    <li class="list-group-item bg-secondary text-white"><router-link to="/admin/courses/new" class="nav-link"><i class="fa-solid fa-plus-circle"></i> Add Course</router-link></li>
                                    <li class="list-group-item bg-secondary text-white"><router-link to="/admin/courses" class="nav-link"><i class="fa-solid fa-network-wired"></i> Courses <span class="badge rounded-pill bg-dark float-end">{{postsCount}}</span></router-link></li>

                                    <li class="list-group-item bg-secondary text-white"><router-link to="/admin/articles/new" class="nav-link"><i class="fa-solid fa-file-circle-plus"></i> Add Article</router-link></li>
                                    <li class="list-group-item bg-secondary text-white"><router-link to="/admin/articles" class="nav-link"><i class="fa-solid fa-pen-nib"></i> Articles <span class="badge rounded-pill bg-dark float-end">{{articlesCount}}</span></router-link></li>
                        
                                    <li class="list-group-item bg-secondary text-white"><router-link to="/admin/income-statement" class="nav-link"><i class="fa-solid fa-money-bill-transfer"></i> Income Statement</router-link></li>
                        
                        
                                    <li class="list-group-item bg-secondary text-white"><router-link to="/admin/shared-statement" class="nav-link"><i class="fa-brands fa-creative-commons-share"></i> Shared Statement</router-link></li>
                        
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
import { getAuth,onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import store from "@/store"

export default {
    name : "AppLogin",
    data(){
        return{
            email :"",
            password :"",
            errors: {
                email : "",
                password :""
            },
            firebase_msg: "",
            login_msg:"",
            isLoading: false,
            isShowPassword: false,
            
        }
    },

    computed:{
    
      postsCount(){
        return this.$store.getters.postsCount;
      },
      articlesCount(){
        return this.$store.getters.articlesCount;
      },
      studentsCount(){
        return this.$store.getters.studentsCount;
      },
      enrolledStudents(){
        return this.$store.getters.enrolledStudents;
      },

        isAuth(){
            return this.$store.getters.isAuthenticated;
        }
    },
    methods: {
        handleShowPassword(){
            this.isShowPassword = !this.isShowPassword;
        },
        goHome(){
                this.$router.push("/")
            },
        
        doSignin(){
            this.checkValidataion();
            if(!this.errors.email && !this.errors.password){
                this.isLoading=true;
                const auth=getAuth();
                signInWithEmailAndPassword(auth, this.email, this.password)
                .then((res)=>{
                    this.firebase_msg="";
                    this.$store.dispatch("setLoginUser", res.user)
                    this.email="";
                    this.password="";
                    this.login_msg="Authentication success.";
                    setTimeout(() => {
                        this.isLoading=false;
                        this.login_msg="";
                       // this.$router.push("dashboard")
                    }, 2000);
                })
                .catch((rej)=>{
                    this.isLoading=false;
                    this.firebase_msg=rej.code
                })
            }

            
        },
        checkValidataion(){
           
            if(!this.email){
                    this.errors.email="E-mail field is required."
            }else{
               if(! this.validEmail(this.email)){
                        this.errors.email="Valid email required."
               }else{
                this.errors.email="";
               }
            }
            if(!this.password){
                    this.errors.password="Password field is required."
            }else{
                    this.errors.password="";
            }
           
        },
        validEmail:function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
}
</script>
<style lang="">
    
</style>