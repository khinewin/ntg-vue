<template lang="">
<div class="container-fluid home mb-4">
    <div class="row">            
            <div class="col-md-12">
                <div class="row my-2">
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
                                        <h4 class="h4 pt-1"> Dashboard</h4>
                                    </div>
                                    
                                    <div class="col-md-7">
                                            <h4 v-if="message" class="text-success text-center h4 pt-1"><i class="fa-solid fa-check"></i> {{message}}</h4>
                                    </div>
                            </div>
                            
                </div>
                <div class="row g-2">
                        <div class="col-sm-6 col-md-4">
                                <div class="card shadow-sm rounded">
                                        <div class="card-body bg-secondary pt-5 position-relative rounded">
                                                <span class="card-title h4 pt-5 text-white text-center d-block">Courses <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark">{{postCount}}</span></span>
                                                <hr>
                                                <div class="go-to">
                                                        <router-link to="/admin/courses" class="btn text-light  me-2"><i class="fa-solid fa-angles-right"></i> Details</router-link>
                                                        <router-link to="/admin/courses/new" class="btn text-light  float-md-end"><i class="fa-solid fa-circle-plus"></i> Add course</router-link>

                                                </div>
                                        </div>
                                </div>
                        </div>
                        <div class="col-sm-6 col-md-4">
                                <div class="card shadow-sm rounded">
                                        <div class="card-body bg-secondary pt-5 position-relative rounded">
                                                <span class="card-title h4 pt-5 text-white text-center d-block">Articles <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark">{{articlesCount}}</span></span>
                                                <hr>
                                                <div class="go-to">
                                                        <router-link to="/admin/articles" class="btn text-light  me-2"><i class="fa-solid fa-angles-right"></i> Details</router-link>
                                                        <router-link to="/admin/articles/new" class="btn text-light  float-md-end"><i class="fa-solid fa-circle-plus"></i> Add arrticle</router-link>

                                                </div>
                                        </div>
                                </div>
                        </div>
                        <div class="col-sm-6 col-md-4">
                                <div class="card shadow-sm rounded">
                                        <div class="card-body bg-secondary pt-5 position-relative rounded">
                                                <span class="card-title h4 pt-5  text-white text-center d-block">Enrolled students <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark">{{studentRegistrationCount}}</span></span>
                                                <hr>
                                                <div class="go-to">
                                                        <router-link to="/admin/enrolled-students" class="btn text-light  me-2"> <i class="fa-solid fa-angles-right"></i> Details</router-link>
                                                        <router-link to="/student-registration" class="btn text-light float-md-end"><i class="fa-solid fa-id-card"></i> Online registration</router-link>
                                                </div>
                                        </div>
                                </div>
                        </div>
                        <div class="col-sm-6 col-md-4">
                                <div class="card shadow-sm rounded">
                                        <div class="card-body bg-secondary pt-5 position-relative rounded">
                                                <span class="card-title h4 pt-5  text-white text-center d-block">Students <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark">{{studentsCount}}</span></span>
                                                <hr>
                                                <div class="go-to" >
                                                        <router-link to="/admin/students" class="btn  text-light me-2"> <i class="fa-solid fa-angles-right"></i> Details</router-link>
                                                        <router-link to="/admin/new-student" class="btn text-light  float-md-end"><i class="fa-solid fa-circle-plus"></i> Add student</router-link>
                                                </div>
                                        </div>
                                </div>
                        </div>
                        <div class="col-sm-6 col-md-4">
                                <div class="card shadow-sm rounded">
                                        <div class="card-body bg-secondary pt-5 position-relative rounded">
                                                <span class="card-title h4 pt-5 text-white text-center d-block">Statements </span>
                                                <hr>
                                                <div class="go-to">
                                                        <router-link to="/admin/income-statement" class="btn  me-2 text-light"> <i class="fa-solid fa-angles-right"></i> Income</router-link>
                                                        <router-link to="/admin/shared-statement" class="btn  float-md-end text-light"><i class="fa-solid fa-angles-right"></i> Shared</router-link>

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
import SideBar from "@/views/admin/partials/SideBar.vue"
export default {
    name: "AppDashboard",
    components: {
            SideBar
    },
    created(){
        this.$watch(()=>this.$route, 
        this.fetchPosts,
        {immediate: true}
        )
    },
    methods: {
        fetchPosts(){
                this.$store.dispatch("fetchDashboardCounts")
        }
    },
    computed:{
        postCount(){
                return this.$store.getters.postCount;
        },
        studentRegistrationCount(){
                return this.$store.getters.studentRegistrationCount;
        },
        studentsCount(){
                return this.$store.getters.studentsCount;
        },
        articlesCount(){
                return this.$store.getters.articlesCount;
        }
    }
}
</script>
<style lang="">
  
</style>