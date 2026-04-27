import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Floating/antigravity animation composable.
 * Creates a gentle, organic floating motion for decorative elements.
 */
export function useAntigravity(
  elementRef: Ref<HTMLElement | null>,
  options: {
    intensity?: number
    speed?: number
    rotation?: number
  } = {}
) {
  const { intensity = 20, speed = 4, rotation = 5 } = options
  let startTime: number | null = null
  let rafId: number | null = null

  const animate = (timestamp: number) => {
    if (!startTime) startTime = timestamp
    const elapsed = (timestamp - startTime) / 1000

    if (elementRef.value) {
      const y = Math.sin(elapsed / speed * Math.PI * 2) * intensity
      const rotate = Math.sin(elapsed / (speed * 1.3) * Math.PI * 2) * rotation
      elementRef.value.style.transform = `translateY(${y}px) rotate(${rotate}deg)`
    }

    rafId = requestAnimationFrame(animate)
  }

  onMounted(() => {
    if (typeof window === 'undefined') return
    rafId = requestAnimationFrame(animate)
  })

  onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId)
  })
}
