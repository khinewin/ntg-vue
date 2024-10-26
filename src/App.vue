<template>
  <div>
    <nav-bar
    :loginEmail="loginEmail"
    :loginUid="loginUid"
    :isAuthenticated="isAuthenticated"
  ></nav-bar>

  <router-view />

  <footer-bar></footer-bar>
  </div>
</template>
<script>
import NavBar from "@/views/partials/NavBar.vue";
import FooterBar from "@/views/partials/FooterBar.vue";
//import { doc, setDoc, getDoc, collection, where, addDoc,limit, query, getDocs, startAfter,orderBy, getCountFromServer } from "firebase/firestore"; 
import db from "@/firebase/database"
import fs from "@firebase/firestore"
import { getAnalytics, logEvent } from "firebase/analytics";
import { ref, set, onValue, remove, startAt,endAt, orderByChild ,limitToLast, limitToFirst} from 'firebase/database'



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
   
     getContentsCount(){
      try{     
        const courseUrl = ref(db, "courses");
        onValue(courseUrl, (snapshot) => {
          const courseData = snapshot.val();
          if(courseData !==null) {
                const coursesCount=Object.keys(courseData).length;
                this.$store.dispatch("setCoursesCount", coursesCount)
          }
        });

        const articleUrl = ref(db, "articles");
        onValue(articleUrl, (snapshot) => {
          const articleData = snapshot.val();
          if(articleData !==null) {
                const articlesCount=Object.keys(articleData).length;
                this.$store.dispatch("setArticlesCount", articlesCount)
          }
        });

        const enrolledUrl = ref(db, "enrolledStudents");
        onValue(enrolledUrl, (snapshot) => {
          const enrolledData = snapshot.val();
          if(enrolledData !==null) {
                const enrolledCount=Object.keys(enrolledData).length;
                this.$store.dispatch("setEnrolledCount", enrolledCount)
          }
        });

        const studentsUrl = ref(db, "students");
        onValue(studentsUrl, (snapshot) => {
          const studentsData = snapshot.val();
          if(studentsData !==null) {
                const studentsCount=Object.keys(studentsData).length;
                this.$store.dispatch("setStudentsCount", studentsCount)
                const trainingsData=[]
                Object.values(studentsData).map((stu)=>{
                    trainingsData.push(...stu.courses)
                })
                this.$store.dispatch("setTrainingsCount", trainingsData.length)
                
          }
        });

     }catch(err){
          console.log("rrro")
      }finally{}
        
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
