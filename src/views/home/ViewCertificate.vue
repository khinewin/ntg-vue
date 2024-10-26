<template lang="">
    <div class="container home min-vh-100">
        <button class="btn circle mb-2" @click="goBack"><i class="fa-solid fa-circle-chevron-left"></i></button>
            <div class="row mb-2">           
                    <div class="col-12">
                        <vue-load-image>
                            <template v-slot:image>
                              <img :src="cert_src" class="img-fluid rounded" />
                            </template>
                            <template v-slot:preloader>
                                <ImageLoading />
                            </template>
                            <template v-slot:error>Loading image failed.</template>
                          </vue-load-image>
                    </div>
            </div>
       </div>
</template>
<script>
import ImageLoading from "@/views/loaders/ImageLoading"    
export default {
    name : "StudentDetails",
    components:{
        ImageLoading
    },
    data(){
        return{
            id: "",
            cert_src:"",
        }
    },
    created(){   
     
        this.id=this.$route.params.id;  
        this.cert_src=this.$route.params.cert_src;     
      
    },
    methods:{
       
        goBack(){
            this.$router.push({name: "StudentDetails", params: {id: this.id}})
        },
    
       
    }
}
</script>
<style lang="">
    
</style>