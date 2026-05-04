'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  isOpen: boolean
  onOpen: () => void
  buttonRef: React.RefObject<HTMLButtonElement | null>
}

export default function ArchitectFAQButton({ isOpen, onOpen, buttonRef }: Props) {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.button
          ref={buttonRef}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={onOpen}
          className="fixed z-50 flex items-center gap-2 px-4 rounded-full text-sm font-medium cursor-pointer transition-shadow duration-200"
          style={{
            bottom: '24px',
            right: '24px',
            height: '44px',
            background: 'var(--bg-elevated)',
            border: '1px solid rgba(0, 168, 98, 0.3)',
            color: 'var(--text-primary)',
            boxShadow: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 168, 98, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <span className="hidden md:inline">FAQs for Tech Architects</span>
          <span className="md:hidden">Architect FAQs</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
