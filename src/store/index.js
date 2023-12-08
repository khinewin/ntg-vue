import { ssrContextKey } from 'vue'
import { createStore } from 'vuex'

import { doc, setDoc, collection, addDoc, query, getDocs,orderBy, getCountFromServer } from "firebase/firestore"; 
import db from "../firebase"

 const store= createStore({
  state: {
    user : {},
    isAuth:false,
    postCount : 0,
    studentRegistrationCount: 0,
    studentsCount : 0,
  },
  getters: {
    uid : state=> state.user.uid,
    email: state=>state.user.email,
    isAuthenticated : state=> !!state.isAuth,
    postCount :state => state.postCount,
    studentRegistrationCount : state => state.studentRegistrationCount,
    studentsCount : state=>state.studentsCount
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
      }
  },

  actions: {
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
