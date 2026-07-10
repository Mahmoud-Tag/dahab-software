'use client'

import { useEffect, useState } from 'react'

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export default function JsonLd({ data }: JsonLdProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const json = JSON.stringify(Array.isArray(data) ? data : data, null, 0)

  if (!mounted && typeof window !== 'undefined') return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
      suppressHydrationWarning
    />
  )
}
