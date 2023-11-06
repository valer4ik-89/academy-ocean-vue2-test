<template>
  <header class="navbar">
    <div class="navbar-left">
      <div 
        class="sidebar-button cursor-pointer" 
        @click.stop="toogleSidebar"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 448 512" 
          class="icon"
        >
          <path fill="currentColor"
            d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z">
          </path>
        </svg>
      </div>
      <h1 class="navbar-course-name">
        <router-link :to="{ name: 'course-home-page' }">Міні-курс</router-link>
      </h1>
    </div>

    <div class="navbar-right">
      <p class="navbar-user">{{ userData }}</p>
      <a 
        class="navbar-logout" 
        href="#" 
        @click.prevent="logout"
      >Logout</a>
    </div>
  </header>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheNavbar.vue',
  computed: {
    ...mapGetters({
      userData: 'getUserData',
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    toogleSidebar() {
      this.$store.commit('TOOGLE_SIDEBAR')
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid var(--light-grey-color);

  &-left {
    display: flex;
    align-items: center;
  }
  &-right {
    max-width: 50%;
  }

  &-logout {
    color: var(--text-grey);
  }

  &-logout {
    float: right;

    &:hover {
      color: var(--primary-color);
    }
  }

  &-course-name {
    font-size: 1.5rem;
    margin-left: 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &-user {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.sidebar-button {
  display: none;

  .icon {
    display: block;
    width: 1.25rem;
    height: 1.25rem;
  }
}

@media (max-width: 719px) {
  .sidebar-button {
    display: block;
  }

  .navbar {
    &-user, &-logout {
      font-size: 0.8rem;
    }
    &-course-name {
      font-size: 1.2rem;
    }
  }

}</style>