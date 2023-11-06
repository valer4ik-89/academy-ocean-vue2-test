import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/',
    name: 'course-home-page',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/CourseHomePage.vue'),
  },
  { 
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('@/views/Login.vue'),
     },
  { 
    path: '/lesson/:id',
    name: 'lesson',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/Lesson.vue'),
    props: true
  },
  { 
    path: '/statistics',
    name: 'course-statistics',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/CourseStatisticsTable.vue'),
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})


router.beforeEach((to, _, next) => {
	const isAuthenticated = localStorage.getItem('userData')
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  } 
})

export default router