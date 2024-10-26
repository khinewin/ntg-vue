<template lang="">
    <div class="card">
        <div class="card-body">
            <ul class="list-group list-group-flush">
                <li class="list-group-item list-group-item-action bg-secondary text-white"><router-link to="/" class="nav-link"><i class="fa-solid fa-house"></i> Home</router-link></li>

                <li class="list-group-item bg-secondary text-white"><router-link to="/admin/dashboard" class="nav-link"><i class="fa-solid fa-earth-americas"></i> Dashboard</router-link></li>
                <li class="list-group-item bg-secondary text-white" ><router-link to="/admin/students/enrolled" class="nav-link"><i class="fa-solid fa-users"></i> Enrolled students <span class="badge rounded-pill bg-dark">{{enrolledCount}}</span></router-link></li>
                <li class="list-group-item bg-secondary text-white"><router-link to="/admin/students/new" class="nav-link"><i class="fa-solid fa-user-plus"></i> Add student</router-link></li>

                <li class="list-group-item bg-secondary text-white"><router-link to="/admin/students" class="nav-link"><i class="fa-solid fa-users-line"></i> Students <span class="badge rounded-pill bg-dark ">{{studentsCount}}</span></router-link></li>
                <li class="list-group-item bg-secondary text-white"><router-link to="/admin/courses/new" class="nav-link"><i class="fa-solid fa-plus-circle"></i> Add Course</router-link></li>
                <li class="list-group-item bg-secondary text-white"><router-link to="/admin/courses" class="nav-link"><i class="fa-solid fa-network-wired"></i> Courses <span class="badge rounded-pill bg-dark ">{{coursesCount}}</span></router-link></li>

                <li class="list-group-item bg-secondary text-white"><router-link to="/admin/articles/new" class="nav-link"><i class="fa-solid fa-file-circle-plus"></i> Add article</router-link></li>
                <li class="list-group-item bg-secondary text-white"><router-link to="/admin/articles" class="nav-link"><i class="fa-solid fa-pen-nib"></i> Articles <span class="badge rounded-pill bg-dark">{{articlesCount}}</span></router-link></li>
    
                <li class="list-group-item bg-secondary text-white"><router-link to="/admin/cashbook" class="nav-link"><i class="fa-solid fa-money-bill-transfer"></i> Cash book</router-link></li>
    
    
                <li class="list-group-item bg-secondary text-white"><router-link to="/admin/shares/statement" class="nav-link"><i class="fa-brands fa-creative-commons-share"></i> Shares statement</router-link></li>
    
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    computed:{
        coursesCount(){
        return this.$store.getters.coursesCount;
      },
      articlesCount(){
        return this.$store.getters.articlesCount;
      },
      enrolledCount(){
        return this.$store.getters.enrolledCount;
      },
      studentsCount(){
        return this.$store.getters.studentsCount;
      }
    }
}
</script>
<style lang="">
    
</style>