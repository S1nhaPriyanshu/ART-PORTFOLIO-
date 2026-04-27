<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="sparkle-icon"
    :class="{ animated }"
    :style="{ color: color }"
  >
    <path
      d="M12 0L13.5 9L22 12L13.5 15L12 24L10.5 15L2 12L10.5 9L12 0Z"
      fill="currentColor"
    />
  </svg>
</template>

<script setup>
defineProps({
  size: { type: Number, default: 16 },
  color: { type: String, default: 'var(--color-gold)' },
  animated: { type: Boolean, default: false },
})
</script>

<style scoped>
.sparkle-icon {
  flex-shrink: 0;
}
.sparkle-icon.animated {
  animation: sparkle-pulse 3s ease-in-out infinite;
}
</style>
