<template>
  <div class="portfolio-page">
    <FloatingOrb color="teal" :size="200" top="10%" left="85%" :opacity="0.04" />

    <section class="portfolio-header">
      <ChapterMarker :number="1" title="PORTFOLIO" />
      <h1 class="page-title">Selected Works</h1>
      <p class="page-subtitle">A curated collection of environments, concept art, and digital paintings.</p>

      <div class="filter-tabs" id="portfolio-filters">
        <button v-for="cat in categories" :key="cat" class="filter-tab" :class="{ active: activeCategory === cat }" @click="activeCategory = cat">{{ cat }}</button>
      </div>
    </section>

    <!-- Masonry grid -->
    <section class="grid-section">
      <div class="masonry-grid" id="portfolio-grid">
        <div v-for="(work, i) in filteredWorks" :key="work.id" class="masonry-item" :class="[`span-${work.span || 1}`]" @click="openLightbox(i)">
          <div class="item-image">
            <img :src="work.image" :alt="work.title" loading="lazy" />
            <div class="item-overlay">
              <span class="item-cat">{{ work.category }}</span>
              <h3>{{ work.title }}</h3>
              <p>{{ work.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox" id="lightbox">
          <button class="lb-close" @click="closeLightbox" aria-label="Close">✕</button>
          <button class="lb-nav prev" @click="prevWork" aria-label="Previous">‹</button>
          <div class="lb-content">
            <img :src="currentWork?.image" :alt="currentWork?.title" />
            <div class="lb-info">
              <span class="text-mono">{{ currentWork?.category }}</span>
              <h3>{{ currentWork?.title }}</h3>
              <p>{{ currentWork?.description }}</p>
            </div>
          </div>
          <button class="lb-nav next" @click="nextWork" aria-label="Next">›</button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
useHead({ title: 'Portfolio — Atelier Tenebris', meta: [{ name: 'description', content: 'Portfolio — environments, concept art, and digital paintings by Atelier Tenebris.' }] })

const categories = ['All', 'Environment', 'Concept Art', 'Landscape']
const activeCategory = ref('All')

const works = [
  { id: 1, title: 'Gothic Courtyard', category: 'Environment', description: 'Rain-soaked gothic courtyard with arched ruins, twisted trees, and warm stained-glass glow.', image: '/art/01-gothic-courtyard.png', span: 2 },
  { id: 2, title: 'Valley Dawn', category: 'Landscape', description: 'Painterly mountain vista with winding road through fog and golden peaks.', image: '/art/02-valley-dawn.png', span: 1 },
  { id: 3, title: 'Neon District', category: 'Concept Art', description: 'Cyberpunk cityscape with holographic displays and speeding vehicles.', image: '/art/03-neon-district.png', span: 1 },
  { id: 4, title: 'Mountain Strata', category: 'Landscape', description: 'Abstract landscape with swirling geological patterns and painterly brushwork.', image: '/art/04-mountain-strata.png', span: 2 },
  { id: 5, title: 'Emerald Factory', category: 'Concept Art', description: 'Industrial scene with psychedelic swirling neon sky and silver river.', image: '/art/05-emerald-factory.png', span: 1 },
  { id: 6, title: 'Desert Cenote', category: 'Landscape', description: 'Turquoise waters in a desert canyon with submerged trees and rocky cliffs.', image: '/art/06-desert-cenote.png', span: 1 },
  { id: 7, title: 'Observatory Above Clouds', category: 'Environment', description: 'Mountaintop observatory piercing through a sea of clouds at sunrise.', image: '/art/07-observatory.png', span: 2 },
]

const filteredWorks = computed(() => activeCategory.value === 'All' ? works : works.filter(w => w.category === activeCategory.value))
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const currentWork = computed(() => filteredWorks.value[lightboxIndex.value])
function openLightbox(i) { lightboxIndex.value = i; lightboxOpen.value = true; document.body.style.overflow = 'hidden' }
function closeLightbox() { lightboxOpen.value = false; document.body.style.overflow = '' }
function nextWork() { lightboxIndex.value = (lightboxIndex.value + 1) % filteredWorks.value.length }
function prevWork() { lightboxIndex.value = (lightboxIndex.value - 1 + filteredWorks.value.length) % filteredWorks.value.length }
</script>

<style scoped>
.portfolio-page { position: relative; padding: 8rem 2rem 6rem; overflow: hidden; }
.portfolio-header { max-width: 1400px; margin: 0 auto 3rem; }
.page-title { font-size: clamp(2.5rem, 6vw, 4.5rem); margin-bottom: 0.5rem; }
.page-subtitle { font-size: 1.1rem; color: rgba(244,239,230,0.65); margin-bottom: 1.5rem; }

.filter-tabs { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.filter-tab { padding: 0.5rem 1.25rem; font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-muted); background: none; border: 1px solid rgba(201,169,110,0.1); border-radius: var(--radius-pill); cursor: pointer; transition: all var(--duration-fast) var(--ease-smooth); }
.filter-tab:hover { border-color: rgba(201,169,110,0.3); color: var(--color-cream); }
.filter-tab.active { background: var(--color-gold); border-color: var(--color-gold); color: var(--color-obsidian); }

.grid-section { max-width: 1400px; margin: 0 auto; }
.masonry-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.masonry-item { cursor: pointer; border-radius: var(--radius-card); overflow: hidden; border: 1px solid rgba(201,169,110,0.06); transition: all var(--duration-normal) var(--ease-smooth); }
.masonry-item:hover { border-color: rgba(201,169,110,0.2); box-shadow: var(--shadow-glow-gold); }
.masonry-item.span-2 { grid-column: span 2; }
.item-image { position: relative; overflow: hidden; }
.item-image img { width: 100%; height: auto; display: block; transition: transform var(--duration-slow) var(--ease-smooth); }
.masonry-item:hover .item-image img { transform: scale(1.04); }
.item-overlay { position: absolute; inset: 0; background: linear-gradient(0deg, rgba(18,18,18,0.9) 0%, rgba(18,18,18,0.3) 40%, transparent 70%); display: flex; flex-direction: column; justify-content: flex-end; padding: 1.5rem; opacity: 0; transition: opacity var(--duration-fast); }
.masonry-item:hover .item-overlay { opacity: 1; }
.item-cat { font-family: var(--font-mono); font-size: 0.55rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-gold); margin-bottom: 0.25rem; }
.item-overlay h3 { font-size: 1.25rem; color: var(--color-parchment); margin-bottom: 0.25rem; }
.item-overlay p { font-size: 0.85rem; color: rgba(244,239,230,0.6); }

.lightbox { position: fixed; inset: 0; z-index: 3000; background: rgba(0,0,0,0.94); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 2rem; }
.lb-close { position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: none; color: var(--color-cream); cursor: pointer; font-size: 2rem; opacity: 0.5; transition: opacity var(--duration-fast); z-index: 1; }
.lb-close:hover { opacity: 1; }
.lb-nav { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(35,37,40,0.5); border: 1px solid rgba(201,169,110,0.1); border-radius: 50%; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; color: var(--color-cream); cursor: pointer; font-size: 1.5rem; transition: all var(--duration-fast); z-index: 1; }
.lb-nav:hover { border-color: var(--color-gold); box-shadow: var(--shadow-glow-gold); }
.lb-nav.prev { left: 1.5rem; }
.lb-nav.next { right: 1.5rem; }
.lb-content { max-width: 90vw; max-height: 85vh; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.lb-content img { max-width: 100%; max-height: 70vh; object-fit: contain; border-radius: 0.5rem; }
.lb-info { text-align: center; }
.lb-info .text-mono { color: var(--color-gold); }
.lb-info h3 { font-size: 1.25rem; margin-top: 0.25rem; }
.lb-info p { font-size: 0.9rem; color: rgba(244,239,230,0.6); margin-top: 0.25rem; }
.lightbox-enter-active, .lightbox-leave-active { transition: all var(--duration-normal) var(--ease-smooth); }
.lightbox-enter-from, .lightbox-leave-to { opacity: 0; }

@media (max-width: 768px) { .masonry-grid { grid-template-columns: 1fr; } .masonry-item.span-2 { grid-column: span 1; } .lb-nav { display: none; } }
</style>
