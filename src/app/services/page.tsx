import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'
import ServicesSection from '@/components/ServicesSection'
import { serviceCategories } from '@/data/services'

export const metadata: Metadata = {
  title: 'خدماتنا | دهب سوفت وير',
  description: 'اكتشف مجموعة خدماتنا المتكاملة لتطوير الويب، تطبيقات الموبايل، الذكاء الاصطناعي، وغيرها.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'خدماتنا | دهب سوفت وير',
    description: 'اكتشف مجموعة خدماتنا المتكاملة لتطوير الويب، تطبيقات الموبايل، الذكاء الاصطناعي، وغيرها.',
    url: '/services',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

function ServiceFeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="premium-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="service-icon" style={{ marginBottom: 0, width: 48, height: 48, fontSize: '1.2rem' }}>
        <i className={icon} />
      </div>
      <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{title}</div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{description}</div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <div className="page-root">
      <Navbar />
      
      <div className="page-container" style={{ paddingTop: 120, paddingBottom: 60 }}>
        <div className="section-header-row" style={{ marginBottom: 64, justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="section-label-pill">
              <i className="fas fa-star" />
              ماذا نقدم
            </div>
            <h1 className="section-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
              خدماتنا <span className="heading-gradient">المتكاملة</span>
            </h1>
            <p className="section-para" style={{ maxWidth: 680 }}>
              نقدم حلولاً رقمية متكاملة تلبي جميع احتياجات أعمالك، من تطوير المواقع
              إلى أنظمة الذكاء الاصطناعي المتقدمة. كل خدمة مصممة لتواكب احتياجاتك وتُحقق أهدافك.
            </p>
          </div>
        </div>

        {/* Featured Services (reused) */}
        <ServicesSection hideHeader={true} />

        {/* Other Service Categories */}
        <div style={{ marginTop: 80 }}>
          {serviceCategories.map((cat) => (
            <section key={cat.title} style={{ marginBottom: 64 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div className="service-icon" style={{ marginBottom: 0, width: 40, height: 40, fontSize: '1rem', borderRadius: 10 }}>
                  <i className={cat.icon} />
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{cat.title}</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
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
        <section style={{ marginTop: 80 }}>
          <div className="premium-card" style={{ padding: 40, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
            <div>
              <div className="section-label-pill" style={{ marginBottom: 12 }}>
                <i className="fas fa-rocket" />
                جاهزون لتنفيذ فكرتك
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 8 }}>
                ابدأ مشروعك الآن
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                نجعل كل شيء بين يديك — من الفكرة إلى الإطلاق.
              </p>
            </div>
            <a href="/contact" className="btn-gold-pill">
              تواصل معنا
              <i className="fas fa-arrow-left" />
            </a>
          </div>
        </section>
      </div>

      <FooterSection />
    </div>
  )
}