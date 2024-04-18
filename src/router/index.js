import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostDetails from "../views/PostDetails.vue"
import StudentRegistration from '@/views/StudentRegistration.vue'
import AppLogin from "@/views/AppLogin.vue"
import store  from '@/store/index.js'
import AppDashboard from '@/views/AppDashboard'
import EnrolledStudentsVue from '@/views/EnrolledStudents.vue'
import AppStudents from "@/views/AppStudents.vue"
import AppNewStudent from "@/views/AppNewStudent.vue"
import AppEditStudent from '@/views/AppEditStudent.vue'
import AddPostVue from '@/views/AddPost.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/post/:id',
    name: 'PostDetails',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PostDetails,
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
    meta : {guest: false}
  },
  {
    path: "/dashboard",
    component: AppDashboard,
    name: "AppDashboard",
    meta : {requiresAuth : false}
  },
  {
    path: "/enrolled-students",
    component: EnrolledStudentsVue,
    name: "EnrolledStudents",
    meta : {requiresAuth : false}
  },
  {
    path: "/students",
    component: AppStudents,
    name: "AppStudents",
    meta : {requiresAuth : false}
  },
  {
    path: "/new-student",
    component: AppNewStudent,
    name: "AppNewStudent",
    meta : {requiresAuth : false}
  },
  {
    path: "/edit-student/:id", 
    component: AppEditStudent,
    name: "AppEditStudent",
    meta : {requiresAuth :false}
  },
  {
    path: "/add/post", 
    component: AddPostVue,
    name: "AddPost",
    meta : {requiresAuth :false}
  }
]




const router = createRouter({
   history: createWebHistory(),
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
