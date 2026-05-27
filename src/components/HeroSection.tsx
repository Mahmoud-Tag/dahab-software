import styles from './HeroSection.module.css'

const metrics = [
  { label: 'نمط التنفيذ', value: 'Web + App', note: 'حلول متصلة بهوية واحدة.' },
  { label: 'الأولوية', value: 'Performance', note: 'سرعة، وضوح، واعتمادية.' },
  { label: 'اللغة البصرية', value: 'Premium UI', note: 'طابع راقٍ بعيد عن القوالب الجاهزة.' },
]

export default function HeroSection() {
  return (
    <section id="top" className={`${styles.heroSection} hex-bg`}>
      <div className={styles.heroShell}>
        <div className={styles.heroCopy}>
          <span className={styles.heroBadge}>
            <i className="fas fa-sparkles" />
            قيادة التحول الرقمي بذكاء وأناقة
          </span>

          <h1 className={styles.heroTitle}>
            نصمم منتجات رقمية تبدو
            <span className="gold-gradient-text">فاخرة، سريعة، وسهلة الإدارة</span>
          </h1>

          <p className={styles.heroDescription}>
            من مواقع الويب والمتاجر إلى لوحات التحكم والتطبيقات، نبني تجارب رقمية تجمع بين جمالية العرض،
            وضوح الرسالة، واعتمادية التنفيذ حتى يظهر مشروعك كما يجب أن يظهر.
          </p>

          <div className={styles.heroActions}>
            <a href="#contact" className="btn-gold">
              <i className="fas fa-paper-plane" />
              اطلب عرض سعر
            </a>
            <a href="#portfolio" className="btn-outline-gold">
              <i className="fas fa-eye" />
              شاهد الأعمال
            </a>
          </div>

          <div className={styles.heroMetrics}>
            {metrics.map((item) => (
              <article key={item.label} className={styles.heroMetricCard}>
                <p>{item.label}</p>
                <strong>{item.value}</strong>
                <span>{item.note}</span>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroDevice}>
            <img src="/hero-devices.png" alt="منصات دهب سوفتوير" className={styles.heroImage} />
          </div>

          <div className={`${styles.heroFloating} ${styles.heroFloatingTop}`}>
            <span>Luxury UX</span>
            <strong>واجهة تبيع الفكرة قبل الشرح</strong>
            <small>بداية قوية، تسلسل بصري مرتب، وهوية يصعب نسيانها.</small>
          </div>

          <div className={`${styles.heroFloating} ${styles.heroFloatingBottom}`}>
            <span>Scalable Delivery</span>
            <strong>منتج جاهز للنمو</strong>
            <small>قرارات تقنية مدروسة من أول شاشة إلى لوحة التحكم.</small>
          </div>
        </div>
      </div>
    </section>
  )
}
