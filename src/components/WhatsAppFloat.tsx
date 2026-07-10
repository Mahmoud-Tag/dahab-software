'use client'

import { useEffect, useState } from 'react'

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <a
      href="https://wa.me/201064147224?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      title="واتساب — دهب سوفت وير"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 9999,
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #25D366, #128C7E)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.6rem',
        boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
        textDecoration: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: 'whatsappPulse 2s ease-in-out infinite',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.transform = 'scale(1.1)'
        el.style.boxShadow = '0 8px 30px rgba(37, 211, 102, 0.6)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.transform = 'scale(1)'
        el.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.4)'
      }}
    >
      <i className="fab fa-whatsapp" aria-hidden="true" />
      <style>{`
        @keyframes whatsappPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4); }
          50% { box-shadow: 0 4px 30px rgba(37, 211, 102, 0.7), 0 0 0 8px rgba(37, 211, 102, 0.1); }
        }
      `}</style>
    </a>
  )
}
