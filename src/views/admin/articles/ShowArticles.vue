<template lang="">
    <div class="container-fluid home min-vh-100">
    <div class="row">
           
            <div class="col-md-12 content-block">
                <div class="row my-2">
                    <SideBar />  
                        <div class="col-2 col-md-1">                                                             
                                <a href="#!" class="ms-2 d-block circle" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar" aria-label="Toggle navigation">
                                    <span class="text-dark">
                                    <i class="fa-solid fa-bars"></i>
                                    </span>
                                </a> 
                        </div>
                        <div class="col-10 col-md-4">                   
                            <h4 class="h4 pt-1">Articles</h4>
                        </div>
                        
                        <div class="col-md-7">
                                <h4 v-if="message" class="text-success text-center h4 pt-1"><i class="fa-solid fa-check"></i> {{message}}</h4>
                        </div>
                </div>
                
                 <div class="card shadow-sm mb-2 p-0 min-vh-100">
                        <div class="card-body p-0">
                            <div v-if="showSpinner">
                                    <PreLoading class="preLoading" />
                            </div>
                            <div v-if="error">
                                <ShowError :error="error" class="error"/>
                        </div>
                            <div v-if="articles.length > 0"  style="min-height: 450px">
                                <ul class="list-group list-group-flush m-0">
                                    <li class="list-group-item mb-1 shadow-sm" v-for="a in articles" :key="a[0].id">
                                            <div class="row">
                                                <div class="col-md-1">
                                                    <div class="fw-light small">Date</div>
                                                    <div class="small">
                                                        {{showTime(a[1].created_at)}}
                                                    </div>
                                                </div>
                                                    <div class="col-md-2">
                                                        <div class="fw-light small">Image</div>
                                                        <div>
                                                            <vue-load-image>
                                                                <template v-slot:image>
                                                                  <img :src="a[1].src" class="img-fluid" />
                                                                </template>
                                                                <template v-slot:preloader>
                                                                    <ImageLoading />
                                                                </template>
                                                                <template v-slot:error>Loading image failed.</template>
                                                              </vue-load-image>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="fw-light small">Title</div>
                                                        <div class="small ">
                                                            <div class="fw-bold mb-2">{{a[1].title}}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="fw-light small">Contents</div>
                                                        <div class="small" >
                                                            {{a[1].content.substring(0, 200)}}
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="fw-light small">Category</div>
                                                        <div class="small fw-bold">
                                                            {{a[1].category}}
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="fw-light small">Actions</div>
                                                        <div class="small fw-bold">
                                                            <button class="btn text-primary" @click="goDetail(a[0])"><i class="fa-solid fa-earth-asia"></i></button>

                                                            <button class="btn text-primary" @click="goEdit(a[0])"><i class="fa-solid fa-pen-to-square"></i></button>
                                                            <button class="btn text-danger" @click="delArticle(a)"><i class="fa-solid fa-trash-can"></i></button>
                                                        </div>
                                                    </div>
                                            </div>
                                    </li>
                                </ul>
                                <div class="row justify-content-center mt-3 mb-2" v-show="isShowBtn">
                                    <div class="col-sm-6 col-md-4 d-grid">
                                      <button class="btn btn-primary rounded"  type="button" @click="getNextArticles">
                                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" v-if="btnSpinner"></span>
                                        More articles <i class="fa-solid fa-circle-chevron-down"></i>
                                      </button>
                                    </div>
                                </div>
                            </div>
                                
                        </div>
                </div>
            </div>
    </div>
   </div>
</template>
<script>
import SideBar from '@/views/admin/partials/SideBar.vue'
//import { doc, setDoc, collection, query, getDocs, deleteDoc, docs,orderBy, limit, where , startAfter, updateDoc, getCountFromServer} from "firebase/firestore"; 
import db from "@/firebase/database"
import PreLoading from "@/views/loaders/PreLoading.vue"
import ShowError from "@/views/partials/ShowError.vue"
import ImageLoading from "@/views/loaders/ImageLoading"
import { getDatabase, ref, set, onValue, remove, query, startAt,endAt, orderByChild ,limitToLast, limitToFirst} from 'firebase/database'


export default {
    name : "ShowArticles",
    components: {
        SideBar, PreLoading, ShowError, ImageLoading
        
    },
    data(){
        return {
            error: null,
            showSpinner: false,
            articles:[],         
            btnSpinner: false,
            message:null,
            limitTo: 8,
            articlesCount: 0,
            isShowBtn: true,
        }
    },

    created(){
        if(this.storeArticleLimitTo > 0){
            this.limitTo=this.storeArticleLimitTo;
         }
        
         this.$watch(
            ()=>this.$route,
            this.getArticlesCount,
            {immediate: true}
         )  
      
         
    }, 
    computed:{
        storeArticleLimitTo(){
            return this.$store.getters.articleLimitTo;
        }
    },
   
    methods:{    
        goDetail(id){
            this.$router.push({ name: "ArticleDetails", params: { id: id} });
        },
        showTime(t){
            //const date=t.toDate()
           const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(t);
            return formattedDate;
        },
       goEdit(id){
            this.$router.push({name:`EditArticle`, params:{id:id}})
       }, 
  
        delArticle(a){
            const conF=confirm(`Want to delete this article : ${a[1].title}`)
            if(conF){
                const query_url = ref(db, 'articles/' + a[0])
                remove(query_url).then(()=>{
                        this.message="The selected article has been deleted."
                }).catch(()=>{
                    this.error="Oops.., something went wrong."
                })                     
             
            }
        },
        getNextArticles(){
            this.btnSpinner=true;
            this.limitTo += this.limitTo;
            this.getArticles();
            this.$store.dispatch("setArticleLimitTo", this.limitTo)
        },
        getArticlesCount(){
            this.showSpinner=true;
            const query_url = query(ref(db, 'articles/'))
            onValue(query_url, (snapshot) => {
                const data = snapshot.val()
                if(data ===null){
                    this.articlesCount=0
                    this.error="No article found."
                    this.showSpinner=false;
                }else{
                    const count=Object.keys(data).length;
                    this.articlesCount=count;
                    this.getArticles();
                }
                
            })
        },
        getArticles(){           
            try{
                const query_url = query(ref(db, 'articles/'),orderByChild("created_at"), limitToLast(this.limitTo))
                onValue(query_url, (snapshot) => {
                    const data = snapshot.val()                   
                    this.btnSpinner=false;
                    this.showSpinner=false;
                    if(data ===null){
                        this.articles=[];
                        this.error="No article found."
                    }else{
                        const articles=Object.entries(data);
                        this.articles=articles.reverse();  
                        
                        const count=Object.keys(data).length;
                        if(this.articlesCount===count){
                                this.isShowBtn=false;                                
                        }else{
                                this.isShowBtn=true;
                        }
                        }                   
                })
            }catch(err){
                this.error="Oops..., something went wrong."
                this.btnSpinner=false;
            }finally{
                //this.showSpinner=false;
            }
        },
     
   }
}
</script>
<style lang="css">
   
</style>