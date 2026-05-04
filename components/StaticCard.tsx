'use client'

import { motion } from 'framer-motion'
import type { StaticCardData } from '@/lib/content'

interface StaticCardProps {
  card: StaticCardData
  index: number
}

export default function StaticCard({ card, index }: StaticCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
      className="rounded-2xl p-8"
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--divider)',
      }}
    >
      {card.number && (
        <div
          className="font-serif text-5xl font-bold mb-4 leading-none"
          style={{ color: 'var(--bcg-green)' }}
        >
          {card.number}
        </div>
      )}
      <h3
        className="text-lg font-semibold mb-2 leading-snug"
        style={{ color: 'var(--text-primary)' }}
      >
        {card.title}
      </h3>
      <p
        className="text-sm italic mb-3"
        style={{ color: 'var(--bcg-green-soft)' }}
      >
        {card.subtitle}
      </p>
      {card.body && (
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {card.body}
        </p>
      )}
    </motion.div>
  )
}
