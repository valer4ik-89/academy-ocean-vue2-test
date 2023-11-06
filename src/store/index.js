import Vue from 'vue'
import Vuex from 'vuex'
import { fetchAllLessons, fetchLessonById } from '@/services'
import { generateLessonLinkObject } from '@/helpers/generateLessonLinkObject'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    isSidebarOpen: false,
    userData: localStorage.getItem('userData') || null,
    lessons: [],
    currentLesson: null,
    courseStatistics: JSON.parse(localStorage.getItem('courseStatistics')) || {},
    courseStatisticsForCurrentUser: null,
  },
  getters: {
    getIsSidebarOpen: state => state.isSidebarOpen,
    getUserData: state => state.userData,
    isAuthorized: state => !!state.userData,
    getLessons: state => state.lessons,
    getLessonsLinks: state => {
      return state.lessons.map(generateLessonLinkObject)
    },
    getNeighboringLessonsLinks: state => {
      const currentLessonId = state.currentLesson.id
      const currentLessonIndex = state.lessons.findIndex(item => item.id === currentLessonId)
      const neighboringLessonsLinks = {}
      if(currentLessonIndex === 0) {
        const nextLesson = state.lessons[currentLessonIndex + 1]
        neighboringLessonsLinks.nextLink = generateLessonLinkObject(nextLesson)
      } else if(currentLessonIndex === state.lessons.length - 1) {
        const prevLesson = state.lessons[currentLessonIndex - 1]
        neighboringLessonsLinks.prevLink = generateLessonLinkObject(prevLesson)
      } else {
        const nextLesson = state.lessons[currentLessonIndex + 1]
        const prevLesson = state.lessons[currentLessonIndex - 1]
        neighboringLessonsLinks.nextLink = generateLessonLinkObject(nextLesson) 
        neighboringLessonsLinks.prevLink = generateLessonLinkObject(prevLesson)
      }
      return neighboringLessonsLinks
    },
    getCurrentLesson: state => state.currentLesson,
    getCourseStatistics: state => state.courseStatistics,
    getCourseStatisticsForCurrentUser: state => state.courseStatisticsForCurrentUser,
  },
  mutations: {
    TOOGLE_SIDEBAR(state) {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    CLOSE_SIDEBAR(state) {
      state.isSidebarOpen = false
    },
    SET_USER_DATA(state, val) {
      localStorage.setItem('userData', val)
      state.userData = val
    },
    REMOVE_USER_DATA(state) {
      localStorage.removeItem('userData')
      state.userData = null
    },
    SET_LESSONS(state, val) {
      state.lessons = val
    },
    SET_CURRENT_LESSON(state, val) {
      state.currentLesson = val
    },
    UPDATE_COURSE_STATISTICS(state, payload) {
      localStorage.setItem('courseStatistics', JSON.stringify(payload))
      state.courseStatistics = payload
    },
    SET_COURSE_STATISTICS_FOR_CURRENT_USER(state, val) {
      state.courseStatisticsForCurrentUser = val
    },
  },
  actions: {
    login({ commit }, payload) {
      commit('SET_USER_DATA', payload)
    },
    logout({ commit }) {
      commit('REMOVE_USER_DATA')
    },
    async fetchLessons({ commit }) {
      const lessons = await fetchAllLessons()
      commit('SET_LESSONS', lessons)
    },
    async fetchCurrentLesson({ commit }, id) {
      const lesson = await fetchLessonById(id)
      commit('SET_CURRENT_LESSON', lesson)
    },
    updateLessonStatistics({ commit, getters }, { time }) {
      const courseStatistics = getters.getCourseStatistics
      const userData = getters.getUserData
      const { id, title } = getters.getCurrentLesson

      if (!courseStatistics[userData]) {
        courseStatistics[userData] = []
      }

      const userCourseStatistics = courseStatistics[userData]
      const lessonInStatistic = userCourseStatistics.find(item => item.id === id)

      if (!lessonInStatistic) {
        userCourseStatistics.push({
          id,
          title,
          time,
          attempts: 1,
          lastAttemptDate: new Date().toLocaleString(),
        })
      } else {
        lessonInStatistic.time += time
        lessonInStatistic.attempts++
        lessonInStatistic.lastAttemptDate = new Date().toLocaleString()
      }

      commit('UPDATE_COURSE_STATISTICS', courseStatistics)
    },
    getStatisticsForCurrentUser({ commit, getters }) {
      const courseStatistics = getters.getCourseStatistics
      const userData = getters.getUserData
      const courseStatisticsForCurrentUser = courseStatistics[userData]
      commit('SET_COURSE_STATISTICS_FOR_CURRENT_USER', courseStatisticsForCurrentUser)
    },
  }
})
