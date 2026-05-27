import styles from './WhyUsSection.module.css'

const reasons = [
  { icon: 'fas fa-headset', title: 'دعم مستمر' },
  { icon: 'fas fa-robot', title: 'دعم ذكي بالـ AI' },
  { icon: 'fas fa-tags', title: 'أسعار تنافسية' },
  { icon: 'fas fa-tachometer-alt', title: 'سرعة في التنفيذ' },
  { icon: 'fas fa-award', title: 'تصميم حصري' },
  { icon: 'fas fa-shield-alt', title: 'جودة وأمانة عالية' },
]

export default function WhyUsSection() {
  return (
    <section id="why-us" className={styles.whyUs}>
      <div className={styles.whyContainer}>
        <h2 className="section-title">لماذا نختار دهب سوفتوير؟</h2>
        <div className={styles.whyGrid}>
          {reasons.map((item) => (
            <div key={item.title} className={styles.whyCard}>
              <div className={styles.whyIcon}>
                <i className={item.icon} />
              </div>
              <h3 className={styles.whyTitle}>{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
