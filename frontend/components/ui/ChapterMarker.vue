<template>
  <div class="chapter-marker" :class="{ centered, compact }">
    <span class="chapter-num">{{ String(number).padStart(2, '0') }}</span>
    <div class="chapter-divider" />
    <span class="chapter-label">{{ title }}</span>
  </div>
</template>

<script setup>
defineProps({
  number: { type: Number, required: true },
  title: { type: String, required: true },
  centered: { type: Boolean, default: false },
  compact: { type: Boolean, default: false },
})
</script>

<style scoped>
.chapter-marker {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.chapter-marker.centered {
  justify-content: center;
}

.chapter-marker.compact {
  margin-bottom: 1rem;
}

.chapter-num {
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 300;
  color: var(--color-lavender);
  opacity: 0.4;
  line-height: 1;
}

.chapter-divider {
  width: 40px;
  height: 1px;
  background: var(--color-gold);
  opacity: 0.4;
}

.chapter-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-gold);
}
</style>
