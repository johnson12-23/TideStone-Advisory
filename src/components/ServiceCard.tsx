import type { FC } from 'react'

import Button from './ui/Button'
import styles from '../styles/HomePage.module.css'

interface ServiceCardProps {
  image: string
  imageAlt: string
  title: string
  description: string
  link: string
  ctaLabel?: string
}

const ServiceCard: FC<ServiceCardProps> = ({
  image,
  imageAlt,
  title,
  description,
  link,
  ctaLabel = 'Explore Solution',
}) => {
  return (
    <article className={styles.serviceCard}>
      <img alt={imageAlt} className={styles.serviceImage} loading="lazy" src={image} />
      <h4 className={styles.serviceTitle}>{title}</h4>
      <p className={styles.serviceDescription}>{description}</p>
      <Button to={link} variant="outlinePrimary">
        {ctaLabel}
      </Button>
    </article>
  )
}

export default ServiceCard
