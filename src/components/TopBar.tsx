export default function TopBar({ title = "Rocket Gifts", right }: { title?: string; right?: React.ReactNode }) {
  return (
    <div className="sticky top-0 z-20 bg-bg/80 blur-panel px-4 pt-3 pb-2 flex items-center justify-center border-b border-line">
      <div className="text-lg font-semibold tracking-wide">{title}</div>
      {right && <div className="absolute right-4">{right}</div>}
    </div>
  )
}
