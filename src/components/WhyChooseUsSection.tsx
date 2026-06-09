'use client'

import { motion } from 'framer-motion'

const reasons = [
  {
    num: '01',
    icon: 'fas fa-rocket',
    title: 'سرعة التنفيذ',
    desc: 'نلتزم بالمواعيد ونسلّم في الوقت المحدد دون المساومة على الجودة.',
  },
  {
    num: '02',
    icon: 'fas fa-shield-alt',
    title: 'أمان موثوق',
    desc: 'نطبق معايير الأمان العالمية لحماية بياناتك ونظامك من أي تهديد.',
  },
  {
    num: '03',
    icon: 'fas fa-headset',
    title: 'دعم مستمر',
    desc: 'نواصل الدعم الفني حتى بعد الإطلاق لضمان الاستقرار التام.',
  },
  {
    num: '04',
    icon: 'fas fa-lightbulb',
    title: 'ابتكار مستمر',
    desc: 'نستخدم أحدث التقنيات لتقديم حلول مبتكرة تُحدث فرقاً حقيقياً.',
  },
]

export default function WhyChooseUsSection() {
  return (
    <section className="section-why">
      <div className="section-glow-center" aria-hidden="true" />
      <div className="page-container">
        <motion.div
          className="why-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label-pill">
            <i className="fas fa-star" />
            لماذا نحن
          </div>
          <h2 className="section-heading">
            ما يجعلنا{' '}
            <span className="heading-gradient">مختلفين</span>
          </h2>
          <p className="section-para" style={{ maxWidth: 560 }}>
            لا نبني مواقع فحسب — نصنع تجارب رقمية تُحدث فرقاً حقيقياً في نمو أعمالك.
          </p>
        </motion.div>

        <div className="why-grid">
          {reasons.map((r, i) => (
            <motion.div
              key={r.num}
              className="why-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="why-card-num">{r.num}</div>
              <div className="why-card-icon">
                <i className={r.icon} />
              </div>
              <h3 className="why-card-title">{r.title}</h3>
              <p className="why-card-desc">{r.desc}</p>
              <div className="why-card-line" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}