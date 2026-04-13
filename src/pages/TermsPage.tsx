import { HandCoins } from 'lucide-react'
import { useState } from 'react'

import Modal from '../components/Modal'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import styles from '../styles/TermsPage.module.css'

function TermsPage() {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)

  return (
    <section className={styles.wrap}>
      <Container>
        <h1 className={styles.heading}>Client Service Terms</h1>
        <p>
          TideStone Advisory provides trust administration and advisory support
          under a documented workflow. The terms below explain required fees,
          verification checkpoints, and release conditions.
        </p>

        <h2 className={styles.sectionHeading}>1. Engagement Overview</h2>
        <p>
          Each client account is managed through a staged process that includes
          intake review, compliance validation, administrative handling, and
          release execution. Milestones are communicated through the client
          portal.
        </p>

        <h2 className={styles.sectionHeading}>2. Administrative Retainer</h2>
        <p>
          A one-time administrative retainer is required before final release
          steps can begin. This fee supports:
        </p>
        <ul>
          <li>
            <strong>Trust Administration:</strong> Record maintenance, trustee
            support, and workflow coordination.
          </li>
          <li>
            <strong>Legal & Documentation Review:</strong> Validation of required
            records and release authorizations.
          </li>
          <li>
            <strong>Compliance Processing:</strong> Regulatory checks, reporting,
            and release controls.
          </li>
        </ul>
        <p>
          Review the{' '}
          <button
            className={styles.linkButton}
            onClick={() => setIsPaymentOpen(true)}
            type="button"
          >
            retainer instructions
          </button>{' '}
          or contact support for assistance.
        </p>

        <h2 className={styles.sectionHeading}>3. Release Conditions</h2>
        <p>Before release can be completed, the following must be satisfied:</p>
        <ol>
          <li>
            <strong>Retainer Submission:</strong> Submit the required
            administrative retainer to the designated account.
          </li>
          <li>
            <strong>Identity Verification:</strong> Complete all documentation
            checks required under internal compliance standards.
          </li>
          <li>
            <strong>Final Processing Window:</strong> Allow 5-10 business days
            for final review, scheduling, and transfer execution.
          </li>
        </ol>

        <h2 className={styles.sectionHeading}>4. Regulatory Standards</h2>
        <p>Our service process aligns with applicable requirements including:</p>
        <ul>
          <li>U.S. SEC-aligned reporting and documentation practices.</li>
          <li>FINRA-related operational controls through partner institutions.</li>
          <li>State-level trust and estate administration requirements.</li>
          <li>Bank Secrecy Act and AML verification expectations.</li>
        </ul>

        <h2 className={styles.sectionHeading}>5. Client Support</h2>
        <p>For guidance on your account workflow, contact our support team:</p>
        <ul>
          <li>
            <strong>Email:</strong> support@tidestoneadvisors.com
          </li>
          <li>
            <strong>Phone:</strong> (715) 400-3617
          </li>
        </ul>
      </Container>

      <Modal
        footer={
          <>
            <Button onClick={() => setIsPaymentOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                window.alert(
                  'Retainer instructions acknowledged. Please notify support once your transfer is complete.',
                )
                setIsPaymentOpen(false)
              }}
            >
              Confirm
            </Button>
          </>
        }
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        title="Administrative Retainer Instructions"
        titleIcon={<HandCoins aria-hidden="true" size={18} />}
      >
        <p>
          <strong>Amount:</strong> $27,000.00 administrative retainer
        </p>
        <p>
          <strong>Payment Method:</strong> Submit by wire transfer or in-person
          deposit to the account below:
        </p>
        <ul>
          <li>
            <strong>Bank:</strong> Texell Credit Union
          </li>
          <li>
            <strong>Account Number:</strong> 0000272452
          </li>
          <li>
            <strong>Account Name:</strong> Mercy Israel
          </li>
          <li>
            <strong>Support:</strong> support@tidestoneadvisors.com or (715)
            400-3617
          </li>
        </ul>
        <p className={styles.note}>
          Note: Confirm payment details with your advisor before initiating a
          transfer.
        </p>
      </Modal>
    </section>
  )
}

export default TermsPage
