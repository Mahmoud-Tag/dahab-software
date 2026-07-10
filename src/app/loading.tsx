export default function Loading() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
      aria-label="جاري التحميل..."
      role="status"
    >
      <div
        style={{
          width: 48,
          height: 48,
          border: '4px solid rgba(212, 175, 55, 0.2)',
          borderTopColor: 'var(--gold)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <div style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '1.1rem' }}>
        جاري تحميل المحتوى...
      </div>
      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
