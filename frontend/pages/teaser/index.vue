<template>
  <div class="teaser-page">
    <FloatingOrb color="lavender" :size="300" top="20%" left="-5%" :opacity="0.05" />
    <FloatingOrb color="ember" :size="180" top="60%" left="80%" :opacity="0.03" />

    <section class="teaser-header">
      <ChapterMarker :number="4" title="COMING SOON" />
      <h1 class="page-title">Upcoming Projects</h1>
      <p class="page-subtitle">Mysterious works in progress — revealed soon.</p>
    </section>

    <!-- Blurred teaser cards -->
    <section class="teaser-grid">
      <div v-for="(teaser, i) in teasers" :key="i" class="teaser-card">
        <div class="teaser-image">
          <img :src="teaser.image" :alt="teaser.title" loading="lazy" />
          <div class="blur-overlay" />
          <div class="teaser-content">
            <SparkleIcon :size="24" :animated="true" />
            <h3>{{ teaser.title }}</h3>
            <span class="teaser-date text-mono">{{ teaser.date }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter-section">
      <div class="newsletter-inner">
        <SparkleIcon :size="20" :animated="true" />
        <h3>Be the First to Know</h3>
        <p>Subscribe to get notified when new works are unveiled.</p>
        <form class="newsletter-form" @submit.prevent="subscribe" id="newsletter-form">
          <input type="email" v-model="email" class="form-input newsletter-input" placeholder="your@email.com" required />
          <button type="submit" class="btn btn-primary newsletter-btn">Notify Me</button>
        </form>
        <p v-if="subscribed" class="success-msg"><SparkleIcon :size="12" color="var(--color-teal)" /> You're on the list!</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
useHead({ title: 'Upcoming — Atelier Tenebris', meta: [{ name: 'description', content: 'Preview upcoming art projects from Atelier Tenebris.' }] })

const teasers = [
  { title: 'Project Aether', date: 'Reveal: Summer 2026', image: '/art/04-mountain-strata.png' },
  { title: 'The Hollow Archive', date: 'Reveal: Fall 2026', image: '/art/02-valley-dawn.png' },
  { title: 'Untitled Series III', date: 'In Progress', image: '/art/07-observatory.png' },
]

const email = ref('')
const subscribed = ref(false)
function subscribe() { subscribed.value = true; email.value = '' }
</script>

<style scoped>
.teaser-page { position: relative; padding: 8rem 2rem 6rem; overflow: hidden; }
.teaser-header { max-width: 1400px; margin: 0 auto 3rem; }
.page-title { font-size: clamp(2.5rem, 6vw, 4.5rem); margin-bottom: 0.5rem; }
.page-subtitle { font-size: 1.1rem; color: rgba(244,239,230,0.65); }

.teaser-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; }
.teaser-card { border-radius: var(--radius-card); overflow: hidden; border: 1px solid rgba(201,169,110,0.06); }
.teaser-image { position: relative; overflow: hidden; }
.teaser-image img { width: 100%; height: auto; display: block; filter: blur(12px) saturate(0.4); transform: scale(1.1); }
.blur-overlay { position: absolute; inset: 0; background: rgba(18,18,18,0.6); }
.teaser-content { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; }
.teaser-content h3 { font-size: 1.5rem; color: var(--color-parchment); }
.teaser-date { color: var(--color-gold); }

.newsletter-section { padding: 6rem 2rem; }
.newsletter-inner { max-width: 500px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.newsletter-form { display: flex; gap: 0.75rem; width: 100%; }
.newsletter-input { flex: 1; }
.newsletter-btn { white-space: nowrap; }
.success-msg { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--color-teal); }

@media (max-width: 768px) { .teaser-grid { grid-template-columns: 1fr; } .newsletter-form { flex-direction: column; } }
</style>
