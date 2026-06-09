import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import ContactSection from '@/components/ContactSection'
import FooterSection from '@/components/FooterSection'

export const metadata: Metadata = {
  title: 'تواصل معنا | دهب سوفت وير',
  description: 'تواصل مع فريق دهب سوفت وير لبدء مشروعك أو طلب استشارة تقنية.',
}

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: 96 }}>
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  )
}
