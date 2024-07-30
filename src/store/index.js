import { ssrContextKey } from 'vue'
import { createStore } from 'vuex'

import { doc, setDoc, getDoc, collection, where, addDoc,limit, query, getDocs,orderBy, getCountFromServer } from "firebase/firestore"; 
import db from "@/firebase"
import { text } from '@fortawesome/fontawesome-svg-core';

 const store= createStore({
  state: {
    user : {},
    isAuth:false,
    postCount : 0,
    studentRegistrationCount: 0,
    studentsCount : 0,

    posts :[],    

    post : {},
    postShowSpinner: false,
    postError:null,
    
    articles : [],
    hasArticles: false,
    lastDoc : null,

    article : {},

    //contents count on menu
    postsCount: 0,
    articlesCount: 0,
    studentsCount:0,
    enrolledStudents:0,

    //admin courses
    courses: [],
    lastDocCourse : null,
    hasCourses: false,

    select_courses: [
      {id: 1, course : "Computer Technology, CT-1", code: "ct1"},
      {id: 2, course : "Computer Technology, CT-2", code: "ct2"},
      {id: 8, course : "Computer Technology, CT-3", code: "ct3"},
      {id: 3, course : "Programming Basic (From Zero To Moderate)", code: "pb1"},
      {id: 4, course : "Web Development Level-1", code: "wd1"},
      {id: 5, course : "Web Development Level-2", code: "wd2"},                   
      {id: 6, course : "Basic Coding & Programming For Kids Level-1", code :"bcpkid1"},
      {id: 7, course : "Basic Coding & Programming For Kids Level-2", code :"bcpkid2"},
],

  },

  getters: {
    uid : state=> state.user.uid,
    email: state=>state.user.email,
    isAuthenticated : state=> !!state.isAuth,
    postCount :state => state.postCount,
    studentRegistrationCount : state => state.studentRegistrationCount,
    studentsCount : state=>state.studentsCount,

    posts : state=>state.posts,
   

    post : state => state.post,
    postShowSpinner : state => state.postShowSpinner,
    postError : state => state.postError,

    articles : state => state.articles,
    hasArticles : state => state.hasArticles,
    lastDoc : state => state.lastDoc,    

    article : state =>state.article,

    postsCount:state =>state.postsCount,
    articlesCount:state=>state.articlesCount,
    studentsCount:state =>state.studentsCount,
    enrolledStudents:state=>state.enrolledStudents,

    //admin courses
    courses:state=>state.courses,
    lastDocCourse:state=>state.lastDocCourse,
    hasCourses:state => state.hasCourses,

    select_courses:state=>state.select_courses
  },

  mutations: {
        SET_LOGIN_USER(state, payload){
            state.user.email=payload.email;
            state.user.uid=payload.uid;
            state.isAuth=true;
        },
        SET_LOGOUT_USER(state, payload){
          state.user={}
          state.isAuth=false;
      },
      SET_POST_COUNT(state, payload){
          state.postCount=payload;
      },
      SET_STUDENT_REGISTRATION_COUNT(state, payload){
        state.studentRegistrationCount=payload;
      },
      SET_STUDENTS_COUNT(state, payload){
        state.studentsCount=payload;
      },

      SET_POSTS(state, payload){
          state.posts=payload;
      },     
      

      SET_POST(state, payload){
          state.post=payload
      },
      

    //articles
    SET_ARTICLES(state, payload){
      state.articles=payload
    }, 
    SET_LAST_DOC(state, payload){
      state.lastDoc=payload
    },
    SET_HAS_ARTICLES(state, payload){
      state.hasArticles=payload
    },
    //articles

    SET_ARTICLE(state, payload){
      state.article=payload
    }, 

    SET_CONTENTS_COUNT(state, payload){
        state.postsCount=payload.posts;
        state.articlesCount=payload.articles;
        state.studentsCount=payload.students;
        state.enrolledStudents=payload.enrolledStudents;
    },

    //admin courses
    SET_COURSES(state, payload){
      state.courses=payload.courses;
      state.lastDocCourse=payload.lastDocCourse;
      state.hasCourses=payload.hasCourses;
    }, 
   
   
  },

  actions: {
 
    setArticles(context, payload){
        context.commit("SET_ARTICLES", payload.articles)
        context.commit("SET_LAST_DOC", payload.lastDoc)
        context.commit("SET_HAS_ARTICLES", payload.hasArticles)
    },

    setArticle(context, payload){
      context.commit("SET_ARTICLE", payload.article)
    },
    setPost(context, payload){
      context.commit("SET_POST", payload.post);
    },
    setPosts(context,payload){
        context.commit("SET_POSTS", payload.posts);
    },

    setContentsCount(context, payload){
        context.commit("SET_CONTENTS_COUNT", 
          {
            posts: payload.posts,
             articles: payload.articles, 
             students: payload.students,
             enrolledStudents:payload.enrolledStudents,
            }
          );
    },

    setCourses(context, payload){
        context.commit("SET_COURSES", {courses: payload.courses, lastDocCourse: payload.lastDoc, hasCourses: payload.hasCourses})
    },


    setLoginUser(context,payload){
      context.commit("SET_LOGIN_USER", payload)
    },
    setLogoutUser(context, payload){
      context.commit("SET_LOGOUT_USER", payload)
    },
    async fetchDashboardCounts(context, payload){
     
      const coll = collection(db, "contents");
      const snapshot = await getCountFromServer(coll);
      context.commit("SET_POST_COUNT", snapshot.data().count)

      const collEnrolledStu = collection(db, "enrolled_students");
      const snapshotEnrolledStu = await getCountFromServer(collEnrolledStu);
      context.commit("SET_STUDENT_REGISTRATION_COUNT", snapshotEnrolledStu.data().count)

      const collStu = collection(db, "students");
      const snapshotStu = await getCountFromServer(collStu);
      context.commit("SET_STUDENTS_COUNT", snapshotStu.data().count)
      /*
      const q = query(collection(db, "contents"), orderBy("title", "desc"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      })
      */
    }
  },
  
})


export default store;
