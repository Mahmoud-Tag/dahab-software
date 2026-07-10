import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'
import ServicesSection from '@/components/ServicesSection'
import Breadcrumbs from '@/components/Breadcrumbs'
import { serviceCategories } from '@/data/services'

export const metadata: Metadata = {
  title: 'الخدمات البرمجية | دهب سوفت وير',
  description:
    'خدمات رقمية متكاملة لنمو أعمالك: تطوير مواقع الويب، تطبيقات الجوال، أنظمة ERP، الذكاء الاصطناعي والأمن السيبراني في مصر.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'الخدمات البرمجية | دهب سوفت وير',
    description: 'نقدم حلولاً رقمية متكاملة تلبي جميع احتياجات أعمالك من تطوير المواقع إلى أنظمة الذكاء الاصطناعي.',
    url: '/services',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

// Generate Service JSON-LD Schemas dynamically from data
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: serviceCategories.flatMap((cat) =>
    cat.services.map((svc, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: svc.title,
        description: svc.desc,
        provider: {
          '@type': 'Organization',
          name: 'Dahab Software',
          sameAs: 'https://dahabsoftware.com',
        },
        serviceType: cat.title,
        areaServed: 'EG',
      },
    }))
  ),
}

function ServiceFeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <article className="premium-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div
        className="service-icon"
        style={{ marginBottom: 0, width: 48, height: 48, fontSize: '1.2rem' }}
        aria-hidden="true"
      >
        <i className={icon} />
      </div>
      <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
        {description}
      </p>
    </article>
  )
}

export default function ServicesPage() {
  return (
    <div className="page-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Navbar />

      <main id="main-content" style={{ paddingTop: 96 }}>
        <div className="page-container" style={{ paddingTop: 32, paddingBottom: 80 }}>
          <Breadcrumbs
            items={[
              { label: 'الرئيسية', href: '/' },
              { label: 'الخدمات' },
            ]}
          />

          <div className="section-header-row" style={{ marginBottom: 64, justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="section-label-pill">
                <i className="fas fa-bolt" aria-hidden="true" />
                ماذا نقدم
              </div>
              <h1 className="section-heading" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)' }}>
                خدمات برمجية <span className="heading-gradient">متكاملة</span>
              </h1>
              <p className="section-para" style={{ maxWidth: 680 }}>
                نقدم حلولاً رقمية متكاملة تلبي جميع احتياجات أعمالك، من تطوير المواقع
                وتطبيقات الجوال إلى أنظمة إدارة الموارد (ERP) وحلول الذكاء الاصطناعي
                المتقدمة. كل خدمة مصممة بدقة لتواكب متطلبات السوق وتُحقق أهدافك التوسعية.
              </p>
            </div>
          </div>

          {/* Featured Services */}
          <ServicesSection hideHeader={true} />

          {/* Detailed Service Categories */}
          <div style={{ marginTop: 80 }}>
            {serviceCategories.map((cat, idx) => (
              <section key={cat.title} style={{ marginBottom: 80 }} aria-labelledby={`cat-${idx}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: 'rgba(212, 175, 55, 0.1)',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--gold)',
                      fontSize: '1.2rem',
                    }}
                    aria-hidden="true"
                  >
                    <i className={cat.icon} />
                  </div>
                  <h2 id={`cat-${idx}`} style={{ fontSize: '1.6rem', fontWeight: 900, margin: 0 }}>
                    {cat.title}
                  </h2>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 20,
                  }}
                >
                  {cat.services.map((svc) => (
                    <ServiceFeatureCard
                      key={svc.title}
                      icon={svc.icon}
                      title={svc.title}
                      description={svc.desc}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <section aria-labelledby="cta-heading" style={{ marginTop: 80 }}>
            <div
              style={{
                padding: '48px 40px',
                background: 'linear-gradient(135deg, rgba(30,58,95,0.05), rgba(212,175,55,0.08))',
                border: '1px solid var(--border-gold)',
                borderRadius: 24,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 32,
              }}
            >
              <div>
                <div className="section-label-pill" style={{ marginBottom: 12 }}>
                  <i className="fas fa-rocket" aria-hidden="true" />
                  جاهزون للتنفيذ
                </div>
                <h2 id="cta-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 12 }}>
                  هل لديك فكرة مشروع تقني؟
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: 0 }}>
                  حول فكرتك إلى واقع. فريقنا جاهز لتحليل متطلباتك وتقديم الحل التقني الأنسب.
                </p>
              </div>
              <a href="/contact" className="btn-gold-pill" style={{ padding: '14px 28px', fontSize: '1.05rem' }}>
                ابدأ مشروعك الآن
                <i className="fas fa-arrow-left" aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}