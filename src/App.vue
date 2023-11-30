<template>
  <nav-bar :loginEmail="loginEmail" :loginUid="loginUid" :isLogin="isLogin"></nav-bar>
  
  <router-view/>
  <div>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
    import NavBar  from "./views/NavBar.vue"
    import FooterBar from "./views/FooterBar.vue"
   
    import { getAuth,onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

    export default{
        components :{
          NavBar, 
          FooterBar,
        },
        data(){
            return {

            }
        },
        mounted(){
          this.checkLogin();
        },
        methods:{
          checkLogin(){
            const auth=getAuth();
            onAuthStateChanged(auth, (user)=>{
                if(user){
                  this.$store.dispatch("setLoginUser", user)
                }
            })
          },
        },
        computed: {
        isLogin(){
            return this.$store.state.isLogin;
        },
        loginEmail(){
            return this.$store.state.user.email;
        },
        loginUid(){
            return this.$store.state.user.uid;
        }
    },
        

    }
</script>