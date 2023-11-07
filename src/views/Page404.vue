<template>
  <div class="page-404">
    <h2>Page not found - 404</h2>
    <p>
      <router-link
        class="link"
        :to="{
          name: 'course-home-page',
        }"
      >
        На головну сторінку
      </router-link>
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.page-404 {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}
.link {
  color: var(--primary-color);
}
</style>
