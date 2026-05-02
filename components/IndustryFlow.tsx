'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { industryData, type IndustryTask } from '@/lib/content'

const STEP_DELAY_MS = 600

const passColor: Record<string, string> = {
  pass: 'var(--bcg-green)',
  warn: 'var(--accent-warm)',
  fail: 'var(--accent-warning)',
}

const passIcon: Record<string, string> = {
  pass: '✓',
  warn: '⚠',
  fail: '✗',
}

const verdictColor: Record<string, string> = {
  Automate: 'var(--bcg-green)',
  Augment: 'var(--accent-warm)',
  'Leave alone': 'var(--accent-warning)',
}

interface TaskFlowProps {
  task: IndustryTask
}

function TaskFlow({ task }: TaskFlowProps) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    setStep(0)
    const timers = Array.from({ length: 5 }, (_, i) =>
      setTimeout(() => setStep(i + 1), (i + 1) * STEP_DELAY_MS)
    )
    return () => timers.forEach(clearTimeout)
  }, [task])

  const vColor = verdictColor[task.verdict]

  return (
    <div className="w-full">
      {/* Task label */}
      <motion.div
        className="mb-8 text-center"
        animate={step >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <span
          className="text-xs uppercase tracking-widest mb-2 block"
          style={{ color: 'var(--text-muted)' }}
        >
          Task
        </span>
        <p
          className="text-base md:text-lg font-medium max-w-xl mx-auto leading-snug"
          style={{ color: 'var(--text-primary)' }}
        >
          &ldquo;{task.task}&rdquo;
        </p>
      </motion.div>

      {/* Filter cards + verdict — stack on mobile, row on md+ */}
      <div className="flex flex-col md:flex-row items-stretch gap-3">
        {task.filters.map((filter, i) => {
          const lit = step >= i + 2
          const fc = passColor[filter.pass]
          return (
            <motion.div
              key={filter.label}
              animate={lit ? { opacity: 1 } : { opacity: 0.25 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex-1 rounded-xl p-5"
              style={{
                background: 'var(--bg-elevated)',
                border: `1px solid ${lit ? fc : 'var(--divider)'}`,
                boxShadow: lit ? `0 0 18px ${fc}28` : 'none',
                transition: 'border 0.3s, box-shadow 0.3s',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-xs uppercase tracking-widest font-medium"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {filter.label}
                </span>
                {lit && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-sm font-bold"
                    style={{ color: fc }}
                  >
                    {passIcon[filter.pass]}
                  </motion.span>
                )}
              </div>
              {lit && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {filter.annotation}
                </motion.p>
              )}
            </motion.div>
          )
        })}

        {/* Verdict */}
        <motion.div
          animate={
            step >= 5
              ? { opacity: 1, scale: 1 }
              : { opacity: 0.15, scale: 0.97 }
          }
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex-1 rounded-xl p-5 flex flex-col justify-center"
          style={{
            background: step >= 5 ? `${vColor}18` : 'var(--bg-elevated)',
            border: `1px solid ${step >= 5 ? vColor : 'var(--divider)'}`,
            transition: 'background 0.4s, border 0.4s',
          }}
        >
          <span
            className="text-xs uppercase tracking-widest mb-2 block"
            style={{ color: 'var(--text-muted)' }}
          >
            Verdict
          </span>
          <p
            className="text-lg font-bold mb-2 leading-snug"
            style={{ color: step >= 5 ? vColor : 'var(--text-muted)' }}
          >
            {task.verdict}
          </p>
          {step >= 5 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xs leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {task.verdictNote}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default function IndustryFlow() {
  const [industryIdx, setIndustryIdx] = useState(0)
  const [taskIdx, setTaskIdx] = useState(0)

  const industry = industryData[industryIdx]
  const task = industry.tasks[taskIdx]

  const handleTabChange = (idx: number) => {
    if (idx === industryIdx) return
    setTaskIdx(0)
    setIndustryIdx(idx)
  }

  const handleNextTask = () => {
    setTaskIdx((prev) => (prev + 1) % 2)
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/*
        Tab bar: scrollable on mobile with a right-edge gradient fade.
        On md+, centered and no scroll needed.
      */}
      <div className="relative mb-12">
        <div
          className="flex gap-2 overflow-x-auto pb-2 md:justify-center scrollbar-hide"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {industryData.map((ind, i) => (
            <button
              key={ind.id}
              onClick={() => handleTabChange(i)}
              /* min-w keeps tabs from shrinking on mobile; py-3 = 44px+ tap target */
              className="min-w-max px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer flex-shrink-0"
              style={{
                background: i === industryIdx ? 'var(--bcg-green)' : 'var(--bg-elevated)',
                color: i === industryIdx ? '#fff' : 'var(--text-secondary)',
                border: `1px solid ${i === industryIdx ? 'var(--bcg-green)' : 'var(--divider)'}`,
              }}
            >
              {ind.label}
            </button>
          ))}
        </div>
        {/* Right-edge fade hint — only visible on mobile when tabs overflow */}
        <div
          className="absolute right-0 top-0 bottom-2 w-10 pointer-events-none md:hidden"
          style={{
            background: 'linear-gradient(to left, var(--bg-elevated) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Animated task flow — remount on task/industry change for clean re-entry */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${industryIdx}-${taskIdx}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <TaskFlow task={task} />
        </motion.div>
      </AnimatePresence>

      {/* Run another task — 44px tap target */}
      <div className="text-center mt-10">
        <button
          onClick={handleNextTask}
          className="text-sm uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-200 cursor-pointer"
          style={{
            border: '1px solid var(--bcg-green)',
            color: 'var(--bcg-green)',
            background: 'transparent',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.background = 'var(--bcg-green)'
            el.style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.background = 'transparent'
            el.style.color = 'var(--bcg-green)'
          }}
        >
          Run another task ↓
        </button>
      </div>
    </div>
  )
}
