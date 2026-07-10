'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 24,
        background: '#f8fafc',
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: 48,
          borderRadius: 24,
          boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
          maxWidth: 500,
          width: '100%',
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            margin: '0 auto 24px',
          }}
          aria-hidden="true"
        >
          <i className="fas fa-exclamation-triangle" />
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: 16 }}>
          حدث خطأ غير متوقع
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.6 }}>
          نعتذر عن ذلك. حدثت مشكلة أثناء محاولة تحميل هذه الصفحة. يرجى المحاولة مرة أخرى أو العودة للصفحة الرئيسية.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => reset()}
            className="btn-gold-pill"
            style={{ border: 'none', cursor: 'pointer' }}
          >
            حاول مرة أخرى
            <i className="fas fa-sync" aria-hidden="true" />
          </button>
          <Link href="/" className="btn-outline-pill">
            الرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}
