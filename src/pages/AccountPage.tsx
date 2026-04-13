import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  HandCoins,
  History,
  Wallet,
  XCircle,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import Modal from '../components/Modal'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import commonStyles from '../styles/Common.module.css'
import styles from '../styles/AccountPage.module.css'

type TransactionIcon = 'success' | 'failed' | 'pending'

interface Transaction {
  date: string
  description: string
  amount: string
  status: string
  icon: TransactionIcon
  details: string
}

const transactions: Transaction[] = [
  {
    date: 'October 1, 2025',
    description: 'Estate Liquidity Transfer',
    amount: '$13,000,000.00',
    status: 'Received',
    icon: 'success',
    details:
      'Primary transfer posted to trust custody account and marked available for release workflow.',
  },
  {
    date: 'June 5, 2024',
    description: 'Trust Structure Setup',
    amount: '-$2,500.00',
    status: 'Completed',
    icon: 'success',
    details: 'Administrative setup and legal filing support completed.',
  },
  {
    date: 'March 10, 2025',
    description: 'Interest Allocation',
    amount: '$1,200.00',
    status: 'Completed',
    icon: 'success',
    details: 'Periodic interest allocation recorded to trust balance.',
  },
  {
    date: 'May 15, 2025',
    description: 'Transfer Attempt (Incorrect Routing)',
    amount: '-$10,000.00',
    status: 'Failed',
    icon: 'failed',
    details:
      'Payment failed due to inaccurate routing details. Please confirm instructions before resubmitting.',
  },
  {
    date: 'December 07, 2025',
    description: 'Administrative Retainer',
    amount: '-$27,000.00',
    status: 'Pending',
    icon: 'pending',
    details: 'Retainer is awaiting final verification by operations.',
  },
]

const getDisplayName = () => sessionStorage.getItem('username') || 'Thomas Shimchock'

const getLastLogin = () => {
  const storedLastLogin = sessionStorage.getItem('lastLogin')
  const currentTime = new Date('January 20, 2026 15:41:00 GMT')

  if (!storedLastLogin) {
    sessionStorage.setItem('lastLogin', currentTime.toISOString())
  }

  const displayTime = storedLastLogin ? new Date(storedLastLogin) : currentTime

  sessionStorage.setItem('lastLogin', currentTime.toISOString())
  return displayTime.toLocaleString('en-US', { timeZone: 'GMT' })
}

function AccountPage() {
  const [displayName] = useState(getDisplayName)
  const [lastLogin] = useState(getLastLogin)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null)

  const selectedStatusClass = useMemo(() => {
    if (!selectedTransaction) {
      return ''
    }

    if (selectedTransaction.icon === 'failed') {
      return styles.statusFailed
    }

    if (selectedTransaction.icon === 'pending') {
      return styles.statusPending
    }

    return styles.statusSuccess
  }, [selectedTransaction])

  const renderStatusIcon = (icon: TransactionIcon) => {
    if (icon === 'failed') {
      return <XCircle aria-hidden="true" size={16} />
    }

    if (icon === 'pending') {
      return <Clock3 aria-hidden="true" size={16} />
    }

    return <CheckCircle2 aria-hidden="true" size={16} />
  }

  const renderStatusClass = (icon: TransactionIcon) => {
    if (icon === 'failed') {
      return styles.statusFailed
    }

    if (icon === 'pending') {
      return styles.statusPending
    }

    return styles.statusSuccess
  }

  return (
    <section className={styles.wrap}>
      <Container>
        <div className={commonStyles.mb4}>
          <h1>Welcome back, {displayName}</h1>
          <p className={commonStyles.textMuted}>Last session: {lastLogin}</p>
        </div>

        <div className={styles.warningCard}>
          <div className={styles.warningBody}>
            <h5 className={commonStyles.mb2}>
              <AlertTriangle aria-hidden="true" size={18} /> Next Step
            </h5>
            <p className={commonStyles.mb0}>
              Submit the $27,000.00 administrative retainer to activate final
              release scheduling.{' '}
              <button
                className={styles.payNowLink}
                onClick={() => setPaymentModalOpen(true)}
                type="button"
              >
                Submit now
              </button>
            </p>
          </div>
        </div>

        <Card className={commonStyles.mb4}>
          <h3 className={commonStyles.mb3}>
            <Wallet aria-hidden="true" size={20} /> Portfolio Snapshot
          </h3>
          <div className={styles.summaryRow}>
            <p className={commonStyles.mb0}>
              <strong>Available Balance:</strong>{' '}
              <span className={styles.balanceHighlight}>$13,000,000.00</span>
            </p>
            <span className={commonStyles.badgeWarning}>Release Workflow Active</span>
          </div>
          <p className={commonStyles.mt2}>
            <strong>Current status:</strong> Assets are secured in trust pending
            completion of the administrative retainer and final compliance
            confirmation.
          </p>
          <p>
            <Link className={styles.termsLink} to="/terms">
              Review Client Service Terms
            </Link>
          </p>
          <Button onClick={() => setPaymentModalOpen(true)}>
            <HandCoins aria-hidden="true" size={16} /> Submit Retainer
          </Button>
        </Card>

        <Card className={commonStyles.mb4}>
          <h3 className={commonStyles.mb3}>
            <FileText aria-hidden="true" size={20} /> Client Documents
          </h3>
          <p>
            Download the trust summary packet and supporting account records at
            any time.
          </p>
          <Button href="/assets/trust_document.pdf.docx" variant="outlinePrimary">
            Download Trust Summary
          </Button>
        </Card>

        <Card>
          <h3 className={commonStyles.mb3}>
            <History aria-hidden="true" size={20} /> Activity Timeline
          </h3>
          <div className={commonStyles.tableWrap}>
            <table className={commonStyles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={`${transaction.date}-${transaction.description}`}>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.amount}</td>
                    <td>
                      <span
                        className={`${styles.status} ${renderStatusClass(transaction.icon)}`}
                      >
                        {renderStatusIcon(transaction.icon)}
                        {transaction.status}
                      </span>
                    </td>
                    <td>
                      <Button
                        className={styles.tableButton}
                        onClick={() => setSelectedTransaction(transaction)}
                        size="sm"
                        variant="outlinePrimary"
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Container>

      <Modal
        footer={
          <>
            <Button onClick={() => setPaymentModalOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                window.alert(
                  'Retainer instructions confirmed. Notify support once your transfer is complete.',
                )
                setPaymentModalOpen(false)
              }}
            >
              <Check aria-hidden="true" size={16} /> Confirm
            </Button>
          </>
        }
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        title="Submit Administrative Retainer"
        titleIcon={<HandCoins aria-hidden="true" size={18} />}
      >
        <p>
          <strong>Amount:</strong> $27,000.00 administrative retainer
        </p>
        <p>
          <strong>Payment Instructions:</strong> Please submit by wire transfer
          or in-person deposit to:
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
        <p className={commonStyles.textMuted}>
          Note: Confirm payment details with your assigned advisor before
          transfer.
        </p>
      </Modal>

      <Modal
        footer={
          <Button onClick={() => setSelectedTransaction(null)} variant="secondary">
            Close
          </Button>
        }
        isOpen={Boolean(selectedTransaction)}
        onClose={() => setSelectedTransaction(null)}
        title="Transaction Details"
      >
        <p>
          <strong>Description:</strong> {selectedTransaction?.description}
        </p>
        <p>
          <strong>Details:</strong> {selectedTransaction?.details}
        </p>
        <p>
          <strong>Status:</strong>{' '}
          <span className={selectedStatusClass}>{selectedTransaction?.status}</span>
        </p>
      </Modal>
    </section>
  )
}

export default AccountPage
