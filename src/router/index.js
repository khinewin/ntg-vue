import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostDetails from "../views/PostDetails.vue"
import StudentRegistration from '@/views/StudentRegistration.vue'
import AppLogin from "@/views/AppLogin.vue"
import store  from '@/store/index.js'
import AppDashboard from '@/views/AppDashboard'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/post/:id',
    name: 'post',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PostDetails
  },
  {
    path: "/student-registration",
    component: StudentRegistration,
    name: "StudentRegistration"
  },
  {
    path: "/app-login",
    component : AppLogin,
    name: "AppLogin",
    meta : {guest: true}
  },
  {
    path: "/dashboard",
    component: AppDashboard,
    name: "AppDashboard",
    meta : {requiresAuth : true}
  }
]




const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    router.push("/app-login")
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (!store.getters.isAuthenticated) {
      next();
      return;
    }
    router.push("/dashboard")
  } else {
    next();
  }
});

export default router
