<template>
  <div class="profile-page">
    <FloatingOrb color="lavender" :size="250" top="5%" left="80%" :opacity="0.05" />

    <!-- OSIRIS-style HELLO hero -->
    <section class="profile-hero">
      <h1 ref="helloRef" class="hello-title">HELLO!</h1>
      <p class="hero-intro">Welcome to Atelier Tenebris — a studio dedicated to crafting cinematic 2D illustrations that blend darkness and beauty into visual storytelling.</p>
    </section>

    <!-- Bio + Character art side-by-side -->
    <section class="bio-section">
      <div class="bio-inner">
        <div class="bio-text">
          <ChapterMarker :number="1" title="ABOUT THE ARTIST" />
          <p>I am a digital artist and illustrator specializing in atmospheric environments, concept art, and character design. With a painterly approach rooted in traditional techniques, each piece is crafted to evoke emotion through color, light, and composition.</p>
          <p>My work spans from moody gothic landscapes to vibrant cyberpunk cityscapes — always pushing the boundary between the familiar and the fantastic.</p>

          <div class="info-grid">
            <div class="info-block">
              <h4>✦ Skills</h4>
              <ul>
                <li>2D Concept Art</li>
                <li>Environment Design</li>
                <li>Character Illustration</li>
                <li>Digital Painting</li>
                <li>Composition &amp; Perspective</li>
              </ul>
            </div>
            <div class="info-block">
              <h4>✦ Software</h4>
              <ul>
                <li>Clip Studio Paint</li>
                <li>Procreate</li>
                <li>Adobe Photoshop</li>
                <li>Adobe Illustrator</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="bio-art">
          <div class="art-frame">
            <img src="/art/03-neon-district.png" alt="Neon District" />
            <SparkleIcon :size="20" class="sparkle s1" :animated="true" />
            <SparkleIcon :size="14" class="sparkle s2" :animated="true" color="var(--color-teal)" />
            <SparkleIcon :size="18" class="sparkle s3" :animated="true" />
          </div>
        </div>
      </div>
    </section>

    <!-- Full-width featured piece -->
    <section class="featured-piece-section">
      <ChapterMarker :number="2" title="ENVIRONMENT DESIGN" :centered="true" />
      <div class="featured-piece">
        <img src="/art/05-emerald-factory.png" alt="Emerald Factory" />
      </div>
      <p class="featured-caption text-mono">Emerald Factory — Concept Art, 2026</p>
    </section>

    <!-- Vision Quote -->
    <section class="vision-section">
      <div class="vision-inner">
        <SparkleIcon :size="28" :animated="true" />
        <blockquote>"Art is the bridge between the world we see and the one we feel — where shadows hold stories and light reveals truth."</blockquote>
        <span class="text-mono">— Atelier Tenebris</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

useHead({ title: 'Profile — Atelier Tenebris', meta: [{ name: 'description', content: 'Learn about the artist behind Atelier Tenebris.' }] })

const helloRef = ref(null)
onMounted(async () => {
  if (typeof window === 'undefined') return
  const { gsap } = await import('gsap')
  gsap.from(helloRef.value, { opacity: 0, y: 60, scale: 0.9, duration: 1, ease: 'power3.out', delay: 0.3 })
})
</script>

<style scoped>
.profile-page { position: relative; padding-top: 6rem; overflow: hidden; }
.profile-hero { padding: 6rem 2rem 4rem; text-align: center; }
.hello-title { font-size: clamp(4rem, 12vw, 10rem); font-weight: 700; line-height: 0.95; background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 2rem; }
.hero-intro { max-width: 55ch; margin: 0 auto; font-size: 1.15rem; color: rgba(244,239,230,0.75); text-align: center; }

.bio-section { padding: 4rem 2rem; }
.bio-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 4rem; align-items: start; }
.bio-text { display: flex; flex-direction: column; gap: 1.25rem; }
.bio-text p { font-size: 1.05rem; line-height: 1.8; color: rgba(244,239,230,0.8); }

.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1rem; }
.info-block h4 { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-gold); margin-bottom: 0.75rem; }
.info-block ul { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
.info-block li { font-size: 0.95rem; color: rgba(244,239,230,0.7); }

.bio-art { display: flex; justify-content: center; }
.art-frame { position: relative; width: 100%; border-radius: var(--radius-card); overflow: hidden; border: 1px solid rgba(201,169,110,0.12); }
.art-frame img { width: 100%; height: auto; display: block; }
.sparkle { position: absolute; }
.s1 { top: -10px; right: -10px; }
.s2 { bottom: 20%; left: -12px; }
.s3 { bottom: -8px; right: 20%; }

.featured-piece-section { padding: 4rem 2rem; }
.featured-piece { max-width: 1400px; margin: 0 auto; border-radius: var(--radius-card); overflow: hidden; border: 1px solid rgba(201,169,110,0.06); }
.featured-piece img { width: 100%; height: auto; display: block; }
.featured-caption { text-align: center; margin-top: 1rem; color: var(--color-muted); font-size: 0.7rem; letter-spacing: 0.1em; }

.vision-section { padding: 6rem 2rem; background: linear-gradient(180deg, transparent, rgba(26,28,32,0.4), transparent); }
.vision-inner { max-width: 700px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 2rem; }
.vision-inner blockquote { font-family: var(--font-display); font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 400; font-style: italic; line-height: 1.5; color: var(--color-parchment); }

@media (max-width: 768px) { .bio-inner { grid-template-columns: 1fr; } .bio-art { order: -1; } .info-grid { grid-template-columns: 1fr; } }
</style>
