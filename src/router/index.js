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
      },
      {
        path:'add',
        name:'Add',
        component:() => import('../views/index/add.vue')
      },
      {
        path:'goods',
        name:'Goods',
        component:() => import('../views/index/goods.vue'),
      },
      {
        path:'params',
        name:'Params',
        component:() => import('../views/index/params.vue')
      },
      {
        path:'orders',
        name:'Orders',
        component:() => import('../views/index/orders.vue')
      },
      {
        path:'reports',
        name:'Reports',
        component:() => import('../views/index/reports.vue')
      },
      {
        path:'categories',
        name:'Categories',
        component:() => import('../views/index/categories.vue')
      },
      {
        path:'rights',
        name:'Rights',
        component:() => import('../views/index/rights.vue')
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
