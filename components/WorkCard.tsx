'use client'

import { motion } from 'framer-motion'
import type { WorkCategoryCardData } from '@/lib/content'

interface WorkCardProps {
  card: WorkCategoryCardData
  index: number
}

function parseAttr(text: string): React.ReactNode[] {
  const parts = text.split(/\*\*(.*?)\*\*/)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

export default function WorkCard({ card, index }: WorkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
      className="rounded-2xl p-8 flex flex-col gap-4"
      style={{
        background: 'var(--bg-elevated)',
        border: `1px solid ${card.accentColor}`,
        borderTop: `3px solid ${card.accentColor}`,
      }}
    >
      <p
        className="text-xs uppercase tracking-widest font-semibold"
        style={{ color: card.accentColor }}
      >
        {card.eyebrow}
      </p>

      <div>
        <h3
          className="text-2xl font-semibold mb-1 leading-snug"
          style={{ color: 'var(--text-primary)' }}
        >
          {card.title}
        </h3>
        <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
          {card.descriptor}
        </p>
      </div>

      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        {card.reliance}
      </p>

      <ul className="space-y-2 flex-1">
        {card.attributes.map((attr, i) => (
          <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--text-secondary)' }}>
            <span className="flex-shrink-0" style={{ color: card.accentColor }}>—</span>
            <span>{parseAttr(attr)}</span>
          </li>
        ))}
      </ul>

      <p
        className="text-sm font-semibold pt-2"
        style={{
          color: card.accentColor,
          borderTop: `1px solid ${card.accentColor}33`,
        }}
      >
        ▸ Decision: {card.decision}
      </p>
    </motion.div>
  )
}
