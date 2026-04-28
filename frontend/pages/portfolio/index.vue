<template>
  <div class="portfolio-page">
    
    <!-- Main Background Artwork -->
    <Transition name="fade-bg" mode="out-in">
      <div :key="activeWork.id" class="main-display">
        <img :src="activeWork.image" :alt="activeWork.title" class="main-image" />
        <div class="main-overlay"></div>
      </div>
    </Transition>

    <!-- Header & Info Overlay -->
    <div class="info-overlay">
      <ChapterMarker :number="1" title="PORTFOLIO" />
      <Transition name="slide-up" mode="out-in">
        <div :key="activeWork.id" class="artwork-info">
          <span class="info-cat">{{ activeWork.category }}</span>
          <h1 class="info-title">{{ activeWork.title }}</h1>
          <p class="info-desc">{{ activeWork.description }}</p>
          <button class="btn btn-outline" @click="openLightbox(activeWorkIndex)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
            View Fullscreen
          </button>
        </div>
      </Transition>
    </div>

    <!-- Arc Menu Area -->
    <div class="arc-menu-wrapper" @wheel.prevent="onWheel">
      <div class="arc-container">
        <div 
          v-for="(work, i) in filteredWorks" 
          :key="work.id" 
          class="arc-item"
          :class="{ active: i === activeWorkIndex }"
          :style="getArcStyle(i)"
          @click="selectWork(i)"
        >
          <img :src="work.image" :alt="work.title" />
        </div>
      </div>
      <div class="scroll-instruction">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        <span>Scroll to Explore</span>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox" id="lightbox">
          <button class="lb-close" @click="closeLightbox" aria-label="Close">✕</button>
          <div class="lb-content">
            <img :src="currentWork?.image" :alt="currentWork?.title" />
            <div class="lb-info">
              <span class="text-mono">{{ currentWork?.category }}</span>
              <h3>{{ currentWork?.title }}</h3>
              <p>{{ currentWork?.description }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'

useHead({ title: 'Portfolio — Atelier Tenebris', meta: [{ name: 'description', content: 'Portfolio — environments, concept art, and digital paintings by Atelier Tenebris.' }] })

const categories = ['All', 'Environment', 'Concept Art', 'Landscape']
const activeCategory = ref('All')

const works = [
  { id: 1, title: 'Gothic Courtyard', category: 'Environment', description: 'Rain-soaked gothic courtyard with arched ruins, twisted trees, and warm stained-glass glow.', image: '/art/01-gothic-courtyard.png' },
  { id: 2, title: 'Valley Dawn', category: 'Landscape', description: 'Painterly mountain vista with winding road through fog and golden peaks.', image: '/art/02-valley-dawn.png' },
  { id: 3, title: 'Neon District', category: 'Concept Art', description: 'Cyberpunk cityscape with holographic displays and speeding vehicles.', image: '/art/03-neon-district.png' },
  { id: 4, title: 'Mountain Strata', category: 'Landscape', description: 'Abstract landscape with swirling geological patterns and painterly brushwork.', image: '/art/04-mountain-strata.png' },
  { id: 5, title: 'Emerald Factory', category: 'Concept Art', description: 'Industrial scene with psychedelic swirling neon sky and silver river.', image: '/art/05-emerald-factory.png' },
  { id: 6, title: 'Desert Cenote', category: 'Landscape', description: 'Turquoise waters in a desert canyon with submerged trees and rocky cliffs.', image: '/art/06-desert-cenote.png' },
  { id: 7, title: 'Observatory Above Clouds', category: 'Environment', description: 'Mountaintop observatory piercing through a sea of clouds at sunrise.', image: '/art/07-observatory.png' },
]

const filteredWorks = computed(() => activeCategory.value === 'All' ? works : works.filter(w => w.category === activeCategory.value))

const activeWorkIndex = ref(0)
const activeWork = computed(() => filteredWorks.value[activeWorkIndex.value] || works[0])

// --- Arc Menu Logic ---
const scrollAngle = ref(0)
let targetScrollAngle = 0
let isScrolling = false

const radius = 600
const centerX = -480
const centerY = 0
const angleSpacing = 20

function getArcStyle(index) {
  const itemBaseAngle = index * angleSpacing
  const currentAngle = itemBaseAngle + scrollAngle.value
  const rad = currentAngle * (Math.PI / 180)
  
  const x = centerX + (radius * Math.cos(rad))
  const y = centerY + (radius * Math.sin(rad))
  
  let normalizedDist = Math.abs(currentAngle) % 360
  if (normalizedDist > 180) normalizedDist = 360 - normalizedDist
  
  const scale = normalizedDist < 10 ? 1.2 : 1
  const opacity = normalizedDist > 75 ? 0 : 1
  const zIndex = normalizedDist < 10 ? 10 : 1

  return {
    transform: `translate(${x}px, ${y}px) scale(${scale})`,
    opacity,
    zIndex
  }
}

watch(scrollAngle, (newAngle) => {
  let rawIndex = Math.round(-newAngle / angleSpacing)
  const maxIndex = filteredWorks.value.length - 1
  
  if (rawIndex < 0) rawIndex = 0
  if (rawIndex > maxIndex) rawIndex = maxIndex
  
  if (activeWorkIndex.value !== rawIndex) {
    activeWorkIndex.value = rawIndex
  }
})

function onWheel(e) {
  if (isScrolling) return
  
  const direction = Math.sign(e.deltaY)
  const maxIndex = filteredWorks.value.length - 1
  
  let newIndex = activeWorkIndex.value + direction
  if (newIndex < 0) newIndex = 0
  if (newIndex > maxIndex) newIndex = maxIndex
  
  selectWork(newIndex)
}

function selectWork(index) {
  targetScrollAngle = -(index * angleSpacing)
  isScrolling = true
  
  gsap.to(scrollAngle, {
    value: targetScrollAngle,
    duration: 0.8,
    ease: "power3.out",
    onComplete: () => { isScrolling = false }
  })
}

// Lightbox Logic
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const currentWork = computed(() => filteredWorks.value[lightboxIndex.value])
function openLightbox(i) { 
  lightboxIndex.value = i; lightboxOpen.value = true; 
}
function closeLightbox() { lightboxOpen.value = false; }
</script>

<style scoped>
.portfolio-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: var(--color-obsidian);
}

/* Main Display Background */
.main-display {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: bg-scale 12s ease-out forwards;
}

@keyframes bg-scale {
  from { transform: scale(1.05); }
  to { transform: scale(1); }
}

.main-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(18,18,18,0.98) 0%, rgba(18,18,18,0.7) 40%, transparent 100%);
}

.fade-bg-enter-active, .fade-bg-leave-active { transition: opacity 1.2s ease-in-out; }
.fade-bg-enter-from, .fade-bg-leave-to { opacity: 0; }

/* Info Overlay */
.info-overlay {
  position: absolute;
  top: 50%;
  left: 350px;
  transform: translateY(-50%);
  z-index: 10;
  max-width: 500px;
  pointer-events: none;
}

.info-overlay > * { pointer-events: auto; }

.info-cat { color: var(--color-gold); font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1rem; display: block; margin-top: 2rem; }
.info-title { font-size: clamp(3rem, 5vw, 5rem); line-height: 1.1; margin-bottom: 1.5rem; text-shadow: 0 4px 20px rgba(0,0,0,0.5); }
.info-desc { font-size: 1.1rem; color: rgba(244,239,230,0.8); margin-bottom: 2.5rem; line-height: 1.6; }

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }
.slide-up-enter-from { opacity: 0; transform: translateY(30px); }
.slide-up-leave-to { opacity: 0; transform: translateY(-30px); }

/* Arc Menu */
.arc-menu-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  z-index: 20;
}

.arc-container {
  position: absolute;
  top: 50%;
  left: 0;
  width: 1px; 
  height: 1px;
}

.arc-item {
  position: absolute;
  width: 120px;
  height: 120px;
  margin-top: -60px;
  margin-left: -60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(201,169,110,0.1);
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  transition: border-color var(--duration-fast);
  will-change: transform, opacity;
}

.arc-item.active {
  border-color: var(--color-gold);
  box-shadow: var(--shadow-glow-gold);
}

.arc-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow);
}

.arc-item:hover img { transform: scale(1.1); }

.scroll-instruction {
  position: absolute;
  bottom: 3rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-gold);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.8;
}

/* Lightbox */
.lightbox { position: fixed; inset: 0; z-index: 3000; background: rgba(0,0,0,0.94); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 2rem; }
.lb-close { position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: none; color: var(--color-cream); cursor: pointer; font-size: 2rem; opacity: 0.5; transition: opacity var(--duration-fast); z-index: 1; }
.lb-close:hover { opacity: 1; }
.lb-content { max-width: 90vw; max-height: 85vh; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.lb-content img { max-width: 100%; max-height: 70vh; object-fit: contain; border-radius: 0.5rem; }
.lb-info { text-align: center; }
.lb-info .text-mono { color: var(--color-gold); }
.lb-info h3 { font-size: 1.25rem; margin-top: 0.25rem; }
.lb-info p { font-size: 0.9rem; color: rgba(244,239,230,0.6); margin-top: 0.25rem; }
.lightbox-enter-active, .lightbox-leave-active { transition: all var(--duration-normal) var(--ease-smooth); }
.lightbox-enter-from, .lightbox-leave-to { opacity: 0; }

@media (max-width: 768px) { 
  .info-overlay { left: 160px; max-width: calc(100vw - 180px); }
  .info-title { font-size: 2rem; }
  .info-desc { font-size: 0.95rem; }
  .arc-item { width: 80px; height: 80px; margin-top: -40px; margin-left: -40px; }
}
</style>
