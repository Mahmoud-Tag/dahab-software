import styles from './FooterSection.module.css'

export default function FooterSection() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <div className={styles.footerLogo}>
            <span className={styles.logoIconSm}>
              <i className="fas fa-gem" />
            </span>
            <div>
              <strong>دهب سوفتوير</strong>
              <p>تطوير، تصميم، أنظمة، ومتاجر رقمية بطابع أكثر أناقة.</p>
            </div>
          </div>
        </div>
        <div className={styles.footerCopy}>
          © {year} دهب سوفتوير. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  )
}
