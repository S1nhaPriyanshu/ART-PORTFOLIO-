import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Magnetic cursor-follow effect composable.
 * Makes an element subtly follow the cursor when hovering nearby.
 */
export function useMagnetic(
  elementRef: Ref<HTMLElement | null>,
  options: {
    strength?: number
    ease?: number
  } = {}
) {
  const { strength = 0.3, ease = 0.15 } = options
  let rafId: number | null = null
  let targetX = 0
  let targetY = 0
  let currentX = 0
  let currentY = 0

  const handleMouseMove = (e: MouseEvent) => {
    if (!elementRef.value) return
    const rect = elementRef.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    targetX = (e.clientX - centerX) * strength
    targetY = (e.clientY - centerY) * strength
  }

  const handleMouseLeave = () => {
    targetX = 0
    targetY = 0
  }

  const animate = () => {
    currentX += (targetX - currentX) * ease
    currentY += (targetY - currentY) * ease

    if (elementRef.value) {
      elementRef.value.style.transform = `translate(${currentX}px, ${currentY}px)`
    }
    rafId = requestAnimationFrame(animate)
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !elementRef.value) return
    elementRef.value.addEventListener('mousemove', handleMouseMove)
    elementRef.value.addEventListener('mouseleave', handleMouseLeave)
    rafId = requestAnimationFrame(animate)
  })

  onUnmounted(() => {
    if (elementRef.value) {
      elementRef.value.removeEventListener('mousemove', handleMouseMove)
      elementRef.value.removeEventListener('mouseleave', handleMouseLeave)
    }
    if (rafId) cancelAnimationFrame(rafId)
  })
}
