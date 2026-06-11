'use client'

import styles from './TeamMemberCard.module.css'

type Props = {
  name: string
  role: string
  image: string
  specialty?: string
  email?: string | null
  phone?: string | null
  linkedin?: string | null
  github?: string | null
  twitter?: string | null
}

export default function TeamMemberCard({ name, role, image, specialty, email, phone, linkedin, github, twitter }: Props) {
  const socialLinks = [
    { href: linkedin, icon: 'fa-brands fa-linkedin', label: 'LinkedIn', color: '#0A66C2' },
    { href: github, icon: 'fa-brands fa-github', label: 'GitHub', color: '#ffffff' },
    { href: twitter, icon: 'fa-brands fa-x-twitter', label: 'X/Twitter', color: '#ffffff' },
    { href: email ? `mailto:${email}` : null, icon: 'fas fa-envelope', label: 'Email', color: '#F59E0B' },
    { href: phone ? `tel:${phone}` : null, icon: 'fas fa-phone', label: 'Phone', color: '#10B981' },
  ].filter((l) => l.href)
  return (
    <article className={styles.memberCard}>
      <div className={styles.cardAccent} />
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.memberImage} />
        <div className={styles.imageOverlay} />
      </div>
      <div className={styles.memberBody}>
        <h4 className={styles.memberName}>{name}</h4>
        <p className={styles.memberRole}>{role}</p>
        {specialty && <span className={styles.specialtyBadge}>{specialty}</span>}
        {socialLinks.length > 0 && (
          <div className={styles.socialLinks}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href!}
                target={link.href!.startsWith('mailto') || link.href!.startsWith('tel') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={link.label}
                className={styles.socialLink}
                style={{ '--link-color': link.color } as React.CSSProperties}
              >
                <i className={link.icon} />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}