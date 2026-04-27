<template>
  <div class="glass-card" :class="{ hoverable }">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  hoverable: { type: Boolean, default: true },
})
</script>

<style scoped>
.glass-card {
  background: rgba(35, 37, 40, 0.5);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(201, 169, 110, 0.08);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  padding: 1.5rem;
}

.glass-card.hoverable {
  transition: all var(--duration-normal) var(--ease-smooth);
}

.glass-card.hoverable:hover {
  border-color: rgba(201, 169, 110, 0.25);
  box-shadow: var(--shadow-glow-gold);
  transform: translateY(-4px);
}
</style>
