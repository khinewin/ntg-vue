import { ssrContextKey } from 'vue'
import { createStore } from 'vuex'

import { doc, setDoc, getDoc, collection, where, addDoc,limit, query, getDocs,orderBy, getCountFromServer } from "firebase/firestore"; 
import db from "@/firebase/database"
import fs from "@/firebase/firestore"
import { text } from '@fortawesome/fontawesome-svg-core';

 const store= createStore({
  state: {
    user : {},
    isAuth:false,
    
    //contents count on menu
    coursesCount: 0,
    articlesCount: 0,
    studentsCount:0,
    enrolledCount:0,
    studentsCount:0,
    trainingsCount:0,

    isNewUser: true,


    select_courses: [
      {id: 1, course : "Computer Technology, CT-1", code: "ct1", course_fees: 70000, teacherFees: 0.70},
      {id: 2, course : "Computer Technology, CT-2", code: "ct2", course_fees: 100000, teacherFees: 0.70},
      {id: 8, course : "Computer Technology, CT-3", code: "ct3",course_fees: 150000, teacherFees: 0.07},
      {id: 3, course : "Programming Basic (From Zero To Moderate)", code: "pb1", course_fees: 100000,teacherFees: 0.70},
      {id: 4, course : "Web Development Level-1", code: "wd1", course_fees: 200000,teacherFees: 0.70},
      {id: 5, course : "Web Development Level-2", code: "wd2", course_fees: 200000, teacherFees: 0.70},                   
      {id: 6, course : "Basic Coding & Programming For Kids Level-1", code :"bcpkid1", course_fees: 150000, teacherFees: 0.70},
      {id: 7, course : "Basic Coding & Programming For Kids Level-2", code :"bcpkid2", course_fees: 150000, teacherFees: 0.70},
],

      //articles
      articleLimitTo: 0,
      category : null,
      article : {},

      //courses
      course:{},
      courseCategory: null,

  },

  getters: {
    uid : state=> state.user.uid,
    email: state=>state.user.email,
    isAuthenticated : state=> !!state.isAuth,
    

    coursesCount:state =>state.coursesCount,
    articlesCount:state=>state.articlesCount,
    studentsCount:state =>state.studentsCount,
    enrolledCount:state=>state.enrolledCount,
    studentsCount:state=>state.studentsCount,
    trainingsCount:state=>state.trainingsCount,

    select_courses:state=>state.select_courses,

    //article
    articleLimitTo:state=>state.articleLimitTo,
    category:state=>state.category,
   // articles : state => state.articles,

    //courses
    course:state => state.course,
    courseCategory:state=>state.courseCategory,

    isNewUser:state=>state.isNewUser,

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

    SET_COURSES_COUNT(state, payload){
        state.coursesCount=payload
    },
    SET_ARTICLES_COUNT(state, payload){
      state.articlesCount=payload
    },
    SET_ENROLLED_COUNT(state, payload){
      state.enrolledCount=payload
    },
    SET_STUDENTS_COUNT(state, payload){
      state.studentsCount=payload
    },
    SET_TRAININGS_COUNT(state, payload){
      state.trainingsCount=payload
    },

   //article
    SET_ARTICLE_LIMIT_TO(state, payload){
        state.articleLimitTo=payload
    },
    SET_CATEGORY(state, payload){
      state.category=payload
    },
    SET_ARTICLE(state, payload){
      state.article=payload
    }, 

    //course
    SET_COURSE_CATEGORY(state, payload){
      state.courseCategory=payload
    },
    SET_COURSE(state, payload){
      state.course=payload
    }, 

   SET_IS_NEW_USER(state, payload){
      state.isNewUser=payload;
   }
  },

  actions: {

    setCoursesCount(context, payload){
        context.commit("SET_COURSES_COUNT", payload)
    },
    setArticlesCount(context, payload){
      context.commit("SET_ARTICLES_COUNT", payload)
    },
    setEnrolledCount(context,payload){
      context.commit("SET_ENROLLED_COUNT", payload)
    },
    setStudentsCount(context,payload){
      context.commit("SET_STUDENTS_COUNT", payload)
    },
    setTrainingsCount(context,payload){
      context.commit("SET_TRAININGS_COUNT", payload)
    },


    //articles
    setArticleLimitTo(context, payload){
        context.commit("SET_ARTICLE_LIMIT_TO", payload)
    },
    setCategory(context, payload){
      context.commit("SET_CATEGORY", payload)
  },
  setArticle(context, payload){
    context.commit("SET_ARTICLE", payload.article)
  },

  //courses
  setCourseCategory(context, payload){
    context.commit("SET_COURSE_CATEGORY", payload)
  },
  setCourse(context, payload){
    context.commit("SET_COURSE", payload)
  },

    setIsNewUser(context, payload){
        context.commit("SET_IS_NEW_USER", payload)
    },



    setLoginUser(context,payload){
      context.commit("SET_LOGIN_USER", payload)
    },
    setLogoutUser(context, payload){
      context.commit("SET_LOGOUT_USER", payload)
    },
 

  },
  
})


export default store;
