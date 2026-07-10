import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'
import Breadcrumbs from '@/components/Breadcrumbs'
import ContactSection from '@/components/ContactSection'
import TeamMemberCard from '@/components/TeamMemberCard'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'فريق العمل | دهب سوفت وير',
  description: 'تعرف على فريق دهب سوفت وير المتخصص في تقديم حلول برمجية مبتكرة ومتميزة من مطورين ومهندسين ومصممين.',
  alternates: {
    canonical: '/team',
  },
  openGraph: {
    title: 'فريق العمل | دهب سوفت وير',
    description: 'فريقنا من المطورين والمصممين والمهندسين الذين يبنون حلولاً رقمية متكاملة.',
    url: '/team',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const dynamic = 'force-dynamic'

export default async function TeamPage() {
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { createdAt: 'asc' }
  })

  // Generate Person schema for the team
  const teamSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: teamMembers.map((member, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Person',
        name: member.name,
        jobTitle: member.role,
        worksFor: {
          '@type': 'Organization',
          name: 'Dahab Software',
        },
        image: member.image || 'https://dahabsoftware.com/mee.png',
        url: member.linkedin || `https://dahabsoftware.com/team#${member.id}`,
      }
    })),
  }

  return (
    <div className="page-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }}
      />
      <Navbar />

      <main id="main-content" style={{ paddingTop: 96 }}>
        <div className="page-container" style={{ paddingTop: 32, paddingBottom: 80 }}>
          <Breadcrumbs
            items={[
              { label: 'الرئيسية', href: '/' },
              { label: 'فريق العمل' },
            ]}
          />

          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label-pill" style={{ margin: '0 auto 20px' }}>
              <i className="fas fa-users" aria-hidden="true" />
              فريق الخبراء
            </div>
            <h1 className="section-heading">
              فريقنا <span className="heading-gradient">المتخصص</span>
            </h1>
            <p className="section-para" style={{ maxWidth: 640, margin: '0 auto' }}>
              تعرف على الخبراء والمتخصصين الذين يجمعون بين المعرفة العميقة والشغف بالتقنية 
              لبناء حلول رقمية متكاملة تدعم نجاح عملك.
            </p>
          </div>

          <section id="team" style={{ marginBottom: 80 }} aria-labelledby="team-heading">
            <h2 id="team-heading" className="sr-only">أعضاء الفريق</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {teamMembers.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  name={member.name}
                  role={member.role}
                  image={member.image || '/mee.png'}
                  specialty={member.specialty || ''}
                  email={member.email}
                  phone={member.phone}
                  linkedin={member.linkedin}
                  github={member.github}
                  twitter={member.twitter}
                />
              ))}
            </div>
          </section>

          <section aria-labelledby="join-team-heading" style={{ marginBottom: 80 }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.06), rgba(30,58,95,0.03))',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-2xl)',
              padding: '48px',
              textAlign: 'center',
            }}>
              <h2 id="join-team-heading" style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16 }}>
                نحن فريق <span style={{ color: 'var(--gold)' }}>دهب سوفت وير</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', maxWidth: 600, margin: '0 auto 32px' }}>
                نؤمن بأهمية التعاون، الاحترافية، والابتكار في كل ما نقدمه. فريقنا مكوّن من متخصصين يعملون معاً بشغف لتقديم حلول تتجاوز التوقعات. هل تبحث عن فرصة جديدة؟
              </p>
              <a href="/careers" className="btn-gold-pill" style={{ display: 'inline-flex', padding: '12px 28px', fontSize: '1.05rem' }}>
                الوظائف المتاحة
                <i className="fas fa-arrow-left" aria-hidden="true" />
              </a>
            </div>
          </section>

          <ContactSection />
        </div>
      </main>

      <FooterSection />
    </div>
  )
}