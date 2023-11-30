import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostDetails from "../views/PostDetails.vue"
import StudentRegistration from '@/views/StudentRegistration.vue'
import AppLogin from "@/views/AppLogin.vue"

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
    component: StudentRegistration
  },
  {
    path: "/app-login",
    component : AppLogin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
