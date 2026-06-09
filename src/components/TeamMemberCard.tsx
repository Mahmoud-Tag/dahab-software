'use client'

import styles from './TeamMemberCard.module.css'

type Props = {
  name: string
  role: string
  image: string
  specialty?: string
}

export default function TeamMemberCard({ name, role, image, specialty }: Props) {
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
      </div>
    </article>
  )
}