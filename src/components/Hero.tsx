import type { ReactNode } from 'react'

import Container from './ui/Container'
import Button from './ui/Button'
import styles from '../styles/Hero.module.css'

interface HeroAction {
  label: string
  to?: string
  href?: string
}

interface HeroProps {
  backgroundImage: string
  title: string
  subtitle: string
  action?: HeroAction
  icon?: ReactNode
  id?: string
}

function Hero({
  backgroundImage,
  title,
  subtitle,
  action,
  icon,
  id,
}: HeroProps) {
  return (
    <section
      className={styles.hero}
      id={id}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Container>
        <div className={styles.overlay}>
          <h1 className={styles.title}>
            {icon ? <span className={styles.iconWrap}>{icon}</span> : null}
            {title}
          </h1>
          <p className={styles.subtitle}>{subtitle}</p>
          {action?.to ? (
            <Button size="lg" to={action.to} variant="gold">
              {action.label}
            </Button>
          ) : null}
          {action?.href ? (
            <Button href={action.href} size="lg" variant="gold">
              {action.label}
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  )
}

export default Hero
