'use client'

import { useState } from 'react'
import { serviceCategories } from '@/data/services'
import type { ServiceItem } from '@/types'
import ServiceCard from './ServiceCard'
import ServiceModal from './ServiceModal'
import styles from './ServicesSection.module.css'

export default function ServicesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)

  const openModal = (svc: ServiceItem) => {
    setSelectedService(svc)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedService(null), 300)
  }

  return (
    <section id="services" className={styles.servicesWrap}>
      <div className={styles.sep} />
      <div className={styles.servicesInner}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>خدماتنا</h2>
          <p className={styles.sectionSubtitle}>
            منظومة تقنية متكاملة تجمع بين البرمجة، الأمان، والذكاء الاصطناعي
          </p>
        </div>

        <div className={styles.categories}>
          {serviceCategories.map((cat) => (
            <div key={cat.title} className={styles.categoryBlock}>
              <div className={styles.catLabel}>
                <i className={cat.icon} />
                <span>{cat.title}</span>
              </div>
              <div
                className={`${styles.cardsGrid} ${styles[`cols${cat.services.length}`]}`}
              >
                {cat.services.map((svc) => (
                  <ServiceCard key={svc.title} service={svc} onOpen={openModal} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className={styles.footerNote}>
          أقدم لك منظومة تقنية متكاملة تجمع بين البرمجة، الأمان، البنية التحتية،
          والتقنيات الذكية لضمان مشروع رقمي مستقر وآمن وقابل للنمو.
        </p>
      </div>
      <div className={styles.sep} />

      <ServiceModal isOpen={isModalOpen} service={selectedService} onClose={closeModal} />
    </section>
  )
}
