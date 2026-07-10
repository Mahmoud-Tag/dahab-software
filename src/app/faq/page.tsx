import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'الأسئلة الشائعة | دهب سوفت وير',
  description: 'إجابات واضحة ومباشرة عن خدمات دهب سوفت وير، عمليات التطوير، والتعامل مع المشاريع الرقمية.',
  alternates: { canonical: '/faq' },
  robots: { index: true, follow: true },
}

const faqs = [
  {
    question: 'ما هي خدمات دهب سوفت وير الأساسية؟',
    answer: 'نقدم خدمات تطوير الويب، تطبيقات الجوال، الأنظمة الإدارية، والذكاء الاصطناعي مع تركيز قوي على الجودة والأداء.',
  },
  {
    question: 'هل يمكن البدء بمشروع صغير ثم التوسع لاحقًا؟',
    answer: 'نعم، نقوم بتصميم الحلول لتكون قابلة للتوسع مع نمو نشاطك وتقلب احتياجاتك.',
  },
  {
    question: 'كيف يتم التواصل مع الفريق خلال المشروع؟',
    answer: 'نستخدم عملية واضحة للتواصل، ومتابعة أسبوعية، وتوثيق شامل لضمان الشفافية الكاملة.',
  },
  {
    question: 'هل تقدمون دعمًا بعد الإطلاق؟',
    answer: 'نعم، نقدم دعمًا فنيًا وصيانة مستمرة، بما يضمن استمرارية التشغيل ورفع الأداء.',
  },
]

export default function FAQPage() {
  return (
    <div className="page-root">
      <Navbar />
      <main id="main-content" style={{ paddingTop: 96 }}>
        <div className="page-container" style={{ paddingTop: 32, paddingBottom: 80, maxWidth: 1000 }}>
          <Breadcrumbs items={[{ label: 'الرئيسية', href: '/' }, { label: 'الأسئلة الشائعة' }]} />
          <section style={{ marginTop: 32 }}>
            <div className="section-label-pill" style={{ marginBottom: 20 }}>
              <i className="fas fa-question-circle" aria-hidden="true" />
              الأسئلة الشائعة
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 16 }}>
              كل ما تحتاج معرفته قبل بدء مشروع رقمي مع فريقنا
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 760, marginBottom: 40 }}>
              نقدم إجابات مباشرة وشفافة حول كيفية العمل، التكلفة، والنتائج المتوقعة حتى تتخذ قرارًا مستنيرًا.
            </p>
            <div style={{ display: 'grid', gap: 16 }}>
              {faqs.map((item, index) => (
                <article key={index} style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid var(--border)' }}>
                  <h2 style={{ fontSize: '1.12rem', fontWeight: 800, marginBottom: 10 }}>{item.question}</h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{item.answer}</p>
                </article>
              ))}
            </div>
            <div style={{ marginTop: 32 }}>
              <Link href="/contact" className="btn-gold-pill" style={{ display: 'inline-flex' }}>
                تواصل معنا الآن
                <i className="fas fa-arrow-left" aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}
