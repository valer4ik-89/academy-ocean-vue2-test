<template>
  <button
    class="base-button"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.base-button {
  background-color: var(--primary-color);
  color: #fff;
  padding: 0.3rem 1rem;
  outline: none;
  border-radius: 0.4rem;
  border: 1px solid transparent;
  transition: all .2s ease;
  &:hover {
    background-color: #fff;
    color: var(--primary-color);
    border-color: var(--primary-color);
  }
}
</style>
