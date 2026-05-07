import { Shield } from 'lucide-react'
import { useState } from 'react'

import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import Container from '../components/ui/Container'
import homeHeroImage from '../assets/images/hero-home.jpg'
import trustImage from '../assets/images/trust-management.jpg'
import commonStyles from '../styles/Common.module.css'
import styles from '../styles/ServicePage.module.css'

function TrustManagementPage() {
  const [openFaq, setOpenFaq] = useState<'faq1' | 'faq2' | null>('faq1')

  return (
    <>
      <Hero
        action={{ label: 'Access your account', to: '/login' }}
        backgroundImage={homeHeroImage}
        icon={<Shield aria-hidden="true" size={30} />}
        subtitle="Reliable trust administration with transparent milestones, documented controls, and clear next steps for every stakeholder."
        title="Trust Administration"
      />

      <section className={commonStyles.section}>
        <Container>
          <div className={commonStyles.rowTwo}>
            <div>
              <SectionTitle>How We Manage Complex Trusts</SectionTitle>
              <p>
                Our trust administration model combines legal coordination,
                beneficiary communication, and timeline management so your trust
                can move from setup to distribution with fewer delays.
              </p>
              <p>
                You receive practical guidance on documentation requirements,
                approval checkpoints, and release readiness, all visible in the
                client portal.
              </p>
              <ul>
                <li>
                  <strong>Trust Setup & Validation:</strong> Confirm structure,
                  beneficiaries, and core legal records.
                </li>
                <li>
                  <strong>Compliance Monitoring:</strong> Track jurisdictional
                  obligations, tax forms, and approval dependencies.
                </li>
                <li>
                  <strong>Distribution Readiness:</strong> Execute release steps
                  once documentation and payment requirements are complete.
                </li>
              </ul>
            </div>
            <div>
              <img
                alt="Advisor reviewing trust documents"
                className={styles.sideImage}
                loading="lazy"
                src={trustImage}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className={`${commonStyles.section} ${commonStyles.sectionLight}`}>
        <Container>
          <SectionTitle className={commonStyles.mb4}>Common Questions</SectionTitle>
          <div className={styles.accordion}>
            <article className={styles.accordionItem}>
              <button
                aria-expanded={openFaq === 'faq1'}
                className={styles.accordionButton}
                onClick={() =>
                  setOpenFaq((state) => (state === 'faq1' ? null : 'faq1'))
                }
                type="button"
              >
                Why is an administrative processing fee required?
              </button>
              {openFaq === 'faq1' ? (
                <div className={styles.accordionBody}>
                  The fee covers trust administration, legal review, and transfer
                  processing. It supports required compliance steps and cannot be
                  netted against pending funds until release conditions are met.
                </div>
              ) : null}
            </article>

            <article className={styles.accordionItem}>
              <button
                aria-expanded={openFaq === 'faq2'}
                className={styles.accordionButton}
                onClick={() =>
                  setOpenFaq((state) => (state === 'faq2' ? null : 'faq2'))
                }
                type="button"
              >
                What is the expected release timeline?
              </button>
              {openFaq === 'faq2' ? (
                <div className={styles.accordionBody}>
                  After fee confirmation and final verification, most trust
                  distributions are initiated within 5-10 business days, subject
                  to receiving bank timelines.
                </div>
              ) : null}
            </article>
          </div>
        </Container>
      </section>
    </>
  )
}

export default TrustManagementPage
