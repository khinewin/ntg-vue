<template>
    <div class="container home min-vh-100">
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

                        <div class="card shadow-sm mb-5" v-show="!isAuth">
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
                        <div v-if="isAuth">
                                <Menu />
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
import Menu from '@/views/auth/Menu'

export default {
    name : "AppLogin",
    components: {
        Menu
    },
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