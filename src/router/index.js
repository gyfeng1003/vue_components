import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "scroller" */ '../views/Home')
    },
    {
      path: '/loading',
      name: 'loading',
      component: () => import(/* webpackChunkName: "loading" */ '../views/Loading')
    },
    {
      path: '/swiper',
      name: 'swiper',
      component: () => import(/* webpackChunkName: "swiper" */ '../views/SwiperPage')
    }
  ]
})
