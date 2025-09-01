import React from 'react'

type Props = {
  title: string
  subtitle?: string
  className?: string
  colors?: { from: string; to: string }
}

export default function SectionBanner({
  title,
  subtitle,
  className = '',
  colors = { from: '#f52f83', to: '#f6267c' },
}: Props) {
  return (
    <div className={`container ${className}`}>
      <div
        className="relative overflow-hidden rounded-[12px] py-6 md:py-8 text-center"
        style={{
          background: `linear-gradient(90deg, ${colors.from}, ${colors.to})`,
        }}
      >
        {/* subtle wavy stripes */}
        <div className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            background:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.3) 0 2px, rgba(255,255,255,0) 2px 8px)',
          }}
        />

        {/* scalloped sides */}
        <div
          aria-hidden
          className="absolute left-0 top-0 h-full w-[12px]"
          style={{
            background:
              'radial-gradient(circle at right 10px top 10px, #fff 8px, transparent 8px) left/12px 24px repeat-y',
          }}
        />
        <div
          aria-hidden
          className="absolute right-0 top-0 h-full w-[12px]"
          style={{
            background:
              'radial-gradient(circle at left 2px top 10px, #fff 8px, transparent 8px) right/12px 24px repeat-y',
          }}
        />

        {/* sparkles */}
        <Sparkle className="absolute left-6 top-1/2 -translate-y-1/2 scale-125 text-white opacity-80" />
        <Sparkle className="absolute right-6 top-1/2 -translate-y-1/2 scale-125 text-white opacity-80 rotate-180" />

        <div className="relative px-4">
          <h2 className="font-serif text-white text-2xl md:text-4xl font-extrabold tracking-wide">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-white/95 text-sm md:text-lg">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" fill="currentColor" />
      <circle cx="4" cy="6" r="1" fill="currentColor" />
      <circle cx="20" cy="18" r="1.2" fill="currentColor" />
    </svg>
  )
}
