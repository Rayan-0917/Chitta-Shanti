import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div
      className="
        relative
        flex
        min-h-screen
        flex-col
        justify-between
        overflow-hidden
        bg-[linear-gradient(180deg,#fdf4f6_0%,#fae8ed_50%,#fdf9f5_100%)]
        text-slate-800
        antialiased
      "
    >
      {/* Decorative background */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-80
          w-80
          rounded-full
          border
          border-[#ce2d5d]/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-40
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#ce2d5d]/[0.025]
        "
      />

      {/* Top header */}
      <header
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-5xl
          items-center
          justify-between
          px-6
          py-5
        "
      >
        <button
          type="button"
          onClick={() => navigate("/")}
          className="
            group
            flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-slate-600
            transition
            hover:text-[#b8204c]
          "
        >
          <ArrowLeft
            size={18}
            className="
              transition-transform
              group-hover:-translate-x-1
            "
          />

          <span>Back to Home</span>
        </button>


      </header>

      {/* Login */}
      <main
        className="
          relative
          z-10
          flex
          flex-1
          items-center
          justify-center
          px-4
          py-8
        "
      >
        <LoginForm />
      </main>

      {/* Footer */}
      <footer
        className="
          relative
          z-10
          w-full
          px-6
          py-4
          text-center
          text-xs
          text-slate-400
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-md
            flex-wrap
            items-center
            justify-center
            gap-x-4
            gap-y-2
          "
        >
          <button
            type="button"
            className="transition hover:text-slate-600"
          >
            Confidentiality Policy
          </button>

          <span>•</span>

          <button
            type="button"
            className="transition hover:text-slate-600"
          >
            Support Helpdesk
          </button>

          <span>•</span>

          <span>
            © {new Date().getFullYear()} Chitta Shanti
          </span>
        </div>

        <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-slate-400">
          <ShieldCheck size={12} />
          <span>Privacy-conscious personnel welfare</span>
        </div>
      </footer>
    </div>
  );
}