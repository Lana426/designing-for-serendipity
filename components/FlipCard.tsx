'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { FlipCardData } from '@/lib/content'

interface FlipCardProps {
  card: FlipCardData
  index: number
}

const CARD_HEIGHT = 420
const IMAGE_HEIGHT = 210  // 50% of card height, explicit px — avoids flex % resolution bugs

export default function FlipCard({ card, index }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [imgError, setImgError] = useState(false)

  const toggle = () => setFlipped((v) => !v)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }

  const placeholderText = `Image: drop file at /public${card.imageSrc}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={
          flipped
            ? `${card.title}: showing examples. Press to flip back.`
            : `${card.title}: press to see examples.`
        }
        onClick={toggle}
        onKeyDown={handleKeyDown}
        style={{
          perspective: '1200px',
          height: `${CARD_HEIGHT}px`,
          cursor: 'pointer',
          transition: 'transform 0.25s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)' }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
      >
        <span className="sr-only" aria-live="polite">
          {flipped ? `Examples: ${card.examples.join('. ')}` : `${card.title}. ${card.descriptor}`}
        </span>

        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* ── FRONT ──────────────────────────────────────────────────────── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid var(--divider)',
            }}
          >
            {/* Image — plain img tag avoids position:absolute issues inside preserve-3d context */}
            <div
              style={{
                width: '100%',
                height: `${IMAGE_HEIGHT}px`,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {imgError ? (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'var(--bg)',
                    border: '1px solid rgba(0,168,98,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 20px',
                  }}
                >
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '11px',
                      textAlign: 'center',
                      fontStyle: 'italic',
                      lineHeight: 1.5,
                    }}
                  >
                    {placeholderText}
                  </p>
                </div>
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.imageSrc}
                    alt={card.title}
                    loading="lazy"
                    onError={() => setImgError(true)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)',
                    }}
                  />
                </>
              )}
            </div>

            {/* Text — takes remaining height */}
            <div
              style={{
                height: `${CARD_HEIGHT - IMAGE_HEIGHT}px`,
                background: 'var(--bg-elevated)',
                padding: '14px 18px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span
                style={{
                  color: 'var(--bcg-green)',
                  fontSize: '10px',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {card.eyebrow}
              </span>
              <p
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '15px',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                {card.title}
              </p>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '11px',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  margin: 0,
                  flex: 1,
                  overflow: 'hidden',
                }}
              >
                {card.descriptor}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '10px', margin: 0, marginTop: '2px' }}>
                Tap to see examples ↻
              </p>
            </div>
          </div>

          {/* ── BACK ───────────────────────────────────────────────────────── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'var(--bg-elevated)',
              borderRadius: '16px',
              border: '1px solid var(--divider)',
              padding: '20px 20px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              overflowY: 'auto',
            }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 500, margin: 0 }}>
              {card.title}
            </p>
            <p
              style={{
                color: 'var(--bcg-green)',
                fontSize: '10px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Example
            </p>
            {card.examples.length === 1 ? (
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6, flex: 1, margin: 0 }}>
                {card.examples[0]}
              </p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
                {card.examples.map((ex, i) => (
                  <li key={i} style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--bcg-green)', flexShrink: 0, fontWeight: 600 }}>—</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5 }}>
                      {ex}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <p style={{ color: 'var(--text-muted)', fontSize: '10px', textAlign: 'center', margin: 0 }}>
              Tap to flip back
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
