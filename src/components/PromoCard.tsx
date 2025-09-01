import Image from 'next/image'
import Link from 'next/link'

type PromoCardProps = {
  title: string
  subtitle?: string
  href?: string
  image: { url: string; alt?: string }
  className?: string
}

export default function PromoCard({ title, subtitle, href, image, className = '' }: PromoCardProps) {
  return (
    <div
      className={
        'relative overflow-hidden rounded-[22px] border border-[#f3cbd6] bg-white ' +
        'shadow-[0_10px_30px_rgba(0,0,0,0.06)] ' +
        className
      }
    >
      {/* subtle decorative pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_20%_10%,rgba(198,169,105,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_90%_50%,rgba(250,194,210,0.15),transparent_60%)]" />
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Image area */}
        <div className="relative">
          <div className="relative h-[320px] md:h-[380px]">
            <Image
              src={image.url}
              alt={image.alt || 'Promo'}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              unoptimized
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Copy area */}
        <div className="relative p-6 md:p-8 flex items-center justify-center">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-3xl md:text-4xl text-ink leading-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-2 text-ink/70 text-base md:text-lg">{subtitle}</p>
            )}
            {href && (
              <div className="mt-5">
                <Link
                  href={href}
                  className="inline-flex items-center rounded-full bg-[#C62828] px-5 py-2.5 text-white text-sm font-medium shadow-[0_5px_0_#8E1C1C] hover:translate-y-[1px] hover:shadow-[0_4px_0_#8E1C1C] transition"
                >
                  Shop Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
