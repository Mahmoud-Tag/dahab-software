import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'الوظائف | دهب سوفت وير',
  description: 'انضم لفريق دهب سوفت وير في وظائف تطوير برمجيات، التصميم، والذكاء الاصطناعي.',
  alternates: { canonical: '/careers' },
  robots: { index: true, follow: true },
}

const jobs = [
  {
    title: 'مطور Frontend Senior',
    type: 'Full-time',
    location: 'عن بُعد / مصر',
    summary: 'العمل على واجهات حديثة عالية الأداء باستخدام React وNext.js.',
  },
  {
    title: 'مطور Backend Senior',
    type: 'Full-time',
    location: 'القاهرة',
    summary: 'بناء APIs وأنظمة قوية مع خبرة في Node.js أو Python.',
  },
  {
    title: 'مهندس ذكاء اصطناعي',
    type: 'Full-time',
    location: 'عن بُعد',
    summary: 'تطوير حلول أتمتة وتحليل بيانات مع أحدث أدوات الذكاء الاصطناعي.',
  },
]

export default function CareersPage() {
  return (
    <div className="page-root">
      <Navbar />
      <main id="main-content" style={{ paddingTop: 96 }}>
        <div className="page-container" style={{ paddingTop: 32, paddingBottom: 80, maxWidth: 1100 }}>
          <Breadcrumbs items={[{ label: 'الرئيسية', href: '/' }, { label: 'الوظائف' }]} />
          <section style={{ marginTop: 32 }}>
            <div className="section-label-pill" style={{ marginBottom: 20 }}>
              <i className="fas fa-briefcase" aria-hidden="true" />
              الوظائف
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 16 }}>
              انضم إلى فريق يركّب الأفكار ويحولها إلى منتجات حقيقية
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 760, marginBottom: 40 }}>
              نحن نبحث عن محترفين يحبون بناء حلول برمجية ذات تأثير مباشر على الأعمال والمجتمع.
            </p>
            <div style={{ display: 'grid', gap: 20 }}>
              {jobs.map((job) => (
                <article key={job.title} style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 10 }}>
                    <h2 style={{ fontSize: '1.16rem', fontWeight: 800 }}>{job.title}</h2>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{job.type}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>{job.location}</p>
                  <p style={{ lineHeight: 1.8, marginBottom: 16 }}>{job.summary}</p>
                  <Link href="/contact" className="btn-gold-pill" style={{ display: 'inline-flex' }}>
                    التقديم
                    <i className="fas fa-arrow-left" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}
