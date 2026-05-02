import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl = 'https://designing-for-serendipity.vercel.app'
const ogImage = '/3t-framework.png'

export const viewport: Viewport = {
  themeColor: '#0A0E1A',
}

export const metadata: Metadata = {
  title: 'Designing Agents for Serendipity — A Framework for Agentic Design',
  description:
    'How to decide what to automate — and what to leave alone — so humans can do the work only humans can do.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Designing Agents for Serendipity — A Framework for Agentic Design',
    description:
      'How to decide what to automate — and what to leave alone — so humans can do the work only humans can do.',
    url: siteUrl,
    siteName: 'Designing Agents for Serendipity',
    images: [{ url: ogImage, width: 1100, height: 619, alt: 'The 3T Framework' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Designing Agents for Serendipity — A Framework for Agentic Design',
    description:
      'How to decide what to automate — and what to leave alone — so humans can do the work only humans can do.',
    images: [ogImage],
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
