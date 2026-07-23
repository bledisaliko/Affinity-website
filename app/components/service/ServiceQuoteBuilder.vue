<script setup lang="ts">
import type { ServicePage } from '../../data/multipageContent'
import { getServiceQuoteConfig } from '../../data/serviceQuoteConfigs'

type QuoteValue = string | string[]

const props = defineProps<{ page: ServicePage }>()
const config = computed(() => getServiceQuoteConfig(props.page.slug))
const activeStep = ref(0)
const started = ref(false)
const sending = ref(false)
const status = ref('')
const successId = ref('')
const files = ref<File[]>([])
const formStartedAt = Date.now()
const acceptedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'svg', 'ai', 'eps', 'zip']

const answers = reactive<Record<string, QuoteValue>>({
  projectTypes: [], quantity: '', sizeDetails: '', materialDetails: '', artworkStatus: '', artworkNotes: '',
  projectDetails: '', installationDetails: '', requiredDate: '', deliveryLocation: '', fullName: '', companyName: '',
  email: '', phone: '', preferredContact: '', additionalNotes: '', consent: ''
})

const fieldLabels: Record<string, string> = {
  projectTypes: 'Project type', quantity: 'Approximate quantity or scale', sizeDetails: 'Sizes or dimensions',
  materialDetails: 'Materials, colours or stock', artworkStatus: 'Artwork status', artworkNotes: 'Artwork notes',
  projectDetails: 'Project specifications', installationDetails: 'Placement, installation or delivery details',
  requiredDate: 'Required date', deliveryLocation: 'Delivery or installation location', fullName: 'Full name',
  companyName: 'Company name', email: 'Email', phone: 'Phone', preferredContact: 'Preferred contact method',
  additionalNotes: 'Additional notes', consent: 'Consent'
}
const stepFields = [
  ['projectTypes'],
  ['quantity', 'sizeDetails', 'materialDetails'],
  ['artworkStatus', 'artworkNotes'],
  ['projectDetails', 'installationDetails'],
  ['requiredDate', 'deliveryLocation', 'fullName', 'companyName', 'email', 'phone', 'preferredContact', 'additionalNotes', 'consent']
]

const progress = computed(() => `${((activeStep.value + 1) / config.value.steps.length) * 100}%`)
const draftKey = computed(() => `affinityQuoteDraft:${props.page.slug}`)

function selected(value: string) {
  return Array.isArray(answers.projectTypes) && (answers.projectTypes as string[]).includes(value)
}

function toggleProjectType(value: string) {
  const values = Array.isArray(answers.projectTypes) ? [...answers.projectTypes as string[]] : []
  const index = values.indexOf(value)
  if (index >= 0) values.splice(index, 1)
  else values.push(value)
  answers.projectTypes = values
}

function openStep(index: number) {
  started.value = true
  activeStep.value = index
  status.value = ''
}

function validateStep(index: number) {
  status.value = ''
  if (index === 0 && !(answers.projectTypes as string[]).length) status.value = 'Choose at least one project type.'
  if (index === 1 && !String(answers.quantity).trim()) status.value = 'Enter an approximate quantity or project scale.'
  if (index === 4) {
    if (!String(answers.requiredDate).trim()) status.value = 'Enter the required date.'
    else if (!String(answers.fullName).trim()) status.value = 'Enter your full name.'
    else if (!/^\S+@\S+\.\S+$/.test(String(answers.email))) status.value = 'Enter a valid email address.'
    else if (String(answers.phone).replace(/\D/g, '').length < 7) status.value = 'Enter a valid phone number.'
    else if (!String(answers.preferredContact).trim()) status.value = 'Choose a preferred contact method.'
    else if (answers.consent !== 'Yes') status.value = 'Consent is required before sending.'
  }
  return !status.value
}

function nextStep() {
  if (!validateStep(activeStep.value)) return
  activeStep.value = Math.min(activeStep.value + 1, config.value.steps.length - 1)
}

function previousStep() {
  status.value = ''
  activeStep.value = Math.max(activeStep.value - 1, 0)
}

function handleFiles(event: Event) {
  status.value = ''
  const input = event.target as HTMLInputElement
  const next = [...files.value]
  for (const file of Array.from(input.files ?? [])) {
    const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
    if (!acceptedExtensions.includes(extension)) {
      status.value = `${file.name} is not an accepted file type.`
      continue
    }
    if (file.size > 8 * 1024 * 1024) {
      status.value = `${file.name} is larger than 8 MB.`
      continue
    }
    if (next.length >= 5 || next.reduce((total, item) => total + item.size, 0) + file.size > 20 * 1024 * 1024) {
      status.value = 'Upload no more than 5 files or 20 MB total.'
      break
    }
    next.push(file)
  }
  files.value = next
  input.value = ''
}

function removeFile(index: number) {
  files.value = files.value.filter((_, fileIndex) => fileIndex !== index)
}

function summaryData() {
  return config.value.steps.map((step, index) => ({
    title: step.title,
    fields: stepFields[index]!.map(id => ({ id, label: fieldLabels[id], value: answers[id] || '' }))
  }))
}

async function submitQuote() {
  if (!validateStep(4)) return
  sending.value = true
  status.value = 'Sending request...'
  const data = new FormData()
  data.append('serviceKey', props.page.slug)
  data.append('serviceName', config.value.serviceName)
  data.append('sourcePage', window.location.pathname)
  data.append('formStartedAt', String(Math.floor(formStartedAt / 1000)))
  data.append('answers', JSON.stringify(summaryData()))
  data.append('uploadedFileCount', String(files.value.length))
  ;['fullName', 'companyName', 'email', 'phone', 'preferredContact', 'consent', 'requiredDate', 'deliveryLocation', 'additionalNotes'].forEach((id) => {
    data.append(id, Array.isArray(answers[id]) ? (answers[id] as string[]).join(', ') : String(answers[id] || ''))
  })
  data.append('website', '')
  files.value.forEach((file) => {
    data.append('files[]', file, file.name)
    data.append('fileLabels[]', 'Artwork or project reference')
  })

  try {
    const response = await fetch('/api/quote-request.php', { method: 'POST', body: data, headers: { Accept: 'application/json' }, credentials: 'same-origin' })
    const result = await response.json().catch(() => ({ ok: false, message: 'The server returned an unreadable response.' }))
    if (!response.ok || result.ok !== true) throw new Error(result.message || 'The request could not be sent.')
    successId.value = result.requestId || `AC-${Date.now()}`
    status.value = ''
    localStorage.removeItem(draftKey.value)
  } catch (error) {
    status.value = error instanceof Error ? error.message : 'The request could not be sent. Please email info@affinitycreative.ca.'
  } finally {
    sending.value = false
  }
}

onMounted(() => {
  try {
    const draft = localStorage.getItem(draftKey.value)
    if (!draft) return
    const parsed = JSON.parse(draft) as { activeStep?: number, started?: boolean, answers?: Record<string, QuoteValue> }
    if (parsed.answers) Object.assign(answers, parsed.answers)
    if (typeof parsed.activeStep === 'number') activeStep.value = Math.max(0, Math.min(parsed.activeStep, 4))
    started.value = Boolean(parsed.started)
  } catch {
    localStorage.removeItem(draftKey.value)
  }
})

watch([activeStep, started, answers], () => {
  if (!import.meta.client || successId.value) return
  localStorage.setItem(draftKey.value, JSON.stringify({ activeStep: activeStep.value, started: started.value, answers }))
}, { deep: true })
</script>

<template>
  <section id="quote-builder" class="service-quote" :style="{ '--quote-accent': config.accent }" :aria-labelledby="`quote-heading-${page.slug}`">
    <div class="container service-quote__layout">
      <div class="service-quote__intro">
        <p class="service-quote__eyebrow">Ready for a useful estimate?</p>
        <h2 :id="`quote-heading-${page.slug}`">{{ config.headline }}</h2>
        <p>{{ page.quoteBody }}</p>
        <ul>
          <li><span aria-hidden="true">☷</span><div><strong>Focused questions</strong><small>Only the details that affect scope, timing and pricing.</small></div></li>
          <li><span aria-hidden="true">✓</span><div><strong>Clear next steps</strong><small>A practical recommendation instead of a vague estimate.</small></div></li>
          <li><span aria-hidden="true">◔</span><div><strong>Local support</strong><small>Your request is reviewed by the Affinity Creative team.</small></div></li>
        </ul>
        <button type="button" class="service-quote__start" @click="openStep(0)">{{ config.cta }} <span aria-hidden="true">↗</span></button>
        <strong class="service-quote__reassurance">Takes less than 2 minutes · No obligation</strong>
      </div>

      <div class="service-quote__panel">
        <div v-if="successId" class="service-quote__success" aria-live="polite">
          <span aria-hidden="true">✓</span><h3>Thank you.</h3>
          <p>Your quote request has been received. We will respond within one business day.</p>
          <p><strong>Request reference:</strong> {{ successId }}</p>
        </div>

        <form v-else novalidate @submit.prevent="submitQuote">
          <header class="service-quote__header">
            <div><h3>Guided Quote Builder</h3><p aria-live="polite">{{ status }}</p></div>
            <strong>Step {{ activeStep + 1 }} of {{ config.steps.length }}</strong>
          </header>
          <div class="service-quote__progress" aria-hidden="true"><span :style="{ width: progress }"></span></div>
          <nav class="service-quote__steps" aria-label="Quote steps">
            <button v-for="(step, index) in config.steps" :key="step.title" type="button" :class="{ 'is-active': index === activeStep }" @click="openStep(index)">
              <span>{{ index + 1 }}</span><strong>{{ step.title }}</strong>
            </button>
          </nav>

          <div v-if="!started" class="service-quote__overview">
            <button v-for="(step, index) in config.steps" :key="step.title" type="button" @click="openStep(index)">
              <span>{{ index + 1 }}</span><div><strong>{{ step.title }}</strong><small>{{ step.description }}</small></div><b aria-hidden="true">›</b>
            </button>
          </div>

          <fieldset v-else>
            <legend>{{ config.steps[activeStep]!.title }}</legend>
            <p>{{ config.steps[activeStep]!.description }}</p>

            <div v-if="activeStep === 0" class="choice-grid">
              <label v-for="option in config.primaryOptions" :key="option"><input type="checkbox" :checked="selected(option)" @change="toggleProjectType(option)"><span>{{ option }}</span></label>
            </div>

            <div v-else-if="activeStep === 1" class="field-grid">
              <label>Approximate quantity or project scale *<input v-model="answers.quantity" type="text" required></label>
              <label>Sizes or dimensions<input v-model="answers.sizeDetails" type="text"></label>
              <label class="field-grid__wide">Materials, colours, stock or surface details<textarea v-model="answers.materialDetails" rows="4"></textarea></label>
            </div>

            <div v-else-if="activeStep === 2" class="field-grid">
              <label>Artwork status<select v-model="answers.artworkStatus"><option value="">Select</option><option>Print-ready vector artwork</option><option>PDF available</option><option>PNG or JPG available</option><option>Artwork needs cleanup</option><option>Design is required</option><option>No artwork yet</option></select></label>
              <label class="field-grid__wide">Upload artwork, photos or reference files<input type="file" multiple accept=".jpg,.jpeg,.png,.webp,.pdf,.svg,.ai,.eps,.zip" @change="handleFiles"><small>Up to 5 files, 8 MB each and 20 MB total.</small></label>
              <ul v-if="files.length" class="file-list"><li v-for="(file, index) in files" :key="`${file.name}-${file.size}`"><span>{{ file.name }}</span><button type="button" @click="removeFile(index)">Remove</button></li></ul>
              <label class="field-grid__wide">Artwork or photo notes<textarea v-model="answers.artworkNotes" rows="4"></textarea></label>
            </div>

            <div v-else-if="activeStep === 3" class="field-grid">
              <label class="field-grid__wide">Project specifications<textarea v-model="answers.projectDetails" rows="5"></textarea></label>
              <label class="field-grid__wide">Placement, installation or delivery details<textarea v-model="answers.installationDetails" rows="4"></textarea></label>
            </div>

            <div v-else class="field-grid">
              <label>Required date *<input v-model="answers.requiredDate" type="date" required></label>
              <label>Delivery or installation location<input v-model="answers.deliveryLocation" type="text" autocomplete="street-address"></label>
              <label>Full name *<input v-model="answers.fullName" type="text" autocomplete="name" required></label>
              <label>Company name<input v-model="answers.companyName" type="text" autocomplete="organization"></label>
              <label>Email *<input v-model="answers.email" type="email" autocomplete="email" required></label>
              <label>Phone *<input v-model="answers.phone" type="tel" autocomplete="tel" required></label>
              <label>Preferred contact method *<select v-model="answers.preferredContact" required><option value="">Select</option><option>Email</option><option>Phone</option><option>Text</option><option>No preference</option></select></label>
              <label class="field-grid__wide">Additional notes<textarea v-model="answers.additionalNotes" rows="4"></textarea></label>
              <label class="consent field-grid__wide"><input type="checkbox" :checked="answers.consent === 'Yes'" @change="answers.consent = answers.consent === 'Yes' ? '' : 'Yes'"><span>I agree that Affinity Creative may contact me regarding this quote request.</span></label>
            </div>
          </fieldset>

          <footer v-if="started" class="service-quote__actions">
            <button v-if="activeStep > 0" type="button" class="button-secondary" @click="previousStep">Back</button>
            <button v-if="activeStep < config.steps.length - 1" type="button" class="button-primary" @click="nextStep">Continue</button>
            <button v-else type="submit" class="button-primary" :disabled="sending">{{ sending ? 'Sending…' : config.cta }}</button>
          </footer>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.service-quote { --quote-accent: var(--color-orange); overflow: clip; background: radial-gradient(circle at 82% 22%, color-mix(in srgb, var(--quote-accent) 12%, transparent), transparent 31rem), var(--color-warm-white); padding-block: clamp(5rem, 8vw, 8rem); }
.service-quote__layout { display: grid; grid-template-columns: minmax(0, .8fr) minmax(34rem, 1.2fr); gap: clamp(2.5rem, 7vw, 6rem); align-items: start; }
.service-quote__eyebrow { margin: 0; color: var(--quote-accent); font-size: .76rem; font-weight: 850; letter-spacing: .11em; text-transform: uppercase; }
.service-quote__intro h2 { max-width: 11ch; margin: .75rem 0 1.2rem; font-size: clamp(2.8rem, 5.4vw, 5.4rem); line-height: .95; letter-spacing: -.06em; }
.service-quote__intro > p:not(.service-quote__eyebrow) { max-width: 34rem; color: var(--color-muted); line-height: 1.7; }
.service-quote__intro ul { display: grid; gap: 1.05rem; padding: 0; margin: 2rem 0; list-style: none; }
.service-quote__intro li { display: grid; grid-template-columns: 2.6rem 1fr; gap: .75rem; align-items: start; }
.service-quote__intro li > span { display: grid; width: 2.35rem; height: 2.35rem; place-items: center; border: 1px solid color-mix(in srgb, var(--quote-accent) 35%, #ddd); border-radius: 50%; color: var(--quote-accent); }
.service-quote__intro li div { display: grid; gap: .18rem; }
.service-quote__intro li small { color: var(--color-muted); line-height: 1.45; }
.service-quote__start { min-height: 3.25rem; border: 0; border-radius: 999px; background: var(--color-orange); padding: .8rem 1.35rem; color: #fff; font-weight: 850; cursor: pointer; }
.service-quote__reassurance { display: block; margin-block-start: 1rem; color: var(--color-muted); font-size: .8rem; }
.service-quote__panel { overflow: hidden; border: 1px solid rgb(17 17 15 / .11); border-radius: 1.5rem; background: #fff; box-shadow: 0 1.5rem 4rem rgb(45 35 20 / .1); }
.service-quote__header { display: flex; justify-content: space-between; gap: 1rem; align-items: flex-start; padding: 1.5rem 1.5rem 1rem; }
.service-quote__header h3 { margin: 0; font-size: clamp(1.45rem, 2.2vw, 1.9rem); }
.service-quote__header p { min-height: 1.15em; margin: .35rem 0 0; color: #b33b1e; font-size: .86rem; }
.service-quote__header > strong { white-space: nowrap; border-radius: 999px; background: color-mix(in srgb, var(--quote-accent) 12%, white); padding: .5rem .65rem; color: var(--quote-accent); font-size: .76rem; }
.service-quote__progress { height: .28rem; background: #eee9df; }
.service-quote__progress span { display: block; height: 100%; background: var(--quote-accent); transition: width .2s ease; }
.service-quote__steps { display: grid; grid-template-columns: repeat(5, 1fr); padding: .8rem 1rem; border-block-end: 1px solid #e8e2d8; }
.service-quote__steps button { display: grid; gap: .4rem; justify-items: center; min-width: 0; border: 0; background: none; color: #69645c; text-align: center; cursor: pointer; }
.service-quote__steps button.is-active { color: var(--quote-accent); }
.service-quote__steps button > span { display: grid; width: 2rem; height: 2rem; place-items: center; border: 1px solid #cbc5bb; border-radius: 50%; background: #e8e5df; font-size: .72rem; }
.service-quote__steps button.is-active > span { border-color: var(--quote-accent); background: color-mix(in srgb, var(--quote-accent) 13%, white); }
.service-quote__steps button strong { overflow: hidden; width: 100%; font-size: .68rem; line-height: 1.2; text-overflow: ellipsis; white-space: nowrap; }
.service-quote__overview { display: grid; gap: .6rem; padding: 1.2rem 1.5rem 1.5rem; }
.service-quote__overview button { display: grid; grid-template-columns: 2.7rem 1fr auto; gap: .75rem; align-items: center; width: 100%; border: 1px solid #ded8ce; border-radius: .85rem; background: #fff; padding: .85rem; color: #1a1917; text-align: left; cursor: pointer; }
.service-quote__overview button:hover { border-color: var(--quote-accent); background: color-mix(in srgb, var(--quote-accent) 5%, white); }
.service-quote__overview button > span { display: grid; width: 2.25rem; height: 2.25rem; place-items: center; border: 1px solid color-mix(in srgb, var(--quote-accent) 30%, #ddd); border-radius: 50%; color: var(--quote-accent); font-weight: 850; }
.service-quote__overview button div { display: grid; gap: .2rem; }
.service-quote__overview button small { color: var(--color-muted); font-size: .8rem; }
.service-quote__overview button b { color: var(--quote-accent); font-size: 1.2rem; }
fieldset { min-width: 0; padding: 1.5rem; border: 0; margin: 0; }
legend { padding: 0; font-size: 1.4rem; font-weight: 850; }
fieldset > p { margin: .35rem 0 1.5rem; color: var(--color-muted); }
.field-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.field-grid > label { display: grid; gap: .45rem; color: #34312d; font-size: .84rem; font-weight: 750; }
.field-grid__wide { grid-column: 1 / -1; }
input:not([type='checkbox']), select, textarea { width: 100%; border: 1px solid #d8d0c3; border-radius: .65rem; background: #fff; padding: .75rem .8rem; color: #171614; font: inherit; }
input:focus, select:focus, textarea:focus { outline: 3px solid color-mix(in srgb, var(--quote-accent) 18%, transparent); border-color: var(--quote-accent); }
label small { color: var(--color-muted); font-weight: 500; }
.choice-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .6rem; }
.choice-grid label, .consent { display: flex; gap: .65rem; align-items: flex-start; border: 1px solid #ddd5c8; border-radius: .7rem; padding: .75rem; background: #fff; font-size: .82rem; font-weight: 700; cursor: pointer; }
.choice-grid input, .consent input { flex: 0 0 auto; margin-block-start: .15rem; accent-color: var(--quote-accent); }
.file-list { grid-column: 1 / -1; display: grid; gap: .5rem; padding: 0; margin: 0; list-style: none; }
.file-list li { display: flex; justify-content: space-between; gap: 1rem; padding: .65rem .8rem; border-radius: .6rem; background: #f6f1e7; font-size: .82rem; }
.file-list button { border: 0; background: none; color: #a13a1e; font-weight: 800; cursor: pointer; }
.service-quote__actions { display: flex; justify-content: flex-end; gap: .75rem; padding: 0 1.5rem 1.5rem; }
.button-primary, .button-secondary { min-height: 2.9rem; border-radius: 999px; padding: .7rem 1.25rem; font-weight: 800; cursor: pointer; }
.button-primary { border: 1px solid var(--quote-accent); background: var(--quote-accent); color: #fff; }
.button-secondary { border: 1px solid #bcb3a5; background: #fff; color: #1b1916; }
.button-primary:disabled { opacity: .6; cursor: wait; }
.service-quote__success { display: grid; justify-items: start; gap: .8rem; min-height: 28rem; align-content: center; padding: 3rem; }
.service-quote__success > span { display: grid; width: 3rem; height: 3rem; place-items: center; border-radius: 50%; background: var(--quote-accent); color: white; font-size: 1.5rem; }
.service-quote__success h3, .service-quote__success p { margin: 0; }
@media (max-width: 980px) { .service-quote__layout { grid-template-columns: 1fr; } .service-quote__intro h2 { max-width: 14ch; } }
@media (max-width: 640px) { .service-quote__steps { grid-template-columns: 1fr; gap: .3rem; } .service-quote__steps button { display: flex; align-items: center; text-align: left; } .service-quote__steps button:not(.is-active) strong { display: none; } .service-quote__steps button > span { width: 1.65rem; height: 1.65rem; } .field-grid, .choice-grid { grid-template-columns: 1fr; } .service-quote__header { flex-direction: column; } .service-quote__overview button { grid-template-columns: 2.4rem 1fr auto; } }
</style>
