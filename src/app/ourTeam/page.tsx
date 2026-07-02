import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import FooterSection from '@/components/FooterSection'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import ContactSection from '@/components/ContactSection'
import TeamMemberCard from '@/components/TeamMemberCard'

export const metadata: Metadata = {
  title: 'فريق العمل | دهب سوفت وير',
  description: 'تعرف على فريق دهب سوفت وير المتخصص في تقديم حلول برمجية مبتكرة ومتميزة.',
  alternates: {
    canonical: '/ourTeam',
  },
  openGraph: {
    title: 'فريق العمل | دهب سوفت وير',
    description: 'فريقنا من المطورين والمصممين والمهندسين الذين يبنون حلولاً رقمية متكاملة.',
    url: '/ourTeam',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

import { prisma } from '@/lib/prisma'

// Force dynamic rendering so Prisma is called at request time, not during build
export const dynamic = 'force-dynamic'

export default async function OurTeamPage() {
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { createdAt: 'asc' }
  })
  return (
    <div>
      <Navbar />

      <div className="container" style={{ paddingTop: 20 }}>
        <Breadcrumbs
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'فريق العمل' },
          ]}
        />
        <PageHeader
          title="فريق العمل"
          subtitle="تعرف على الخبراء والمتخصصين الذين يبنون حلولاً رقمية متكاملة لعملك."
        />
      </div>

      <section id="team" style={{ padding: 'clamp(1.5rem, 4vw, 3rem) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
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
        </div>
      </section>

      <section style={{ padding: '48px 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.06), rgba(30,58,95,0.03))',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-2xl)',
            padding: '32px 28px',
            boxShadow: 'var(--shadow-lg)',
            textAlign: 'center',
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 900,
              color: 'var(--text-primary)',
              marginBottom: 12,
            }}>
              نحن فريق <span style={{ color: 'var(--gold)' }}>دهب سوفت وير</span>
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              fontSize: '1rem',
              maxWidth: 600,
              margin: '0 auto 24px',
            }}>
              نؤمن بأهمية التعاون والاحترافية والابتكار في كل ما نقدمه. فريقنا مكوّن من متخصصين يعملون معاً لتقديم أفضل الحلول الرقمية.
            </p>
<a href="/contact" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                انضم إلينا
                <i className="fas fa-arrow-left" />
              </a>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 10, paddingBottom: 30 }}>
        <ContactSection />
      </div>

      <FooterSection />
    </div>
  )
}