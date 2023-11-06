import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import CourseStatisticsTable from '@/views/CourseStatisticsTable.vue'
import secondsToMinutesAndSeconds from '@/filters/secondsToMinutesAndSeconds'

import { createTestStore } from './test-store'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.filter('secondsToMinutesAndSeconds', secondsToMinutesAndSeconds)

describe('CourseStatisticsTable', () => {
  let wrapper
  let store

  beforeEach(() => {
    store = createTestStore()

    const mockCourseStatistics = [
      {
        id: 1,
        title: 'Lesson 1',
        time: 300,
        attempts: 2,
        lastAttemptDate: '2023-10-30',
      },
      {
        id: 2,
        title: 'Lesson 2',
        time: 450,
        attempts: 3,
        lastAttemptDate: '2023-10-31',
      },
    ]

    wrapper = mount(CourseStatisticsTable, {
      localVue,
      store,
    })

    store.commit('SET_COURSE_STATISTICS_FOR_CURRENT_USER', mockCourseStatistics)
  })

  it('displays course statistics data', () => {
    expect(wrapper.text()).toContain('Lesson 1')
    expect(wrapper.text()).toContain('Lesson 2')
    expect(wrapper.text()).toContain('05:00')
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('3')
    expect(wrapper.text()).toContain('2023-10-30')
    expect(wrapper.text()).toContain('2023-10-31')
  })

  it('displays a message when no course statistics are available', async () => {
    store.commit('SET_COURSE_STATISTICS_FOR_CURRENT_USER', null)

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Ви не пройшли жодного уроку')
  })
})
