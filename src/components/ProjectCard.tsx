import Link from 'next/link'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  slug: string
  title: string
  excerpt: string
  imageUrl: string
  category?: string
}

export default function ProjectCard({ slug, title, excerpt, imageUrl, category }: ProjectCardProps) {
  return (
    <div className={styles.card}>
      <Link href={`/portfolio/${slug}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <img src={imageUrl} alt={title} className={styles.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {category && <div className={styles.category}>{category}</div>}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.learnMore}>
          عرض التفاصيل
          <i className="fas fa-arrow-left" />
        </div>
      </Link>
    </div>
  )
}