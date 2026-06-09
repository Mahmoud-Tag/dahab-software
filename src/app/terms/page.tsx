import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'

export const metadata: Metadata = {
  title: 'الشروط والأحكام | دهب سوفت وير',
  description: 'الشروط والأحكام العامة لخدمات دهب سوفت وير.',
}

export default function TermsPage() {
  return (
    <div>
      <Navbar />
      <main className="container" style={{ paddingTop: 120, paddingBottom: 80 }}>
        <h1>الشروط والأحكام</h1>
        <p>
          تخضع الخدمات المقدمة للاتفاق المكتوب بين دهب سوفت وير والعميل، بما يشمل نطاق
          العمل، الجداول الزمنية، وآليات التسليم والدعم.
        </p>
      </main>
      <FooterSection />
    </div>
  )
}
