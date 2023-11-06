<template>
  <div>
    <h1 class="title">Статистика проходження курсу</h1>
    <div
      v-if="courseStatisticsForCurrentUser"
      class="table-container"
    >
      <table class="table">
        <thead>
          <tr>
            <th>Урок</th>
            <th>Час проходження</th>
            <th>Кількість спроб</th>
            <th>Дата останньої спроби</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lesson in courseStatisticsForCurrentUser" :key="lesson.id">
            <td>
              <router-link
                class="link"
                :to="{ 
                  name: 'lesson', 
                  params: { id: lesson.id } 
                }"
              >
                {{ lesson.title }}
              </router-link>
            </td>
            <td>{{ lesson.time | secondsToMinutesAndSeconds }}</td>
            <td>{{ lesson.attempts }}</td>
            <td>{{ lesson.lastAttemptDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <span>Ви не пройшли жодного уроку. Пройдіть хоча б 
      <router-link
        class="link"
        :to="{ 
          name: 'course-home-page',
        }"
      >
        один
      </router-link>
      , для збереження статистики
    </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CourseStatisticsTable',
  computed: {
    ...mapGetters({
      courseStatisticsForCurrentUser: 'getCourseStatisticsForCurrentUser',
    }),
  },
  created() {
    this.$store.dispatch('getStatisticsForCurrentUser')
  },
}
</script>

<style lang="scss" scoped>
.title {
  color: var(--primary-color);
  margin-bottom: 2rem;
}
.table-container {
    display: block;
    width: 100%;
    overflow-x: auto;
}
.table {
    td, th {
      border: 1px solid #dee2e6;
      padding: 0.75rem;
      vertical-align: top;
    }
}
.link {
  color: var(--primary-color);
}

</style>