import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import ResumesMain from '../views/ResumesMain.vue'
import NotFound from '../views/NotFound.vue'
import HomePage from '../views/HomePage.vue'
import store from '../store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/resumes',
    name: 'resumes',
    component: ResumesMain
  },
  {
    path: '/company',
    name: 'company',
    component: () => import('../views/CompanyMain.vue')
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: HomePage
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfilePage.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  // 使用 dispatch 呼叫 Vuex 內的 actions

  store.dispatch('fetchCurrentUser')
  next()
})

export default router
