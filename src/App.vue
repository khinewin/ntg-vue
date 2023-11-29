<template>
      <nav-bar></nav-bar>
  
  <router-view/>
  <div>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
    import NavBar  from "./views/NavBar.vue"
    import FooterBar from "./views/FooterBar.vue"
   

    export default{
        components :{
          NavBar, 
          FooterBar,
        },
        data(){
            return {

            }
        },
        

    }
</script>