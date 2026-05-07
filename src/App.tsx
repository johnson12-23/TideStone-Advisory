import { useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import AccountPage from './pages/AccountPage'
import HomePage from './pages/HomePage'
import InvestmentAdvisoryPage from './pages/InvestmentAdvisoryPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import TrustManagementPage from './pages/TrustManagementPage'
import WealthPreservationPage from './pages/WealthPreservationPage'
import styles from './styles/App.module.css'
import { theme } from './theme'

function hasSessionUser() {
  try {
    return Boolean(sessionStorage.getItem('username'))
  } catch {
    return false
  }
}

function ThemeSync() {
  useEffect(() => {
    const root = document.documentElement

    root.style.setProperty('--color-primary', theme.colors.primary)
    root.style.setProperty('--color-gold', theme.colors.gold)
    root.style.setProperty('--color-white', theme.colors.white)
    root.style.setProperty('--color-light', theme.colors.light)
    root.style.setProperty('--color-body', theme.colors.body)
    root.style.setProperty('--color-muted', theme.colors.muted)
    root.style.setProperty('--color-border', theme.colors.border)
    root.style.setProperty('--font-heading', theme.typography.heading)
    root.style.setProperty('--font-body', theme.typography.body)
    root.style.setProperty('--section-y', theme.spacing.sectionY)
    root.style.setProperty('--radius-md', theme.spacing.radius)
  }, [])

  return null
}

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const sectionId = location.hash.replace('#', '')

    window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }, [location.pathname, location.hash])

  return null
}

function Layout() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function ProtectedRoute() {
  if (!hasSessionUser()) {
    return <Navigate replace to="/login" />
  }

  return <Outlet />
}

function GuestOnlyRoute() {
  if (hasSessionUser()) {
    return <Navigate replace to="/account" />
  }

  return <Outlet />
}

function RouterContent() {
  return (
    <>
      <ThemeSync />
      <ScrollToHash />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route element={<GuestOnlyRoute />}>
            <Route element={<LoginPage />} path="/login" />
          </Route>
          <Route element={<TrustManagementPage />} path="/trust-management" />
          <Route
            element={<InvestmentAdvisoryPage />}
            path="/investment-advisory"
          />
          <Route element={<WealthPreservationPage />} path="/wealth-preservation" />
          <Route element={<TermsPage />} path="/terms" />
          <Route element={<PrivacyPage />} path="/privacy" />
          <Route element={<ProtectedRoute />}>
            <Route element={<AccountPage />} path="/account" />
          </Route>

          <Route element={<Navigate replace to="/" />} path="/index.html" />
          <Route element={<Navigate replace to="/login" />} path="/login.html" />
          <Route
            element={<Navigate replace to="/trust-management" />}
            path="/trust-management.html"
          />
          <Route
            element={<Navigate replace to="/investment-advisory" />}
            path="/investment-advisory.html"
          />
          <Route
            element={<Navigate replace to="/wealth-preservation" />}
            path="/wealth-preservation.html"
          />
          <Route element={<Navigate replace to="/terms" />} path="/terms.html" />
          <Route
            element={<Navigate replace to="/privacy" />}
            path="/privacy.html"
          />
          <Route
            element={<Navigate replace to="/account" />}
            path="/account.html"
          />

          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  )
}

export default App
