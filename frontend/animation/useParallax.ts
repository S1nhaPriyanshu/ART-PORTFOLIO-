import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Parallax scroll effect composable.
 * Moves an element vertically based on scroll position.
 */
export function useParallax(
  elementRef: Ref<HTMLElement | null>,
  options: {
    speed?: number
    direction?: 'up' | 'down'
  } = {}
) {
  const { speed = 0.3, direction = 'up' } = options
  let rafId: number | null = null

  const update = () => {
    if (!elementRef.value) return
    const rect = elementRef.value.getBoundingClientRect()
    const viewportCenter = window.innerHeight / 2
    const elementCenter = rect.top + rect.height / 2
    const distance = (elementCenter - viewportCenter) * speed
    const translateY = direction === 'up' ? -distance : distance

    elementRef.value.style.transform = `translateY(${translateY}px)`
    rafId = requestAnimationFrame(update)
  }

  onMounted(() => {
    if (typeof window === 'undefined') return
    rafId = requestAnimationFrame(update)
  })

  onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId)
  })
}
