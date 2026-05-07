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
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import Modal from '../components/Modal'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import commonStyles from '../styles/Common.module.css'
import styles from '../styles/AccountPage.module.css'

type TransactionIcon = 'success' | 'failed' | 'pending'
type ReleaseStage =
  | 'pending_retainer'
  | 'compliance_review'
  | 'release_scheduled'
  | 'released'

interface Transaction {
  date: string
  description: string
  amount: string
  status: string
  icon: TransactionIcon
  details: string
}

const WORKFLOW_STAGE_STORAGE_KEY = 'releaseWorkflowStage'

const baseTransactions: Transaction[] = [
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

const workflowSteps: Array<{ id: ReleaseStage; label: string }> = [
  { id: 'pending_retainer', label: 'Administrative Retainer' },
  { id: 'compliance_review', label: 'Compliance Review' },
  { id: 'release_scheduled', label: 'Release Scheduled' },
  { id: 'released', label: 'Funds Released' },
]

const releaseStageContent: Record<
  ReleaseStage,
  {
    badge: string
    panelMessage: string
    panelTitle: string
    status: string
    tone: 'pending' | 'progress' | 'success'
  }
> = {
  pending_retainer: {
    panelTitle: 'Next Step',
    panelMessage:
      'Submit the $27,000.00 administrative retainer to activate final release scheduling.',
    status:
      'Assets are secured in trust pending completion of the administrative retainer and final compliance confirmation.',
    badge: 'Retainer Required',
    tone: 'pending',
  },
  compliance_review: {
    panelTitle: 'Workflow In Progress',
    panelMessage:
      'Retainer received. Compliance and trustee validation are now in progress.',
    status:
      'Operations is validating account documentation and release controls before scheduling transfer.',
    badge: 'Compliance Review',
    tone: 'progress',
  },
  release_scheduled: {
    panelTitle: 'Release Scheduled',
    panelMessage:
      'Final release is queued in the next transfer window and awaiting execution.',
    status:
      'Release has been scheduled. Transfer execution will complete at the end of the processing window.',
    badge: 'Release Scheduled',
    tone: 'progress',
  },
  released: {
    panelTitle: 'Release Complete',
    panelMessage:
      'All checks are complete and funds have been released to your designated account.',
    status:
      'Release workflow is complete. Your account remains available for post-release documents and records.',
    badge: 'Release Complete',
    tone: 'success',
  },
}

const DEFAULT_DISPLAY_NAME = 'Felicia Sani Cherry'

const getDisplayName = () => {
  const storedName = sessionStorage.getItem('username')?.trim()

  if (storedName) {
    return storedName
  }

  return DEFAULT_DISPLAY_NAME
}

const getLastLogin = () => {
  const storedLogin = sessionStorage.getItem('lastLogin')

  if (storedLogin) {
    const parsed = new Date(storedLogin)

    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }
  }

  const currentDate = new Date()
  sessionStorage.setItem('lastLogin', currentDate.toISOString())

  return currentDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

const getStoredReleaseStage = (): ReleaseStage => {
  const storedStage = sessionStorage.getItem(WORKFLOW_STAGE_STORAGE_KEY)

  if (
    storedStage === 'pending_retainer' ||
    storedStage === 'compliance_review' ||
    storedStage === 'release_scheduled' ||
    storedStage === 'released'
  ) {
    return storedStage
  }

  return 'pending_retainer'
}

function AccountPage() {
  const [displayName] = useState(getDisplayName)
  const [lastLogin] = useState(getLastLogin)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [releaseStage, setReleaseStage] = useState<ReleaseStage>(getStoredReleaseStage)
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null)

  useEffect(() => {
    sessionStorage.setItem(WORKFLOW_STAGE_STORAGE_KEY, releaseStage)
  }, [releaseStage])

  const releaseContent = releaseStageContent[releaseStage]

  const timelineTransactions = useMemo(() => {
    const updatedTransactions = baseTransactions.map((transaction) => {
      if (transaction.description === 'Administrative Retainer') {
        if (releaseStage === 'pending_retainer') {
          return transaction
        }

        return {
          ...transaction,
          status: 'Completed',
          icon: 'success' as const,
          details:
            'Retainer verified by operations and applied to final release processing.',
        }
      }

      return transaction
    })

    if (releaseStage === 'release_scheduled' || releaseStage === 'released') {
      updatedTransactions.unshift({
        date: 'January 22, 2026',
        description: 'Release Scheduling Confirmation',
        amount: '$13,000,000.00',
        status: releaseStage === 'released' ? 'Completed' : 'Scheduled',
        icon: releaseStage === 'released' ? 'success' : 'pending',
        details:
          releaseStage === 'released'
            ? 'Scheduled release executed and archived in account records.'
            : 'Transfer instructions are approved and queued for execution.',
      })
    }

    if (releaseStage === 'released') {
      updatedTransactions.unshift({
        date: 'January 24, 2026',
        description: 'Final Release Transfer',
        amount: '$13,000,000.00',
        status: 'Released',
        icon: 'success',
        details: 'Final transfer completed to designated beneficiary account.',
      })
    }

    return updatedTransactions
  }, [releaseStage])

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

  const handleAdvanceReleaseWorkflow = () => {
    setReleaseStage((currentStage) => {
      if (currentStage === 'compliance_review') {
        return 'release_scheduled'
      }

      if (currentStage === 'release_scheduled') {
        return 'released'
      }

      return currentStage
    })
  }

  const getStepClass = (stepId: ReleaseStage) => {
    const activeIndex = workflowSteps.findIndex((step) => step.id === releaseStage)
    const stepIndex = workflowSteps.findIndex((step) => step.id === stepId)

    if (stepIndex < activeIndex) {
      return styles.stepDone
    }

    if (stepIndex === activeIndex) {
      return styles.stepActive
    }

    return styles.stepPending
  }

  return (
    <section className={styles.wrap}>
      <Container>
        <div className={commonStyles.mb4}>
          <h1>Welcome back, {displayName}</h1>
          <p className={commonStyles.textMuted}>Last session: {lastLogin}</p>
        </div>

        <div
          className={`${styles.warningCard} ${
            releaseContent.tone === 'success'
              ? styles.warningCardSuccess
              : releaseContent.tone === 'progress'
                ? styles.warningCardProgress
                : ''
          }`}
        >
          <div className={styles.warningBody}>
            <h5 className={commonStyles.mb2}>
              <AlertTriangle aria-hidden="true" size={18} /> {releaseContent.panelTitle}
            </h5>
            <p className={commonStyles.mb0}>
              {releaseContent.panelMessage}{' '}
              {releaseStage === 'pending_retainer' ? (
                <button
                  className={styles.payNowLink}
                  onClick={() => setPaymentModalOpen(true)}
                  type="button"
                >
                  Submit now
                </button>
              ) : null}
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
            <span
              className={`${styles.workflowBadge} ${
                releaseContent.tone === 'success'
                  ? styles.workflowBadgeSuccess
                  : releaseContent.tone === 'progress'
                    ? styles.workflowBadgeProgress
                    : styles.workflowBadgePending
              }`}
            >
              {releaseContent.badge}
            </span>
          </div>
          <p className={commonStyles.mt2}>
            <strong>Current status:</strong> {releaseContent.status}
          </p>
          <ol className={styles.stepList}>
            {workflowSteps.map((step) => (
              <li className={getStepClass(step.id)} key={step.id}>
                {step.id === releaseStage ? (
                  <Clock3 aria-hidden="true" size={14} />
                ) : (
                  <CheckCircle2 aria-hidden="true" size={14} />
                )}
                {step.label}
              </li>
            ))}
          </ol>
          <p>
            <Link className={styles.termsLink} to="/terms">
              Review Client Service Terms
            </Link>
          </p>
          {releaseStage === 'pending_retainer' ? (
            <Button onClick={() => setPaymentModalOpen(true)}>
              <HandCoins aria-hidden="true" size={16} /> Submit Retainer
            </Button>
          ) : null}
          {releaseStage === 'compliance_review' ? (
            <Button onClick={handleAdvanceReleaseWorkflow}>
              <Check aria-hidden="true" size={16} /> Mark Compliance Complete
            </Button>
          ) : null}
          {releaseStage === 'release_scheduled' ? (
            <Button onClick={handleAdvanceReleaseWorkflow}>
              <Check aria-hidden="true" size={16} /> Confirm Final Release
            </Button>
          ) : null}
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
                {timelineTransactions.map((transaction) => (
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
                setReleaseStage('compliance_review')
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
