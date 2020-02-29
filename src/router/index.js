import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/store/home'
  },
  {
    path: '/ebook',
    name: 'Ebook',
    component: () => import('../views/ebook/index.vue'),
    children: [
      {
        path: ':fileName',
        component: () => import('../components/ebook/EbookReader.vue')
      }
    ]
  },
  {
    path: '/store',
    name: 'Store',
    component: () => import('../views/store/index'),
    redirect: '/store/home',
    children: [
      {
        path: 'home',
        component: () => import('../views/store/StoreHome')
      },
      {
        path: 'list',
        component: () => import('../views/store/StoreList')
      },
      {
        path: 'detail',
        component: () => import('../views/store/StoreDetail')
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
