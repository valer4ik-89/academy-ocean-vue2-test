import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Lesson from '@/views/Lesson.vue'
import secondsToMinutesAndSeconds from '@/filters/secondsToMinutesAndSeconds'

import { createTestStore } from './test-store'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.filter('secondsToMinutesAndSeconds', secondsToMinutesAndSeconds)

describe('Lesson', () => {
  let wrapper
  let store

  beforeEach(() => {
    store = createTestStore()
    store.dispatch("fetchLessons")
    
    wrapper = mount(Lesson, {
      localVue,
      store,
      propsData: {
        id: 1,
      },
    })
  })

  afterEach(() => {
    clearInterval(wrapper.vm.interval)
  })

  it('displays lesson content and title', () => {
    expect(wrapper.find('.lesson-title').text()).toBe('Урок 1. Що таке Vue?')
    expect(wrapper.find('.lesson-content').text()).toContain('Що таке Vue?')
  })

  it('displays the lesson time', async () => {
    await new Promise(resolve => setTimeout(resolve, 2500))

    expect(wrapper.find('.lesson-time').text()).toBe('Витрачений час: 00:02')
  })

  it('triggers the finishLesson method when navigating away', () => {
    const finishLesson = jest.spyOn(wrapper.vm, 'finishLesson')
    wrapper.destroy()

    expect(finishLesson).toHaveBeenCalled()
  })
})
