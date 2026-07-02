'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import FooterSection from '@/components/FooterSection'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import PortfolioSection from '@/components/PortfolioSection'
import ServicesSection from '@/components/ServicesSection'
import ContactSection from '@/components/ContactSection'
import TeamSection from '@/components/TeamSection'
import WhyChooseUsSection from '@/components/WhyChooseUsSection'

// ── قسم الشراكة (الوضع النهاري مع شعار 3M) ──
function PartnershipSection() {
  const features = [
    { icon: '🏢', title: 'شركة تكنولوجية رائدة', desc: 'خبرة طويلة وسجل متميز في تنفيذ المشروعات الحكومية والمؤسسية.' },
    { icon: '🛡️', title: 'ضمان قانوني كامل', desc: 'تعاقدات رسمية بسجل تجاري وبطاقة ضريبية معتمدة.' },
    { icon: '⚡', title: 'دعم فني مباشر', desc: 'فريق متخصص داخل محافظة سوهاج لتقديم الدعم السريع.' },
    { icon: '💻', title: 'معاينة وتجربة الأنظمة', desc: 'إمكانية تجربة جميع أنظمة دهب سوفت وير داخل مقر الوكيل.' },
  ]

  const systems = [
    'نظام الكاشير والمخازن ERP',
    'نظام إدارة العيادات ونداء المرضى الذكي',
    'نظام خبير الصيانة بالذكاء الاصطناعي',
    'نظام إدارة مكاتب السفر والسياحة',
    'نظام إدارة مكاتب الشحن',
  ]

  const highlights = [
    'جميع الأنظمة تعمل بدون إنترنت بالكامل (Offline)',
    'دفع مرة واحدة فقط',
    'ملكية كاملة مدى الحياة',
    'عدد مستخدمين غير محدود',
  ]

  // ── جسيمات خلفية (تُولَّد على العميل فقط لتجنب Hydration mismatch) ──
  const [particles, setParticles] = useState<Array<{
    id: number
    size: number
    x: number
    y: number
    duration: number
    delay: number
  }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28 font-cairo" dir="rtl">
      {/* خلفية فاتحة مع تأثيرات نهارية */}
      <div className="absolute inset-0 z-0">
        {/* شبكة رقمية */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        {/* كرات ضوئية ذهبية */}
        <div className="absolute top-0 right-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full bg-[#D4AF37] opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-amber-200 opacity-20 blur-3xl" />
        {/* جسيمات ذهبية متحركة */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#B8860B]"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: 0.1 + Math.random() * 0.2,
              animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 page-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── العنوان الرئيسي (محسّن المسافات) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="inline-block rounded-full bg-[#D4AF37]/20 px-6 py-2 text-sm font-bold text-[#B8860B] tracking-wider">
            🤝 شراكة استراتيجية كبرى
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#0F172A] tracking-wide">
            تم اعتماد شركة 3M للكمبيوتر
            <br className="hidden md:block" />
            <span className="inline-block mt-1">الوكيل الرسمي والحصري</span>
            <br className="hidden md:block" />
            لأنظمة <span className="text-[#D4AF37]">دهب سوفت وير</span>
            <span className="inline-block mt-1"> بمحافظة سوهاج</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base text-[#1E293B] md:text-lg leading-relaxed">
            نفخر بالإعلان عن شراكة استراتيجية مع شركة 3M للكمبيوتر، إحدى أكبر الشركات
            التكنولوجية بمحافظة سوهاج، لتقديم خدمات البيع والدعم الفني والتعاقدات الرسمية
            لجميع أنظمة دهب سوفت وير، بما يضمن لعملائنا سرعة الخدمة والدعم المباشر والثقة
            القانونية الكاملة.
          </p>
        </motion.div>

        {/* ── الشبكة الأساسية: بطاقات + الجانب البصري ── */}
        <motion.div
        
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
        >
          {/* البطاقات الأربع */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="group rounded-2xl border border-gray-200 bg-white/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:bg-white hover:shadow-xl hover:shadow-[#D4AF37]/10"
              >
                <div className="text-4xl transition-transform duration-300 group-hover:scale-110">{f.icon}</div>
                <h3 className="mt-4 text-xl font-bold text-[#0F172A]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* الجانب البصري – مع شعار 3M */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="relative flex items-center justify-center"
          >
            <div className="relative aspect-square w-full max-w-md" >
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-gray-200  p-6" style={{
              backgroundImage: `url('/3m.png')`, // ⬅️ ضع هنا مسار الصورة المطلوبة
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay',
              backgroundColor: 'rgba(255,255,255,0.85)',
            }}>
                {/* شبكة خطوط ذهبية */}
                <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                  <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.3" />
                  <line x1="80%" y1="20%" x2="20%" y2="80%" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.3" />
                  <circle cx="50%" cy="50%" r="40" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.2" />
                  <circle cx="50%" cy="50%" r="70" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.1" />
                </svg>

               

                <div className="absolute bottom-0 left-0 right-0 h-1/3 rounded-b-3xl bg-gradient-to-t from-[#D4AF37]/10 to-transparent" />
              </div>

              {/* أيقونات عائمة */}
              <motion.div
                className="absolute top-0 right-0 rounded-full bg-white p-4 shadow-xl ring-1 ring-[#D4AF37]/30"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <i className="fas fa-shield-alt text-3xl text-[#D4AF37]"></i>
              </motion.div>
              <motion.div
                className="absolute bottom-0 left-0 rounded-full bg-white p-4 shadow-xl ring-1 ring-[#D4AF37]/30"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <i className="fas fa-headset text-3xl text-[#D4AF37]"></i>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── شارات الأنظمة الخمس ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-sm font-semibold text-[#B8860B]">أنظمة دهب سوفت وير المتاحة عبر الوكيل</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {systems.map((sys, idx) => (
              <span
                key={idx}
                className="rounded-full border border-gray-300 bg-white/80 px-5 py-2 text-sm text-[#0F172A] transition-all duration-300 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 hover:shadow-lg hover:shadow-[#D4AF37]/20"
              >
                {sys}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── صندوق المعلومات المميزة ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 rounded-xl border-r-4 border-[#D4AF37] bg-gradient-to-l from-[#D4AF37]/10 to-transparent p-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-[#0F172A]">
                <span className="text-lg text-[#D4AF37]">✨</span>
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── أزرار الدعوة ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-[#D4AF37] to-[#F5D76E] px-8 py-3 font-bold text-[#B8860B] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D4AF37] text-white"
          >
            تواصل مع الوكيل الرسمي
            <i className="fas fa-phone-alt text-sm"></i>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

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

      {/* ── قسم الشراكة (جديد) ── */}
      <PartnershipSection />

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