import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'
import PartnershipsSection from '@/components/PartnershipsSection'

export const metadata: Metadata = {
  title: 'الشراكات | دهب سوفت وير',
  description: 'اطلع على جميع الشراكات الرسمية التي تجمع بين دهب سوفت وير وشركائها.',
  alternates: { canonical: '/partnerships' },
  openGraph: {
    title: 'الشراكات | دهب سوفت وير',
    description: 'تعرف على شركاء دهب سوفت وير الرسميين والمتميزين في السوق.',
    url: '/partnerships',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function PartnershipsPage() {
  return (
    <div className="page-root">
      <Navbar />
      <main className="page-container" style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div className="section-header-row" style={{ marginBottom: 48, justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="section-label-pill">
              <i className="fas fa-handshake" />
              الشراكات
            </div>
            <h1 className="section-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}>
              شركاؤنا الرسميون
            </h1>
            <p className="section-para" style={{ maxWidth: 720 }}>
              نقدم شراكات استراتيجية مع أفضل الشركات والوكالات لتوفير حلول تقنية متكاملة، دعم موثوق، والتزام برؤية نجاح عملائنا.
            </p>
          </div>
        </div>
        <PartnershipsSection title="كل الشراكات الرسمية" description="استعرض قائمة كاملة بالشركاء الرسميين لدهب سوفت وير، مع حالة الشراكة وروابط المواقع الرسمية." />
      </main>
      <FooterSection />
    </div>
  )
}
