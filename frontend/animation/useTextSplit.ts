import { onMounted, type Ref } from 'vue'

/**
 * Text split animation composable.
 * Splits text into characters or words and animates them in sequence.
 */
export function useTextSplit(
  elementRef: Ref<HTMLElement | null>,
  options: {
    type?: 'chars' | 'words'
    duration?: number
    stagger?: number
    delay?: number
    ease?: string
    y?: number
  } = {}
) {
  const {
    type = 'chars',
    duration = 0.8,
    stagger = 0.03,
    delay = 0,
    ease = 'power3.out',
    y = 40,
  } = options

  onMounted(async () => {
    if (typeof window === 'undefined' || !elementRef.value) return

    const { gsap } = await import('gsap')
    const el = elementRef.value
    const text = el.textContent || ''

    // Split text into spans
    const parts = type === 'chars' ? text.split('') : text.split(' ')
    el.innerHTML = parts
      .map((part) => {
        const display = type === 'words' ? part + ' ' : part
        return `<span style="display:inline-block;overflow:hidden"><span class="split-inner" style="display:inline-block">${display === ' ' ? '&nbsp;' : display}</span></span>`
      })
      .join('')

    const inners = el.querySelectorAll('.split-inner')
    gsap.from(inners, {
      y,
      opacity: 0,
      duration,
      stagger,
      delay,
      ease,
    })
  })
}
