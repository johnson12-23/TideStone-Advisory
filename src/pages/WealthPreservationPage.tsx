import { Lock } from 'lucide-react'

import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import Container from '../components/ui/Container'
import wealthImage from '../assets/images/wealth-preservation.jpg'
import commonStyles from '../styles/Common.module.css'
import styles from '../styles/ServicePage.module.css'

function WealthPreservationPage() {
  return (
    <>
      <Hero
        action={{ label: 'Access your account', to: '/login' }}
        backgroundImage={wealthImage}
        icon={<Lock aria-hidden="true" size={30} />}
        subtitle="Protect family wealth across generations with governance, planning structures, and proactive risk controls."
        title="Legacy Preservation"
      />

      <section className={commonStyles.section}>
        <Container>
          <div className={commonStyles.rowTwo}>
            <div>
              <SectionTitle>From Wealth Creation to Wealth Continuity</SectionTitle>
              <p>
                Preservation planning is about more than asset protection. It is
                about defining how decisions are made, who is accountable, and
                how future transitions stay aligned with family priorities.
              </p>
              <ol>
                <li>
                  <strong>Governance Design:</strong> Establish clear roles,
                  decision policies, and escalation paths.
                </li>
                <li>
                  <strong>Trust & Estate Alignment:</strong> Keep planning
                  structures synchronized with current legal and tax context.
                </li>
                <li>
                  <strong>Risk Safeguards:</strong> Build protective controls for
                  concentration risk, liquidity risk, and operational exposure.
                </li>
              </ol>
            </div>
            <div>
              <img
                alt="Family wealth planning consultation"
                className={styles.sideImage}
                loading="lazy"
                src={wealthImage}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className={`${commonStyles.section} ${commonStyles.sectionLight}`}>
        <Container>
          <SectionTitle>Our Preservation Framework</SectionTitle>
          <ul>
            <li>
              <strong>Phase 1: Discovery</strong> - Review assets, obligations,
              and family priorities.
            </li>
            <li>
              <strong>Phase 2: Blueprint</strong> - Build the policy and
              governance framework.
            </li>
            <li>
              <strong>Phase 3: Execution</strong> - Implement trust, reporting,
              and oversight controls.
            </li>
            <li>
              <strong>Phase 4: Continuity</strong> - Revisit plan assumptions and
              adapt as conditions evolve.
            </li>
          </ul>
        </Container>
      </section>
    </>
  )
}

export default WealthPreservationPage
