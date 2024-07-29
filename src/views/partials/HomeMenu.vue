<template lang="">
    <div>
        <div class="row g-2 justify-content-center">
            <div class="col-12 col-lg-4 d-grid">
                <button class="btn btn-secondary" @click="goHome" :class="{'btn-dark' : whoIsActive==='home'}">
                   <span class="position-relative">
                    <i class="fa-solid fa-house"></i>
                    <span v-if="whoIsActive==='home'" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info">{{articles.length}}</span>
                    </span>
                </button>
            </div>    
            <div class="col-6  col-lg-2 d-grid" v-for="c in categories" :key="c.id">
                <button class="btn btn-secondary" :class="{'btn-dark' : c.active}" @click="postsByCategory(c.name)">
                    <span class="position-relative">
                        {{c.title}}
                        <span v-if="whoIsActive===c.name" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info">{{articles.length}}</span>
                    </span>                   
                </button>
            </div>           
          </div>
    </div>
</template>
<script>
export default {
    props:['articles'],
    data(){
        return {
        
            whoIsActive: "home",
            categories : [
                {title : "Computer", name : "computer", active:false},
                {title : "Networking", name : "networking",active:false},
                {title : "Programming", name : "programming", active:false},
                {title : "Web Development", name : "web_development", active:false}
            ]
        }
    },
    created(){
        if(this.$route.query.cat != undefined){
                this.whoIsActive=this.$route.query.cat;
        }
        this.changeActive();

    },
    
    methods: {
       

        changeActive(){
                this.categories.map((c)=>{
                        if(c.name===this.whoIsActive){
                            return c.active=true
                        }else{
                            return c.active=false;
                        }
                    }) 
        },

        postsByCategory(name){
            this.whoIsActive=name;
             this.changeActive();    
            this.$emit("category", name)         
        },
        goHome(){       
            this.whoIsActive="home"
            this.changeActive();
            this.$emit("category", "home")
        }
    },  
}
</script>
<style lang="">
    
</style>