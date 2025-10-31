export default function Section({title, children, to}:{title:string, children?:React.ReactNode, to?:string}){
  return (
    <section className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">{title}</h3>
        {to && <a href={to} className="text-sm text-accent hover:underline">›</a>}
      </div>
      {children}
    </section>
  )
}