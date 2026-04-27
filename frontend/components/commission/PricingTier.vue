<template>
  <div
    class="pricing-tier"
    :class="{ selected, featured }"
    @click="$emit('select')"
  >
    <div v-if="featured" class="featured-badge">
      <SparkleIcon :size="10" />
      <span>Most Popular</span>
    </div>

    <div class="tier-header">
      <h3 class="tier-name">{{ tier.name }}</h3>
      <div class="tier-price">
        <span class="price-range">${{ tier.priceRange[0] }}–${{ tier.priceRange[1] }}</span>
        <span v-if="tier.suffix" class="price-suffix">{{ tier.suffix }}</span>
      </div>
      <p class="tier-desc">{{ tier.description }}</p>
    </div>

    <div class="tier-features">
      <div v-for="feature in tier.features" :key="feature" class="feature-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        <span>{{ feature }}</span>
      </div>
    </div>

    <div class="tier-footer">
      <span class="turnaround">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        {{ tier.turnaround }}
      </span>
    </div>

    <div class="select-indicator">
      <div class="select-ring">
        <svg v-if="selected" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tier: { type: Object, required: true },
  selected: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
})
defineEmits(['select'])
</script>

<style scoped>
.pricing-tier { position: relative; padding: 2rem; background: rgba(35,37,40,0.4); border: 1px solid rgba(201,169,110,0.08); border-radius: var(--radius-card); cursor: pointer; transition: all var(--duration-normal) var(--ease-smooth); display: flex; flex-direction: column; gap: 1.5rem; }
.pricing-tier:hover { border-color: rgba(201,169,110,0.2); transform: translateY(-4px); box-shadow: var(--shadow-glow-gold); }
.pricing-tier.selected { border-color: var(--color-gold); box-shadow: var(--shadow-glow-gold); }
.pricing-tier.featured { border-color: rgba(201,169,110,0.15); background: rgba(35,37,40,0.6); }
.featured-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 0.4rem; padding: 0.35rem 1rem; background: var(--color-gold); color: var(--color-obsidian); border-radius: var(--radius-pill); font-family: var(--font-mono); font-size: 0.55rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; white-space: nowrap; }
.tier-name { font-family: var(--font-display); font-size: 1.5rem; font-weight: 600; color: var(--color-parchment); margin-bottom: 0.5rem; }
.tier-price { display: flex; align-items: baseline; gap: 0.25rem; margin-bottom: 0.75rem; }
.price-range { font-family: var(--font-display); font-size: 1.75rem; font-weight: 700; color: var(--color-gold); }
.price-suffix { font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-gold); opacity: 0.7; }
.tier-desc { font-size: 0.9rem; line-height: 1.6; color: rgba(244,239,230,0.6); }
.tier-features { display: flex; flex-direction: column; gap: 0.6rem; flex: 1; }
.feature-item { display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; color: rgba(244,239,230,0.75); }
.tier-footer { padding-top: 0.75rem; border-top: 1px solid rgba(201,169,110,0.06); }
.turnaround { display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-muted); }
.select-indicator { position: absolute; top: 1rem; right: 1rem; }
.select-ring { width: 24px; height: 24px; border-radius: 50%; border: 2px solid rgba(201,169,110,0.2); display: flex; align-items: center; justify-content: center; transition: all var(--duration-fast); }
.pricing-tier.selected .select-ring { border-color: var(--color-gold); background: var(--color-gold); color: var(--color-obsidian); }
</style>
