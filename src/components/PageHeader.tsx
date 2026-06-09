import type { ReactNode } from 'react'
import styles from './PageHeader.module.css'

type Props = {
  title: string
  subtitle?: string
  right?: ReactNode
}

export default function PageHeader({ title, subtitle, right }: Props) {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>
      {right ? <div className={styles.right}>{right}</div> : null}
    </header>
  )
}

