'use client'

import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion'
import React, { useEffect, useMemo, useRef, useState } from 'react'

type CountUpProps = {
  value: number
  durationMs?: number
  format?: (v: number) => string
}

function useCountUp(target: number, durationMs = 900, enabled = true) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) {
      setValue(target)
      return
    }

    const start = performance.now()
    const from = 0
    const to = target

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(from + (to - from) * eased))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, durationMs, enabled])

  return value
}

export function CountUp({ value, durationMs = 900, format }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const animatedValue = useCountUp(value, durationMs, inView)

  return (
    <span ref={ref}>
      {format ? format(animatedValue) : animatedValue}
    </span>
  )
}

type RevealProps = {
  children: React.ReactNode
  className?: string
  variant?: 'up' | 'left' | 'right' | 'scale'
}

export function Reveal({ children, className, variant = 'up' }: RevealProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  useEffect(() => {
    if (!inView) return
    controls.start('visible')
  }, [controls, inView])

  const variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: variant === 'up' ? 18 : 0,
        x: variant === 'left' ? -18 : variant === 'right' ? 18 : 0,
        scale: variant === 'scale' ? 0.98 : 1,
        filter: 'blur(6px)',
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.7 },
      },
    }),
    [variant]
  )



  return (
    <motion.div ref={ref} className={className} variants={variants} initial="hidden" animate={controls}>
      {children}
    </motion.div>
  )

}

export function Lightbox({ open, imageSrc, imageAlt, onClose }: { open: boolean; imageSrc: string | null; imageAlt: string; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open || !imageSrc) return null

  return (
    <AnimatePresence>
      <motion.div
        className="bbxLightboxRoot"
        role="dialog"
        aria-modal="true"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bbxLightboxPanel"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <img className="bbxLightboxImg" src={imageSrc} alt={imageAlt} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

