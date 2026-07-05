import Link from 'next/link'
import styles from './FooterSection.module.css'

const year = new Date().getFullYear()

const footerLinks = {
  services: [
    { label: 'تطوير مواقع الويب', href: '/services' },
    { label: 'تطبيقات الجوال', href: '/services' },
    { label: 'برمجيات مخصصة', href: '/services' },
    { label: 'التجارة الإلكترونية', href: '/services' },
    { label: 'الذكاء الاصطناعي', href: '/services' },
  ],
  company: [
    { label: 'من نحن', href: '/about' },
    { label: 'الشراكات', href: '/partnerships' },
    { label: 'أعمالنا', href: '/portfolio' },
    { label: 'لماذا نحن', href: '/case-studies' },
    { label: 'فريق العمل', href: '/ourTeam' },
  ],
  contact: [
    { label: 'info@dahabtech.com', href: 'mailto:info@dahabtech.com' },
    { label: '+20 106 414 7224', href: 'tel:+201064147224' },
    { label: 'واتساب', href: 'https://wa.me/201064147224' },
  ],
}

export default function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        {/* Top row */}
        <div className={styles.footerTop}>
          {/* Brand */}
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.footerLogo}>
              <div className={styles.logoMark}>D</div>
              <div className={styles.logoText}>
                <strong>دهب</strong>
                <span>سوفت وير</span>
              </div>
            </Link>
            <p className={styles.brandDesc}>
              نصنع برمجيات احترافية تدعم نمو أعمالك وتحقق أهدافك الرقمية بكفاءة عالية وجودة لا مثيل لها.
            </p>
            <div className={styles.footerSocials}>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.socialBtn} aria-label="Twitter">
                <i className="fab fa-x-twitter" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
                <i className="fab fa-linkedin-in" />
              </a>
              <a href="https://wa.me/201064147224" target="_blank" rel="noreferrer" className={styles.socialBtn} aria-label="WhatsApp">
                <i className="fab fa-whatsapp" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>الخدمات</h4>
            <ul className={styles.colLinks}>
              {footerLinks.services.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>الشركة</h4>
            <ul className={styles.colLinks}>
              {footerLinks.company.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>تواصل</h4>
            <ul className={styles.colLinks}>
              {footerLinks.contact.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.footerDivider} />

        {/* Bottom bar */}
        <div className={styles.footerBottom}>
          <p>© {year} دهب سوفت وير. جميع الحقوق محفوظة.</p>
          <div className={styles.bottomLinks}>
            <a href="/privacy">سياسة الخصوصية</a>
            <a href="/terms">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
