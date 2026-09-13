import FeatureCarousel from "./FeatureCarousel";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="
        relative
        overflow-hidden
        bg-[#fdf9f3]
        px-5
        py-20
        sm:px-8
        sm:py-24
        lg:px-12
        lg:py-28
      "
    >
      {/* Decorative background circles */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          -top-40
          h-[420px]
          w-[420px]
          rounded-full
          border
          border-[#c82858]/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-[-180px]
          h-[500px]
          w-[500px]
          rounded-full
          border
          border-[#c82858]/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#c82858]/[0.035]
          blur-3xl
        "
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-12 text-center sm:mb-14 lg:mb-16">
          {/* Small label */}
          <div
            className="
              mx-auto
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-pink-200/70
              bg-white/70
              px-4
              py-1.5
              shadow-sm
              backdrop-blur-md
            "
          >
            <span
              className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-[#ce4a6e]
              "
            />

            <span
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#a72c52]
              "
            >
              Features
            </span>
          </div>

          {/* Heading */}
          <h2
            className="
              mx-auto
              max-w-5xl
              text-4xl
              font-semibold
              leading-[1.08]
              tracking-[-0.035em]
              text-[#111b35]
              sm:text-5xl
              lg:text-6xl
            "
            style={{
              fontFamily: "var(--font-display)",
            }}
          >
            Care Today for a{" "}
            <span className="text-[#c82858]">
              Stronger Tomorrow
            </span>
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-[#526078]
              sm:text-base
              sm:leading-8
            "
            style={{
              fontFamily: "var(--font-body)",
            }}
          >
            Chitta Shanti combines modern AI with compassionate
            care to support the mental well-being of our forces.
          </p>
        </div>

        {/* Carousel */}
        <FeatureCarousel />
      </div>
    </section>
  );
}