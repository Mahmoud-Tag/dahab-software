import Link from 'next/link';
import styles from './CTASection.module.css';

interface CTASectionProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  href: string;
}

export default function CTASection({ title, subtitle, buttonText, href }: CTASectionProps) {
  return (
    <div className={styles.ctaContainer}>
      <div className={styles.ctaContent}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <Link href={href} className={styles.ctaButton}>
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
