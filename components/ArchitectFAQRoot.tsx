'use client'

import { useState, useRef } from 'react'
import ArchitectFAQButton from './ArchitectFAQButton'
import ArchitectFAQPopup from './ArchitectFAQPopup'

export default function ArchitectFAQRoot() {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleOpen = () => setIsOpen(true)

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => buttonRef.current?.focus(), 50)
  }

  return (
    <>
      <ArchitectFAQButton isOpen={isOpen} onOpen={handleOpen} buttonRef={buttonRef} />
      <ArchitectFAQPopup isOpen={isOpen} onClose={handleClose} />
    </>
  )
}
