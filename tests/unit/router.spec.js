import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import router from '@/router'
import store from '@/store'
import App from '@/App.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('Router', () => {
  it('navigates to the home page when user is authenticated', async () => {
    localStorage.setItem('userData', 'example@mail.com')

    const wrapper = mount(App, {
      localVue,
      router,
      store,
    })

    await router.push({ name: 'course-home-page' })

    expect(wrapper.find('.course-title').text()).toBe('Ласкаво просимо до нашого міні-курсу!')
  })

  it('navigates to the login page when user is not authenticated', async () => {
    localStorage.removeItem('userData')

    const wrapper = mount(App, {
      localVue,
      router,
      store,
    })

    await router.push({ 
      name: 'course-statistics',
    }).catch((e) => e)


    expect(wrapper.vm.$route.name).toBe('login')
  })
})