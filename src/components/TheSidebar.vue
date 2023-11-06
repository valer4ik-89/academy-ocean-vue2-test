<template>
  <nav
    v-click-outside="closeSidebar"
    class="sidebar" 
    :class="{ open: isOpen }"
  >
    <ul class="sidebar-links">
      <li 
        v-for="link in allLinks" 
        :key="link.id"
      >
        <router-link
          class="sidebar-link"
          active-class="active" 
          :to="link.to" 
          @click.native="closeSidebar"
        >
          {{ link.title }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheSidebar',
  computed: {
    ...mapGetters({
      lessonsLinks: 'getLessonsLinks',
      isOpen: 'getIsSidebarOpen',
    }),
    allLinks() {
      return [
        ...this.lessonsLinks,
        {
          id: 'statistic',
          title: 'Cтатистика курсу',
          to: {
            name: 'course-statistics'
          },
        }
      ]
    }
  },
  methods: {
    closeSidebar() {
      this.$store.commit('CLOSE_SIDEBAR')
    },
  },
}
</script>

<style lang="scss" scoped>
nav.sidebar {
  font-size: 16px;
  background-color: #fff;
  width: 16rem;
  position: fixed;
  z-index: 5;
  margin: 0;
  top: 4rem;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  border-right: 1px solid  var(--light-grey-color);
  overflow-y: auto;
  .sidebar-link {
    display: block;
    font-size: 1rem;
    padding: 0.8rem 1rem;
    &:hover {
      color: var(--primary-color);
    }
    &.active{
      font-weight: 600;
      color: var(--primary-color);
      border-left: 3px solid var(--primary-color);
    }
  }
}

@media (max-width: 719px) {
  nav.sidebar {
    transform: translateX(-100%);
    transition: transform .2s ease;
    &.open {
      transform: translateX(0);
    }
  }
}
</style>

