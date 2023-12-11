<template>
        <nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
            <div class="container-fluid">
                <a class="navbar-brand" href="#!" ><router-link to="/"><img src="../assets/ntg-logo.png" width="120" alt="NTG TECHNOLOGY"></router-link></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    
                    <ul class="navbar-nav ms-auto me-auto mb-2 mb-lg-0" >
                        <li class="nav-item" >
                                <router-link to="/student-registration" class="nav-link"><i class="fa-solid fa-id-card"></i> Student registration</router-link>
                        </li> 
                    </ul>
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                      
                        <li class="nav-item" v-if="!isAuthenticated">
                                <router-link to="/app-login" class="nav-link"><i class="fa-solid fa-right-to-bracket"></i> Signin</router-link>
                        </li>    
                        <li class="nav-item" v-if="isAuthenticated">
                                <router-link to="/dashboard" class="nav-link"><i class="fa-solid fa-earth-americas"></i> Dashboard</router-link>
                        </li>    
                        <li class="nav-item dropdown" v-if="isAuthenticated">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-user"></i>  {{loginEmail}}
                            </a>
                            <ul class="dropdown-menu">
                                <li class="nav-item">
                                    <router-link to="#!" @click="setLogoutUser" class="dropdown-item"><i class="fa-solid fa-right-from-bracket"></i> Logout </router-link>
                                </li>

                            </ul>
                        </li>

                                     
                   
                    </ul>
                
            
                </div>
            </div>
        </nav>
</template>

<script>
import { getAuth,signOut } from "firebase/auth";

    export default {
        name: "NavBar",
        props :["loginEmail", "loginUid", "isAuthenticated"],
        data(){
            return {
            }
        },
        methods:{
           
            setLogoutUser(){
                const auth=getAuth();
                signOut(auth)
                .then(()=>{
                    this.$store.dispatch("setLogoutUser")
                    this.$router.push("/app-login")
                })
            }
        }
       
    }
</script>

<style lang="css">
      
        .nav-link, .dropdown-item {
            font-size: 14px !important
        }
    
</style>