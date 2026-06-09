import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'

export const metadata: Metadata = {
  title: 'سياسة الخصوصية | دهب سوفت وير',
  description: 'سياسة الخصوصية الخاصة بدهب سوفت وير.',
}

export default function PrivacyPage() {
  return (
    <div>
      <Navbar />
      <main className="container" style={{ paddingTop: 120, paddingBottom: 80 }}>
        <h1>سياسة الخصوصية</h1>
        <p>
          نحافظ على سرية بيانات التواصل التي ترسلها إلينا ونستخدمها فقط للرد على طلباتك
          ومتابعة الخدمات المتفق عليها.
        </p>
      </main>
      <FooterSection />
    </div>
  )
}
