import { ArrowLeft, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopBar({
  title = "Rocket Gifts",
  showBack = false,
  showMenu = false
}: {
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-20 blur-panel px-4 py-3 flex items-center justify-between border-b border-line">
      {showBack ? (
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-white/5 rounded-lg transition">
          <ArrowLeft size={20} />
        </button>
      ) : (
        <div className="w-8"></div>
      )}

      <div className="text-base font-semibold">{title}</div>

      {showMenu ? (
        <button className="p-2 -mr-2 hover:bg-white/5 rounded-lg transition">
          <MoreVertical size={20} />
        </button>
      ) : (
        <div className="w-8"></div>
      )}
    </div>
  );
}
