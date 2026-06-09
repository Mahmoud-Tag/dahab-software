'use client'

import { motion } from 'framer-motion'

const stats = [
  { num: '+200', label: 'مشروع منجز' },
  { num: '98%', label: 'رضا العملاء' },
  { num: '+7', label: 'سنوات خبرة' },
]

const techStack = ['React', 'Next.js', 'Node.js', 'AI/ML', 'Flutter', 'AWS']

export default function HeroSection() {
  return (
    <section className="hero-section" id="top">
      {/* Background layers */}
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-glow-primary" aria-hidden="true" />
      <div className="hero-glow-secondary" aria-hidden="true" />

      <div className="hero-container">
        {/* Left: Copy */}
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            شريكك التقني الموثوق
          </div>

          <h1 className="hero-title">
            نبني برمجيات{' '}
            <span className="hero-title-gradient">تُحدث فرقاً</span>{' '}
            حقيقياً
          </h1>

          <p className="hero-sub">
            فريق متخصص في تطوير حلول برمجية متكاملة — من الويب والجوال إلى الذكاء الاصطناعي.
            نحوّل أفكارك إلى منتجات رقمية تنافسية بكفاءة عالية وجودة استثنائية.
          </p>

          <div className="hero-actions">
            <motion.a
              href="/contact"
              className="hero-cta-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              ابدأ مشروعك الآن
              <i className="fas fa-arrow-left" />
            </motion.a>
            <motion.a
              href="/portfolio"
              className="hero-cta-secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              استعرض أعمالنا
            </motion.a>
          </div>

          {/* Trust stack */}
          <div className="hero-trust">
            <span className="hero-trust-label">نبني بـ</span>
            <div className="hero-trust-badges">
              {techStack.map((t) => (
                <span key={t} className="hero-tech-badge">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Visual */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Browser Mockup */}
          <div className="hero-browser">
            <div className="hero-browser-bar">
              <div className="hero-dots">
                <span className="dot-red" />
                <span className="dot-yellow" />
                <span className="dot-green" />
              </div>
              <div className="hero-url-bar">dahab-software.com</div>
            </div>
            <div className="hero-browser-body">
              {/* Metrics row */}
              <div className="hero-metrics-grid">
                {[
                  { val: '٢.٤م', label: 'الإيرادات', accent: true },
                  { val: '١٢٨', label: 'عميل نشط', accent: false },
                  { val: '٩٨٪', label: 'معدل الرضا', accent: true },
                  { val: '٢٣', label: 'مشروع جارٍ', accent: false },
                ].map((m) => (
                  <div key={m.label} className={`hero-metric ${m.accent ? 'accent' : ''}`}>
                    <div className="hero-metric-val">{m.val}</div>
                    <div className="hero-metric-label">{m.label}</div>
                  </div>
                ))}
              </div>
              {/* Progress bars */}
              <div className="hero-bars-card">
                <div className="hero-bars-title">أداء المشاريع</div>
                {[
                  { label: 'تطوير الويب', pct: 88, gold: true },
                  { label: 'تطبيقات الجوال', pct: 76, gold: false },
                  { label: 'الذكاء الاصطناعي', pct: 62, gold: true },
                ].map((b) => (
                  <div key={b.label} className="hero-bar-row">
                    <span>{b.label}</span>
                    <div className="hero-bar-track">
                      <motion.div
                        className={`hero-bar-fill ${b.gold ? 'gold' : 'navy'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${b.pct}%` }}
                        transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                    <span>{b.pct}٪</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating stat cards */}
          <motion.div
            className="hero-float-card card-left"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <i className="fas fa-check-circle" style={{ color: '#22c55e' }} />
            <div>
              <div className="float-card-num">+200</div>
              <div className="float-card-label">مشروع مكتمل</div>
            </div>
          </motion.div>

          <motion.div
            className="hero-float-card card-right"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <i className="fas fa-star" style={{ color: 'var(--gold)' }} />
            <div>
              <div className="float-card-num">98%</div>
              <div className="float-card-label">رضا العملاء</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        className="hero-stats-bar"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {stats.map((s, i) => (
          <div key={s.label} className="hero-stat-item">
            <div className="hero-stat-num">{s.num}</div>
            <div className="hero-stat-label">{s.label}</div>
            {i < stats.length - 1 && <div className="hero-stat-divider" />}
          </div>
        ))}
      </motion.div>
    </section>
  )
}
