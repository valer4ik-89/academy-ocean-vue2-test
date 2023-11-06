<template>
  <div class="course">
    <h2 class="course-title">Ласкаво просимо до нашого Міні-курсу!</h2>
    <div class="course-statistics">
      <p class="course-statistics__text">Статистика проходження кожного уроку курсу(час, витрачений на кожний урок, кількість спроб) зберігається.</p>
      <p>
        <router-link 
          class="course-statistics__link" 
          :to="{ name: 'course-statistics' }"
        >
          Тут
      </router-link>
        Ви можете проглянути свої результати.
      </p>
      
    </div>
    <div v-if="lessons.length > 0">
      <h3 class="course-subtitle">Перелік усіх уроків курсу:</h3>
      <ul class="course-lessons">
        <li 
          v-for="lesson in lessons" 
          :key="lesson.id"
        >
          <router-link
            class="course-lessons__item" 
            :to="{ 
              name: 'lesson', 
              params: { id: lesson.id } 
            }"
          >
            {{ lesson.title }}
          </router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>У цьому курсі поки що немає уроків.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CourseHomePage',
  computed: {
    ...mapGetters({
      lessons: 'getLessons',
    }),
  },
  created() {
    this.$store.dispatch('fetchLessons')
  },
}
</script>

<style lang="scss" scoped>
.course {
  &-title {
    color: var(--primary-color);
    margin-bottom: 2rem;
  }
  &-lessons__item {
    display: inline-block;
    padding: 0.5rem 0;
    color: var(--primary-color);
  }
  &-statistics {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    &__link {
      color: var(--primary-color);
    }
  }
}
</style>