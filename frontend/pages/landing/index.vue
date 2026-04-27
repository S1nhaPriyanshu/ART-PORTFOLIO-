<template>
  <div class="landing-page">
    <!-- ============ HERO — Full-bleed art (OSIRIS-style) ============ -->
    <section class="hero" id="hero-section">
      <div class="hero-art">
        <img src="/art/01-gothic-courtyard.png" alt="Gothic Courtyard — Atelier Tenebris" class="hero-art-img" />
        <div class="hero-vignette" />
      </div>

      <FloatingOrb color="gold" :size="300" top="10%" left="-5%" :opacity="0.08" :intensity="20" :speed="5" />
      <FloatingOrb color="lavender" :size="200" top="60%" left="80%" :opacity="0.05" :intensity="15" :speed="6" />

      <div class="hero-content">
        <div class="hero-brand-badge">
          <SparkleIcon :size="10" :animated="true" />
          <span>Sable &amp; Ivory</span>
          <SparkleIcon :size="10" :animated="true" />
        </div>

        <h1 class="hero-title">
          <span class="title-line" ref="titleLine1">ATELIER</span>
          <span class="title-line gold" ref="titleLine2">TENEBRIS</span>
        </h1>

        <p class="hero-tagline" ref="heroTagline">2D Illustration · Concept Art · Digital Painting</p>

        <div class="hero-actions" ref="heroActions">
          <NuxtLink to="/portfolio" class="btn btn-primary">
            <SparkleIcon :size="10" color="var(--color-obsidian)" />
            View Portfolio
          </NuxtLink>
          <NuxtLink to="/commission" class="btn btn-outline">
            Commission Me
          </NuxtLink>
        </div>
      </div>

      <div class="scroll-cue">
        <span>Scroll</span>
        <div class="scroll-line"><div class="scroll-dot" /></div>
      </div>
    </section>

    <!-- ============ CHAPTER 01 — Featured Showcase ============ -->
    <section class="chapter-section">
      <ChapterMarker :number="1" title="SELECTED WORKS" />
      <h2 class="section-title">From scratch to<br />final artwork.</h2>

      <div class="showcase-stack">
        <div class="showcase-piece" v-for="(piece, i) in showcasePieces" :key="i">
          <div class="piece-image">
            <img :src="piece.image" :alt="piece.title" loading="lazy" />
          </div>
          <div class="piece-meta">
            <span class="piece-category">{{ piece.category }}</span>
            <h3 class="piece-title">{{ piece.title }}</h3>
            <p class="piece-desc">{{ piece.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ MARQUEE — Infinite scrolling gallery ============ -->
    <section class="marquee-section">
      <div class="marquee-track">
        <div class="marquee-content">
          <div v-for="(img, i) in [...artworks, ...artworks]" :key="i" class="marquee-item">
            <img :src="img.src" :alt="img.alt" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- ============ CHAPTER 02 — Full-width hero pieces ============ -->
    <section class="chapter-section">
      <ChapterMarker :number="2" title="ENVIRONMENTS" />

      <div class="hero-piece">
        <img src="/art/07-observatory.png" alt="Observatory Above Clouds" loading="lazy" />
        <div class="hero-piece-overlay">
          <SparkleIcon :size="16" :animated="true" />
          <h3>Observatory Above Clouds</h3>
          <span class="text-mono">Environment · 2026</span>
        </div>
      </div>

      <div class="hero-piece">
        <img src="/art/06-desert-cenote.png" alt="Desert Cenote" loading="lazy" />
        <div class="hero-piece-overlay">
          <SparkleIcon :size="16" :animated="true" />
          <h3>Desert Cenote</h3>
          <span class="text-mono">Landscape · 2026</span>
        </div>
      </div>
    </section>

    <!-- ============ ABOUT TEASER ============ -->
    <section class="about-section">
      <div class="about-inner">
        <div class="about-art">
          <div class="about-frame">
            <img src="/art/02-valley-dawn.png" alt="Valley Dawn" />
            <SparkleIcon :size="20" class="frame-sparkle top-right" :animated="true" />
            <SparkleIcon :size="14" class="frame-sparkle bottom-left" :animated="true" color="var(--color-teal)" />
          </div>
        </div>
        <div class="about-text">
          <ChapterMarker :number="3" title="THE ARTIST" :compact="true" />
          <h2>Where Darkness<br />Meets Beauty</h2>
          <p>Every piece is a window into worlds between shadow and light — gothic cathedrals under twilight, neon cities humming under alien skies, serene valleys shrouded in painterly fog.</p>
          <NuxtLink to="/profile" class="btn btn-outline">Read Full Profile</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ============ COMMISSION CTA ============ -->
    <section class="cta-section">
      <FloatingOrb color="gold" :size="400" top="20%" left="50%" :opacity="0.04" />
      <div class="cta-inner">
        <SparkleIcon :size="28" :animated="true" />
        <h2>Ready to Create<br />Something Extraordinary?</h2>
        <p>From polished sketches to fully rendered masterpieces.</p>
        <NuxtLink to="/commission" class="btn btn-primary cta-btn">Start Your Commission</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

useHead({
  title: 'Atelier Tenebris — Cinematic 2D Art & Illustration',
  meta: [{ name: 'description', content: 'Cinematic 2D illustration portfolio by Atelier Tenebris — commissions, concept art, and digital painting.' }],
})

const titleLine1 = ref(null)
const titleLine2 = ref(null)
const heroTagline = ref(null)
const heroActions = ref(null)

const showcasePieces = [
  { image: '/art/01-gothic-courtyard.png', title: 'Gothic Courtyard', category: 'Environment', description: 'A rain-soaked gothic courtyard with arched ruins, twisted trees, and warm stained-glass glow at twilight.' },
  { image: '/art/03-neon-district.png', title: 'Neon District', category: 'Concept Art', description: 'A cyberpunk cityscape with towering buildings draped in holographic displays and speeding vehicles.' },
  { image: '/art/05-emerald-factory.png', title: 'Emerald Factory', category: 'Concept Art', description: 'An industrial scene with psychedelic swirling neon sky and a winding silver river at dusk.' },
]

const artworks = [
  { src: '/art/01-gothic-courtyard.png', alt: 'Gothic Courtyard' },
  { src: '/art/02-valley-dawn.png', alt: 'Valley Dawn' },
  { src: '/art/03-neon-district.png', alt: 'Neon District' },
  { src: '/art/04-mountain-strata.png', alt: 'Mountain Strata' },
  { src: '/art/05-emerald-factory.png', alt: 'Emerald Factory' },
  { src: '/art/06-desert-cenote.png', alt: 'Desert Cenote' },
  { src: '/art/07-observatory.png', alt: 'Observatory' },
]

onMounted(async () => {
  if (typeof window === 'undefined') return
  const { gsap } = await import('gsap')
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.from('.hero-brand-badge', { opacity: 0, y: 20, duration: 0.8, delay: 0.2 })
    .from(titleLine1.value, { opacity: 0, y: 80, duration: 1.0 }, '-=0.4')
    .from(titleLine2.value, { opacity: 0, y: 80, duration: 1.0 }, '-=0.7')
    .from(heroTagline.value, { opacity: 0, y: 30, duration: 0.8 }, '-=0.5')
    .from(heroActions.value?.children || [], { opacity: 0, y: 20, duration: 0.6, stagger: 0.15 }, '-=0.3')
})
</script>

<style scoped>
.hero { position: relative; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; }
.hero-art { position: absolute; inset: 0; z-index: 0; }
.hero-art-img { width: 100%; height: 100%; object-fit: cover; object-position: center 40%; }
.hero-vignette { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(18,18,18,0.3) 0%, rgba(18,18,18,0.6) 40%, rgba(18,18,18,0.92) 85%, var(--color-obsidian) 100%); }
.hero-content { position: relative; z-index: 1; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; padding: 0 2rem; }
.hero-brand-badge { display: flex; align-items: center; gap: 0.6rem; font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-gold); }
.hero-title { display: flex; flex-direction: column; }
.title-line { display: block; font-family: var(--font-display); font-size: clamp(4rem, 12vw, 9rem); font-weight: 700; line-height: 0.95; letter-spacing: 0.05em; color: var(--color-parchment); }
.title-line.gold { background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 50%, var(--color-gold) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero-tagline { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(244,239,230,0.5); }
.hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
.scroll-cue { position: absolute; bottom: 2rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; z-index: 1; }
.scroll-cue span { font-family: var(--font-mono); font-size: 0.55rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-muted); }
.scroll-line { width: 1px; height: 50px; background: rgba(201,169,110,0.15); position: relative; overflow: hidden; }
.scroll-dot { width: 3px; height: 10px; background: var(--color-gold); border-radius: 2px; position: absolute; left: -1px; animation: scroll-pulse 2s ease-in-out infinite; }
@keyframes scroll-pulse { 0% { top: 0; opacity: 0; } 30% { opacity: 1; } 100% { top: 100%; opacity: 0; } }

.chapter-section { padding: 6rem 2rem; max-width: 1400px; margin: 0 auto; }
.section-title { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 600; color: var(--color-parchment); line-height: 1.15; margin-bottom: 3rem; }

.showcase-stack { display: flex; flex-direction: column; gap: 4rem; }
.showcase-piece { display: grid; grid-template-columns: 1.4fr 0.6fr; gap: 3rem; align-items: center; }
.showcase-piece:nth-child(even) { grid-template-columns: 0.6fr 1.4fr; }
.showcase-piece:nth-child(even) .piece-image { order: 2; }
.showcase-piece:nth-child(even) .piece-meta { order: 1; }
.piece-image { border-radius: var(--radius-card); overflow: hidden; border: 1px solid rgba(201,169,110,0.08); transition: all var(--duration-normal) var(--ease-smooth); }
.piece-image:hover { border-color: rgba(201,169,110,0.2); box-shadow: var(--shadow-glow-gold); transform: translateY(-4px); }
.piece-image img { width: 100%; height: auto; display: block; }
.piece-meta { display: flex; flex-direction: column; gap: 0.75rem; }
.piece-category { font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-teal); }
.piece-title { font-family: var(--font-display); font-size: 2rem; font-weight: 600; color: var(--color-parchment); }
.piece-desc { font-size: 1rem; line-height: 1.7; color: rgba(244,239,230,0.65); max-width: 40ch; }

.marquee-section { padding: 3rem 0; overflow: hidden; border-top: 1px solid rgba(201,169,110,0.06); border-bottom: 1px solid rgba(201,169,110,0.06); }
.marquee-track { overflow: hidden; }
.marquee-content { display: flex; gap: 1rem; animation: marquee 60s linear infinite; width: max-content; }
.marquee-item { flex-shrink: 0; width: 320px; height: 200px; border-radius: 0.75rem; overflow: hidden; border: 1px solid rgba(201,169,110,0.06); }
.marquee-item img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--duration-slow) var(--ease-smooth); }
.marquee-item:hover img { transform: scale(1.06); }

.hero-piece { position: relative; margin: 2rem 0; border-radius: var(--radius-card); overflow: hidden; border: 1px solid rgba(201,169,110,0.06); }
.hero-piece img { width: 100%; height: auto; display: block; }
.hero-piece-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem; background: linear-gradient(0deg, rgba(18,18,18,0.85) 0%, transparent 100%); display: flex; flex-direction: column; gap: 0.5rem; opacity: 0; transition: opacity var(--duration-normal); }
.hero-piece:hover .hero-piece-overlay { opacity: 1; }
.hero-piece-overlay h3 { font-size: 1.5rem; color: var(--color-parchment); }

.about-section { padding: 6rem 2rem; }
.about-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
.about-frame { position: relative; border-radius: var(--radius-card); overflow: hidden; border: 1px solid rgba(201,169,110,0.12); }
.about-frame img { width: 100%; height: auto; display: block; }
.frame-sparkle { position: absolute; z-index: 2; }
.frame-sparkle.top-right { top: -10px; right: -10px; }
.frame-sparkle.bottom-left { bottom: -8px; left: -8px; }
.about-text { display: flex; flex-direction: column; gap: 1.5rem; }
.about-text h2 { font-size: clamp(2rem, 4vw, 3.5rem); line-height: 1.15; }

.cta-section { position: relative; padding: 8rem 2rem; overflow: hidden; }
.cta-inner { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.cta-inner h2 { font-size: clamp(2rem, 4vw, 3rem); }
.cta-btn { padding: 1rem 2.5rem; font-size: 0.8rem; }

@media (max-width: 768px) {
  .showcase-piece, .showcase-piece:nth-child(even) { grid-template-columns: 1fr; }
  .showcase-piece:nth-child(even) .piece-image { order: 0; }
  .showcase-piece:nth-child(even) .piece-meta { order: 0; }
  .about-inner { grid-template-columns: 1fr; }
  .about-art { order: -1; }
  .marquee-item { width: 220px; height: 140px; }
}
</style>
