import Link from 'next/link'
import styles from './Breadcrumbs.module.css'


type Crumb = { label: string; href?: string }

type Props = {
  items: Crumb[]
  className?: string
}

export default function Breadcrumbs({ items, className }: Props) {
  const lastIndex = items.length - 1

  return (
    <nav aria-label="breadcrumbs" className={className ?? styles.breadcrumbs}>
      <ol className={styles.list}>
        {items.map((c, idx) => (
          <li key={`${c.label}-${idx}`} className={styles.item}>
            {c.href && idx !== lastIndex ? (
              <Link href={c.href} className={styles.link}>
                {c.label}
              </Link>
            ) : (
              <span className={styles.current}>{c.label}</span>
            )}
            {idx !== lastIndex && <span className={styles.sep}>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

