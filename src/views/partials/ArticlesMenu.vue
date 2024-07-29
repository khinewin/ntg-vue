<template lang="">
    <div>
        <div class="g-2 row justify-content-md-center mb-2" >
            
            <div  class="col-10 col-md-3 d-grid">
                <button class="btn btn-sm btn-secondary " :class="{'btn-dark' : whoIsActive==='home'}" @click="goHome()"> 
                    <span class="position-relative">                       
                        <span>
                            <i class="fa-solid fa-house" ></i>
                        </span>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info" v-if="whoIsActive=='home' && !isSearch">
                            {{articles.length}}
                        </span>
                    </span>                                    
                    
                </button>
            </div>
            <div class="col-2 col-md-1 d-grid">
                <button @click="handleSearchBox" :class="{'btn-dark': isShowSearchBox}" class="btn btn-sm btn-secondary">
                    <span class="position-relative">
                        <i class="fa-solid fa-magnifying-glass" ></i>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info" v-if="isSearch">
                            {{articles.length}}
                        </span>
                    </span>
                     
                </button>
            </div>
            <div v-for="cat in categories" :key="cat.id" class="col-6 col-sm-3 col-md-2 d-grid">
                <button class="btn btn-sm btn-secondary" :class="{'btn-dark' : cat.active}"  @click="articlesByCategory(cat.name)">
                    <span class="position-relative">
                        {{cat.title}} 
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info" v-if="whoIsActive===cat.name">{{articles.length}}</span>
                    </span>
                </button>
            </div>
            <div class="col-12" v-if="isShowSearchBox">
                <input  type="search" @click="searchArticle=''" autofocus class="form-control" v-model="searchArticle" @keypress.enter="doSearch"   placeholder="Search the articles">
            </div>
         </div>
    </div>
</template>
<script>
export default {
    props:['articles'],
    data(){
        return{
            isShowSearchBox: false,
            whoIsActive: "home",
            searchArticle:"",
            isSearch: false,
            categories: [
            {id: 1, title: "Database", name : "database",active: false},
            {id: 2, title: "Programming", name : "programming",active: false},
            {id: 3, title: "Networking", name : "networking",active: false},
            {id: 4, title: "Computer", name : "computer",active: false}
        ]
        }
    },

    created(){
        

        if(this.$route.query.type != undefined){
                this.whoIsActive=this.$route.query.type;
        }
        this.changeActive();
    },

    
    
  
    methods: {
        handleSearchBox(){
            this.whoIsActive="home"
            this.changeActive();
           // this.isShowSearchBox =! this.isShowSearchBox
           this.$router.push({path:"/articles/search"})
        },
        doSearch(){
            if(this.searchArticle){
                this.isSearch=true
                this.$emit("search-article", this.searchArticle)
            }            
        },

        changeActive(){
       
                this.categories.map((c)=>{
                        if(c.name===this.whoIsActive){
                            return c.active=true
                        }else{
                            return c.active=false;
                        }
                    }) 
        },
        articlesByCategory(name){
            //this.isShowSearchBox=false;
            this.whoIsActive=name;
             this.changeActive();    
            //this.$router.push({path: '/articles', query: {"type": name}})   
            this.$emit("category", name)         
        },
        goHome(){
            this.isSearch=false;
            //this.isShowSearchBox=false;
            this.searchArticle="";
            this.whoIsActive="home"
            this.changeActive();
            this.$emit("category", "home")
            //this.$router.push({path: "/articles"})
        }
    },
}
</script>
<style >
     .active-category{
        color: rgb(132, 71, 2) !important;
  }
</style>