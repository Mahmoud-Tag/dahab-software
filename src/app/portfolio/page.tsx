import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'
import PortfolioSection from '@/components/PortfolioSection'

export const metadata: Metadata = {
  title: 'معرض الأعمال | دهب سوفت وير',
  description: 'اطلع على مجموعة المشاريع التي نفذناها لعملائنا، مع تفاصيل التقنية، النتائج، والشاشات.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'معرض الأعمال | دهب سوفت وير',
    description: 'مشاريعنا المتنوعة في تطوير الويب، التطبيقات، الذكاء الاصطناعي، وغيرها.',
    url: '/portfolio',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function PortfolioPage() {
  return (
    <div className="page-root">
      <Navbar />
      
      <div className="page-container" style={{ paddingTop: 120, paddingBottom: 60 }}>
        <div className="section-header-row" style={{ marginBottom: 48, justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="section-label-pill">
              <i className="fas fa-folder-open" />
              أعمالنا
            </div>
            <h1 className="section-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
              مشاريع تصنع <span className="heading-gradient">الفرق</span>
            </h1>
            <p className="section-para" style={{ maxWidth: 640 }}>
              استعرض أحدث أعمالنا ومشاريعنا الناجحة التي ساعدت عملاءنا على تحقيق أهدافهم وتصدر المنافسة.
            </p>
          </div>
        </div>

        <PortfolioSection hideHeader={true} />
      </div>

      <FooterSection />
    </div>
  )
}
