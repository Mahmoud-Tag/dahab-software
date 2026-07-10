import Link from 'next/link'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'

export default function NotFound() {
  return (
    <div className="page-root">
      <Navbar />
      <main
        id="main-content"
        style={{
          paddingTop: 120,
          paddingBottom: 120,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div className="page-container">
          <div
            style={{
              fontSize: '8rem',
              fontWeight: 900,
              background: 'var(--gold-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            404
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 24 }}>
            الصفحة غير موجودة
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
            عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. ربما تم نقلها أو حذفها،
            أو أن الرابط الذي اتبعته غير صحيح.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-gold-pill" style={{ padding: '14px 28px' }}>
              العودة للرئيسية
              <i className="fas fa-home" aria-hidden="true" style={{ marginRight: 8, marginLeft: 0 }} />
            </Link>
            <Link href="/contact" className="btn-outline-pill" style={{ padding: '14px 28px' }}>
              تواصل معنا
            </Link>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}
