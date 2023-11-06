import { mount, createLocalVue } from '@vue/test-utils'
import CourseHomePage from '@/views/CourseHomePage.vue'
import Vuex from 'vuex'

import { createTestStore } from './test-store'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CourseHomePage', () => {
  let wrapper
  let store

  beforeEach(() => {
    store = createTestStore()
    store.dispatch("fetchLessons")
    
    wrapper = mount(CourseHomePage, {
      localVue,
      store,
    })
  })

  it('displays the list of lessons when there are 2 or more lessons', () => {
    

    const lessonItems = wrapper.findAll('.course-lessons__item')
    expect(lessonItems.length).toBeGreaterThanOrEqual(2)
  })
})
