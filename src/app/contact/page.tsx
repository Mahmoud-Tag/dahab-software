import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import ContactSection from '@/components/ContactSection'
import FooterSection from '@/components/FooterSection'
import Breadcrumbs from '@/components/Breadcrumbs'
import AnimatedSection from '@/components/AnimatedSection'

export const metadata: Metadata = {
  title: 'تواصل معنا | دهب سوفت وير',
  description:
    'تواصل مع فريق دهب سوفت وير لبدء مشروعك التقني، طلب استشارة، أو الاستفسار عن خدماتنا. فريقنا متواجد للرد على استفساراتك بأسرع وقت.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'تواصل معنا | دهب سوفت وير',
    description: 'نحن هنا لمساعدتك في تحويل أفكارك إلى واقع. تواصل معنا الآن.',
    url: '/contact',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  mainEntity: {
    '@type': 'ContactPoint',
    telephone: '+201064147224',
    contactType: 'customer service',
    email: 'info@dahabsoftware.com',
    areaServed: 'EG',
    availableLanguage: ['Arabic', 'English'],
  },
}

export default function ContactPage() {
  return (
    <div className="page-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Navbar />

      <main id="main-content" style={{ paddingTop: 96 }}>
        <div className="page-container" style={{ paddingTop: 32, paddingBottom: 80 }}>
          <Breadcrumbs
            items={[
              { label: 'الرئيسية', href: '/' },
              { label: 'تواصل معنا' },
            ]}
          />

          <AnimatedSection className="contact-intro" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label-pill" style={{ margin: '0 auto 16px' }}>
              <i className="fas fa-paper-plane" aria-hidden="true" />
              تواصل معنا
            </div>
            <h1 className="section-heading">
              نحن هنا <span className="heading-gradient">لمساعدتك</span>
            </h1>
            <p className="section-para" style={{ maxWidth: 640, margin: '0 auto' }}>
              سواء كنت ترغب في بدء مشروع جديد، استشارة تقنية، أو الانضمام لفريقنا — لا تتردد
              في مراسلتنا. نرد على جميع الاستفسارات خلال 24 ساعة.
            </p>
          </AnimatedSection>

          <ContactSection />
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
