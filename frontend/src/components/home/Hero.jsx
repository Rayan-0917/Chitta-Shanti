import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroBackground from "./HeroBackground";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <HeroBackground/>
    <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-12 flex-1 flex flex-col py-4 pt-6">
      <div className="w-full max-w-2xl flex flex-col items-start text-left select-none pt-8 sm:pt-14">
        <div className="transition-all mb-6">
          <span
            className="block text-rose-700 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-3 drop-shadow-sm"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
          >
            Welcome To
          </span>
          <h1
            className="font-black text-[4.25rem] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[7.5rem] leading-[0.9] tracking-tighter drop-shadow-md mb-6"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "-0.04em" }}
          >
            <span className="text-[#ce2d5d] drop-shadow-sm">Chitta </span>
            <span className="text-slate-900">Shanti</span>
          </h1>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="py-4 px-10 bg-[#ce2d5d] hover:bg-[#b82350] active:scale-[0.98] text-white font-bold text-lg rounded-2xl shadow-xl shadow-[#ce2d5d]/30 hover:shadow-2xl hover:shadow-[#ce2d5d]/40 transition-all flex items-center justify-center gap-3 cursor-pointer shrink-0"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}