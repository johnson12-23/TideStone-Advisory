import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'
import Container from '../components/ui/Container'
import aboutTeamImage from '../assets/images/about-team.jpg'
import homeHeroImage from '../assets/images/hero-home.jpg'
import investmentImage from '../assets/images/investment-advisory.jpg'
import trustImage from '../assets/images/trust-management.jpg'
import wealthImage from '../assets/images/wealth-preservation.jpg'
import commonStyles from '../styles/Common.module.css'
import styles from '../styles/HomePage.module.css'

const services = [
  {
    image: trustImage,
    imageAlt: 'Trust administration planning session',
    title: 'Trust Administration',
    description:
      'Structured trust oversight, distribution planning, document controls, and beneficiary communication designed for complex estates.',
    link: '/trust-management',
  },
  {
    image: investmentImage,
    imageAlt: 'Investment strategy dashboard and market analysis',
    title: 'Investment Strategy',
    description:
      'Goal-based portfolio construction and ongoing risk management aligned to liquidity timelines, tax posture, and legacy priorities.',
    link: '/investment-advisory',
  },
  {
    image: wealthImage,
    imageAlt: 'Family wealth planning roundtable',
    title: 'Legacy Preservation',
    description:
      'Multi-generational planning frameworks that protect family capital, reduce friction, and preserve decision quality through transitions.',
    link: '/wealth-preservation',
  },
]

const insights = [
  {
    title: 'Structured Workflow',
    description:
      'Every engagement follows a clear path: discovery, strategy, implementation, and quarterly review with practical action items.',
  },
  {
    title: 'Documentation Discipline',
    description:
      'Our client portal centralizes trust records, approvals, statements, and correspondence so critical files are always organized and auditable.',
  },
  {
    title: 'Human-Led Guidance',
    description:
      'You work directly with advisors who translate legal and financial complexity into plain-language decisions your family can act on.',
  },
]

const faqItems = [
  {
    question: 'How quickly can we begin?',
    answer:
      'Most engagements begin with a discovery call within one week, followed by a tailored roadmap for your family, trust, and investment priorities.',
  },
  {
    question: 'How can a client register?',
    answer:
      'Clients can register by visiting the client login page and completing the secure sign-up steps, after which they can access their account and shared documents.',
  },
  {
    question: 'Is the client portal secure?',
    answer:
      'Yes. We use a private client workspace to keep documents, approvals, and account updates organized and protected.',
  },
  {
    question: 'Can you help with both trust and investment planning?',
    answer:
      'Absolutely. Our team coordinates trust administration, investment strategy, and preservation planning to keep every decision aligned.',
  },
]

function HomePage() {
  return (
    <>
      <Hero
        action={{ label: 'Access your account', to: '/login' }}
        backgroundImage={homeHeroImage}
        id="overview"
        subtitle="TideStone Advisory helps families protect, organize, and transition significant assets through trusted planning and transparent reporting."
        title="A Clear Plan for Your Legacy"
      />

      <section className={commonStyles.section} id="approach">
        <Container>
          <div className={commonStyles.rowTwo}>
            <div>
              <SectionTitle>Planning Built Around Your Family</SectionTitle>
              <p>
                Wealth decisions become harder when legal obligations, tax timing,
                and family expectations all move at once. We bring structure to
                those decisions with a disciplined process and practical advice.
              </p>
              <p>
                Our team partners with clients across trust administration,
                investment strategy, and long-term preservation planning so every
                decision supports both current needs and future generations.
              </p>
              <ul className={styles.approachList}>
                <li>Clear timelines for key trust and distribution milestones.</li>
                <li>Concise recommendations tied to your risk profile.</li>
                <li>Continuous visibility through one secure client workspace.</li>
              </ul>
            </div>
            <div>
              <img
                alt="Advisory team discussing long-term trust strategy"
                className={styles.aboutImage}
                loading="lazy"
                src={aboutTeamImage}
              />
            </div>
          </div>
        </Container>
      </section>

      <section
        className={`${commonStyles.section} ${commonStyles.sectionLight}`}
        id="solutions"
      >
        <Container>
          <SectionTitle className={styles.servicesTitle}>Core Solutions</SectionTitle>
          <p className={styles.sectionIntro}>
            Select a service area below to review our approach, delivery process,
            and what to expect at each stage of engagement.
          </p>
          <div className={commonStyles.rowThree}>
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </Container>
      </section>

      <section className={commonStyles.section} id="insights">
        <Container>
          <SectionTitle className={styles.servicesTitle}>How We Add Clarity</SectionTitle>
          <div className={commonStyles.rowThree}>
            {insights.map((insight) => (
              <article className={styles.insightCard} key={insight.title}>
                <h3 className={styles.insightTitle}>{insight.title}</h3>
                <p className={styles.insightDescription}>{insight.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={`${commonStyles.section} ${commonStyles.sectionLight}`} id="faq">
        <Container>
          <SectionTitle className={styles.servicesTitle}>Frequently Asked Questions</SectionTitle>
          <p className={styles.sectionIntro}>
            A few common questions clients ask before getting started with TideStone Advisory.
          </p>
          <div className={styles.faqList}>
            {faqItems.map((item) => (
              <article className={styles.faqCard} key={item.question}>
                <h3 className={styles.faqQuestion}>{item.question}</h3>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

export default HomePage
