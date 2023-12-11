<template lang="">
        <div class="container-fluid">
    <div class="row">
            <div class="col-md-2 d-none d-md-block">
                    <SideBar></SideBar>
            </div>
            <div class="col-md-10" style="min-height: 500px">
                <div class="row my-2">
                        <div class="col-12">
                                <h4><i class="fa-solid fa-earth-americas"></i> Dashboard</h4>
                        </div>
                </div>
                <div class="row my-2">
                        <div class="col-sm-6 mb-3">
                                <div class="card shadow-sm">
                                        <div class="card-body bg-secondary-subtle">
                                                <h4 class="card-title text-primary py-5">Posts <span class="badge text-bg-success ">{{postCount}}</span></h4>
                                                <hr>
                                                <div>
                                                        <button class="btn btn-secondary me-2"><i class="fa-solid fa-angles-right"></i> Details</button>
                                                        <button class="btn btn-primary float-md-end"><i class="fa-solid fa-circle-plus"></i> Add post</button>
                                                </div>
                                        </div>
                                </div>
                        </div>
                        <div class="col-sm-6 mb-3">
                                <div class="card shadow-sm">
                                        <div class="card-body bg-secondary-subtle">
                                                <h4 class="card-title text-primary py-5">Enrolled students <span class="badge text-bg-primary ">{{studentRegistrationCount}}</span></h4>
                                                <hr>
                                                <div >
                                                        <router-link to="/enrolled-students" class="btn btn-secondary me-2"> <i class="fa-solid fa-angles-right"></i> Details</router-link>
                                                        <router-link to="/student-registration" class="btn btn-primary float-md-end"><i class="fa-solid fa-id-card"></i> Student registration</router-link>
                                                </div>
                                        </div>
                                </div>
                        </div>
                        <div class="col-sm-8 mb-3">
                                <div class="card shadow-sm">
                                        <div class="card-body bg-secondary-subtle">
                                                <h4 class="card-title text-primary py-5">Students <span class="badge text-bg-info ">{{studentsCount}}</span></h4>
                                                <hr>
                                                <div >
                                                        <router-link to="/students" class="btn btn-secondary me-2"> <i class="fa-solid fa-angles-right"></i> Details</router-link>
                                                        <router-link to="/new-student" class="btn btn-primary float-md-end"><i class="fa-solid fa-circle-plus"></i> Add student</router-link>
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
import SideBar from "@/views/SideBar.vue"
export default {
    name: "AppDashboard",
    components: {
            SideBar
    },
    mounted(){
        this.fetchPosts()
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
        }
    }
}
</script>
<style lang="">
    
</style>