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
import NavBar from "@/views/partials/NavBar.vue";
import FooterBar from "@/views/partials/FooterBar.vue";
import { doc, setDoc, getDoc, collection, where, addDoc,limit, query, getDocs, startAfter,orderBy, getCountFromServer } from "firebase/firestore"; 
import db from "@/firebase"
import { getAnalytics, logEvent } from "firebase/analytics";



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

  created(){
    this.getContentsCount();
    this.checkLogin();
    this.makeAnalytics();
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

    makeAnalytics(){
      const analytics = getAnalytics();
      logEvent(analytics, 'notification_received');
    },
   
    async getContentsCount(){
      try{
        const posts = query(collection(db, "contents"));
        let postsSnap = await getCountFromServer(posts); 

        const articles = query(collection(db, "articles"));
        let articlesSnap = await getCountFromServer(articles); 

        const students = query(collection(db, "students"));
        let studentsSnap = await getCountFromServer(students); 

        const enrolled = query(collection(db, "enrolled_students"));
        let enrolledSnap = await getCountFromServer(enrolled); 

        this.$store.dispatch("setContentsCount", {
          posts: postsSnap.data().count, 
          articles: articlesSnap.data().count,
          students : studentsSnap.data().count,
          enrolledStudents: enrolledSnap.data().count,
        })
      }catch(err){

      }finally{
        
      }
    },

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
