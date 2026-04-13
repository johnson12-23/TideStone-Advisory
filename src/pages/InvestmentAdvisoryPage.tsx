import { LineChart } from 'lucide-react'

import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import Container from '../components/ui/Container'
import investmentImage from '../assets/images/investment-advisory.jpg'
import commonStyles from '../styles/Common.module.css'
import styles from '../styles/ServicePage.module.css'

function InvestmentAdvisoryPage() {
  return (
    <>
      <Hero
        action={{
          label: 'Book a Strategy Call',
          href: 'mailto:support@tidestoneadvisors.com',
        }}
        backgroundImage={investmentImage}
        icon={<LineChart aria-hidden="true" size={30} />}
        subtitle="Personalized portfolio strategy designed around your liquidity, risk tolerance, and long-term legacy objectives."
        title="Investment Strategy"
      />

      <section className={commonStyles.section}>
        <Container>
          <div className={commonStyles.rowTwo}>
            <div>
              <SectionTitle>Advice You Can Act On</SectionTitle>
              <p>
                We translate market complexity into specific recommendations that
                fit your timeline. Whether you are transitioning newly received
                assets or rebalancing an established portfolio, our guidance is
                structured for confident execution.
              </p>
              <ul>
                <li>
                  <strong>Portfolio Architecture:</strong> Build allocations tied
                  to goals, liquidity windows, and downside tolerance.
                </li>
                <li>
                  <strong>Risk & Scenario Review:</strong> Stress-test decisions
                  against shifting rates, inflation, and policy changes.
                </li>
                <li>
                  <strong>Ongoing Decision Support:</strong> Receive concise
                  updates and adjustment recommendations at regular intervals.
                </li>
              </ul>
            </div>
            <div>
              <img
                alt="Advisor reviewing investment performance dashboard"
                className={styles.sideImage}
                loading="lazy"
                src={investmentImage}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className={`${commonStyles.section} ${commonStyles.sectionLight}`}>
        <Container>
          <SectionTitle className={commonStyles.mb4}>Client Feedback</SectionTitle>
          <div className={commonStyles.rowTwo}>
            <blockquote className={styles.quote}>
              <p>
                "Their strategy sessions helped us move from uncertainty to a
                clear allocation plan that matched both growth and income goals."
              </p>
              <footer className={styles.quoteFooter}>A. Mercer, Family Office Lead</footer>
            </blockquote>
            <blockquote className={styles.quote}>
              <p>
                "The reporting is practical and easy to act on. We always know
                what changed, why it matters, and what to do next."
              </p>
              <footer className={styles.quoteFooter}>D. Rowan, Trustee</footer>
            </blockquote>
          </div>
        </Container>
      </section>
    </>
  )
}

export default InvestmentAdvisoryPage
