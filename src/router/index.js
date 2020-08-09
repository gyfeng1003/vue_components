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
			path: '/toast',
			name: 'toast',
			component: () => import(/* webpackChunkName: "toast" */ '../views/toastPage')
		},
		{
			path: '/modalPage',
			name: 'modalPage',
			component: () => import(/* webpackChunkName: "modal" */ '../views/modalPage')
		},
		{
			path: '/swiper',
			name: 'swiper',
			component: () => import(/* webpackChunkName: "swiper" */ '../views/SwiperPage')
		},
		{
			path: '/circle-progress',
			name: 'CircleProgress',
			component: () => import(/* webpackChunkName: "circle-progress" */ '../views/CircleProgress')
		},
		{
			path: '/histogram',
			name: 'Histogram',
			component: () => import(/* webpackChunkName: "swiper" */ '../views/Histogram')
		}
	]
})
