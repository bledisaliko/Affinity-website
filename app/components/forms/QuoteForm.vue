<script setup lang="ts">
import { Send } from 'lucide-vue-next'
import { nextTick, onMounted } from 'vue'
import { trackEvent } from '../../utils/tracking'

const {
  form,
  errors,
  isSubmitting,
  statusMessage,
  statusKind,
  serviceOptions,
  prefillService,
  loadCsrfToken,
  submitForm
} = useQuoteForm()

const route = useRoute()
const hasTrackedStart = ref(false)

function applyServicePrefill() {
  const browserService = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('service')
    : null

  const matched = prefillService(browserService ?? route.query.service)
  if (!matched || typeof document === 'undefined') return

  const select = document.getElementById('serviceCategory') as HTMLSelectElement | null
  if (select && select.value !== matched) {
    select.value = matched
    select.dispatchEvent(new Event('change', { bubbles: true }))
  }
}

function trackQuoteStart() {
  if (hasTrackedStart.value) return
  hasTrackedStart.value = true
  trackEvent('start_quote', {
    service_category: form.serviceCategory
  })
}

async function handleSubmit() {
  trackEvent('submit_quote', {
    service_category: form.serviceCategory
  })
  await submitForm()
}

if (import.meta.client) {
  applyServicePrefill()
}

onMounted(async () => {
  applyServicePrefill()
  await nextTick()
  applyServicePrefill()
  window.requestAnimationFrame(applyServicePrefill)
  void loadCsrfToken()
})
</script>

<template>
  <form id="quote" class="quote-form panel" method="post" action="/api/quote.php" novalidate @focusin="trackQuoteStart" @submit.prevent="handleSubmit">
    <div class="form-grid">
      <input v-model="form.csrfToken" type="hidden" name="csrfToken" />
      <input v-model="form.formStartedAt" type="hidden" name="formStartedAt" />
      <div class="form-field website-field" aria-hidden="true">
        <label for="website">Website</label>
        <input id="website" v-model="form.website" name="website" tabindex="-1" autocomplete="off" />
      </div>

      <div class="form-field">
        <label for="fullName">Name</label>
        <input id="fullName" v-model="form.fullName" name="fullName" type="text" autocomplete="name" required :aria-invalid="Boolean(errors.fullName)" aria-describedby="fullName-error" />
        <p v-if="errors.fullName" id="fullName-error" class="field-error">{{ errors.fullName }}</p>
      </div>

      <div class="form-field">
        <label for="companyName">Company</label>
        <input id="companyName" v-model="form.companyName" name="companyName" type="text" autocomplete="organization" />
      </div>

      <div class="form-field">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" name="email" type="email" autocomplete="email" required :aria-invalid="Boolean(errors.email)" aria-describedby="email-error" />
        <p v-if="errors.email" id="email-error" class="field-error">{{ errors.email }}</p>
      </div>

      <div class="form-field">
        <label for="phone">Phone</label>
        <input id="phone" v-model="form.phone" name="phone" type="tel" autocomplete="tel" required :aria-invalid="Boolean(errors.phone)" aria-describedby="phone-error" />
        <p v-if="errors.phone" id="phone-error" class="field-error">{{ errors.phone }}</p>
      </div>

      <div class="form-field">
        <label for="preferredContact">Preferred contact method</label>
        <select id="preferredContact" v-model="form.preferredContact" name="preferredContact" required :aria-invalid="Boolean(errors.preferredContact)" aria-describedby="preferredContact-error">
          <option>Email</option>
          <option>Phone</option>
          <option>Either</option>
        </select>
        <p v-if="errors.preferredContact" id="preferredContact-error" class="field-error">{{ errors.preferredContact }}</p>
      </div>

      <div class="form-field">
        <label for="serviceCategory">Service</label>
        <select id="serviceCategory" v-model="form.serviceCategory" name="serviceCategory" required :aria-invalid="Boolean(errors.serviceCategory)" aria-describedby="serviceCategory-error">
          <option value="">Choose a service</option>
          <option v-for="option in serviceOptions" :key="option" :value="option">{{ option }}</option>
        </select>
        <p v-if="errors.serviceCategory" id="serviceCategory-error" class="field-error">{{ errors.serviceCategory }}</p>
      </div>

      <div class="form-field">
        <label for="estimatedQuantity">Estimated quantity</label>
        <input id="estimatedQuantity" v-model="form.estimatedQuantity" name="estimatedQuantity" type="text" inputmode="numeric" />
      </div>

      <div class="form-field">
        <label for="requiredDate">Required date</label>
        <input id="requiredDate" v-model="form.requiredDate" name="requiredDate" type="date" />
      </div>

      <div class="form-field form-field--full">
        <label for="artworkNotes">Artwork link or notes</label>
        <input id="artworkNotes" v-model="form.artworkNotes" name="artworkNotes" type="text" />
      </div>

      <div class="form-field form-field--full">
        <label for="projectDescription">Project description</label>
        <textarea id="projectDescription" v-model="form.projectDescription" name="projectDescription" required :aria-invalid="Boolean(errors.projectDescription)" aria-describedby="projectDescription-error" />
        <p v-if="errors.projectDescription" id="projectDescription-error" class="field-error">{{ errors.projectDescription }}</p>
      </div>

      <div class="form-field form-field--full consent-field">
        <label>
          <input
            v-model="form.consent"
            name="consent"
            type="checkbox"
            value="1"
            required
            :aria-invalid="Boolean(errors.consent)"
            :aria-describedby="errors.consent ? 'consent-error' : undefined"
          />
          <span>I agree to be contacted about this quote request.</span>
        </label>
        <p v-if="errors.consent" id="consent-error" class="field-error">{{ errors.consent }}</p>
      </div>
    </div>

    <p class="fine-print">
      Your information is used to respond to this request. Do not include payment information in this form.
    </p>

    <div class="button-row">
      <button class="button button--primary" type="submit" :disabled="isSubmitting">
        <Send :size="18" aria-hidden="true" />
        {{ isSubmitting ? 'Sending...' : 'Send Quote Request' }}
      </button>
    </div>

    <p v-if="statusMessage" class="status-message" :data-kind="statusKind" role="status" aria-live="polite">
      {{ statusMessage }}
    </p>
  </form>
</template>

<style scoped>
.quote-form {
  display: grid;
  gap: 1rem;
  border: 1px solid var(--color-line);
  border-radius: 1rem;
  background: var(--color-white);
  color: var(--color-ink);
  padding: clamp(1rem, 2.6vw, 1.35rem);
  box-shadow: 0 0.85rem 2rem rgb(17 17 15 / 0.08);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

.website-field {
  position: absolute;
  inset-inline-start: -9999px;
}

.form-field {
  display: grid;
  gap: 0.35rem;
  min-width: 0;
}

.form-field--full {
  grid-column: 1 / -1;
}

.form-field label {
  color: var(--color-charcoal);
  font-size: 0.84rem;
  font-weight: 900;
}

.form-field input,
.form-field select,
.form-field textarea {
  width: 100%;
  border: 1px solid rgb(17 17 15 / 0.2);
  border-radius: 0.7rem;
  background: var(--color-warm-white);
  color: var(--color-ink);
  padding: 0.76rem 0.82rem;
}

.form-field textarea {
  min-height: 9rem;
  resize: vertical;
}

.form-field input[aria-invalid="true"],
.form-field select[aria-invalid="true"],
.form-field textarea[aria-invalid="true"] {
  border-color: var(--color-error);
}

.field-error {
  color: var(--color-error);
  font-size: 0.78rem;
  font-weight: 800;
}

.consent-field label {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.6rem;
  align-items: start;
  font-weight: 780;
}

.consent-field input {
  width: 1.2rem;
  min-height: 1.2rem;
  margin-block-start: 0.2rem;
}

button[disabled] {
  opacity: 0.7;
  cursor: progress;
}

.fine-print,
.status-message {
  color: var(--color-muted);
  font-size: 0.86rem;
  font-weight: 760;
}

.status-message[data-kind="success"] {
  color: var(--color-success);
}

.status-message[data-kind="error"] {
  color: var(--color-error);
}

@media (width <= 620px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
