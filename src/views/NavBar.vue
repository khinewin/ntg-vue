<template>
        <nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="#!" ><router-link to="/"><img src="../assets/ntg-logo.png" width="120" alt="NTG TECHNOLOGY"></router-link></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0" >
                    <li class="nav-item">
                            <router-link to="/student-registration" class="nav-link"><i class="fa-solid fa-id-card"></i> Student registration</router-link>
                    </li>                  
                   
                </ul>
                
            
                </div>
            </div>
        </nav>
</template>

<script>
    export default {
        name: "NavBar",
        data(){
            return {
              
            }
        },
       
    }
</script>

<style lang="css">
        .router-link-active{
            color: red !important
        }
        .nav-link {
            font-size: 14px !important
        }
    
</style>