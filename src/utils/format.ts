export const formatNumber = (value: number | string | null | undefined) =>
  new Intl.NumberFormat('ar-EG').format(Number(value || 0))

export const formatDate = (value: string | Date | null | undefined) => {
  if (!value) return 'غير متوفر'
  const d = typeof value === 'string' ? new Date(value) : value
  return new Intl.DateTimeFormat('ar-EG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d)
}

export const typeLabel = (type?: string | null) =>
  (
    {
      web: 'موقع ويب',
      app: 'تطبيق',
      system: 'نظام',
      ecommerce: 'متجر',
      ai: 'ذكاء اصطناعي',
      resource: 'مورد',
    } as Record<string, string>
  )[type ?? ''] || 'عنصر'

export const portfolioTypeLabel = (type?: string | null) =>
  (
    {
      web: 'ويب',
      app: 'تطبيق',
      system: 'نظام',
      ecommerce: 'متجر',
      ai: 'AI',
      resource: 'مورد',
    } as Record<string, string>
  )[type ?? ''] || 'منتج'
