import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import styles from '../styles/AuthPage.module.css'

interface SignupFormData {
  fullName: string
  email: string
  phone: string
  household: string
  serviceInterest: string
  contactPreference: string
  notes: string
  consent: boolean
}

const initialFormData: SignupFormData = {
  fullName: '',
  email: '',
  phone: '',
  household: '',
  serviceInterest: 'Trust Administration',
  contactPreference: 'Email',
  notes: '',
  consent: false,
}

function SignupPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<SignupFormData>(initialFormData)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const updateField = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target

    if (type === 'checkbox') {
      const target = event.target as HTMLInputElement
      setFormData((current) => ({ ...current, [name]: target.checked }))
      return
    }

    setFormData((current) => ({ ...current, [name]: value }))
  }

  const validateStepOne = () => {
    if (!formData.fullName.trim()) {
      setError('Please enter your full name so we can identify your registration.')
      return false
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address for your registration.')
      return false
    }

    if (!formData.phone.trim()) {
      setError('Please share a phone number so our team can reach you.')
      return false
    }

    setError('')
    return true
  }

  const validateStepTwo = () => {
    if (!formData.household.trim()) {
      setError('Please tell us whether this is an individual or household account.')
      return false
    }

    if (!formData.serviceInterest) {
      setError('Please choose the service area that best fits your needs.')
      return false
    }

    setError('')
    return true
  }

  const handleNext = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (step === 1) {
      if (!validateStepOne()) {
        return
      }

      setStep(2)
      return
    }

    if (!validateStepTwo()) {
      return
    }

    setStep(3)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.consent) {
      setError('Please confirm that you agree to the registration terms before continuing.')
      return
    }

    localStorage.setItem('tideStoneSignup', JSON.stringify(formData))
    setSubmitted(true)
    setError('')
  }

  return (
    <section className={styles.wrap}>
      <Container>
        <div className={styles.card}>
          <div className={styles.cardBody}>
            <div className={styles.steps} aria-label="Registration progress">
              <span className={`${styles.step} ${step >= 1 ? styles.stepActive : ''}`}>
                1. Profile
              </span>
              <span className={`${styles.step} ${step >= 2 ? styles.stepActive : ''}`}>
                2. Planning needs
              </span>
              <span className={`${styles.step} ${step >= 3 ? styles.stepActive : ''}`}>
                3. Confirm
              </span>
            </div>

            {submitted ? (
              <div className={styles.successCard}>
                <h3 className={styles.title}>Registration received</h3>
                <p className={styles.subtitle}>
                  Thank you for registering with TideStone Advisory. Our team will
                  review your request and contact you shortly.
                </p>
                <Button onClick={() => navigate('/login')} type="button" variant="gold">
                  Continue to client login
                </Button>
              </div>
            ) : (
              <>
                <h3 className={styles.title}>Create your client account</h3>
                <p className={styles.subtitle}>
                  Begin your onboarding journey with TideStone Advisory through a
                  simple, secure registration process.
                </p>

                {error ? (
                  <div className={styles.alert} role="alert">
                    {error}
                  </div>
                ) : null}

                {step === 1 ? (
                  <form onSubmit={handleNext}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="fullName">
                        Full name
                      </label>
                      <input
                        className={styles.input}
                        id="fullName"
                        name="fullName"
                        onChange={updateField}
                        placeholder="Enter your full name"
                        required
                        type="text"
                        value={formData.fullName}
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="email">
                        Email address
                      </label>
                      <input
                        className={styles.input}
                        id="email"
                        name="email"
                        onChange={updateField}
                        placeholder="name@example.com"
                        required
                        type="email"
                        value={formData.email}
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="phone">
                        Phone number
                      </label>
                      <input
                        className={styles.input}
                        id="phone"
                        name="phone"
                        onChange={updateField}
                        placeholder="(555) 010-0000"
                        required
                        type="tel"
                        value={formData.phone}
                      />
                    </div>

                    <Button fullWidth type="submit" variant="gold">
                      Continue to planning needs
                    </Button>
                  </form>
                ) : null}

                {step === 2 ? (
                  <form onSubmit={handleNext}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="household">
                        Individual or household account
                      </label>
                      <input
                        className={styles.input}
                        id="household"
                        name="household"
                        onChange={updateField}
                        placeholder="e.g. Individual, Family Office, Trust"
                        required
                        type="text"
                        value={formData.household}
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="serviceInterest">
                        Area of interest
                      </label>
                      <select
                        className={styles.input}
                        id="serviceInterest"
                        name="serviceInterest"
                        onChange={updateField}
                        value={formData.serviceInterest}
                      >
                        <option>Trust Administration</option>
                        <option>Investment Strategy</option>
                        <option>Legacy Preservation</option>
                        <option>Comprehensive Planning</option>
                      </select>
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="contactPreference">
                        Preferred contact method
                      </label>
                      <select
                        className={styles.input}
                        id="contactPreference"
                        name="contactPreference"
                        onChange={updateField}
                        value={formData.contactPreference}
                      >
                        <option>Email</option>
                        <option>Phone</option>
                        <option>Video call</option>
                      </select>
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="notes">
                        Brief note for your advisor
                      </label>
                      <textarea
                        className={styles.input}
                        id="notes"
                        name="notes"
                        onChange={updateField}
                        placeholder="Share your goals, timeline, or questions"
                        rows={4}
                        value={formData.notes}
                      />
                    </div>

                    <div className={styles.actionsRow}>
                      <Button
                        onClick={() => setStep(1)}
                        type="button"
                        variant="outlinePrimary"
                      >
                        Back
                      </Button>
                      <Button fullWidth type="submit" variant="gold">
                        Review details
                      </Button>
                    </div>
                  </form>
                ) : null}

                {step === 3 ? (
                  <form onSubmit={handleSubmit}>
                    <div className={styles.summaryCard}>
                      <h4 className={styles.sectionTitle}>Registration summary</h4>
                      <p className={styles.summaryRow}>
                        <strong>Name:</strong> {formData.fullName}
                      </p>
                      <p className={styles.summaryRow}>
                        <strong>Email:</strong> {formData.email}
                      </p>
                      <p className={styles.summaryRow}>
                        <strong>Phone:</strong> {formData.phone}
                      </p>
                      <p className={styles.summaryRow}>
                        <strong>Account type:</strong> {formData.household}
                      </p>
                      <p className={styles.summaryRow}>
                        <strong>Service interest:</strong> {formData.serviceInterest}
                      </p>
                      <p className={styles.summaryRow}>
                        <strong>Preferred contact:</strong> {formData.contactPreference}
                      </p>
                      {formData.notes ? (
                        <p className={styles.summaryRow}>
                          <strong>Notes:</strong> {formData.notes}
                        </p>
                      ) : null}
                    </div>

                    <label className={styles.checkboxRow}>
                      <input
                        checked={formData.consent}
                        name="consent"
                        onChange={updateField}
                        type="checkbox"
                      />
                      <span>
                        I agree to the registration terms and consent to being contacted
                        by TideStone Advisory regarding my inquiry.
                      </span>
                    </label>

                    <div className={styles.actionsRow}>
                      <Button
                        onClick={() => setStep(2)}
                        type="button"
                        variant="outlinePrimary"
                      >
                        Back
                      </Button>
                      <Button fullWidth type="submit" variant="gold">
                        Complete registration
                      </Button>
                    </div>
                  </form>
                ) : null}

                <div className={styles.linkRow}>
                  <span>Already registered?</span>
                  <Link className={styles.inlineLink} to="/login">
                    Sign in to your portal
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SignupPage
