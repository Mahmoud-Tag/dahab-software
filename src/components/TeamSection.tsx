'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import TeamMemberCard from './TeamMemberCard'

const teamMembers = [
  { name: 'إسلام نادى أبواليزيد', role: 'مؤسس ومدير تنفيذي', image: '/team/ahmed.jpg', specialty: 'Strategy' },
  { name: 'محمود تاج الدين', role: 'مهندس برمجة أولى', image: '/mee.png', specialty: 'Full Stack' },
  { name: 'محمد علي', role: 'مصمم تجربة مستخدم', image: '/team/mohamed.jpg', specialty: 'UI/UX' },
  { name: 'نور حسن', role: 'مهندس AI', image: '/team/nour.jpg', specialty: 'AI/ML' },
]

export default function TeamSection() {
  return (
    <section className="section-team">
      <div className="page-container">
        <motion.div
          className="team-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label-pill">
            <i className="fas fa-users" />
            فريقنا
          </div>
          <div className="section-header-row">
            <div>
              <h2 className="section-heading">
                العقول التي تبني{' '}
                <span className="heading-gradient">المستقبل</span>
              </h2>
              <p className="section-para" style={{ maxWidth: 560 }}>
                فريق متخصص من المطورين والمصممين والمهندسين يعملون معاً لتقديم حلول رقمية مبتكرة.
              </p>
            </div>
            <Link href="/ourTeam" className="btn-outline-pill">
              عرض الفريق كاملاً
              <i className="fas fa-arrow-left" />
            </Link>
          </div>
        </motion.div>

        <div className="team-grid">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TeamMemberCard
                name={member.name}
                role={member.role}
                image={member.image}
                specialty={member.specialty}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}