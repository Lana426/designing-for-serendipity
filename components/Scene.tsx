'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, type Transition } from 'framer-motion'
import type { SceneData } from '@/lib/content'
import Card from './Card'
import StaticCard from './StaticCard'
import PullQuote from './PullQuote'
import ScrollIndicator from './ScrollIndicator'
import IndustryFlow from './IndustryFlow'

interface SceneProps {
  scene: SceneData
}

const fadeUpTransition: Transition = { duration: 0.75, ease: 'easeOut' }
const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const, margin: '-80px' },
  transition: fadeUpTransition,
}

// ─── Footnote ─────────────────────────────────────────────────────────────────

function Footnote({ prefix, linkText, url }: { prefix: string; linkText: string; url: string }) {
  return (
    <motion.p
      className="text-sm italic mt-6"
      style={{ color: 'var(--text-muted)' }}
      {...fadeUp}
    >
      {prefix}{' '}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="not-italic transition-colors duration-150"
        style={{ color: 'var(--bcg-green)', textDecoration: 'none' }}
        onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
        onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
      >
        {linkText}
      </a>
    </motion.p>
  )
}

// ─── Image with placeholder fallback ─────────────────────────────────────────

function SceneImage({
  src,
  alt,
  placeholderText,
}: {
  src: string
  alt: string
  placeholderText: string
}) {
  const [errored, setErrored] = useState(false)

  const glowShadow =
    '0 0 80px 10px rgba(0,168,98,0.15), 0 0 160px 40px rgba(0,168,98,0.08), 0 20px 60px rgba(0,0,0,0.6)'

  return (
    <div
      className="relative mx-auto max-w-[1100px] rounded-xl overflow-hidden"
      style={{ boxShadow: glowShadow }}
    >
      {errored ? (
        <div
          className="w-full flex items-center justify-center px-6 py-16 md:py-32 rounded-xl"
          style={{
            aspectRatio: '16/9',
            background: 'var(--bg-elevated)',
            border: '1px solid rgba(0,168,98,0.2)',
          }}
        >
          <p className="text-sm italic text-center" style={{ color: 'var(--text-muted)' }}>
            {placeholderText}
          </p>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={1100}
          height={619}
          className="w-full h-auto rounded-xl"
          loading="lazy"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  )
}

// ─── Scene renderer ───────────────────────────────────────────────────────────

export default function Scene({ scene }: SceneProps) {

  // ── Hero ──────────────────────────────────────────────────────────────────
  if (scene.type === 'hero') {
    return (
      <section
        id={scene.id}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 py-24"
      >
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden
        >
          <div
            className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-[120px] opacity-20"
            style={{ background: 'radial-gradient(circle, var(--bcg-green) 0%, transparent 70%)' }}
          />
        </div>

        <motion.div
          className="relative z-10 flex flex-col items-center gap-5 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.p
            className="text-xs uppercase tracking-[0.35em] font-medium"
            style={{ color: 'var(--bcg-green)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {scene.eyebrow}
          </motion.p>

          <motion.h1
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-tight"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {scene.heading}
          </motion.h1>

          <motion.p
            className="text-base md:text-xl font-light max-w-2xl leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
          >
            {scene.subheading}
          </motion.p>
        </motion.div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <ScrollIndicator />
        </div>
      </section>
    )
  }

  // ── Thesis ────────────────────────────────────────────────────────────────
  if (scene.type === 'thesis') {
    const lines = scene.heading?.split('\n') ?? []
    return (
      <section
        id={scene.id}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 py-24"
      >
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden
        >
          <div
            className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full blur-[100px] opacity-15"
            style={{ background: 'radial-gradient(circle, var(--bcg-green) 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto w-full">
          <motion.p
            className="text-xs uppercase tracking-[0.35em] font-medium mb-10"
            style={{ color: 'var(--bcg-green)' }}
            {...fadeUp}
          >
            {scene.eyebrow}
          </motion.p>

          <div className="flex flex-col gap-3 mb-12">
            {lines.map((line, i) => (
              <motion.h2
                key={i}
                className="font-serif text-xl md:text-3xl lg:text-4xl font-light leading-snug"
                style={{ color: 'var(--text-primary)' }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: 'easeOut' }}
              >
                {line}
              </motion.h2>
            ))}
          </div>

          {scene.body?.map((p, i) => (
            <motion.p
              key={i}
              className="text-base md:text-lg leading-loose mb-6"
              style={{ color: 'var(--text-secondary)' }}
              {...fadeUp}
            >
              {p}
            </motion.p>
          ))}

          {scene.finalLine && (
            <motion.p
              className="font-serif text-xl md:text-3xl italic mt-16"
              style={{ color: 'var(--bcg-green)' }}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {scene.finalLine}
            </motion.p>
          )}
        </div>
      </section>
    )
  }

  // ── Framework hero ────────────────────────────────────────────────────────
  if (scene.type === 'framework-hero') {
    const cols = scene.frameworkColumns ?? []
    const closingParts = scene.closingLine?.split(': ') ?? []

    return (
      <section
        id={scene.id}
        className="py-24 md:py-32 px-5 md:px-6"
        style={{ background: 'var(--bg)' }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.p
            className="text-xs uppercase tracking-[0.35em] font-medium mb-6 text-center"
            style={{ color: 'var(--bcg-green)' }}
            {...fadeUp}
          >
            {scene.eyebrow}
          </motion.p>

          <motion.h2
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold mb-4 text-center leading-tight"
            style={{ color: 'var(--text-primary)' }}
            {...fadeUp}
          >
            {scene.heading}
          </motion.h2>

          {scene.subheading && (
            <motion.p
              className="text-base md:text-lg text-center mb-12 md:mb-16 font-light italic"
              style={{ color: 'var(--text-secondary)' }}
              {...fadeUp}
            >
              {scene.subheading}
            </motion.p>
          )}

          {/* Framework image */}
          <motion.div className="mb-12 md:mb-16" {...fadeUp}>
            <SceneImage
              src="/3t-framework.png"
              alt="The 3T Framework: Trust, Truth, Ties — a diagnostic lens for deciding what to automate"
              placeholderText="3T Framework diagram — drop file at /public/3t-framework.png"
            />
          </motion.div>

          {/* Three columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {cols.map((col, i) => (
              <motion.div
                key={col.letter}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
                className="pt-5"
                style={{ borderTop: '2px solid var(--bcg-green)' }}
              >
                <p
                  className="text-xs uppercase tracking-widest font-semibold mb-1"
                  style={{ color: 'var(--bcg-green)' }}
                >
                  {col.letter} — {col.title}
                </p>
                <p className="text-sm italic mb-3" style={{ color: 'var(--bcg-green-soft)' }}>
                  {col.question}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {col.body}
                </p>
              </motion.div>
            ))}
          </div>

          {scene.closingLine && (
            <motion.p
              className="text-sm md:text-base text-center leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
              {...fadeUp}
            >
              {closingParts[0]}:{' '}
              <strong style={{ color: 'var(--text-primary)' }}>{closingParts[1]}</strong>
            </motion.p>
          )}
        </div>
      </section>
    )
  }

  // ── Industry flow ─────────────────────────────────────────────────────────
  if (scene.type === 'industry-flow') {
    return (
      <section
        id={scene.id}
        className="py-24 md:py-32 px-5 md:px-6"
        style={{ background: 'var(--bg-elevated)' }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="font-serif text-2xl md:text-4xl lg:text-5xl font-semibold mb-4 text-center"
            style={{ color: 'var(--text-primary)' }}
            {...fadeUp}
          >
            {scene.heading}
          </motion.h2>

          {scene.subheading && (
            <motion.p
              className="text-center mb-12 md:mb-16 text-sm"
              style={{ color: 'var(--text-muted)' }}
              {...fadeUp}
            >
              {scene.subheading}
            </motion.p>
          )}

          <IndustryFlow />
        </div>
      </section>
    )
  }

  // ── Cards (static or expandable) ─────────────────────────────────────────
  if (scene.type === 'cards') {
    return (
      <section
        id={scene.id}
        className="py-24 md:py-32 px-5 md:px-6"
        style={{ background: 'var(--bg-elevated)' }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="font-serif text-2xl md:text-4xl lg:text-5xl font-semibold mb-4 text-center"
            style={{ color: 'var(--text-primary)' }}
            {...fadeUp}
          >
            {scene.heading}
          </motion.h2>

          {scene.subheading && (
            <motion.p
              className="text-center mb-12 md:mb-16 text-sm uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}
              {...fadeUp}
            >
              {scene.subheading}
            </motion.p>
          )}

          {scene.staticCards ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {scene.staticCards.map((card, i) => (
                <StaticCard key={card.number} card={card} index={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {scene.cards?.map((card) => (
                <Card key={card.number} card={card} />
              ))}
            </div>
          )}

          {scene.closingLine && (
            <motion.p
              className="text-base md:text-lg text-center mt-10 md:mt-12 leading-relaxed italic max-w-prose mx-auto"
              style={{ color: 'var(--text-secondary)' }}
              {...fadeUp}
            >
              {scene.closingLine}
            </motion.p>
          )}

          {scene.footnote && (
            <div className="text-center mt-6">
              <Footnote {...scene.footnote} />
            </div>
          )}
        </div>
      </section>
    )
  }

  // ── Pixar hero ────────────────────────────────────────────────────────────
  if (scene.type === 'pixar-hero') {
    const [bodyBefore, bodyAfter] = scene.body ?? []
    return (
      <section
        id={scene.id}
        className="py-24 md:py-32 px-5 md:px-6"
        style={{ background: 'var(--bg)' }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Image */}
          {scene.imageSrc && scene.imageAlt && (
            <motion.div className="mb-14 md:mb-20" {...fadeUp}>
              <SceneImage
                src={scene.imageSrc}
                alt={scene.imageAlt}
                placeholderText="Pixar atrium image — drop file at /public/pixar-atrium.png"
              />
            </motion.div>
          )}

          {/* Heading */}
          <div className="max-w-prose mx-auto">
            <motion.h2
              className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold mb-8 leading-tight"
              style={{ color: 'var(--text-primary)' }}
              {...fadeUp}
            >
              {scene.heading}
            </motion.h2>

            {bodyBefore && (
              <motion.p
                className="text-base md:text-lg leading-loose mb-6"
                style={{ color: 'var(--text-secondary)' }}
                {...fadeUp}
              >
                {bodyBefore}
              </motion.p>
            )}

            {scene.pullquote && (
              <PullQuote text={scene.pullquote} large italic />
            )}

            {bodyAfter && (
              <motion.p
                className="text-base md:text-lg leading-loose"
                style={{ color: 'var(--text-secondary)' }}
                {...fadeUp}
              >
                {bodyAfter}
              </motion.p>
            )}
          </div>
        </div>
      </section>
    )
  }

  // ── Practice cards (2×2 grid) ─────────────────────────────────────────────
  if (scene.type === 'practice-cards') {
    return (
      <section
        id={scene.id}
        className="py-24 md:py-32 px-5 md:px-6"
        style={{ background: 'var(--bg-elevated)' }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="font-serif text-2xl md:text-4xl lg:text-5xl font-semibold mb-4 text-center"
            style={{ color: 'var(--text-primary)' }}
            {...fadeUp}
          >
            {scene.heading}
          </motion.h2>

          {scene.subheading && (
            <motion.p
              className="text-sm md:text-base text-center mb-12 md:mb-16 max-w-prose mx-auto"
              style={{ color: 'var(--text-muted)' }}
              {...fadeUp}
            >
              {scene.subheading}
            </motion.p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scene.practiceCards?.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                className="pt-5"
                style={{ borderTop: '2px solid var(--bcg-green)' }}
              >
                <p
                  className="text-xs uppercase tracking-widest font-semibold mb-3"
                  style={{ color: 'var(--bcg-green)' }}
                >
                  {card.title}
                </p>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ── List ──────────────────────────────────────────────────────────────────
  if (scene.type === 'list') {
    return (
      <section id={scene.id} className="py-24 md:py-32 px-5 md:px-6">
        <div className="max-w-prose mx-auto">
          <motion.h2
            className="font-serif text-2xl md:text-4xl lg:text-5xl font-semibold mb-10"
            style={{ color: 'var(--text-primary)' }}
            {...fadeUp}
          >
            {scene.heading}
          </motion.h2>

          {scene.body?.map((p, i) => (
            <motion.p
              key={i}
              className="text-base md:text-lg leading-loose mb-8"
              style={{ color: 'var(--text-secondary)' }}
              {...fadeUp}
            >
              {p}
            </motion.p>
          ))}

          <div className="my-12 space-y-4">
            {scene.listItems?.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
              >
                <span
                  className="mt-1 text-lg font-bold flex-shrink-0"
                  style={{ color: 'var(--bcg-green)' }}
                >
                  —
                </span>
                <span
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          {scene.closingLine && (
            <motion.p
              className="text-base md:text-lg leading-loose italic"
              style={{ color: 'var(--text-secondary)' }}
              {...fadeUp}
            >
              {scene.closingLine}
            </motion.p>
          )}
        </div>
      </section>
    )
  }

  // ── Minimal ───────────────────────────────────────────────────────────────
  if (scene.type === 'minimal') {
    return (
      <section id={scene.id} className="py-24 md:py-32 px-5 md:px-6">
        <div className="max-w-prose mx-auto">
          <motion.h2
            className="font-serif text-2xl md:text-4xl lg:text-5xl font-semibold mb-10"
            style={{ color: 'var(--text-primary)' }}
            {...fadeUp}
          >
            {scene.heading}
          </motion.h2>

          {scene.body?.map((p, i) => (
            <motion.p
              key={i}
              className="text-base md:text-lg leading-loose mb-6"
              style={{ color: 'var(--text-secondary)' }}
              {...fadeUp}
            >
              {p}
            </motion.p>
          ))}

          {scene.pullquote && (
            <motion.p
              className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold text-center my-14 md:my-16 leading-tight"
              style={{ color: 'var(--bcg-green)' }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {scene.pullquote}
            </motion.p>
          )}

          {scene.finalLine && (
            <>
              {scene.finalLine.split('\n\n').map((para, i) => (
                <motion.p
                  key={i}
                  className="text-base md:text-lg leading-loose mb-6"
                  style={{ color: 'var(--text-secondary)' }}
                  {...fadeUp}
                >
                  {para}
                </motion.p>
              ))}
            </>
          )}

          {scene.closingLine && (
            <motion.p
              className="text-sm italic mt-12"
              style={{ color: 'var(--text-muted)' }}
              {...fadeUp}
            >
              {scene.closingLine}
            </motion.p>
          )}
        </div>
      </section>
    )
  }

  // ── Default: body ─────────────────────────────────────────────────────────
  return (
    <section id={scene.id} className="py-24 md:py-32 px-5 md:px-6">
      <div className="max-w-prose mx-auto">
        <motion.h2
          className="font-serif text-2xl md:text-4xl lg:text-5xl font-semibold mb-10 leading-snug"
          style={{ color: 'var(--text-primary)' }}
          {...fadeUp}
        >
          {scene.heading}
        </motion.h2>

        {scene.body?.map((p, i) => (
          <motion.p
            key={i}
            className="text-base md:text-lg leading-loose mb-6"
            style={{ color: 'var(--text-secondary)' }}
            {...fadeUp}
          >
            {p}
          </motion.p>
        ))}

        {scene.pullquote && (
          <PullQuote text={scene.pullquote} large italic />
        )}
      </div>
    </section>
  )
}
