<template>
  <div
    v-if="lesson"
    class="lesson"
  >
    <main>
      <h2 class="lesson-title">{{ lesson.title }}</h2>
      <p class="lesson-time">Витрачений час: {{ time | secondsToMinutesAndSeconds }}</p>
      <div 
        v-html="lesson.content"
        class="lesson-content"
      />
    </main>
    <footer class="lesson-footer">
      <router-link
        v-if="neighboringLessonsLinks.prevLink"
        class="prev-link"
        :to="neighboringLessonsLinks.prevLink.to"
      >
        <span class="link-subtitle">Попередній</span>
        <span class="link-title">{{ neighboringLessonsLinks.prevLink.title }}</span>
      </router-link>
      <div v-else></div>

      <router-link
        v-if="neighboringLessonsLinks.nextLink"
        class="next-link"
        :to="neighboringLessonsLinks.nextLink.to"
      >
        <span class="link-subtitle">Наступний</span>
        <span class="link-title">{{ neighboringLessonsLinks.nextLink.title }}</span>
      </router-link>
      <router-link
        v-else
        class="next-link"
        :to="{ name: 'course-statistics' }"
      >
        <span class="link-subtitle">Останній урок</span>
        <span class="link-title">Завершити курс</span>
      </router-link>
      
    </footer>
  </div>

  <div v-else>
    <p>Урок не знайдено.</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Lesson',
  props: {
    id: [Number, String],
  },
  data() {
    return {
      time: 0,
      interval: null,
    }
  },
  computed: {
    ...mapGetters({
      lesson: 'getCurrentLesson',
      neighboringLessonsLinks: 'getNeighboringLessonsLinks',
    }),
  },
  watch:{
    id() {
      this.finishLesson()
      this.refetchLesson()
    }
  },
  mounted() {
    this.fetchLesson();
    this.runTimer()
  },
  beforeDestroy() {
    this.finishLesson()
    clearInterval(this.interval)
  },
  methods: {
    fetchLesson() {
      this.$store.dispatch('fetchCurrentLesson', this.id)
    },
    refetchLesson() {
      this.time = 0
      clearInterval(this.interval)
      this.fetchLesson()
      this.runTimer()
    },
    runTimer() {
      this.interval = setInterval(() => {
        this.time++
      }, 1000)
    },
    finishLesson() {
      this.$store.dispatch('updateLessonStatistics', { time: this.time })
    },
  },
}
</script>

<style lang="scss" scoped>
.lesson {

  &-title {
    font-size: 1.5rem;
    color: var(--primary-color);
  }
  &-time {
    font-size: 0.8rem;
    color: var(--primary-color);
  }
  &-content {
    margin: 1rem 0;
  }
  &-footer {
    border-top: 1px solid var(--light-grey-color);
    padding-top: 1rem;
    display: flex;
    justify-content: space-between;
    .prev-link, .next-link {
      display: flex;
      flex-direction: column;
    }
    .next-link{
      align-items: end;
    }
    .link-subtitle {
      font-size: 0.7rem;
    }
    .link-title {
      font-weight: 500;
      color: var(--primary-color);
    }
  }
      
}
</style>