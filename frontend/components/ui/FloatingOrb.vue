<template>
  <div
    class="floating-orb"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      top: top,
      left: left,
      opacity: opacity,
      background: orbGradient,
      animationDuration: `${speed}s`,
    }"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: { type: String, default: 'gold' },
  size: { type: Number, default: 200 },
  top: { type: String, default: '50%' },
  left: { type: String, default: '50%' },
  opacity: { type: Number, default: 0.06 },
  intensity: { type: Number, default: 20 },
  speed: { type: Number, default: 5 },
})

const colorMap = {
  gold: 'var(--color-gold)',
  teal: 'var(--color-teal)',
  lavender: 'var(--color-lavender)',
  rose: 'var(--color-rose)',
  ember: 'var(--color-ember)',
}

const orbGradient = computed(() => {
  const c = colorMap[props.color] || props.color
  return `radial-gradient(circle, ${c} 0%, transparent 70%)`
})
</script>

<style scoped>
.floating-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  filter: blur(60px);
  animation: float-gentle var(--duration-glacial) ease-in-out infinite;
}
</style>
