import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import ContactSection from '@/components/ContactSection'

export const metadata: Metadata = {
  title: 'دراسات الحالة | دهب سوفت وير',
  description: 'قصص نجاح مشاريعنا التي نجحنا في تنفيذها بتميز.',
  alternates: {
    canonical: '/case-studies',
  },
  openGraph: {
    title: 'دراسات الحالة | دهب سوفت وير',
    description: 'تعرف على قصص نجاح مشاريعنا وكيف ساعدنا عملاءنا على تحقيق أهدافهم.',
    url: '/case-studies',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const caseStudies = [
  {
    title: 'تطبيق توصيل طعام',
    category: 'تطبيقات الجوال',
    result: 'زيادة المبيعات ٣٠٠%',
    description: 'تطبيق موبايل متكامل لتوصيل الطعام مع نظام طلبات فوري وتتبع المندوبين.'
  },
  {
    title: 'منصة تعليمية',
    category: 'مواقع الويب',
    result: '١٠٠٠٠+ طالب مسجل',
    description: 'منصة تعليمية احترافية تربط بين المعلمين والطلاب مع نظام اختبارات وشهادات.'
  },
  {
    title: 'نظام ذكاء اصطناعي',
    category: 'AI Solutions',
    result: 'تقليل التكاليف ٤٠٪',
    description: 'نظام ذكي لتوقع الطلب وتحسين الإنتاجية بناءً على تحليل البيانات.'
  }
]

export default function CaseStudiesPage() {
  return (
    <div>
      <Navbar />

      <div className="container" style={{ paddingTop: 20 }}>
        <Breadcrumbs
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'دراسات الحالة' },
          ]}
        />
        <PageHeader
          title="دراسات الحالة"
          subtitle="قصص نجاح مشاريعنا التي نجحنا في تنفيذها بتميز."
        />
      </div>

      <section id="case-studies" style={{ padding: 'clamp(1.5rem, 4vw, 3rem) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {caseStudies.map((study, idx) => (
              <div key={idx} className="primary-card" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(30,58,95,0.05))',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '6px 14px',
                  alignSelf: 'flex-start',
                }}>
                  <i className="fas fa-folder-open" style={{ color: 'var(--gold)', fontSize: '0.9rem' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-dark)' }}>{study.category}</span>
                </div>
                <h3 style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                  {study.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem', margin: '8px 0 0' }}>
                  {study.description}
                </p>
                <div style={{
                  marginTop: 12,
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
                  color: 'var(--navy-deep)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  borderRadius: '9999px',
                  alignSelf: 'flex-start',
                  whiteSpace: 'nowrap',
                }}>
                  النتيجة: {study.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 10, paddingBottom: 30 }}>
        <ContactSection />
      </div>

      <FooterSection />
    </div>
  )
}