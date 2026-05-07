import { Menu, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Container from './ui/Container'
import styles from '../styles/Navbar.module.css'

interface NavLinkItem {
  label: string
  to: string
}

const baseLinks: NavLinkItem[] = [
  { label: 'Overview', to: '/#overview' },
  { label: 'Approach', to: '/#approach' },
  { label: 'Solutions', to: '/#solutions' },
  { label: 'Insights', to: '/#insights' },
]

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const isLoggedIn = Boolean(sessionStorage.getItem('username'))

  const links = useMemo(() => {
    if (isLoggedIn) {
      return [...baseLinks, { label: 'Portal', to: '/account' }]
    }

    return baseLinks
  }, [isLoggedIn])

  const showAuthLink = !['/login', '/account'].includes(location.pathname)

  return (
    <nav className={styles.navbar}>
      <Container>
        <div className={styles.inner}>
          <Link className={styles.brand} onClick={() => setMenuOpen(false)} to="/">
            TideStone Advisory
          </Link>

          <button
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            className={styles.toggler}
            onClick={() => setMenuOpen((value) => !value)}
            type="button"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
          <ul className={styles.navList}>
            {links.map((link) => (
              <li key={`${link.label}-${link.to}`}>
                <Link
                  className={styles.navLink}
                  onClick={() => setMenuOpen(false)}
                  to={link.to}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {showAuthLink ? (
              <li>
                {isLoggedIn ? (
                  <button
                    className={styles.navButton}
                    onClick={() => {
                      sessionStorage.removeItem('username')
                      sessionStorage.removeItem('lastLogin')
                      sessionStorage.removeItem('releaseWorkflowStage')
                      setMenuOpen(false)
                      navigate('/login')
                    }}
                    type="button"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    className={styles.navLink}
                    onClick={() => setMenuOpen(false)}
                    to="/login"
                  >
                    Client Login
                  </Link>
                )}
              </li>
            ) : null}
          </ul>
        </div>
      </Container>
    </nav>
  )
}

export default Navbar
