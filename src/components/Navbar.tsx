'use client'

import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
      <div className={styles.navShell}>
        <div className={styles.navPanel}>
          <a href="#top" className={styles.navLogo} onClick={() => setMobileOpen(false)}>
            <span className={styles.logoIcon}>
              <i className="fas fa-gem" />
            </span>
            <span className={styles.logoText}>
              <strong>دهب سوفتوير</strong>
              <small>حلول رقمية بهوية أنيقة</small>
            </span>
          </a>

          <ul className={styles.navLinks}>
            <li><a href="#about" className="nav-link">من نحن</a></li>
            <li><a href="#services" className="nav-link">الخدمات</a></li>
            <li><a href="#portfolio" className="nav-link">الأعمال</a></li>
            <li><a href="#why-us" className="nav-link">لماذا نحن</a></li>
            <li><a href="#contact" className="nav-link">تواصل</a></li>
          </ul>

          <div className={styles.navActions}>
            <a href="#portfolio" className="btn-outline-gold">استعراض الأعمال</a>
            <a href="#contact" className="btn-gold">ابدأ مشروعك</a>
          </div>

          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <i className={mobileOpen ? 'fas fa-xmark' : 'fas fa-bars'} />
          </button>
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuInner}>
          <a href="#about" className="nav-link" onClick={() => setMobileOpen(false)}>من نحن</a>
          <a href="#services" className="nav-link" onClick={() => setMobileOpen(false)}>الخدمات</a>
          <a href="#portfolio" className="nav-link" onClick={() => setMobileOpen(false)}>الأعمال</a>
          <a href="#why-us" className="nav-link" onClick={() => setMobileOpen(false)}>لماذا نحن</a>
          <a href="#contact" className="nav-link" onClick={() => setMobileOpen(false)}>تواصل</a>
          <a href="#contact" className="btn-gold" onClick={() => setMobileOpen(false)}>اطلب عرضاً الآن</a>
        </div>
      </div>
    </nav>
  )
}
