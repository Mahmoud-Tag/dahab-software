'use client'

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'fixed',
        top: '-100px',
        right: 0,
        left: 0,
        zIndex: 100000,
        background: 'var(--primary, #2563EB)',
        color: '#fff',
        padding: '12px 24px',
        textAlign: 'center',
        fontWeight: 700,
        fontSize: '1rem',
        textDecoration: 'none',
        transition: 'top 0.2s ease',
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = '0'
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = '-100px'
      }}
    >
      تخطى إلى المحتوى الرئيسي
    </a>
  )
}
