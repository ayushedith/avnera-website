'use client'

import { useEffect, useRef, useState } from 'react'

type RevealProps = {
  children: React.ReactNode
  as?: React.ElementType
  className?: string
  variant?: 'up' | 'down' | 'left' | 'right' | 'zoom'
  delay?: number
  durationMs?: number
  once?: boolean
  threshold?: number
  margin?: string
}

export default function Reveal({
  children,
  as = 'div',
  className = '',
  variant = 'up',
  delay = 0,
  durationMs = 700,
  once = true,
  threshold = 0.2,
  margin = '0px 0px -10% 0px',
}: RevealProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<Element | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { root: null, threshold, rootMargin: margin }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [once, threshold, margin])

  const hiddenTransform =
    variant === 'up'
      ? 'translateY(16px)'
      : variant === 'down'
      ? 'translateY(-16px)'
      : variant === 'left'
      ? 'translateX(16px)'
      : variant === 'right'
      ? 'translateX(-16px)'
      : 'scale(0.97)'

  const visibleTransform = 'none'

  const Tag = as as React.ElementType

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      style={{
        transition: `opacity ${durationMs}ms cubic-bezier(0.22,1,0.36,1), transform ${durationMs}ms cubic-bezier(0.22,1,0.36,1)`,
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? visibleTransform : hiddenTransform,
      }}
      className={className}
    >
      {children}
    </Tag>
  )
}
