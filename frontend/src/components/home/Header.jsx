import { useNavigate } from "react-router-dom";
import logo from "./../../assets/images/logo.png"
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "About Us", href: "#about" },
];

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 w-full bg-[#fdf0f4]/90 backdrop-blur-md border-b border-[#ce4a6e]/15 shadow-sm px-6 sm:px-12 py-3.5 shrink-0 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3.5 group cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#ce4a6e]/30 shadow bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
            <img
              src={logo}
              alt="Chitta Shanti Emblem"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col">
            <span
              className="text-[#ce2d5d] font-black text-xl tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Chitta Shanti
            </span>
          </div>
        </div>

        {/* Nav + Auth actions */}
        <div className="flex items-center gap-6 sm:gap-8">
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={
                  i === 0
                    ? "text-[#ce2d5d] font-bold hover:text-[#b82350] transition-colors"
                    : "hover:text-[#ce2d5d] transition-colors"
                }
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="py-2 px-4 sm:px-5 rounded-xl font-bold text-sm text-[#ce2d5d] hover:bg-rose-100/70 active:scale-[0.98] transition-all cursor-pointer"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="py-2 px-4 sm:px-5 rounded-xl font-bold text-sm bg-[#ce2d5d] hover:bg-[#b82350] text-white shadow-md shadow-[#ce2d5d]/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}