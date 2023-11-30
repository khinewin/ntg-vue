import { ssrContextKey } from 'vue'
import { createStore } from 'vuex'


export default createStore({
  state: {
    user : {},
    isLogin : false
  },
  getters: {
  },
  mutations: {
    SET_LOGIN_USER(state, payload){
        state.isLogin=true;
        state.user.email=payload.email;
        state.user.uid=payload.uid;
    },
    SET_LOGOUT_USER(state, payload){
      state.isLogin=false;
      state.user={}
  }
  },
  actions: {
    setLoginUser(context,payload){
      context.commit("SET_LOGIN_USER", payload)
    },
    setLogoutUser(context, payload){
      context.commit("SET_LOGOUT_USER", payload)
    }
  },
  
})
