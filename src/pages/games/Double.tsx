import TopBar from "../../components/TopBar";

export default function Double(){
  return (
    <div className="pb-24">
      <TopBar title="Double" />
      <div className="p-4 space-y-4">
        <div className="card p-4">
          <div className="rounded-xl h-32 bg-gradient-to-r from-indigo/25 to-emerald/25 border border-indigo/40 flex items-center justify-center">
            <div className="text-white/90 text-sm">0.0s • До старта раунда</div>
          </div>

          <div className="mt-3 flex gap-3">
            <div className="flex-1 card p-3">
              <div className="h2 mb-2">Баланс</div>
              <input className="w-full bg-white/5 border border-line rounded-lg px-3 py-2" placeholder="Введите ставку"/>
              <div className="grid grid-cols-4 gap-2 mt-2">
                <button className="btn">x2</button>
                <button className="btn">x14</button>
                <button className="btn">x3</button>
                <button className="btn">🍏</button>
              </div>
              <button className="btn-purple w-full mt-3">Сделать ставку</button>
            </div>
            <div className="flex-1 card p-3 opacity-80">
              <div className="h2 mb-2">Инвентарь</div>
              <div className="h-24 rounded-lg bg-white/5 border border-line"></div>
            </div>
          </div>

          <div className="mt-3">
            <div className="sub mb-2">Последние дропы</div>
            <div className="flex gap-2">
              {Array.from({length:6}).map((_,i)=>(<div key={i} className="badge-gold">x2</div>))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="card p-4 text-center">
            <div className="text-lg font-semibold">X2</div>
            <div className="sub">Ставок пока нет</div>
          </div>
          <div className="card p-4 text-center border-orange/40 bg-gradient-to-br from-orange/20 to-gold/20">
            <div className="text-lg font-semibold">X14</div>
            <div className="sub">Ставок пока нет</div>
          </div>
          <div className="card p-4 text-center border-emerald/40 bg-gradient-to-br from-emerald/20 to-indigo/20">
            <div className="text-lg font-semibold">X2</div>
            <div className="sub">Ставок пока нет</div>
          </div>
        </div>
      </div>
    </div>
  )
}
