<template lang="">
        <div class="offcanvas offcanvas-start bg-secondary" data-bs-scroll="true" tabindex="-1" id="offcanvasSidebar" aria-labelledby="offcanvasSidebar">
            <div class="offcanvas-header">
                <div></div>
                <button type="button" class="btn" data-bs-dismiss="offcanvas">
                    <i class="fa-solid fa-bars"></i>
                </button>
                          
            </div>
            <div class="offcanvas-body">            
                <ul class="list-group list-group-flush mb-1">
                    <li class="list-group-item list-group-item-action bg-secondary text-white"><router-link to="/" class="nav-link"><i class="fa-solid fa-house"></i> Home</router-link></li>
       
                   <li class="list-group-item bg-secondary text-white"><router-link to="/admin/dashboard" class="nav-link"><i class="fa-solid fa-earth-americas"></i> Dashboard</router-link></li>
                   <li class="list-group-item bg-secondary text-white" ><router-link to="/admin/enrolled-students" class="nav-link"><i class="fa-solid fa-users"></i> Enrolled students <span class="badge rounded-pill bg-dark float-end">{{enrolledStudents}}</span></router-link></li>
                   <li class="list-group-item bg-secondary text-white"><router-link to="/admin/new-student" class="nav-link"><i class="fa-solid fa-user-plus"></i> Add student</router-link></li>
                   <li class="list-group-item bg-secondary text-white"><router-link to="/admin/students" class="nav-link"><i class="fa-solid fa-users-line"></i> Students <span class="badge rounded-pill bg-dark float-end">{{studentsCount}}</span></router-link></li>
                   <li class="list-group-item bg-secondary text-white"><router-link to="/admin/courses/new" class="nav-link"><i class="fa-solid fa-plus-circle"></i> Add Course</router-link></li>
                   <li class="list-group-item bg-secondary text-white"><router-link to="/admin/courses" class="nav-link"><i class="fa-solid fa-network-wired"></i> Courses <span class="badge rounded-pill bg-dark float-end">{{postsCount}}</span></router-link></li>       
                   
                   <li class="list-group-item bg-secondary text-white"><router-link to="/admin/articles/new" class="nav-link"><i class="fa-solid fa-file-circle-plus"></i> Add Article</router-link></li>
                   <li class="list-group-item bg-secondary text-white"><router-link to="/admin/articles" class="nav-link"><i class="fa-solid fa-pen-nib"></i> Articles <span class="badge rounded-pill bg-dark float-end">{{articlesCount}}</span></router-link></li>
       
                   <li class="list-group-item bg-secondary text-white"><router-link to="/admin/income-statement" class="nav-link"><i class="fa-solid fa-money-bill-transfer"></i> Income Statement</router-link></li>      
                   <li class="list-group-item bg-secondary text-white"><router-link to="/admin/shared-statement" class="nav-link"><i class="fa-brands fa-creative-commons-share"></i> Shared Statement</router-link></li>
                   <li class="list-group-item bg-secondary text-white"><span @click="setLogoutUser" role="button" class="nav-link"> <i class="fa-solid fa-right-to-bracket"></i> Logout </span></li>
                   
               </ul>
            </div>
          </div>

</template>
<script>
  import { getAuth, signOut } from "firebase/auth";
export default {
    name: "SideBar",
    data(){
        return {

        }
    },
    methods:{
      setLogoutUser() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$store.dispatch("setLogoutUser");
        this.$router.push("/app-login");
      });
      },
    },
    computed:{
      postsCount(){
        return this.$store.getters.postsCount;
      },
      articlesCount(){
        return this.$store.getters.articlesCount;
      },
      studentsCount(){
        return this.$store.getters.studentsCount;
      },
      enrolledStudents(){
        return this.$store.getters.enrolledStudents;
      }
  },
}
</script>
<style lang="css">
     .router-link-active, .router-link-active span {
        color: yellow !important;
     }
     .nav-link:hover{
            margin-left: 30px !important;
            transition: all 0.7s linear;
     }
     .nav-link .badge{
        font-size: 12px !important;
     }
</style>