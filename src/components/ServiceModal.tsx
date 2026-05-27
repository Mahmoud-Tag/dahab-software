'use client'

import { useEffect } from 'react'
import type { ServiceItem } from '@/types'
import styles from './ServiceModal.module.css'

type Props = {
  isOpen: boolean
  service: ServiceItem | null
  onClose: () => void
}

export default function ServiceModal({ isOpen, service, onClose }: Props) {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || !service) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="presentation">
      <div
        className={`${styles.modalWrapper} modal-bounce-enter-active`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalContainer}>
          <div className={styles.modalGlow} />
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <i className="fas fa-times" />
          </button>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalIconBox}>
                <i className={service.icon} />
              </div>
              <h3 className={styles.modalTitle}>{service.title}</h3>
            </div>
            <p className={styles.modalDesc}>{service.desc}</p>
            {service.features?.length > 0 && (
              <div className={styles.modalFeatures}>
                <h4 className={styles.featuresTitle}>مميزات الخدمة</h4>
                <ul className={styles.featuresList}>
                  {service.features.map((feat, i) => (
                    <li key={i} className={styles.featureItem}>
                      <i className="fas fa-check text-gold" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className={styles.modalActions}>
              <a href="#contact" className={styles.btnPrimary} onClick={onClose}>
                اطلب الخدمة الآن
                <i className="fas fa-arrow-left" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
