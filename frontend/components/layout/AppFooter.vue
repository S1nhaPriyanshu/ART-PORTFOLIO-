<template>
  <footer class="app-footer" id="app-footer">
    <div class="footer-inner">
      <!-- Top decorative line -->
      <div class="gold-line" />

      <div class="footer-content">
        <!-- Brand -->
        <div class="footer-brand">
          <div class="brand-mark">
            <SparkleIcon :size="16" :animated="true" />
            <span class="brand-name">Atelier Tenebris</span>
          </div>
          <p class="brand-tagline">Cinematic 2D Illustration · Concept Art · Digital Painting</p>
        </div>


        <!-- Social -->
        <div class="footer-social">
          <h4 class="footer-heading">Connect</h4>
          <div class="social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" class="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter" class="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4l11.733 16H20L8.267 4H4zm0 16l6.286-8.571M20 4l-6.286 8.571"/></svg>
            </a>
            <a href="https://behance.net" target="_blank" rel="noopener" aria-label="Behance" class="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 8h5.5a2.5 2.5 0 010 5H3V8zM3 13h6a3 3 0 010 6H3v-6z"/><path d="M15 11h6M15 17h6M16 8h4"/><path d="M18 14a3 3 0 100-6 3 3 0 000 6z"/></svg>
            </a>
            <a href="mailto:hello@ateliertenebris.art" aria-label="Email" class="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="footer-bottom">
        <span class="copyright">&copy; {{ new Date().getFullYear() }} Atelier Tenebris. All rights reserved.</span>
        <span class="footer-credit text-mono">Crafted with obsession</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  position: relative;
  padding: 0 2rem 2rem;
  margin-top: var(--spacing-section);
}

.footer-inner {
  max-width: 1400px;
  margin: 0 auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3rem;
  padding: 3rem 0;
}

.brand-mark {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.brand-name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-parchment);
}

.brand-tagline {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
  max-width: none;
}

.footer-heading {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 1rem;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links a {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: rgba(244, 239, 230, 0.6);
  text-decoration: none;
  transition: color var(--duration-fast);
}

.footer-links a:hover {
  color: var(--color-gold);
}

.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(201, 169, 110, 0.15);
  color: rgba(244, 239, 230, 0.5);
  transition: all var(--duration-fast) var(--ease-smooth);
}

.social-link:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
  box-shadow: var(--shadow-glow-gold);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(201, 169, 110, 0.06);
}

.copyright {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  color: var(--color-muted);
}

.footer-credit {
  font-size: 0.55rem;
  color: rgba(88, 88, 82, 0.5);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
