import { ref, onMounted, onUnmounted, type Ref } from 'vue'

/**
 * GSAP scroll-reveal animation composable.
 * Fades in + translates elements when they enter the viewport.
 */
export function useReveal(
  elementRef: Ref<HTMLElement | null>,
  options: {
    y?: number
    x?: number
    opacity?: number
    duration?: number
    delay?: number
    ease?: string
    once?: boolean
  } = {}
) {
  const {
    y = 60,
    x = 0,
    opacity = 0,
    duration = 1,
    delay = 0,
    ease = 'power3.out',
    once = true,
  } = options

  const isRevealed = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(async () => {
    if (typeof window === 'undefined' || !elementRef.value) return

    const { gsap } = await import('gsap')

    gsap.set(elementRef.value, { y, x, opacity })

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(elementRef.value, {
              y: 0,
              x: 0,
              opacity: 1,
              duration,
              delay,
              ease,
            })
            isRevealed.value = true
            if (once && observer) {
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(elementRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { isRevealed }
}
