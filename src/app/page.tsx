'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import FooterSection from '@/components/FooterSection'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import PortfolioSection from '@/components/PortfolioSection'
import PartnershipsSection from '@/components/PartnershipsSection'
import ServicesSection from '@/components/ServicesSection'
import ContactSection from '@/components/ContactSection'
import TeamSection from '@/components/TeamSection'
import WhyChooseUsSection from '@/components/WhyChooseUsSection'

// ── الصفحة الرئيسية الكاملة ──
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
}

export default function HomePage() {
  return (
    <div className="page-root">
      <Navbar />
      <HeroSection />

      {/* ── عرض الشراكات الديناميكي (من قاعدة البيانات) ── */}
      <PartnershipsSection limit={3} />

      {/* ── About ── */}
      <section className="section-about" id="about">
        <div className="section-glow-left" aria-hidden="true" />
        <div className="page-container">
          <motion.div
            className="about-inner"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="about-copy">
              <div className="section-label-pill">
                <i className="fas fa-building" />
                قصتنا
              </div>
              <h2 className="section-heading">
                شريكك التقني{' '}
                <span className="heading-gradient">المثالي</span>
              </h2>
              <p className="section-para">
                متخصصون في بناء حلول برمجية احترافية—من الويب وتطبيقات الجوال إلى الأنظمة
                المتكاملة والذكاء الاصطناعي. نبدأ كل مشروع بفهم عميق لأهدافك، ثم نصمم ونطور
                منتجات رقمية تساعدك على النمو.
              </p>
              <ul className="about-checklist">
                {[
                  'جودة تنفيذ عالية مع كود نظيف واختبارات صارمة',
                  'شفافية كاملة في التواصل والتسليم',
                  'دعم فني مستمر بعد الإطلاق',
                  'فريق متخصص في تقنيات حديثة',
                ].map((item) => (
                  <li key={item} className="about-check-item">
                    <span className="check-icon">
                      <i className="fas fa-check" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/about" className="btn-gold-pill">
                تعرف علينا أكثر
                <i className="fas fa-arrow-left" />
              </Link>
            </div>
            <div className="about-visual">
              <div className="about-card-wrap">
                <div className="about-ring" />
                <div className="about-img-box">
                  <div className="about-img-label">
                    <i className="fas fa-code" />
                    <div>
                      <div className="img-label-title">شريكك التقني الموثوق</div>
                      <div className="img-label-sub">نحوّل أفكارك إلى واقع رقمي</div>
                    </div>
                  </div>
                </div>
                <div className="about-stat-badge badge-top">
                  <div className="badge-num">+7</div>
                  <div className="badge-label">سنوات خبرة</div>
                </div>
                <div className="about-stat-badge badge-bottom">
                  <div className="badge-num">+200</div>
                  <div className="badge-label">مشروع</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section-services-teaser" id="services">
        <div className="page-container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="section-label-pill">
              <i className="fas fa-bolt" />
              خدماتنا
            </div>
            <div className="section-header-row">
              <div>
                <h2 className="section-heading">
                  كل ما تحتاجه{' '}
                  <span className="heading-gradient">في مكان واحد</span>
                </h2>
                <p className="section-para" style={{ maxWidth: 560 }}>
                  نقدم مجموعة من الخدمات الرقمية المتكاملة التي تساعد عملك على النمو والتطور
                  في العصر الرقمي الحديث.
                </p>
              </div>
              <Link href="/services" className="btn-outline-pill">
                جميع الخدمات
                <i className="fas fa-arrow-left" />
              </Link>
            </div>
          </motion.div>
          <ServicesSection hideHeader={true} />
        </div>
      </section>

      {/* ── Portfolio ── */}
      <section className="section-portfolio-teaser" id="portfolio">
        <div className="section-glow-right" aria-hidden="true" />
        <div className="page-container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="section-label-pill">
              <i className="fas fa-folder-open" />
              أعمالنا
            </div>
            <div className="section-header-row">
              <div>
                <h2 className="section-heading">
                  مشاريع تتحدث{' '}
                  <span className="heading-gradient">عن نفسها</span>
                </h2>
                <p className="section-para" style={{ maxWidth: 560 }}>
                  مجموعة من أفضل المشاريع التي نفذناها بنجاح. كل مشروع يحمل قصة نجاح وتحدٍّ
                  تم التغلب عليه بإبداع واحترافية.
                </p>
              </div>
              <Link href="/portfolio" className="btn-outline-pill">
                عرض جميع الأعمال
                <i className="fas fa-arrow-left" />
              </Link>
            </div>
          </motion.div>
          <PortfolioSection hideHeader={true} />
        </div>
      </section>

      {/* ── Why Us ── */}
      <WhyChooseUsSection />

      {/* ── Team ── */}
      <TeamSection />

      {/* ── Contact ── */}
      <section className="section-contact-wrapper" id="contact">
        <div className="page-container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="contact-intro">
              <div className="section-label-pill">
                <i className="fas fa-paper-plane" />
                تواصل معنا
              </div>
              <h2 className="section-heading">
                جاهزون للبدء؟{' '}
                <span className="heading-gradient">لنتحدث</span>
              </h2>
              <p className="section-para" style={{ maxWidth: 560 }}>
                أرسل تفاصيل مشروعك وسنعود إليك بخطة واضحة وسريعة خلال 24 ساعة.
              </p>
            </div>
          </motion.div>
          <ContactSection />
        </div>
      </section>

      <FooterSection />
    </div>
  )
}