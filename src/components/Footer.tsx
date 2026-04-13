import { Link } from 'react-router-dom'

import Container from './ui/Container'
import styles from '../styles/Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <p className={styles.copy}>
          © 2026 TideStone Advisory. All rights reserved.{' '}
          <Link to="/terms">Service Terms</Link> |{' '}
          <Link to="/privacy">Privacy Policy</Link>
        </p>
        <p className={styles.disclaimer}>
          TideStone Advisory provides trust administration and strategic advisory
          services through regulated partners. Service fees and release timelines
          may vary by jurisdiction and account documentation.
        </p>
      </Container>
    </footer>
  )
}

export default Footer
