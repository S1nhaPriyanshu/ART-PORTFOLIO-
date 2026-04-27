<template>
  <nav ref="navRef" class="navbar" :class="{ scrolled: isScrolled, hidden: isHidden }">
    <div class="nav-inner">
      <!-- Logo -->
      <NuxtLink to="/landing" class="nav-logo" id="nav-logo">
        <SparkleIcon :size="18" class="logo-sparkle" />
        <span class="logo-text">Atelier Tenebris</span>
      </NuxtLink>

      <!-- Desktop Nav Links -->
      <div class="nav-links" id="nav-links-desktop">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="nav-link"
          :class="{ active: route.path.startsWith(link.path) }"
        >
          <span class="link-label">{{ link.label }}</span>
          <span class="link-indicator" />
        </NuxtLink>
      </div>

      <!-- CTA Button -->
      <NuxtLink to="/commission" class="btn btn-primary nav-cta" id="nav-cta">
        Commission
      </NuxtLink>

      <!-- Mobile Hamburger -->
      <button
        class="nav-hamburger"
        id="nav-hamburger"
        @click="mobileOpen = !mobileOpen"
        :aria-expanded="mobileOpen"
        aria-label="Toggle menu"
      >
        <span class="hamburger-line" :class="{ open: mobileOpen }" />
        <span class="hamburger-line" :class="{ open: mobileOpen }" />
        <span class="hamburger-line" :class="{ open: mobileOpen }" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="mobile-menu glass-strong" id="mobile-menu">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="mobile-link"
          @click="mobileOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
        <NuxtLink to="/commission" class="btn btn-primary mobile-cta" @click="mobileOpen = false">
          Commission
        </NuxtLink>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const route = useRoute()

const navLinks = [
  { path: '/landing', label: 'Home' },
  { path: '/profile', label: 'Profile' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/teaser', label: 'Upcoming' },
]

const navRef = ref(null)
const isScrolled = ref(false)
const isHidden = ref(false)
const mobileOpen = ref(false)
let lastScrollY = 0

const handleScroll = () => {
  const y = window.scrollY
  isScrolled.value = y > 60
  isHidden.value = y > lastScrollY && y > 300
  lastScrollY = y
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 2rem;
  transition: all var(--duration-normal) var(--ease-smooth);
}

.navbar.scrolled {
  padding: 0.75rem 2rem;
  background: rgba(18, 18, 18, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(201, 169, 110, 0.08);
}

.navbar.hidden {
  transform: translateY(-100%);
}

.nav-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--color-parchment);
}

.logo-sparkle {
  animation: sparkle-pulse 3s ease-in-out infinite;
}

.logo-text {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-link {
  position: relative;
  padding: 0.5rem 1rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(244, 239, 230, 0.6);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-smooth);
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-gold);
}

.link-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 1px;
  background: var(--color-gold);
  transform: translateX(-50%);
  transition: width var(--duration-normal) var(--ease-smooth);
}

.nav-link.active .link-indicator,
.nav-link:hover .link-indicator {
  width: 60%;
}

.nav-cta {
  padding: 0.625rem 1.5rem;
  font-size: 0.65rem;
}

.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger-line {
  width: 24px;
  height: 1.5px;
  background: var(--color-cream);
  transition: all var(--duration-fast) var(--ease-smooth);
  transform-origin: center;
}

.hamburger-line.open:nth-child(1) {
  transform: rotate(45deg) translate(4px, 5px);
}

.hamburger-line.open:nth-child(2) {
  opacity: 0;
}

.hamburger-line.open:nth-child(3) {
  transform: rotate(-45deg) translate(4px, -5px);
}

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 1rem;
  right: 1rem;
  padding: 2rem;
  border-radius: var(--radius-card);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-link {
  padding: 0.75rem 1rem;
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--color-cream);
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background var(--duration-fast);
}

.mobile-link:hover {
  background: rgba(201, 169, 110, 0.1);
}

.mobile-cta {
  margin-top: 1rem;
  text-align: center;
  justify-content: center;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all var(--duration-normal) var(--ease-smooth);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .nav-links,
  .nav-cta {
    display: none;
  }

  .nav-hamburger {
    display: flex;
  }
}
</style>
