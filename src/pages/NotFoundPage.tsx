import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import commonStyles from '../styles/Common.module.css'

function NotFoundPage() {
  return (
    <section className={commonStyles.section}>
      <Container className={commonStyles.center}>
        <h1>Page Not Found</h1>
        <p>The page you requested does not exist.</p>
        <Button to="/" variant="outlinePrimary">
          Return Home
        </Button>
      </Container>
    </section>
  )
}

export default NotFoundPage
