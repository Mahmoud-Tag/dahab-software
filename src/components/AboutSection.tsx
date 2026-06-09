import Image from 'next/image'
import styles from './AboutSection.module.css'

const features = [
  { icon: '🎯', title: 'تطوير الكفاءة التشغيلية', desc: 'أنظمة مخصصة تُحسّن سير عمل فريقك' },
  { icon: '🔒', title: 'أمان وموثوقية عالية', desc: 'حماية بياناتك بأعلى معايير التشفير' },
  { icon: '📈', title: 'دعم مستمر وتطوير دائم', desc: 'نرافقك في كل مراحل نمو مشروعك' },
]

export default function AboutSection() {
  return (
    <section className={`${styles.about} reveal`} id="about">
      <div className={`${styles.aboutInner} ${styles.sectionInner}`}>
        <div className={styles.aboutImgWrap}>
          <div className={styles.aboutImg}>
            <div className={styles.aboutImgInner}>
              <Image
                src="/about.png"
                alt="عن دهب سوفت وير"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className={styles.aboutBadgeFloat}>
            <div className={styles.badgeNum}>+٢٠٠</div>
            <div className={styles.badgeLbl}>مشروع مكتمل</div>
          </div>
          <div className={styles.aboutBadgeFloat2}>
            <div className={styles.badgeIcon}>⭐</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>4.9/5</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>تقييم العملاء</div>
            </div>
          </div>
        </div>

        <div className={styles.aboutContent}>
          <div className={styles.sectionLabel}>من نحن</div>
          <h2 className={styles.sectionTitle}>نطور <span className={styles.gradientText}>تكنولوجيا</span> تصنع الفارق</h2>
          <p className={styles.sectionSubPlus}>
            دهب سوفت وير شركة متخصصة في تطوير البرمجيات الاحترافية، نسعى لتمكين الشركات من الازدهار في العصر الرقمي بحلول مبتكرة وموثوقة.
          </p>
          <div className={styles.aboutFeatures}>
            {features.map((feat) => (
              <div key={feat.title} className={styles.aboutFeature}>
                <div className={styles.featIcon}>{feat.icon}</div>
                <div>
                  <div className={styles.featTitle}>{feat.title}</div>
                  <div className={styles.featDesc}>{feat.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '28px' }}>
            <a href="#contact" className={styles.btnPrimary}>تعرف علينا أكثر →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
