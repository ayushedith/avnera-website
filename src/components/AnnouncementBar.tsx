export default function AnnouncementBar() {
  return (
  <div className="w-full bg-[rgba(198,169,105,0.08)] text-ink/80 border-b border-[rgba(198,169,105,0.25)] text-xs md:text-sm">
      <div className="container h-9 md:h-10 flex items-center justify-center gap-4">
        <span>Worldwide Shipping</span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:inline">India Crafted</span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:inline">Secure Payments</span>
      </div>
    </div>
  )
}
