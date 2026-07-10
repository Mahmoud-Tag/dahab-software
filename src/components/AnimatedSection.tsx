'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  style?: React.CSSProperties
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  style,
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}
