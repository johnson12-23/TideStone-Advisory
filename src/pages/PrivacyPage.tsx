import { Shield } from 'lucide-react'

import Container from '../components/ui/Container'
import styles from '../styles/PrivacyPage.module.css'

interface PrivacySection {
  title: string
  paragraphs?: string[]
  bullets?: Array<string | { label: string; text: string }>
}

const sections: PrivacySection[] = [
  {
    title: '1. Introduction',
    paragraphs: [
      'TideStone Advisory respects your privacy and protects client information as part of our service commitment. This policy explains what data we collect, how it is used, and the controls we apply when you use our website and portal services.',
    ],
  },
  {
    title: '2. Information We Collect',
    paragraphs: ['Depending on your engagement, we may collect:'],
    bullets: [
      {
        label: 'Client Profile Data',
        text: 'Name, email address, phone number, and account identifiers submitted during onboarding.',
      },
      {
        label: 'Service & Transaction Data',
        text: 'Portal activity, trust workflow records, and transaction-related status details.',
      },
      {
        label: 'Technical Data',
        text: 'Browser metadata, session identifiers, and security logs used to protect account access.',
      },
    ],
  },
  {
    title: '3. How We Use Information',
    paragraphs: ['We process information to:'],
    bullets: [
      'Deliver trust administration and advisory services requested by you.',
      'Communicate account updates, required actions, and service notices.',
      'Perform compliance checks and meet legal or regulatory obligations.',
      'Improve platform reliability, security controls, and client experience.',
    ],
  },
  {
    title: '4. Information Sharing',
    paragraphs: [
      'We do not sell personal information. We share information only when necessary for service delivery or legal compliance.',
    ],
    bullets: [
      {
        label: 'Service Providers',
        text: 'Vetted partners that support secure hosting, document handling, and operational workflows.',
      },
      {
        label: 'Regulatory or Legal Requests',
        text: 'Authorities when disclosure is required by law, audit, or legal process.',
      },
      {
        label: 'Authorized Representatives',
        text: 'Individuals or entities you authorize to receive account-related information.',
      },
    ],
  },
  {
    title: '5. Data Security',
    paragraphs: [
      'We apply administrative, technical, and procedural safeguards to protect your information, including role-based access controls and secure document practices. No system is entirely risk-free, but we continuously review and strengthen our protections.',
    ],
  },
  {
    title: '6. Your Rights and Choices',
    paragraphs: ['Subject to applicable law, you may request to:'],
    bullets: [
      'Access or update your account information.',
      'Request correction or deletion of certain records where legally permitted.',
      'Limit non-essential communications and request clarification on data use.',
    ],
  },
  {
    title: '7. Data Transfers',
    paragraphs: [
      'When service delivery involves multiple jurisdictions, information may be processed outside your home region. In such cases, we use reasonable safeguards aligned with applicable privacy requirements.',
    ],
  },
  {
    title: '8. Policy Updates',
    paragraphs: [
      'We may revise this policy to reflect service, legal, or operational changes. The latest version and effective date will always be posted on this page.',
    ],
  },
  {
    title: '9. Contact',
    paragraphs: ['For privacy-related questions or requests, contact:'],
    bullets: [
      {
        label: 'Email',
        text: 'support@tidestoneadvisors.com',
      },
      {
        label: 'Phone',
        text: '(715) 400-3617',
      },
    ],
  },
]

function PrivacyPage() {
  return (
    <section className={styles.wrap}>
      <Container>
        <header className={styles.header}>
          <h1>
            <Shield aria-hidden="true" size={30} style={{ marginRight: '0.5rem' }} />
            Privacy Policy
          </h1>
        </header>
        <p className={styles.updated}>Last Updated: February 09, 2026</p>

        {sections.map((section) => (
          <article className={styles.card} key={section.title}>
            <div className={styles.cardBody}>
              <h2 className={styles.cardTitle}>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets?.length ? (
                <ul>
                  {section.bullets.map((bullet) => {
                    if (typeof bullet === 'string') {
                      return <li key={bullet}>{bullet}</li>
                    }

                    return (
                      <li key={`${section.title}-${bullet.label}`}>
                        <strong>{bullet.label}:</strong> {bullet.text}
                      </li>
                    )
                  })}
                </ul>
              ) : null}
            </div>
          </article>
        ))}
      </Container>
    </section>
  )
}

export default PrivacyPage
