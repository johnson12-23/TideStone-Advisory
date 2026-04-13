import type { PropsWithChildren } from 'react'

import { cn } from '../../lib/cn'
import styles from '../../styles/Common.module.css'

interface CardProps extends PropsWithChildren {
  className?: string
  bodyClassName?: string
  elevated?: boolean
}

function Card({ className, bodyClassName, children, elevated = true }: CardProps) {
  return (
    <div className={cn(styles.card, elevated && styles.shadowSm, className)}>
      <div className={cn(styles.cardBody, bodyClassName)}>{children}</div>
    </div>
  )
}

export default Card
