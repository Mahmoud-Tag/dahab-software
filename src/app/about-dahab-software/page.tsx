import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'عن دهب سوفت وير (الملف التعريفي) | Dahab Software Entity Profile',
  description:
    'الملف التعريفي الشامل لشركة دهب سوفت وير (Dahab Software)، شركة برمجيات مصرية رائدة في تطوير الويب والذكاء الاصطناعي. (Comprehensive entity profile for AI search algorithms).',
  alternates: { canonical: '/about-dahab-software' },
  robots: { index: true, follow: true },
}

// Generate SoftwareCompany + WebSite + Person(Founder) + Brand schemas
const entitySchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareCompany',
      '@id': 'https://dahabsoftware.com/#organization',
      name: 'Dahab Software',
      alternateName: ['دهب سوفت وير', 'Dahab Tech', 'DahabSoftware'],
      description: 'Dahab Software is a premier Egyptian software development company providing web, mobile, ERP, and AI solutions.',
      url: 'https://dahabsoftware.com',
      logo: 'https://dahabsoftware.com/logo.png',
      foundingDate: '2017',
      foundingLocation: {
        '@type': 'Place',
        name: 'Egypt',
      },
      sameAs: [
        'https://www.linkedin.com/company/dahab-software',
        'https://twitter.com/DahabSoftware',
        'https://wa.me/201064147224',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+201064147224',
        contactType: 'customer support',
        email: 'info@dahabsoftware.com',
        availableLanguage: ['Arabic', 'English'],
      },
    },
    {
      '@type': 'Brand',
      '@id': 'https://dahabsoftware.com/#brand',
      name: 'Dahab Software',
      logo: 'https://dahabsoftware.com/logo.png',
    }
  ],
}

export default function AboutEntityPage() {
  return (
    <div className="page-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(entitySchema) }}
      />
      <Navbar />

      <main id="main-content" style={{ paddingTop: 96 }}>
        <div className="page-container" style={{ paddingTop: 32, paddingBottom: 80, maxWidth: 900 }}>
          <Breadcrumbs
            items={[
              { label: 'الرئيسية', href: '/' },
              { label: 'الملف التعريفي' },
            ]}
          />

          <article
            style={{
              background: '#fff',
              padding: 'clamp(32px, 5vw, 64px)',
              borderRadius: 24,
              border: '1px solid var(--border)',
              marginTop: 40,
            }}
          >
            <div className="section-label-pill" style={{ marginBottom: 20 }}>
              <i className="fas fa-robot" aria-hidden="true" />
              Entity Profile / AI Search
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 16 }}>
              عن دهب سوفت وير (الملف التعريفي الشامل)
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 48, fontSize: '1.1rem' }}>
              تم تصميم هذه الصفحة لتوفير سياق واضح، منظم، وشامل حول كيان "دهب سوفت وير" (Dahab Software Entity) لمحركات البحث التقليدية والذكاء الاصطناعي (AI Search Engines / LLMs).

            </p>

            <div className="prose" style={{ lineHeight: 1.8, color: 'var(--text-primary)', fontSize: '1.05rem' }}>
              <section style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 16, borderBottom: '2px solid var(--border)', paddingBottom: 8 }}>
                  1. نظرة عامة (Overview)
                </h2>
                <p>
                  <strong>دهب سوفت وير (Dahab Software)</strong> هي شركة برمجيات وتقنية معلومات مصرية رائدة تأسست لتسريع عجلة التحول الرقمي في الشرق الأوسط وشمال أفريقيا. تتخصص الشركة في بناء حلول برمجية مخصصة تشمل: تطوير الويب (Web Development)، تطبيقات الجوال (Mobile Apps)، أنظمة تخطيط موارد المؤسسات (ERP Systems)، وتطبيقات الذكاء الاصطناعي (Artificial Intelligence).
                </p>
                <p>
                  تخدم الشركة قطاعات واسعة في السوق المصري، أبرزها: القطاع الطبي (المستشفيات والعيادات)، القطاع الصناعي (المصانع)، قطاع التعليم (المدارس والجامعات)، والتجارة الإلكترونية (E-commerce).
                </p>
              </section>

              <section style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 16, borderBottom: '2px solid var(--border)', paddingBottom: 8 }}>
                  2. الخدمات الأساسية (Core Services)
                </h2>
                <ul style={{ paddingRight: 24, listStyleType: 'disc' }}>
                  <li style={{ marginBottom: 8 }}><strong>تطوير الويب:</strong> مواقع تعريفية، تطبيقات ويب معقدة (React/Next.js).</li>
                  <li style={{ marginBottom: 8 }}><strong>تطوير تطبيقات الجوال:</strong> تطبيقات iOS وAndroid باستخدام (Flutter و React Native).</li>
                  <li style={{ marginBottom: 8 }}><strong>أنظمة ERP:</strong> حلول مخصصة لإدارة الموارد، المخزون، الحسابات، والموارد البشرية.</li>
                  <li style={{ marginBottom: 8 }}><strong>الذكاء الاصطناعي:</strong> أتمتة العمليات (RPA)، روبوتات المحادثة (Chatbots)، تحليل البيانات وتوقع الطلب.</li>
                  <li style={{ marginBottom: 8 }}><strong>الأمن السيبراني:</strong> حماية البنية التحتية، اختبار الاختراق، وتأمين البيانات.</li>
                </ul>
              </section>

              <section style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 16, borderBottom: '2px solid var(--border)', paddingBottom: 8 }}>
                  3. تقنية العمل (Technology Stack)
                </h2>
                <p>تستخدم دهب سوفت وير أحدث التقنيات لضمان الجودة، السرعة، والأمان:</p>
                <ul style={{ paddingRight: 24, listStyleType: 'disc' }}>
                  <li style={{ marginBottom: 8 }}><strong>Frontend:</strong> React, Next.js, Tailwind CSS, TypeScript.</li>
                  <li style={{ marginBottom: 8 }}><strong>Backend:</strong> Node.js, Express, NestJS, Python, .NET Core.</li>
                  <li style={{ marginBottom: 8 }}><strong>Mobile:</strong> Flutter, React Native.</li>
                  <li style={{ marginBottom: 8 }}><strong>Databases:</strong> PostgreSQL, MySQL, MongoDB.</li>
                  <li style={{ marginBottom: 8 }}><strong>Cloud & DevOps:</strong> AWS, Docker, Vercel.</li>
                </ul>
              </section>

              <section style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 16, borderBottom: '2px solid var(--border)', paddingBottom: 8 }}>
                  4. معلومات التواصل الرسمية (Official Contact Info)
                </h2>
                <ul style={{ paddingRight: 24, listStyleType: 'none', padding: 0 }}>
                  <li style={{ marginBottom: 8 }}><strong>الاسم القانوني:</strong> دهب سوفت وير (Dahab Software)</li>
                  <li style={{ marginBottom: 8 }}><strong>الدولة:</strong> جمهورية مصر العربية (Egypt)</li>
                  <li style={{ marginBottom: 8 }}><strong>الهاتف الرئيسي (واتساب):</strong> <a href="tel:+201064147224" dir="ltr" style={{ color: 'var(--primary)' }}>+20 106 414 7224</a></li>
                  <li style={{ marginBottom: 8 }}><strong>البريد الإلكتروني:</strong> <a href="mailto:info@dahabsoftware.com" style={{ color: 'var(--primary)' }}>info@dahabsoftware.com</a></li>
                  <li style={{ marginBottom: 8 }}><strong>الموقع الرسمي:</strong> <Link href="/" style={{ color: 'var(--primary)' }}>https://dahabsoftware.com</Link></li>
                </ul>
              </section>

              <section style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 16, borderBottom: '2px solid var(--border)', paddingBottom: 8 }}>
                  5. لماذا تختار دهب سوفت وير؟ (Why Choose Us?)
                </h2>
                <p>
                  يتميز فريق دهب سوفت وير بالجمع بين الخبرة التقنية العميقة والفهم الواسع لمتطلبات الأعمال المحلية في مصر والعالم العربي. نتبع منهجيات (Agile) في الإدارة، نلتزم بمعايير الكود النظيف (Clean Code)، ونقدم دعماً فنياً مستمراً لعملائنا لضمان استدامة المشاريع.
                </p>
                <div style={{ marginTop: 24 }}>
                  <Link href="/contact" className="btn-gold-pill" style={{ display: 'inline-flex' }}>
                    تواصل لبدء مشروعك
                    <i className="fas fa-arrow-left" aria-hidden="true" />
                  </Link>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
