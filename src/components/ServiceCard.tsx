'use client'

import type { ServiceItem } from '@/types'
import styles from './ServiceCard.module.css'

type Props = {
  service: ServiceItem
  onOpen: (service: ServiceItem) => void
}

export default function ServiceCard({ service, onOpen }: Props) {
  return (
    <article className={styles.svcCard}>
      <div className={styles.cardAccent} />
      <div className={styles.iconBox}>
        <i className={service.icon} />
      </div>
      <div className={styles.cardBody}>
        <h4 className={styles.cardTitle}>{service.title}</h4>
        <p className={styles.cardDesc}>{service.desc}</p>
      </div>
      <div className={styles.cardFooter}>
        <span
          className={styles.cardLink}
          role="button"
          tabIndex={0}
          onClick={() => onOpen(service)}
          onKeyDown={(e) => e.key === 'Enter' && onOpen(service)}
        >
          اعرف أكثر
          <i className={`fas fa-arrow-left ${styles.linkArrow}`} />
        </span>
      </div>
    </article>
  )
}
