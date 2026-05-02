'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CardData } from '@/lib/content'

interface CardProps {
  card: CardData
}

export default function Card({ card }: CardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      onClick={() => setExpanded(!expanded)}
      className="relative cursor-pointer rounded-2xl p-8 transition-all duration-300"
      style={{
        background: 'var(--bg-elevated)',
        border: expanded
          ? '1px solid var(--bcg-green)'
          : '1px solid var(--divider)',
        boxShadow: expanded
          ? '0 0 24px rgba(0, 168, 98, 0.15)'
          : '0 0 0 transparent',
      }}
    >
      <div
        className="font-serif text-5xl font-bold mb-4 leading-none"
        style={{ color: 'var(--bcg-green)' }}
      >
        {card.number}
      </div>

      <h3
        className="text-lg font-semibold mb-3 leading-snug"
        style={{ color: 'var(--text-primary)' }}
      >
        {card.title}
      </h3>

      {card.question && (
        <p
          className="text-sm italic mb-3"
          style={{ color: 'var(--bcg-green-soft)' }}
        >
          {card.question}
        </p>
      )}

      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {card.short}
      </p>

      <AnimatePresence>
        {expanded && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-sm leading-relaxed mt-4 overflow-hidden"
            style={{ color: 'var(--text-primary)' }}
          >
            {card.long}
          </motion.p>
        )}
      </AnimatePresence>

      <div
        className="absolute bottom-4 right-5 text-xs uppercase tracking-widest transition-colors duration-200"
        style={{ color: expanded ? 'var(--bcg-green)' : 'var(--text-muted)' }}
      >
        {expanded ? 'Less ↑' : 'More ↓'}
      </div>
    </motion.div>
  )
}
