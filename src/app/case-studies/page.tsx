import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'
import Breadcrumbs from '@/components/Breadcrumbs'
import ContactSection from '@/components/ContactSection'

export const metadata: Metadata = {
  title: 'دراسات الحالة | دهب سوفت وير',
  description: 'قصص نجاح ومشاريع نفذتها دهب سوفت وير بامتياز في مجالات تطوير الويب، تطبيقات الجوال، وأنظمة ERP.',
  alternates: {
    canonical: '/case-studies',
  },
  openGraph: {
    title: 'دراسات الحالة والمشاريع | دهب سوفت وير',
    description: 'تعرف على التحديات التي واجهت عملاءنا وكيف قدمنا الحلول التقنية لتجاوزها وتحقيق نتائج ملموسة.',
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
    title: 'تطبيق توصيل طعام (Delivery App)',
    category: 'تطبيقات الجوال',
    result: 'زيادة المبيعات ٣٠٠٪',
    description: 'تطبيق موبايل متكامل لتوصيل الطعام، يضم ٣ تطبيقات (للعميل، للمطعم، للمندوب) مع تتبع حي للطلبات ونظام مكافآت.',
    tech: ['Flutter', 'Node.js', 'Google Maps API'],
  },
  {
    title: 'منصة تعليم إلكتروني (E-Learning)',
    category: 'مواقع الويب',
    result: '١٠,٠٠٠+ طالب مسجل',
    description: 'منصة تعليمية متكاملة تتيح للمعلمين رفع كورساتهم وإجراء اختبارات أونلاين وإصدار شهادات، مع نظام دفع إلكتروني.',
    tech: ['Next.js', 'NestJS', 'PostgreSQL'],
  },
  {
    title: 'نظام إدارة المستشفيات (HIS)',
    category: 'أنظمة ERP',
    result: 'تقليل وقت الانتظار ٤٥٪',
    description: 'نظام متكامل لإدارة سجلات المرضى، حجز المواعيد، الفواتير، والصيدلية لربط كافة أقسام المستشفى.',
    tech: ['React', '.NET Core', 'SQL Server'],
  },
  {
    title: 'نظام توقع المبيعات بالذكاء الاصطناعي',
    category: 'الذكاء الاصطناعي',
    result: 'تحسين دقة المخزون ٨٥٪',
    description: 'استخدام نماذج التعلم الآلي لتحليل بيانات المبيعات التاريخية وتوقع الطلب المستقبلي لتقليل الهدر.',
    tech: ['Python', 'TensorFlow', 'FastAPI'],
  },
  {
    title: 'منصة تجارة إلكترونية B2B',
    category: 'التجارة الإلكترونية',
    result: '٢ مليون+ جنيه مبيعات شهرية',
    description: 'متجر إلكتروني مخصص لعمليات البيع بالجملة للشركات، يحتوي على نظام تسعير ديناميكي وفواتير ضريبية.',
    tech: ['Next.js', 'Commerce.js', 'Stripe'],
  },
  {
    title: 'تأمين البنية التحتية لشركة مالية',
    category: 'الأمن السيبراني',
    result: 'حماية بنسبة ١٠٠٪ من الهجمات',
    description: 'مراجعة أمنية شاملة، اختبار اختراق، وتطبيق معايير الأمان لحماية بيانات العملاء ومعاملاتهم.',
    tech: ['Penetration Testing', 'OWASP', 'AWS Security'],
  }
]

// Generate Article schema for each case study
const caseStudiesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: caseStudies.map((study, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    item: {
      '@type': 'Article',
      headline: study.title,
      description: study.description,
      about: study.category,
      publisher: {
        '@type': 'Organization',
        name: 'Dahab Software',
      }
    }
  })),
}

export default function CaseStudiesPage() {
  return (
    <div className="page-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesSchema) }}
      />
      <Navbar />

      <main id="main-content" style={{ paddingTop: 96 }}>
        <div className="page-container" style={{ paddingTop: 32, paddingBottom: 80 }}>
          <Breadcrumbs
            items={[
              { label: 'الرئيسية', href: '/' },
              { label: 'دراسات الحالة' },
            ]}
          />
          
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label-pill" style={{ margin: '0 auto 20px' }}>
              <i className="fas fa-chart-line" aria-hidden="true" />
              قصص نجاحنا
            </div>
            <h1 className="section-heading">
              دراسات <span className="heading-gradient">الحالة</span>
            </h1>
            <p className="section-para" style={{ maxWidth: 640, margin: '0 auto' }}>
              اكتشف كيف ساعدنا عملاءنا في حل تحدياتهم المعقدة وتحقيق أهداف أعمالهم
              من خلال حلول برمجية مخصصة ومبتكرة.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24, marginBottom: 80 }}>
            {caseStudies.map((study, idx) => (
              <article key={idx} className="premium-card" style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(30,58,95,0.05))',
                  border: '1px solid var(--border-gold)',
                  borderRadius: '100px',
                  padding: '6px 14px',
                  alignSelf: 'flex-start',
                }}>
                  <i className="fas fa-folder-open" style={{ color: 'var(--gold)', fontSize: '0.9rem' }} aria-hidden="true" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gold-dark)' }}>
                    {study.category}
                  </span>
                </div>
                
                <h2 style={{ fontWeight: 900, fontSize: '1.4rem', color: 'var(--text-primary)', margin: 0 }}>
                  {study.title}
                </h2>
                
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem', margin: 0, flex: 1 }}>
                  {study.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                  {study.tech.map(t => (
                    <span key={t} style={{
                      background: 'rgba(2, 6, 23, 0.04)',
                      border: '1px solid var(--border)',
                      borderRadius: 6,
                      padding: '4px 10px',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      fontWeight: 600,
                    }} lang="en">
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{
                  marginTop: 16,
                  padding: '12px 20px',
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
                  borderLeft: '4px solid var(--gold)',
                  borderRadius: '4px 8px 8px 4px',
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4, fontWeight: 700 }}>
                    أبرز النتائج:
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 900 }}>
                    {study.result}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{
            padding: 48,
            background: 'linear-gradient(135deg, rgba(30,58,95,0.05), rgba(212,175,55,0.08))',
            border: '1px solid var(--border-gold)',
            borderRadius: 24,
            textAlign: 'center',
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: 16 }}>
              القصة التالية قد تكون قصة نجاحك
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
              دعنا نعمل معاً لتحويل التحديات التقنية التي تواجهك إلى فرصة للنمو والتوسع.
            </p>
            <ContactSection />
          </div>

        </div>
      </main>

      <FooterSection />
    </div>
  )
}