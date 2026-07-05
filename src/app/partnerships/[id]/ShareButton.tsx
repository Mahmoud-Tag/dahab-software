'use client'

interface ShareButtonProps {
  title: string
  desc?: string | null
}

export default function ShareButton({ title, desc }: ShareButtonProps) {
  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: title,
        text: desc || '',
        url: window.location.href,
      }).catch((err) => console.log('Error sharing', err))
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 active:scale-95 shadow-sm"
    >
      <i className="fas fa-share-alt" />
      مشاركة
    </button>
  )
}
