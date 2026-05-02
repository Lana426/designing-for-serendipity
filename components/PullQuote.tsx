'use client'

import { motion } from 'framer-motion'

interface PullQuoteProps {
  text: string
  large?: boolean
  italic?: boolean
}

export default function PullQuote({ text, large = false, italic = false }: PullQuoteProps) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`text-center mx-auto my-16 max-w-prose ${
        large ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
      } ${italic ? 'italic' : 'font-semibold'} font-serif leading-tight`}
      style={{ color: 'var(--bcg-green)' }}
    >
      {text}
    </motion.blockquote>
  )
}
