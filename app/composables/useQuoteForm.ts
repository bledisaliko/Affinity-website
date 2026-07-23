import { computed, reactive, ref } from 'vue'

export interface QuoteFormState {
  fullName: string
  companyName: string
  email: string
  phone: string
  preferredContact: string
  serviceCategory: string
  specificService: string
  estimatedQuantity: string
  requiredDate: string
  artworkNotes: string
  projectDescription: string
  referralSource: string
  consent: boolean
  website: string
  formStartedAt: string
  csrfToken: string
}

type ErrorMap = Partial<Record<keyof QuoteFormState, string>>

const serviceOptions = [
  'Custom Apparel',
  'Embroidery',
  'DTF Printing',
  'Screen Printing',
  'Business Print',
  'Direct Mail',
  'Signs',
  'Vehicle Decals',
  'Vehicle Wraps',
  'Fleet Branding',
  'Glass Finishes',
  'Website Design',
  'Local SEO',
  'Google Ads',
  'Google Local Services Ads',
  'Facebook & Instagram Advertising',
  'Other'
]

const servicePrefills: Record<string, string> = {
  apparel: 'Custom Apparel',
  embroidery: 'Embroidery',
  dtf: 'DTF Printing',
  'screen-printing': 'Screen Printing',
  'business-print': 'Business Print',
  print: 'Business Print',
  'direct-mail': 'Direct Mail',
  signs: 'Signs',
  'vehicle-graphics': 'Vehicle Decals',
  'vehicle-decals': 'Vehicle Decals',
  'vehicle-wraps': 'Vehicle Wraps',
  fleet: 'Fleet Branding',
  'fleet-branding': 'Fleet Branding',
  'glass-finishes': 'Glass Finishes',
  glass: 'Glass Finishes',
  'digital-marketing': 'Website Design',
  website: 'Website Design',
  websites: 'Website Design',
  seo: 'Local SEO',
  'local-seo': 'Local SEO',
  'google-ads': 'Google Ads',
  'local-services-ads': 'Google Local Services Ads',
  social: 'Facebook & Instagram Advertising'
}

function resolveServicePrefill(value: unknown) {
  const rawValue = Array.isArray(value) ? value[0] : value
  if (typeof rawValue !== 'string') return undefined

  const normalized = rawValue.trim().toLowerCase()
  const matched = servicePrefills[normalized]
  return matched && serviceOptions.includes(matched) ? matched : undefined
}

function getInitialServiceCategory() {
  if (typeof window === 'undefined') return ''

  return resolveServicePrefill(new URLSearchParams(window.location.search).get('service')) ?? ''
}

const initialForm = (): QuoteFormState => ({
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  preferredContact: 'Email',
  serviceCategory: getInitialServiceCategory(),
  specificService: '',
  estimatedQuantity: '',
  requiredDate: '',
  artworkNotes: '',
  projectDescription: '',
  referralSource: '',
  consent: false,
  website: '',
  formStartedAt: String(Math.floor(Date.now() / 1000)),
  csrfToken: ''
})

export function useQuoteForm() {
  const form = reactive<QuoteFormState>(initialForm())
  const errors = reactive<ErrorMap>({})
  const isSubmitting = ref(false)
  const statusMessage = ref('')
  const statusKind = ref<'idle' | 'success' | 'error'>('idle')

  const hasErrors = computed(() => Object.keys(errors).length > 0)

  function clearErrors() {
    Object.keys(errors).forEach((key) => {
      delete errors[key as keyof QuoteFormState]
    })
  }

  function validateForm() {
    clearErrors()

    if (!form.fullName.trim()) errors.fullName = 'Enter your full name.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Enter a valid email address.'
    }
    if (!form.phone.trim()) errors.phone = 'Enter a phone number.'
    if (!form.preferredContact) errors.preferredContact = 'Choose a preferred contact method.'
    if (!form.serviceCategory) errors.serviceCategory = 'Choose a service category.'
    if (!form.projectDescription.trim()) errors.projectDescription = 'Tell us a little about the project.'
    if (!form.consent) errors.consent = 'Confirm that you agree to be contacted about this request.'

    return !hasErrors.value
  }

  async function loadCsrfToken() {
    try {
      const response = await fetch('/api/csrf.php', {
        headers: { Accept: 'application/json' }
      })
      if (!response.ok) return
      const data = (await response.json()) as { token?: string }
      form.csrfToken = data.token ?? ''
    } catch {
      form.csrfToken = ''
    }
  }

  function prefillService(value: unknown) {
    const matched = resolveServicePrefill(value)
    if (matched) {
      form.serviceCategory = matched
      return matched
    }

    return undefined
  }

  async function submitForm() {
    statusMessage.value = ''
    statusKind.value = 'idle'

    if (!validateForm()) {
      statusKind.value = 'error'
      statusMessage.value = 'Please fix the highlighted fields and try again.'
      return
    }

    isSubmitting.value = true

    try {
      const payload = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        payload.append(key, typeof value === 'boolean' ? (value ? '1' : '') : value)
      })

      const response = await fetch('/api/quote.php', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload
      })

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean
        message?: string
        errors?: Record<string, string>
      }

      if (!response.ok || !data.ok) {
        Object.entries(data.errors ?? {}).forEach(([key, message]) => {
          errors[key as keyof QuoteFormState] = message
        })
        statusKind.value = 'error'
        statusMessage.value = data.message ?? 'The request could not be sent. Please call or email instead.'
        return
      }

      Object.assign(form, initialForm())
      statusKind.value = 'success'
      statusMessage.value = data.message ?? 'Thanks. Your quote request has been received.'
      await loadCsrfToken()
    } catch {
      statusKind.value = 'error'
      statusMessage.value = 'The secure form endpoint is available after upload to PHP hosting. Please call or email for now.'
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    form,
    errors,
    hasErrors,
    isSubmitting,
    statusMessage,
    statusKind,
    serviceOptions,
    prefillService,
    loadCsrfToken,
    submitForm,
    validateForm
  }
}
