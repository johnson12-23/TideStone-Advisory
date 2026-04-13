import type { MouseEventHandler, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '../../lib/cn'
import styles from '../../styles/Common.module.css'

type Variant = 'gold' | 'outlinePrimary' | 'secondary'
type Size = 'md' | 'lg' | 'sm'

interface BaseButtonProps extends PropsWithChildren {
  className?: string
  fullWidth?: boolean
  size?: Size
  variant?: Variant
}

type RouteButtonProps = BaseButtonProps & {
  to: string
}

type AnchorButtonProps = BaseButtonProps & {
  href: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
}

type NativeButtonProps = BaseButtonProps & {
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
}

type ButtonProps = RouteButtonProps | AnchorButtonProps | NativeButtonProps

const variantClassMap: Record<Variant, string> = {
  gold: styles.btnGold,
  outlinePrimary: styles.btnOutlinePrimary,
  secondary: styles.btnSecondary,
}

const sizeClassMap: Record<Size, string> = {
  md: '',
  lg: styles.btnLg,
  sm: styles.btnSm,
}

function Button({
  children,
  className,
  fullWidth,
  size = 'md',
  variant = 'gold',
  ...rest
}: ButtonProps) {
  const classes = cn(
    styles.btn,
    variantClassMap[variant],
    sizeClassMap[size],
    fullWidth && styles.wFull,
    className,
  )

  if ('to' in rest) {
    return (
      <Link className={classes} to={rest.to}>
        {children}
      </Link>
    )
  }

  if ('href' in rest) {
    return (
      <a className={classes} href={rest.href} rel={rest.rel} target={rest.target}>
        {children}
      </a>
    )
  }

  return (
    <button
      className={classes}
      disabled={rest.disabled}
      onClick={rest.onClick}
      type={rest.type ?? 'button'}
    >
      {children}
    </button>
  )
}

export default Button
