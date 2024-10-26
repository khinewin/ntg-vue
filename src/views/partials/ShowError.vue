<template lang="">
    <div :class="$attrs.class">
        <div class="row justify-content-center">
          <div class="col-12">
            <h3 class="text-center text-danger">{{error}}</h3>  
           <!-- <div class="text-center">Waiting  for backend server <strong>00:{{remainSec < 10 ? "0":""}}{{remainSec}}</strong></div> -->
          </div>
          <div class="col-sm-4 col-md-2 d-grid">
            
           <!-- <button class="btn" @click="tryAgain">Try again</button> -->
          </div>
        </div>
    </div>
</template>
<script>
export default {
    props : ['error'],
    data(){
      return{
          remainSec: 15
      }
    },

    created(){
       // let interval=setInterval(this.myTime, 1000)
       
    },

    watch:{
        remainSec(){
          if(this.remainSec ===0){
              this.tryAgain();
          }
        }
    },

   

    computed:{
        hasError(){
          return this.error;
        }
    },

    methods:{
        myTime(){
            this.remainSec -= 1;
        },
        tryAgain(){
                this.$emit("tryAgain")
        }
    }
}
</script>
<style lang="">
    
</style>