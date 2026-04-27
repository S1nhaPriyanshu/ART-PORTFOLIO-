<template>
  <div class="commission-page">
    <FloatingOrb color="gold" :size="300" top="10%" left="-5%" :opacity="0.08" />
    <FloatingOrb color="teal" :size="200" top="60%" left="85%" :opacity="0.06" />

    <section class="commission-header">
      <ChapterMarker :number="5" title="COMMISSIONS" />
      <h1 class="commission-title">Bring Your<br />Vision to Life</h1>
      <p class="commission-subtitle">From polished sketches to fully rendered masterpieces — select a tier, describe your vision, and let's create something extraordinary.</p>

      <div class="step-indicator" id="step-indicator">
        <div v-for="(step, i) in steps" :key="i" class="step" :class="{ active: currentStep === i, completed: currentStep > i }">
          <div class="step-dot">
            <svg v-if="currentStep > i" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <span class="step-label">{{ step }}</span>
        </div>
        <div class="step-line"><div class="step-line-fill" :style="{ width: `${(currentStep / 3) * 100}%` }" /></div>
      </div>
    </section>

    <section class="commission-content">
      <Transition :name="transitionName" mode="out-in">
        <!-- STEP 0: Pricing Tiers -->
        <div v-if="currentStep === 0" key="step-0" class="step-content">
          <div class="pricing-grid">
            <PricingTier v-for="(tier, i) in pricingTiers" :key="tier.name" :tier="tier" :selected="selectedTierIndex === i" :featured="i === 1" @select="selectTier(i)" />
          </div>
          <div class="addons-section">
            <h4 class="addons-title"><SparkleIcon :size="14" /> Common Add-ons</h4>
            <div class="addons-grid">
              <div v-for="addon in addons" :key="addon.label" class="addon-item">
                <span class="addon-label">{{ addon.label }}</span>
                <span class="addon-price">{{ addon.price }}</span>
              </div>
            </div>
          </div>
          <div class="step-actions">
            <button class="btn btn-primary" :disabled="selectedTierIndex === null" @click="nextStep" id="proceed-to-details">
              Proceed to Details
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>

        <!-- STEP 1: Details Form -->
        <div v-else-if="currentStep === 1" key="step-1" class="step-content">
          <div class="form-layout">
            <div class="selected-tier-badge">
              <SparkleIcon :size="12" />
              <span>{{ selectedTier?.name }}</span>
              <span class="badge-price">${{ selectedTier?.priceRange[0] }}–${{ selectedTier?.priceRange[1] }}</span>
            </div>
            <div class="form-grid">
              <div class="form-group full-width">
                <label class="form-label" for="commission-description">Describe Your Vision *</label>
                <textarea id="commission-description" class="form-input textarea" v-model="formData.description" placeholder="Describe the character, scene, mood, and any specific details you'd like..." rows="5" maxlength="2000" />
                <span class="char-count">{{ formData.description.length }} / 2000</span>
              </div>
              <div class="form-group full-width">
                <label class="form-label">Reference Images (Optional)</label>
                <FileUpload @update:files="(files) => formData.referenceFiles = files" />
              </div>
              <div class="form-group">
                <label class="form-label" for="client-email">Your Email *</label>
                <input id="client-email" type="email" class="form-input" v-model="formData.email" placeholder="your@email.com" />
                <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
              </div>
              <div class="form-group">
                <label class="form-label" for="preferred-style">Preferred Style</label>
                <select id="preferred-style" class="form-input select" v-model="formData.style">
                  <option value="">Select a style...</option>
                  <option value="painterly">Painterly / Textured</option>
                  <option value="anime">Anime / Manga</option>
                  <option value="realistic">Semi-Realistic</option>
                  <option value="concept">Concept Art</option>
                  <option value="other">Other (describe above)</option>
                </select>
              </div>
              <div class="form-group full-width">
                <label class="form-label" for="additional-notes">Additional Notes</label>
                <textarea id="additional-notes" class="form-input textarea" v-model="formData.notes" placeholder="Deadlines, commercial usage, or anything else..." rows="3" />
              </div>
            </div>
            <div class="step-actions">
              <button class="btn btn-outline" @click="prevStep">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                Back
              </button>
              <button class="btn btn-primary" @click="proceedToPayment" :disabled="!isFormValid" id="proceed-to-payment">
                Pay &amp; Proceed
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- STEP 2: Payment -->
        <div v-else-if="currentStep === 2" key="step-2" class="step-content payment-step">
          <div class="payment-waiting">
            <SparkleIcon :size="40" :animated="true" />
            <h3>Processing Payment</h3>
            <p>Complete your payment in the modal window...</p>
          </div>
        </div>

        <!-- STEP 3: Confirmation -->
        <div v-else-if="currentStep === 3" key="step-3" class="step-content">
          <div class="confirmation">
            <div class="confirmation-icon">
              <div class="check-circle">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </div>
            <h2 class="confirmation-title">Commission Submitted!</h2>
            <p class="confirmation-text">Your commission request has been received. You'll receive a confirmation email at <strong>{{ formData.email }}</strong> shortly.</p>
            <div class="order-details glass-card">
              <div class="detail-row"><span class="detail-label">Order Reference</span><span class="detail-value mono">{{ orderRef }}</span></div>
              <div class="detail-row"><span class="detail-label">Commission Type</span><span class="detail-value">{{ selectedTier?.name }}</span></div>
              <div class="detail-row"><span class="detail-label">Estimated Turnaround</span><span class="detail-value">{{ selectedTier?.turnaround }}</span></div>
            </div>
            <NuxtLink to="/landing" class="btn btn-outline">Return Home</NuxtLink>
          </div>
        </div>
      </Transition>
    </section>

    <PaymentModal :visible="showPaymentModal" :selected-tier="selectedTier" @close="cancelPayment" @success="onPaymentSuccess" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

useHead({ title: 'Commission — Atelier Tenebris', meta: [{ name: 'description', content: 'Commission custom 2D illustrations, concept art, and digital paintings.' }] })

const steps = ['Select Tier', 'Details', 'Payment', 'Confirmed']
const currentStep = ref(0)
const transitionName = ref('slide-left')

const pricingTiers = [
  { name: 'Polished Sketch', priceRange: [50, 80], description: 'Clean, stylized line art or highly refined sketches. Ideal for quick character concepts or tabletop RPG tokens.', turnaround: '3–5 days', features: ['High-resolution line art', 'Up to 2 revision rounds', 'Transparent background option', 'Digital delivery (PNG + PSD)'] },
  { name: 'Half-Body Color', priceRange: [120, 180], description: 'Waist-up illustration with flat colors and minimal shading. Includes a simple gradient or flat color background.', turnaround: '1–2 weeks', features: ['Waist-up illustration', 'Flat colors + minimal shading', 'Up to 3 revision rounds', 'Simple background included', 'Commercial use available (+fee)'] },
  { name: 'Full Render', priceRange: [250, 450], suffix: '+', description: 'Fully rendered, highly detailed full-body character with complex lighting, intricate shading, and dynamic posing.', turnaround: '3–4 weeks', features: ['Full-body character rendering', 'Complex lighting & shading', 'Dynamic posing & composition', 'Up to 4 revision rounds', 'Background environment included', 'Source file delivery'] },
]

const addons = [
  { label: 'Detailed Environment / Background', price: '+$100 – $300' },
  { label: 'Additional Character', price: '+50–75% of base' },
  { label: 'Commercial Rights', price: '2x–3x base price' },
]

const selectedTierIndex = ref(null)
const selectedTier = computed(() => selectedTierIndex.value !== null ? pricingTiers[selectedTierIndex.value] : null)
function selectTier(index) { selectedTierIndex.value = index }

const formData = ref({ description: '', email: '', style: '', notes: '', referenceFiles: [] })
const errors = ref({})
const isFormValid = computed(() => formData.value.description.trim().length > 10 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email))

const showPaymentModal = ref(false)
const orderRef = ref('')

function proceedToPayment() {
  errors.value = {}
  if (!formData.value.description.trim()) { errors.value.description = 'Please describe your vision'; return }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) { errors.value.email = 'Please enter a valid email address'; return }
  showPaymentModal.value = true; currentStep.value = 2
}

function cancelPayment() { showPaymentModal.value = false; currentStep.value = 1 }
async function onPaymentSuccess() { showPaymentModal.value = false; orderRef.value = `AT-${Date.now().toString(36).toUpperCase()}`; currentStep.value = 3 }
function nextStep() { transitionName.value = 'slide-left'; currentStep.value++ }
function prevStep() { transitionName.value = 'slide-right'; currentStep.value-- }
</script>

<style scoped>
.commission-page { position: relative; min-height: 100vh; padding: 8rem 2rem 6rem; overflow: hidden; }
.commission-header { max-width: 800px; margin: 0 auto 4rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.commission-title { font-size: clamp(2.5rem, 6vw, 4.5rem); line-height: 1.1; }
.commission-subtitle { font-size: 1.1rem; max-width: 50ch; text-align: center; }

.step-indicator { display: flex; align-items: center; gap: 2rem; position: relative; padding: 2rem 0 0; width: 100%; max-width: 600px; justify-content: space-between; }
.step { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; z-index: 1; }
.step-dot { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 0.7rem; font-weight: 600; background: var(--color-charcoal); border: 2px solid rgba(201,169,110,0.2); color: var(--color-muted); transition: all var(--duration-normal) var(--ease-smooth); }
.step.active .step-dot { background: var(--color-gold); border-color: var(--color-gold); color: var(--color-obsidian); box-shadow: var(--shadow-glow-gold); }
.step.completed .step-dot { background: var(--color-teal); border-color: var(--color-teal); color: var(--color-obsidian); }
.step-label { font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-muted); transition: color var(--duration-fast); }
.step.active .step-label { color: var(--color-gold); }
.step.completed .step-label { color: var(--color-teal); }
.step-line { position: absolute; top: calc(2rem + 18px); left: 36px; right: 36px; height: 2px; background: rgba(201,169,110,0.1); z-index: 0; }
.step-line-fill { height: 100%; background: var(--color-teal); transition: width var(--duration-slow) var(--ease-smooth); }

.commission-content { max-width: 1200px; margin: 0 auto; }
.step-content { min-height: 400px; }
.pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }

.addons-section { margin-bottom: 2rem; }
.addons-title { display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; margin-bottom: 1rem; color: var(--color-cream); }
.addons-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 0.75rem; }
.addon-item { display: flex; justify-content: space-between; padding: 0.75rem 1rem; background: rgba(35,37,40,0.3); border: 1px solid rgba(201,169,110,0.06); border-radius: 0.5rem; font-size: 0.85rem; }
.addon-label { color: rgba(244,239,230,0.7); }
.addon-price { font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-gold); }

.step-actions { display: flex; justify-content: center; gap: 1rem; padding-top: 2rem; }
.form-layout { max-width: 700px; margin: 0 auto; }
.selected-tier-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: rgba(201,169,110,0.1); border: 1px solid rgba(201,169,110,0.2); border-radius: var(--radius-pill); font-size: 0.95rem; color: var(--color-gold); margin-bottom: 2rem; }
.badge-price { font-family: var(--font-mono); font-size: 0.7rem; opacity: 0.7; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.form-group.full-width { grid-column: 1 / -1; }
.textarea { resize: vertical; min-height: 100px; font-family: var(--font-body); }
.select { appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23585852' stroke-width='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; }
.char-count { display: block; text-align: right; font-family: var(--font-mono); font-size: 0.6rem; color: var(--color-muted); margin-top: 0.25rem; }
.error-text { font-family: var(--font-mono); font-size: 0.65rem; color: var(--color-ember); margin-top: 0.25rem; }

.payment-step { display: flex; align-items: center; justify-content: center; }
.payment-waiting { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; }

.confirmation { max-width: 600px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.confirmation-icon { position: relative; margin-bottom: 1rem; }
.check-circle { width: 80px; height: 80px; border-radius: 50%; background: rgba(46,205,167,0.1); border: 2px solid var(--color-teal); display: flex; align-items: center; justify-content: center; }
.confirmation-title { font-size: 2.5rem; }
.confirmation-text { font-size: 1rem; text-align: center; }
.order-details { width: 100%; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
.detail-row { display: flex; justify-content: space-between; }
.detail-label { font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-muted); }
.detail-value { color: var(--color-cream); }
.detail-value.mono { font-family: var(--font-mono); font-size: 0.85rem; color: var(--color-gold); }

.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active { transition: all var(--duration-slow) var(--ease-smooth); }
.slide-left-enter-from { opacity: 0; transform: translateX(60px); }
.slide-left-leave-to { opacity: 0; transform: translateX(-60px); }
.slide-right-enter-from { opacity: 0; transform: translateX(-60px); }
.slide-right-leave-to { opacity: 0; transform: translateX(60px); }

@media (max-width: 768px) { .commission-page { padding: 6rem 1rem 4rem; } .pricing-grid { grid-template-columns: 1fr; } .form-grid { grid-template-columns: 1fr; } .step-indicator { gap: 1rem; } .step-label { display: none; } }
</style>
