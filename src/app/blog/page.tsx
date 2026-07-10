import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'المدونة | دهب سوفت وير',
  description: 'أحدث المقالات والرؤى التقنية حول تطوير البرمجيات، الذكاء الاصطناعي، والتحول الرقمي.',
  alternates: { canonical: '/blog' },
  robots: { index: true, follow: true },
}

const posts = [
  {
    title: 'كيف تبني موقعًا احترافيًا يحقق نموًا حقيقيًا في 2026؟',
    excerpt: 'خلاصة عملية بناء مواقع الشركات مع التركيز على الأداء، السيو، والحوكمة الرقمية.',
    href: '/blog/modern-company-website',
  },
  {
    title: 'الذكاء الاصطناعي في الأعمال: من الأتمتة إلى التميز التشغيلي',
    excerpt: 'أمثلة عملية على كيف يمكن للذكاء الاصطناعي أن يرفع كفاءة العمليات والتواصل.',
    href: '/blog/ai-for-business',
  },
  {
    title: 'دليل عملي لاختيار شريك برمجيات موثوق',
    excerpt: 'معايير مهمة قبل البدء في مشروع رقمي كبير أو نظام إداري متكامل.',
    href: '/blog/choosing-software-partner',
  },
]

export default function BlogPage() {
  return (
    <div className="page-root">
      <Navbar />
      <main id="main-content" style={{ paddingTop: 96 }}>
        <div className="page-container" style={{ paddingTop: 32, paddingBottom: 80, maxWidth: 1100 }}>
          <Breadcrumbs items={[{ label: 'الرئيسية', href: '/' }, { label: 'المدونة' }]} />
          <section style={{ marginTop: 32 }}>
            <div className="section-label-pill" style={{ marginBottom: 20 }}>
              <i className="fas fa-newspaper" aria-hidden="true" />
              المدونة
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 16 }}>
              أفكار ومحتوى تقني يربط بين التكنولوجيا والأعمال
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 760, marginBottom: 40 }}>
              مجموعة من المقالات التقنية والتجارية التي تساعد الشركات على اتخاذ قرارات أفضل حول الرقمنة، الذكاء الاصطناعي، وتطوير الأنظمة.
            </p>
            <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
              {posts.map((post) => (
                <article key={post.href} style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid var(--border)' }}>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 12 }}>{post.title}</h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>{post.excerpt}</p>
                  <Link href={post.href} className="btn-gold-pill" style={{ display: 'inline-flex' }}>
                    اقرأ المزيد
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
