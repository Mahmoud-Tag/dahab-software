'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { ServiceItem } from '@/types'
import ServiceModal from './ServiceModal'

const premiumServices = [
  {
    icon: '💻',
    title: 'تطوير مواقع الويب',
    desc: 'نصمم ونطور مواقع ويب احترافية وسريعة، متجاوبة مع جميع الأجهزة بأحدث التقنيات.',
    features: [
      'تصميم واجهات مستخدم جذابة وعصرية (UI/UX)',
      'توافق تام مع مقاسات جميع الأجهزة المحمولة واللوحية',
      'تحسين محركات البحث SEO لظهور موقعك في النتائج الأولى',
      'لوحة تحكم سهلة لإدارة محتوى الموقع بالكامل',
    ]
  },
  {
    icon: '📱',
    title: 'تطبيقات الجوال',
    desc: 'تطوير تطبيقات iOS وAndroid بأداء عالٍ وتجربة مستخدم استثنائية.',
    features: [
      'برمجة تطبيقات لأنظمة Android و iOS',
      'واجهات مستخدم مخصصة لتجربة استخدام استثنائية',
      'نشر التطبيقات على المتاجر الرسمية',
      'ربط التطبيق بقواعد البيانات والخدمات السحابية',
    ]
  },
  {
    icon: '⚙️',
    title: 'برمجيات مخصصة',
    desc: 'حلول برمجية مصممة خصيصاً لتلبية احتياجات مشروعك بكفاءة وجودة عالية.',
    features: [
      'تطوير أنظمة CRM لتحسين علاقات العملاء وإدارة المبيعات',
      'واجهات ولوحات تحكم قابلة للتخصيص حسب متطلبات عملك',
      'أتمتة المهام اليومية لتقليل الأخطاء البشرية وتسريع العمل',
      'تكامل النظام مع الخدمات والأنظمة الأخرى (API Integrations)',
    ]
  }
]

interface ServicesSectionProps {
  hideHeader?: boolean
}

export default function ServicesSection({ hideHeader = false }: ServicesSectionProps) {
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
    <>
      {!hideHeader && (
        <div className="section-header-row" style={{ marginBottom: 48 }}>
          <div>
            <div className="section-label-pill">
              <i className="fas fa-bolt" />
              خدماتنا
            </div>
            <h2 className="section-heading">
              تميزنا في <span className="heading-gradient">التنفيذ</span>
            </h2>
            <p className="section-para" style={{ maxWidth: 560 }}>
              نقدم مجموعة شاملة من الخدمات التقنية المصممة خصيصاً لتلبية احتياجات الأعمال الحديثة.
            </p>
          </div>
        </div>
      )}

      <div className="services-grid">
        {premiumServices.map((service, index) => (
          <motion.div
            key={service.title}
            className="premium-card service-card"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => openModal(service as ServiceItem)}
          >
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.desc}</p>
            <div className="service-features">
              {service.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="service-feature-item">
                  <i className="fas fa-check" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button className="service-cta">
              التفاصيل
              <i className="fas fa-arrow-left" />
            </button>
          </motion.div>
        ))}
      </div>

      {selectedService && (
        <ServiceModal
          isOpen={isModalOpen}
          service={selectedService}
          onClose={closeModal}
        />
      )}
    </>
  )
}
