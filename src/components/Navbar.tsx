'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'من نحن', href: '/about' },
  { label: 'خدماتنا', href: '/services' },
  { label: 'الشراكات', href: '/partnerships' },
  { label: 'أعمالنا', href: '/portfolio' },
  { label: 'فريق العمل', href: '/ourTeam' },
  { label: 'لماذا نحن', href: '/case-studies' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navInner}>
        {/* Brand */}
        <Link href="/" className={styles.navLogo} onClick={() => setMobileOpen(false)}>
          <div className={styles.navLogoMark}>
            <span>D</span>
          </div>
          <div className={styles.navLogoText}>
            <strong>دهب</strong>
            <span>سوفت وير</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="/contact" className={styles.btnPrimary}>
          ابدأ مشروعك
          <i className="fas fa-arrow-left" />
        </a>

        {/* Mobile Toggle */}
        <button
          type="button"
          className={`${styles.mobileToggle} ${mobileOpen ? styles.open : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuInner}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navLinkMobile}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/contact"
            className={styles.btnMobilePrimary}
            onClick={() => setMobileOpen(false)}
          >
            ابدأ مشروعك ✦
          </a>
        </div>
      </div>
    </nav>
  )
}
