import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/index',
    name: 'Index',
    redirect:'/index/welcome',
    children:[
      {
        path:'users',
        name:'Users',
        component:() => import('../views/index/users.vue')
      },
      {
        path:'welcome',
        name:'Welcome',
        component:() => import('../views/index/welcome.vue')
      },
      {
        path:'roles',
        name:'Roles',
        component:() => import('../views/index/roles.vue')
      }
    ],
    component: () => import('../views/index.vue'),
    beforeEnter(to,from,next){
      if(sessionStorage.getItem('token')){
        next()
      }else{
        next('login')
      }
    }
  },
  {
    path: 'Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  
]

const router = new VueRouter({
  routes
})

export default router
