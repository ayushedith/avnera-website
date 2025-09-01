'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

type Slide = {
  title: string
  subtitle?: string
  badge?: string
  cta?: { label: string; href: string }
  leftImage: { url: string; alt?: string }
  rightImage: { url: string; alt?: string }
}

export default function HeroCarousel({
  slides,
  intervalMs = 5000,
}: {
  slides: Slide[]
  intervalMs?: number
}) {
  const [index, setIndex] = useState(0)
  const timer = useRef<number | null>(null)

  const safeSlides = useMemo(() => slides.filter(Boolean), [slides])
  const active = safeSlides[index % safeSlides.length]

  useEffect(() => {
    if (safeSlides.length <= 1) return
    timer.current && window.clearInterval(timer.current)
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeSlides.length)
    }, intervalMs)
    return () => {
      if (timer.current) window.clearInterval(timer.current)
    }
  }, [safeSlides.length, intervalMs])

  if (!active) return null

  return (
    <section className="relative overflow-hidden">
      {/* subtle patterned background */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_10%,rgba(198,169,105,0.18),transparent_60%)]" />
      <div className="relative container py-14 md:py-20">
        {/* Badge */}
        {active.badge && (
          <div className="mx-auto mb-6 w-fit rounded-full bg-[#9B7ACB]/15 border border-[#9B7ACB]/30 px-4 py-1 text-xs font-medium text-[#6A4FB0]">
            {active.badge}
          </div>
        )}

        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-8">
          {/* Left polaroid */}
          <Polaroid image={active.leftImage} tilt="left" />

          {/* Center copy */}
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-7xl font-serif tracking-wide text-ink mb-2">
              {active.title}
            </h1>
            {active.subtitle && (
              <p className="text-lg md:text-xl text-ink/70 mb-5">{active.subtitle}</p>
            )}
            {active.cta && (
              <Link
                href={active.cta.href}
                className="inline-flex items-center justify-center rounded-full bg-[#C62828] px-6 py-3 text-white shadow-[0_6px_0_#8E1C1C] hover:translate-y-[1px] hover:shadow-[0_5px_0_#8E1C1C] active:translate-y-[2px] active:shadow-[0_4px_0_#8E1C1C] transition"
              >
                {active.cta.label}
              </Link>
            )}
          </div>

          {/* Right polaroid */}
          <Polaroid image={active.rightImage} tilt="right" />
        </div>

        {/* Dots */}
        {safeSlides.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {safeSlides.map((_, i) => {
              const activeDot = i === index
              return (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={
                    'h-2 w-2 rounded-full transition ' +
                    (activeDot ? 'bg-[#E91E63]' : 'bg-ink/25 hover:bg-ink/50')
                  }
                />
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

function Polaroid({
  image,
  tilt,
}: {
  image: { url: string; alt?: string }
  tilt: 'left' | 'right'
}) {
  const rotate = tilt === 'left' ? '-rotate-6' : 'rotate-6'
  return (
    <div className={`relative mx-auto w-[78%] md:w-[360px] ${rotate}`}>
      <div className="relative bg-white rounded-[14px] shadow-[0_12px_40px_rgba(0,0,0,0.2)] p-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[10px]">
          <Image
            src={image.url}
            alt={image.alt || 'Hero image'}
            fill
            priority
            sizes="(max-width: 768px) 80vw, 360px"
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="h-4" />
      </div>
    </div>
  )
}
