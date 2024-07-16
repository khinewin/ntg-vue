<template>
  <nav-bar
    :loginEmail="loginEmail"
    :loginUid="loginUid"
    :isAuthenticated="isAuthenticated"
  ></nav-bar>

  <router-view />

  <footer-bar></footer-bar>
</template>
<script>
import NavBar from "./views/NavBar.vue";
import FooterBar from "./views/FooterBar.vue";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default {
  components: {
    NavBar,
    FooterBar,
  },
  data() {
    return {};
  },

  mounted() {
    this.checkLogin();
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    loginEmail() {
      return this.$store.getters.email;
    },
    loginUid() {
      return this.$store.getters.uid;
    },
  },

  methods: {
    checkLogin() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.$store.dispatch("setLoginUser", user);
        }
      });
    },
  },
};
</script>
<style>
.home {
  margin-top: 115px;
}
</style>
