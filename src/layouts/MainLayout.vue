<template>
  <div>
      <TheNavbar />

      <TheSidebar />

      <main class="page">
        <router-view/>
      </main>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
import TheSidebar from '@/components/TheSidebar'

export default {
  name: 'MainLayout',
  components: {
    TheNavbar,
    TheSidebar,
  },
  created() {
    this.$store.dispatch('fetchLessons')
  },
}
</script>


<style lang="scss" scoped>
.page{
  min-height: 100vh;
  padding: 5rem 1.2rem 1.2rem 18rem;
}

@media (max-width: 719px) {
  .page {
    padding: 5rem 1.2rem 1.2rem;
  }
}
</style>