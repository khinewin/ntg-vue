<template lang="">
    <div class="row">
            <div class="col-sm-2">
                    <SideBar></SideBar>
            </div>
            <div class="col-sm-10" style="min-height: 500px">
                <div class="row my-4">
                        <div class="col-sm-4">
                                <div class="card shadow-sm">
                                        <div class="card-body">
                                                <h4 class="card-title text-primary">Posts <span class="badge text-bg-success ">{{postCount}}</span></h4>
                                                <hr>
                                                <div>
                                                        <button class="btn btn-secondary">Detail</button>
                                                </div>
                                        </div>
                                </div>
                        </div>
                        <div class="col-sm-8">
                                <div class="card shadow-sm">
                                        <div class="card-body">
                                                <h4 class="card-title text-primary">Students registration <span class="badge text-bg-primary ">{{studentRegistrationCount}}</span></h4>
                                                <hr>
                                                <div >
                                                        <button class="btn btn-secondary">Detail</button>
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
                this.$store.dispatch("fetchPostsStudentRegistrationCount")
        }
    },
    computed:{
        postCount(){
                return this.$store.getters.postCount;
        },
        studentRegistrationCount(){
                return this.$store.getters.studentRegistrationCount;
        }
    }
}
</script>
<style lang="">
    
</style>