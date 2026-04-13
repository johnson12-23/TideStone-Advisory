import type { PropsWithChildren, ReactNode } from 'react'
import { useEffect, useRef } from 'react'

import styles from '../styles/Modal.module.css'

interface ModalProps extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
  title: string
  titleIcon?: ReactNode
  footer?: ReactNode
}

function Modal({
  isOpen,
  onClose,
  title,
  titleIcon,
  footer,
  children,
}: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscape)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
      role="presentation"
    >
      <div aria-modal="true" className={styles.dialog} role="dialog">
        <div className={styles.header}>
          <h2 className={styles.title}>
            {titleIcon}
            {title}
          </h2>
          <button
            aria-label="Close"
            className={styles.close}
            onClick={onClose}
            ref={closeRef}
            type="button"
          >
            ×
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>
  )
}

export default Modal
