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

const teamMembers = [
  {
    name: 'مهندس/إسلام نادى أبواليزيد ',
    role: 'المؤسس والمدير التنفيذي',
    image: '/team/ahmed.jpg',
    specialty: 'Strategy'
  },
  {
    name: 'مهندس/ محمود تاج الدين',
    role: 'مهندس برمجيات أولى',
    image: './mee.png',
    specialty: 'Full Stack Development'
  },
  {
    name: 'محمد علي',
    role: 'مصمم تجربة مستخدم',
    image: '/team/mohamed.jpg',
    specialty: 'UI/UX'
  },
  {
    name: 'نور حسن',
    role: 'مهندسة ذكاء اصطناعي',
    image: '/team/nour.jpg',
    specialty: 'AI'
  },
  {
    name: 'خالد يوسف',
    role: 'مطور تطبيقات جوال',
    image: '/team/khaled.jpg',
    specialty: 'Mobile'
  },
  {
    name: 'منير أحمد',
    role: 'أمن المعلومات',
    image: '/team/moner.jpg',
    specialty: 'Security'
  }
]

export default function OurTeamPage() {
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
                key={member.name}
                name={member.name}
                role={member.role}
                image={member.image}
                specialty={member.specialty}
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