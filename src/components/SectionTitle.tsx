import type { PropsWithChildren } from 'react'

import { cn } from '../lib/cn'
import styles from '../styles/Common.module.css'

interface SectionTitleProps extends PropsWithChildren {
  className?: string
  centered?: boolean
}

function SectionTitle({ children, className, centered = false }: SectionTitleProps) {
  return <h2 className={cn(centered && styles.center, className)}>{children}</h2>
}

export default SectionTitle
