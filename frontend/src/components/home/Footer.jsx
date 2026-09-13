import {
  ArrowUp,
  Heart,
  Mail,
  ShieldCheck,
} from "lucide-react";
import logo from "./../../assets/images/logo.png"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#fdf0f4] text-[#111b35]">
      {/* Subtle top border */}
      <div className="h-px w-full bg-[#c82858]/15" />

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
          border-[#c82858]/10
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
          bg-[#c82858]/[0.025]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Main footer */}
        <div
          className="
            grid
            gap-12
            py-14
            sm:py-16
            lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]
            lg:gap-10
            lg:py-20
          "
        >
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div
                className="
                  h-12
                  w-12
                  overflow-hidden
                  rounded-full
                  border-2
                  border-[#c82858]/25
                  bg-white
                  shadow-sm
                "
              >
                <img
                  src={logo}
                  alt="Chitta Shanti Emblem"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h2
                  className="
                    text-xl
                    font-bold
                    tracking-tight
                    text-[#ce2d5d]
                  "
                  style={{
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Chitta Shanti
                </h2>

                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#526078]">
                  Mind • Resilience • Well-being
                </p>
              </div>
            </div>

            <p
              className="
                mt-6
                text-sm
                leading-7
                text-[#526078]
              "
            >
              An AI-powered personnel stress and welfare monitoring
              system designed to help identify early indicators of
              stress and support the well-being of those who serve.
            </p>

            {/* Privacy note */}
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="
                mb-5
                text-sm
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#111b35]
              "
            >
              Quick Links
            </h3>

            <ul className="space-y-3.5">
              <li>
                <a
                  href="/"
                  className="text-sm text-[#526078] transition-colors hover:text-[#c82858]"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#features"
                  className="text-sm text-[#526078] transition-colors hover:text-[#c82858]"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="text-sm text-[#526078] transition-colors hover:text-[#c82858]"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="/login"
                  className="text-sm text-[#526078] transition-colors hover:text-[#c82858]"
                >
                  Log In
                </a>
              </li>

              <li>
                <a
                  href="/register"
                  className="text-sm font-semibold text-[#c82858] transition-colors hover:text-[#a72c52]"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3
              className="
                mb-5
                text-sm
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#111b35]
              "
            >
              Platform
            </h3>

            <ul className="space-y-3.5">
              <li>
                <a
                  href="#features"
                  className="text-sm text-[#526078] transition-colors hover:text-[#c82858]"
                >
                  Stress Assessment
                </a>
              </li>

              <li>
                <a
                  href="#features"
                  className="text-sm text-[#526078] transition-colors hover:text-[#c82858]"
                >
                  AI Monitoring
                </a>
              </li>

              <li>
                <a
                  href="#features"
                  className="text-sm text-[#526078] transition-colors hover:text-[#c82858]"
                >
                  Wellness Tracking
                </a>
              </li>

              <li>
                <a
                  href="#features"
                  className="text-sm text-[#526078] transition-colors hover:text-[#c82858]"
                >
                  Privacy & Security
                </a>
              </li>

              <li>
                <a
                  href="#features"
                  className="text-sm text-[#526078] transition-colors hover:text-[#c82858]"
                >
                  Welfare Support
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3
              className="
                mb-5
                text-sm
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#111b35]
              "
            >
              Support
            </h3>

            <p className="text-sm leading-6 text-[#526078]">
              Need assistance or have questions about your
              assessment?
            </p>

            <div
              className="
                mt-5
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-[#c82858]/10
                bg-white/50
                px-4
                py-3
              "
            >
              <Mail
                size={18}
                strokeWidth={1.8}
                className="text-[#c82858]"
              />

              <span className="text-sm text-[#526078]">
                Support contact
              </span>
            </div>



            {/* Social icons */}

          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#c82858]/12" />

        {/* Bottom footer */}
        <div
          className="
            flex
            flex-col
            gap-5
            py-7
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* Copyright */}
          <p className="text-xs text-[#7a8497]">
            © {new Date().getFullYear()} Chitta Shanti. All rights
            reserved.
          </p>

          {/* Bottom links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="#"
              className="text-xs text-[#7a8497] transition-colors hover:text-[#c82858]"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-xs text-[#7a8497] transition-colors hover:text-[#c82858]"
            >
              Terms of Use
            </a>

            <a
              href="#"
              className="text-xs text-[#7a8497] transition-colors hover:text-[#c82858]"
            >
              Accessibility
            </a>
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="
              group
              flex
              items-center
              gap-2
              text-xs
              font-semibold
              text-[#c82858]
              transition-colors
              hover:text-[#a72c52]
            "
          >
            Back to top

            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-[#c82858]/20
                bg-white/50
                transition-all
                group-hover:-translate-y-1
                group-hover:bg-white
              "
            >
              <ArrowUp size={15} />
            </span>
          </button>
        </div>

        {/* Closing statement */}
        <div
          className="
            flex
            items-center
            justify-center
            gap-2
            border-t
            border-[#c82858]/10
            py-5
            text-center
          "
        >
          <span className="text-xs text-[#7a8497]">
            Built with care for those who serve
          </span>

          <Heart
            size={13}
            fill="currentColor"
            className="text-[#c82858]"
          />
        </div>
      </div>
    </footer>
  );
}