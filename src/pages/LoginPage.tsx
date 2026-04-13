import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import styles from '../styles/AuthPage.module.css'

const VALID_USERNAME = 'Myinheritance'
const VALID_PASSWORD = 'Thomas12@'

function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      sessionStorage.setItem('username', 'Thomas Shimchock')
      setShowError(false)
      navigate('/account')
      return
    }

    setShowError(true)
  }

  return (
    <section className={styles.wrap}>
      <Container>
        <div className={styles.card}>
          <div className={styles.cardBody}>
            <h3 className={styles.title}>Client Portal Sign In</h3>
            <p className={styles.subtitle}>
              Access your account dashboard, documents, and trust activity in one
              secure workspace.
            </p>
            {showError ? (
              <div className={styles.alert} role="alert">
                We could not verify those credentials. Please try again.
              </div>
            ) : null}
            <form onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="username">
                  Client ID
                </label>
                <input
                  className={styles.input}
                  id="username"
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter your client ID"
                  required
                  type="text"
                  value={username}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="password">
                  Passcode
                </label>
                <input
                  className={styles.input}
                  id="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your secure passcode"
                  required
                  type="password"
                  value={password}
                />
              </div>
              <Button fullWidth type="submit" variant="gold">
                Enter Portal
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default LoginPage
