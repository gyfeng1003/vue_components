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
		},
		{
			path: '/audio-player',
			name: 'AudioPlayer',
			component: () => import(/* webpackChunkName: "audio-player" */ '../views/AudioPlayer')
		},
		{
			path: '/jssdk-demo',
			name: 'JsSDKDemo',
			component: () => import(/* webpackChunkName: "jssdk-demo" */ '../views/JsSdkDemo')
		},
		{
			path: '/activity-template',
			name: 'ActivityTemplate',
			component: () => import(/* webpackChunkName: "ActivityTemplate" */ '../views/activity/ActivityTemplate.vue')
		},
		{
			path: '/metro',
			name: 'transport',
			component: () => import(/* webpackChunkName: "transport" */ '../views/transport/transport.vue')  
		},
		{
			path: '/payment-page',
			name: 'PaymentPage',
			component: () => import(/* webpackChunkName: "PaymentPage" */ '../views/paymentPage.vue')
		},
		{
			path: '/pwdinput-page',
			name: 'PaymentPage',
			component: () => import(/* webpackChunkName: "PwdInputPage" */ '../views/PwdInputPage.vue')
		}
	]
})
