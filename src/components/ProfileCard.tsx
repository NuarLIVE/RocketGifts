export default function ProfileCard(){
  return (
    <div className="card p-5 flex flex-col items-center text-center gap-4">
      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-lg font-semibold">CN</div>
      <div>
        <div className="h1">Aleksey</div>
        <div className="sub mt-1">Играй, улучшай и забирай подарки</div>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full">
        <div className="card p-3 text-center">
          <div className="sub">Баланс</div>
          <div className="font-semibold mt-1">0.00 💎</div>
        </div>
        <div className="card p-3 text-center">
          <div className="sub">Обмен</div>
          <div className="font-semibold mt-1">↔</div>
        </div>
        <div className="card p-3 text-center">
          <div className="sub">Очки</div>
          <div className="font-semibold mt-1">0 ⭐</div>
        </div>
      </div>

      <div className="flex gap-2 w-full">
        <button className="btn-primary flex-1">Пополнить</button>
        <button className="btn-purple flex-1">Connect Wallet</button>
      </div>
    </div>
  )
}
