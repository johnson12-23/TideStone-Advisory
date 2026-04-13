import type { PropsWithChildren } from 'react'

import { cn } from '../../lib/cn'
import styles from '../../styles/Common.module.css'

interface ContainerProps extends PropsWithChildren {
  className?: string
}

function Container({ className, children }: ContainerProps) {
  return <div className={cn(styles.container, className)}>{children}</div>
}

export default Container
