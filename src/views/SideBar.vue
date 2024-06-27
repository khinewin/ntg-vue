<template lang="">
   <div class="mx-2 my-2 ">
    <ul class="list-group list-group-flush">
            <li class="list-group-item"><router-link to="/dashboard" class="nav-link"><i class="fa-solid fa-earth-americas"></i> Dashboard</router-link></li>
            <li class="list-group-item" ><router-link to="/enrolled-students" class="nav-link"><i class="fa-solid fa-users"></i> Enrolled students</router-link></li>
            <li class="list-group-item"><router-link to="/students" class="nav-link"><i class="fa-solid fa-users-line"></i> Students</router-link></li>
            <li class="list-group-item"><router-link to="/new-student" class="nav-link"><i class="fa-solid fa-user-plus"></i> Add student</router-link></li>
            <li class="list-group-item"><router-link to="/add/post" class="nav-link"><i class="fa-solid fa-plus-circle"></i> Add post</router-link></li>
            <li class="list-group-item"><router-link to="/income-statement" class="nav-link"><i class="fa-solid fa-money-bill-transfer"></i> Income Statement</router-link></li>

        </ul>
   </div>
</template>
<script>
export default {
    name: "SideBar",
    data(){
        return {

        }
    }
}
</script>
<style lang="css">
     .router-link-active {
        color: #0B5ED7 !important;
        display:  block !important;
     }
</style>