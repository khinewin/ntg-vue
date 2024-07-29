<template>

  <nav class="navbar  navbar-bg shadow py-0 fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">
        <router-link to="/" 
          ><img 
            src="@/assets/ntg-logo-update.png"
            alt="New Tech Group Mawlamyine"
            class="navbar-img img-fluid" /></router-link
      >
      </a>
     
      <a href="#!" class="navbar-toggler circle" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span class="text-dark">
          <i class="fa-solid fa-bars"></i>
        </span>
      </a>
      <div class="offcanvas offcanvas-end navbar-bg" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">     
             <h5 class="offcanvas-title text-white fw-bold" id="offcanvasNavbarLabel">NEW TECH GROUP</h5>
                <button class="btn text-white" data-bs-dismiss="offcanvas">
                  <i class="fa-solid fa-bars"></i>
                </button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item" >
              <router-link to="/" class="nav-link text-white"  
                >
                  <span role="button" data-bs-dismiss="offcanvas"  class="d-block">
                    <i class="fa-solid fa-network-wired"></i> Courses  
                    <span class="badge badge-pill bg-dark">{{postsCount}}</span>
                  </span>
                </router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/articles" class="nav-link text-white"  
                >
                  <span data-bs-dismiss="offcanvas"  class="d-block">
                    <i class="fa-solid fa-pen-nib"></i> Articles
                    <span class="badge badge-pill bg-dark">{{articlesCount}}</span>
                  </span>
                </router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/student-registration" class="nav-link text-white" 
                >
                <span data-bs-dismiss="offcanvas"  class="d-block">
                      <i class="fa-solid fa-person-circle-plus"></i> Online
                      registration
                   
                </span> 
                </router-link>     
            </li>         
            
          </ul>

          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 text-white">
            <li class="nav-item" v-if="!isAuthenticated">
              <router-link
                to="/app-login"
                class="nav-link text-primary text-white" 
                >
                <span data-bs-dismiss="offcanvas"  class="d-block">
                  <i class="fa-solid fa-right-to-bracket"></i
                    > Signin
                </span>              
            </router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link to="/admin/dashboard" class="nav-link white-text" 
                >
                <span data-bs-dismiss="offcanvas"  class="d-block">
                  <i class="fa-solid fa-earth-americas"></i> Dashboard
                </span>
                </router-link
              >
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <span
              data-bs-dismiss="offcanvas"
                class="nav-link  text-white" 
                href="#"
                role="button">
                <i class="fa-solid fa-user"></i> {{ loginEmail }}
            </span>              
            </li>

            <li class="nav-item" v-if="isAuthenticated">
              <span
              data-bs-dismiss="offcanvas"
                class="nav-link  text-white" 
                href="#"
                @click="setLogoutUser"
                role="button">
                <i class="fa-solid fa-right-to-bracket"></i> Logout
            </span>              
            </li>
          
          </ul>
        
        </div>
      </div>
    </div>
  </nav>
  
</template>


<script >
import { getAuth, signOut } from "firebase/auth";



export default {
  name: "NavBar",
  props: ["loginEmail", "loginUid", "isAuthenticated"],
  data() {
    return {
        
    };
  },
  mounted() {
    window.addEventListener("scroll", (e) => {
      let img = document.querySelector(".navbar-img");
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        img.style.width = "50px";
      } else {
        img.style.width = "90px";
      }
    });
  },

  computed:{
      postsCount(){
        return this.$store.getters.postsCount;
      },
      articlesCount(){
        return this.$store.getters.articlesCount;
      }
  },
 
  methods: {
    setLogoutUser() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$store.dispatch("setLogoutUser");
        this.$router.push("/app-login");
      });
    },
  },
};
</script>

<style lang="css">
.nav-link,
.dropdown-item {
  font-size: 14px !important;
}
.navbar-bg {
  background: #005b80 !important;
}
.white-text {
  color: white !important;
}
.navbar-img {
  width: 90px;
  margin-top: 0;
  margin-bottom: 0;
  transition: all 0.5s;
}
.circle{
  padding: 0 !important;
  display: inline-block !important;
  width: 40px !important;
  height: 40px !important;
  border-radius: 50% !important;
  line-height: 40px !important;
  background-color: white !important;
  text-align: center !important;
}


</style>
