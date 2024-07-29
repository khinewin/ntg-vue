import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import PostDetails from "@/views/home/PostDetails.vue"
import AppLogin from "@/views/auth/AppLogin.vue"
import store  from '@/store/index.js'

import AppDashboard from '@/views/admin/AppDashboard'

import StudentRegistration from '@/views/admin/students/StudentRegistration.vue'
import EnrolledStudentsVue from '@/views/admin/students/EnrolledStudents.vue'
import AppStudents from "@/views/admin/students/AppStudents.vue"
import AppNewStudent from "@/views/admin/students/AppNewStudent.vue"
import AppEditStudent from '@/views/admin/students/AppEditStudent.vue'

import AppIncomeStatement from '@/views/admin/shared/AppIncomeStatement.vue'
import AppSpendingTask from '@/views/admin/shared/AppSpendingTask.vue'
import AppRevenueTask from '@/views/admin/shared/AppRevenueTask.vue'
import AppSharedStatement from '@/views/admin/shared/AppSharedStatement.vue'

//home articles
import AppArticles from '@/views/articles/AppArticles.vue'
import ArticleDetails from '@/views/articles/ArticleDetails.vue'
import SearchArticles from '@/views/articles/SearchArticles.vue'

//admin articles
import NewArticle from '@/views/admin/articles/NewArticle.vue'
import ShowArticles from '@/views/admin/articles/ShowArticles.vue'
import EditArticle from '@/views/admin/articles/EditArticle.vue'

import NewCourse from '@/views/admin/courses/NewCourse.vue'
import ShowCourses from '@/views/admin/courses/ShowCourses.vue'
import EditCourse from '@/views/admin/courses/EditCourse.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/articles',
    name: 'AppArticles',
    component: AppArticles
  },
  {
    path: '/articles/search',
    name: 'SearchArticles',
    component: SearchArticles
  },
  {
    path: '/article/:id',
    name: 'ArticleDetails',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ArticleDetails,
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
    path: "/admin/dashboard",
    component: AppDashboard,
    name: "AppDashboard",
    meta : {requiresAuth : true}
  },
  {
    path: "/admin/enrolled-students",
    component: EnrolledStudentsVue,
    name: "EnrolledStudents",
    meta : {requiresAuth : true}
  },
  {
    path: "/admin/students",
    component: AppStudents,
    name: "AppStudents",
    meta : {requiresAuth : true}
  },
  {
    path: "/admin/new-student",
    component: AppNewStudent,
    name: "AppNewStudent",
    meta : {requiresAuth : true}
  },
  {
    path: "/admin/edit-student/:id", 
    component: AppEditStudent,
    name: "AppEditStudent",
    meta : {requiresAuth :true}
  },
  {
    path: "/admin/courses/new", 
    component: NewCourse,
    name: "NewCourse",
    meta : {requiresAuth :true}
  },
  {
    path: "/admin/courses", 
    component: ShowCourses,
    name: "ShowCourses",
    meta : {requiresAuth :true}
  },
  {
    path: "/admin/courses/:id/edit", 
    component: EditCourse,
    name: "EditCourse",
    meta : {requiresAuth :true}
  },
//admin articles
  {
    path: "/admin/articles/new", 
    component: NewArticle,
    name: "NewArticle",
    meta : {requiresAuth :false}
  },
  {
    path: "/admin/articles", 
    component: ShowArticles,
    name: "ShowArticles",
    meta : {requiresAuth :false}
  },
  {
    path: "/admin/articles/:id/edit", 
    component: EditArticle,
    name: "EditArticle",
    meta : {requiresAuth :false}
  },


  {
    path: "/admin/income-statement", 
    component: AppIncomeStatement,
    name: "IncomeStatement",
    meta : {requiresAuth :true}
  },
  {
    path: "/admin/spanding-task", 
    component: AppSpendingTask,
    name: "AppSpendingTask",
    meta : {requiresAuth :true}
  },
  {
    path: "/admin/revenue-task", 
    component: AppRevenueTask,
    name: "AppRevenueTask",
    meta : {requiresAuth :true}
  },
  {
    path: "/admin/shared-statement", 
    component: AppSharedStatement,
    name: "AppSharedStatement",
    meta : {requiresAuth :true}
  }
]




const router = createRouter({
  
   history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      // always scroll to top
      if(savedPosition){
        return savedPosition
      }else{
        //return { top: 0 }
      }
      
    },
    
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
