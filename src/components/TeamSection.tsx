'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchTeamMembers } from '@/services/team'
import type { TeamMemberJson } from '@/types'
import TeamMemberCard from './TeamMemberCard'

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberJson[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchTeamMembers()
      .then((members) => {
        if (isMounted) setTeamMembers(members)
      })
      .catch((error) => {
        console.error('Failed to load team members:', error)
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

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

        {isLoading ? (
          <p className="section-para" style={{ textAlign: 'center' }}>
            جاري تحميل فريق العمل...
          </p>
        ) : teamMembers.length > 0 ? (
          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <TeamMemberCard
                  name={member.name}
                  role={member.role}
                  image={member.image || '/mee.png'}
                  specialty={member.specialty || undefined}
                  email={member.email}
                  phone={member.phone}
                  linkedin={member.linkedin}
                  github={member.github}
                  twitter={member.twitter}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="section-para" style={{ textAlign: 'center' }}>
            لا يوجد أعضاء فريق مضافون حالياً.
          </p>
        )}
      </div>
    </section>
  )
}
