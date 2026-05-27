import styles from './AboutSection.module.css'

const features = [
  { icon: 'fas fa-robot', text: 'تطوير حلول تعتمد على الذكاء الاصطناعي' },
  { icon: 'fas fa-code', text: 'خبرة في تطوير الويب والتطبيقات' },
  { icon: 'fas fa-lock', text: 'خبرة في الأمن السيبراني وحماية الأنظمة' },
  { icon: 'fas fa-shield-alt', text: 'قوة، ثقة وقابل للتطوير' },
  { icon: 'fas fa-headset', text: 'دعم فني مستمر' },
]

export default function AboutSection() {
  return (
    <section className={`${styles.about} gold-bg-glow`} id="about">
      <div className={styles.aboutContainer}>
        <div className={styles.aboutImageWrap}>
          <div className={styles.aboutImgGlow} />
          <img src="/about-person.png" alt="مدير دهب سوفتوير" className={styles.aboutImage} />
          <div className={styles.aboutBadge}>
            <i className="fas fa-medal" />
            خبرة +5 سنوات
          </div>
        </div>

        <div className={styles.aboutContent}>
          <h2 className="section-title" style={{ textAlign: 'right' }}>من نحن</h2>
          <p className={styles.aboutIntro}>
            نحن فريق خبراء تقنيين متخصصين في تطوير حلول رقمية مبتكرة تعتمد على أحدث التقنيات، ونسعى إلى تحويل الأفكار إلى مشاريع ناجحة ذات أثر حقيقي. نستخدم الذكاء الاصطناعي لتعزيز جودة وسرعة التطوير، مع إشراف تقني مباشر يضمن أعلى معايير الاحتراف والأمان. نقدم أنظمة وبرمجيات مخصصة وفق أعلى المعايير الاحترافية، بما يتوافق مع متطلبات ومعايير الأسواق المحلية والدولية.
          </p>
          <ul className={styles.featureList}>
            {features.map((feat) => (
              <li key={feat.text} className="feature-item">
                <span className="icon-circle" style={{ width: 48, height: 48, fontSize: '1.1rem' }}>
                  <i className={feat.icon} />
                </span>
                <span className={styles.featText}>{feat.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
