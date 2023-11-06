<template>
  <div class="login">
    <div class="login-title">Для користуванням курсом необхідно увійти в систему</div>
    <form class="login-form" @submit.prevent="login">
      <div class="login-form__elem">
        <label class="login-form__label" for="email">Ваш Email:</label>
        <input 
          v-model="email" 
          class="login-form__input" 
          type="email" 
          id="email" 
          placeholder="Введіть email"
          required
        >
      </div>
      <base-button type="submit">Увійти</base-button>
    </form>
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: { BaseButton },
  name: 'Login',
  data() {
    return {
      email: '',
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', this.email)
      this.$router.push('/')
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  max-width: 20rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  &-title {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
  &-form {
    &__elem {
      margin-bottom: 1rem;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    &__input {
      border: 1px solid var(--grey-color);
      border-radius: 8px;
      padding: 6px 12px;
      outline: none;
      transition: box-shadow .25s ease;
      &:focus {
        box-shadow: 0 0 4pt #00d47499;
      }
    }
  }
}
</style>