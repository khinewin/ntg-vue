<template>
  <nav class="navbar navbar-expand-lg navbar-bg shadow fixed-top py-0">
    <div class="container">
      <a class="navbar-brand" href="#!"
        ><router-link to="/"
          ><img
            src="../assets/ntg-logo-update.png"
            alt="New Tech Group Mawlamyine"
            class="navbar-img img-fluid" /></router-link
      ></a>
      <button
        class="navbar-toggler bg-secondary-subtle"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-5 mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/articles" class="nav-link text-white"
              ><i class="fa-regular fa-newspaper"></i> Articles</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/student-registration" class="nav-link text-white"
              ><i class="fa-solid fa-person-circle-plus"></i> Student
              registration</router-link
            >
          </li>
        </ul>

        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 text-white">
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link
              to="/app-login"
              class="nav-link text-primary text-white"
              ><i class="fa-solid fa-right-to-bracket"></i
            ></router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link to="/dashboard" class="nav-link white-text"
              ><i class="fa-solid fa-earth-americas"></i> Dashboard</router-link
            >
          </li>
          <li class="nav-item dropdown" v-if="isAuthenticated">
            <a
              class="nav-link dropdown-toggle text-white"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa-solid fa-user"></i> {{ loginEmail }}
            </a>
            <ul class="dropdown-menu">
              <li class="nav-item">
                <router-link
                  to="#!"
                  @click="setLogoutUser"
                  class="dropdown-item"
                  ><i class="fa-solid fa-right-from-bracket"></i> Logout
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "NavBar",
  props: ["loginEmail", "loginUid", "isAuthenticated"],
  data() {
    return {};
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

</style>
