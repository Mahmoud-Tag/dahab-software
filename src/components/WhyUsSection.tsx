import styles from './WhyUsSection.module.css'

const reasons = [
  { num: '١', title: 'فريق متخصص ومحترف', desc: 'مطورون وخبراء بتجارب موسعة في أحدث التقنيات العالمية' },
  { num: '٢', title: 'جودة لا تُساوم', desc: 'نلتزم بأعلى معايير الكود النظيف والاختبار الشامل' },
  { num: '٣', title: 'التسليم في الوقت المحدد', desc: 'نحترم جدولك الزمني ونسلّم في المواعيد المتفق عليها' },
  { num: '٤', title: 'دعم ما بعد الإطلاق', desc: 'نرافقك بعد الإطلاق لضمان استمرار الأداء المثالي' },
  { num: '٥', title: 'أسعار تنافسية وشفافة', desc: 'تسعير واضح بلا رسوم مخفية، قيمة حقيقية لكل جنيه' },
]

const stats = [
  { num: '+٢٠٠', lbl: 'مشروع منجز' },
  { num: '+١٥٠', lbl: 'عميل سعيد' },
  { num: '٩٨٪', lbl: 'نسبة الرضا' },
  { num: '+٧', lbl: 'سنوات خبرة' },
]

export default function WhyUsSection() {
  return (
    <section id="why-us" className={`${styles.whyUs} reveal`}>
      <div className={styles.whyusInner}>
        {/* Left: Reasons */}
        <div>
          <div className={styles.sectionLabel}>لماذا دهب سوفت وير؟</div>
          <h2 className={styles.sectionTitle}>
            نؤمن بأن <span>التميز</span> هو معيارنا
          </h2>
          <p className={styles.sectionSub}>
            نختلف لأننا نضع نجاحك هدفاً أساسياً، ونلتزم بأعلى معايير الجودة في كل مشروع
          </p>
          <div className={styles.whyusReasons}>
            {reasons.map((r, i) => (
              <div key={r.num} className={`${styles.reason} reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                <div className={styles.reasonNum}>{r.num}</div>
                <div>
                  <div className={styles.reasonTitle}>{r.title}</div>
                  <div className={styles.reasonDesc}>{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: CTA Stats Card */}
        <div className={styles.whyusCta}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaLabel}>✦ إنجازاتنا بالأرقام</div>
            <div className={styles.ctaTitle}>
              أرقام تتحدث عن <span>نجاحنا</span>
            </div>
            <div className={styles.ctaSub}>
              نفخر بسجل حافل من المشاريع الناجحة والعملاء الراضين
            </div>
            <div className={styles.ctaStats}>
              {stats.map((s) => (
                <div key={s.lbl} className={styles.ctaStat}>
                  <div className={styles.ctaStatNum}>{s.num}</div>
                  <div className={styles.ctaStatLbl}>{s.lbl}</div>
                </div>
              ))}
            </div>
            <a href="/case-studies" className={styles.btnPrimary}>
              ابدأ معنا اليوم →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
