'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { architectFAQ, type FAQItem } from '@/content/architects'

interface PopupProps {
  isOpen: boolean
  onClose: () => void
}

function AccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: '1px solid var(--divider)' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 py-4 text-left cursor-pointer"
        style={{ background: 'transparent', border: 'none' }}
      >
        <span
          className="text-sm leading-relaxed font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          {item.q}
        </span>
        <span
          className="flex-shrink-0 mt-0.5 transition-transform duration-200"
          style={{
            color: 'var(--text-muted)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="pb-5 text-sm leading-loose"
              style={{ color: 'var(--text-secondary)' }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ArchitectFAQPopup({ isOpen, onClose }: PopupProps) {
  const [activeCat, setActiveCat] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => closeButtonRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !panelRef.current) return
    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
  }, [])

  const panelVariants = isDesktop
    ? {
        hidden: { x: '100%' },
        visible: { x: 0 },
        exit: { x: '100%' },
      }
    : {
        hidden: { y: '100%' },
        visible: { y: 0 },
        exit: { y: '100%' },
      }

  const panelStyle: React.CSSProperties = isDesktop
    ? {
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100dvh',
        width: '720px',
        borderLeft: '1px solid var(--divider)',
      }
    : {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '90dvh',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
      }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 60,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="FAQs for Tech Architects"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            onKeyDown={handleKeyDown}
            style={{
              ...panelStyle,
              zIndex: 61,
              background: 'var(--bg-elevated)',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'hidden',
            }}
          >
            {/* Header */}
            <div
              className="flex-shrink-0 px-6 md:px-8 pt-6 md:pt-8 pb-5"
              style={{ borderBottom: '1px solid var(--divider)' }}
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.35em] font-medium mb-2"
                    style={{ color: 'var(--bcg-green)' }}
                  >
                    FOR TECH ARCHITECTS
                  </p>
                  <h2
                    className="text-3xl md:text-4xl font-bold leading-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    FAQs
                  </h2>
                  <p
                    className="text-sm mt-2 leading-relaxed max-w-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    What the Trust, Truth, Ties framework means for the people designing the systems.
                  </p>
                </div>

                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  aria-label="Close panel"
                  className="flex-shrink-0 ml-4 p-2 rounded-lg cursor-pointer transition-colors duration-150"
                  style={{ color: 'var(--text-muted)', background: 'transparent', border: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Category tabs */}
              <div
                className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
                style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
              >
                {architectFAQ.map((cat, i) => (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCat(i)}
                    className="flex-shrink-0 min-w-max px-4 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer"
                    style={{
                      minHeight: '36px',
                      background: i === activeCat ? 'var(--bcg-green)' : 'rgba(255,255,255,0.06)',
                      color: i === activeCat ? '#0A0E1A' : 'var(--text-secondary)',
                      border: `1px solid ${i === activeCat ? 'var(--bcg-green)' : 'var(--divider)'}`,
                    }}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCat}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {architectFAQ[activeCat].questions.map((item, i) => (
                    <AccordionItem key={i} item={item} />
                  ))}

                  <p
                    className="text-sm italic mt-10 pb-10"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Have a question this doesn&apos;t cover? The framework is the spine — your specific workflow is the conversation. Treat these as starting points.
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
