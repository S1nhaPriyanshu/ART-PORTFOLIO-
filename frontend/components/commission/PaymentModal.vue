<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="payment-backdrop" @click.self="$emit('close')">
        <div class="payment-modal glass-strong">
          <!-- Loading state -->
          <div v-if="processing" class="modal-state processing">
            <div class="spinner" />
            <h3>Processing Payment</h3>
            <p>Securely connecting to payment gateway...</p>
          </div>

          <!-- Success state -->
          <div v-else-if="success" class="modal-state success">
            <div class="success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3>Payment Successful!</h3>
            <p>Your commission has been confirmed.</p>
          </div>

          <!-- Payment form -->
          <div v-else class="modal-state form">
            <button class="modal-close" @click="$emit('close')" aria-label="Close">&times;</button>
            <h3>Complete Payment</h3>
            <div v-if="selectedTier" class="tier-summary">
              <span class="tier-name">{{ selectedTier.name }}</span>
              <span class="tier-price">${{ selectedTier.priceRange[0] }}</span>
            </div>
            <div class="sim-notice">
              <SparkleIcon :size="12" />
              <span>This is a simulated payment flow</span>
            </div>
            <div class="form-fields">
              <div class="form-group">
                <label class="form-label">Card Number</label>
                <input class="form-input" placeholder="4242 4242 4242 4242" v-model="card" />
              </div>
              <div class="form-row">
                <div class="form-group"><label class="form-label">Expiry</label><input class="form-input" placeholder="12/28" v-model="expiry" /></div>
                <div class="form-group"><label class="form-label">CVC</label><input class="form-input" placeholder="123" v-model="cvc" /></div>
              </div>
            </div>
            <button class="btn btn-primary pay-btn" @click="simulatePayment" :disabled="!canPay">
              <SparkleIcon :size="10" color="var(--color-obsidian)" />
              Pay ${{ selectedTier?.priceRange[0] || 0 }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({ visible: Boolean, selectedTier: Object })
const emit = defineEmits(['close', 'success'])

const card = ref(''); const expiry = ref(''); const cvc = ref('')
const processing = ref(false); const success = ref(false)
const canPay = computed(() => card.value.length >= 4 && expiry.value.length >= 4 && cvc.value.length >= 3)

async function simulatePayment() {
  processing.value = true
  await new Promise(r => setTimeout(r, 2000))
  processing.value = false; success.value = true
  await new Promise(r => setTimeout(r, 1500))
  success.value = false; card.value = ''; expiry.value = ''; cvc.value = ''
  emit('success', { simulated: true })
}
</script>

<style scoped>
.payment-backdrop { position: fixed; inset: 0; z-index: 2000; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 2rem; }
.payment-modal { max-width: 420px; width: 100%; padding: 2.5rem; border-radius: var(--radius-card); position: relative; }
.modal-close { position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--color-muted); font-size: 1.5rem; cursor: pointer; }
.modal-state { display: flex; flex-direction: column; align-items: center; gap: 1rem; text-align: center; }
.modal-state h3 { font-size: 1.5rem; color: var(--color-parchment); }
.modal-state p { font-size: 0.9rem; color: rgba(244,239,230,0.6); }
.tier-summary { display: flex; justify-content: space-between; width: 100%; padding: 0.75rem 1rem; background: rgba(201,169,110,0.08); border-radius: 0.5rem; }
.tier-name { color: var(--color-cream); font-size: 0.95rem; }
.tier-price { color: var(--color-gold); font-family: var(--font-display); font-weight: 600; }
.sim-notice { display: flex; align-items: center; gap: 0.4rem; font-family: var(--font-mono); font-size: 0.6rem; color: var(--color-muted); letter-spacing: 0.08em; text-transform: uppercase; }
.form-fields { width: 100%; display: flex; flex-direction: column; gap: 1rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group { display: flex; flex-direction: column; }
.pay-btn { width: 100%; justify-content: center; }
.spinner { width: 48px; height: 48px; border: 3px solid rgba(201,169,110,0.2); border-top-color: var(--color-gold); border-radius: 50%; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.success-icon { width: 80px; height: 80px; border-radius: 50%; background: rgba(46,205,167,0.1); border: 2px solid var(--color-teal); display: flex; align-items: center; justify-content: center; }
.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .payment-modal, .modal-leave-to .payment-modal { transform: scale(0.95) translateY(10px); }
</style>
