// src/components/TechCard.tsx
import Image from 'next/image';
import styles from './TechCard.module.css';

export interface TechCardProps {
  name: string;
  description: string;
  iconUrl?: string;
}

export default function TechCard({ name, description, iconUrl }: TechCardProps) {
  return (
    <div className={styles.card}>
      {iconUrl && (
        <div className={styles.iconWrapper}>
          <Image src={iconUrl} alt={name} width={64} height={64} className={styles.icon} />
        </div>
      )}
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
