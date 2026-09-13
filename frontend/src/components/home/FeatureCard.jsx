import { ArrowRight } from "lucide-react";

export default function FeatureCard({
  title,
  description,
  image,
  icon: Icon,
  index,
}) {
  return (
    <article
      className="
        relative
        h-[550px]
        w-full
        overflow-hidden
        rounded-[34px]
        border border-white/70
        bg-[#fdf9f3]
        shadow-[0_18px_45px_rgba(168,44,82,0.12)]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-[0_25px_55px_rgba(168,44,82,0.18)]
      "
    >
      {/* Image */}
      <div className="relative h-[55%] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            hover:scale-105
          "
        />

        {/* Image fade */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-32
            bg-gradient-to-t
            from-[#fdf9f3]
            via-[#fdf9f3]/70
            to-transparent
          "
        />
      </div>

      {/* Floating icon */}
      

      {/* Content */}
      <div
        className="
          flex
          h-[45%]
          flex-col
          items-center
          px-7
          pb-7
          pt-8
          text-center
        "
      >
        <h3
          className="
            text-[25px]
            font-semibold
            leading-tight
            tracking-[-0.02em]
            text-[#111b35]
          "
          style={{
            fontFamily: "var(--font-display)",
          }}
        >
          {title}
        </h3>

        {/* Small divider */}
        <div
          className="
            my-5
            h-[3px]
            w-10
            rounded-full
            bg-[#c82858]
          "
        />

        <p
          className="
            max-w-[310px]
            text-[15px]
            leading-7
            text-[#526078]
          "
          style={{
            fontFamily: "var(--font-body)",
          }}
        >
          {description}
        </p>

        {/* Optional bottom indicator */}
        <div className="mt-auto flex items-center gap-2 text-[#c82858]/70">
          <span className="text-xs font-medium">
            {String(index + 1).padStart(2, "0")}
          </span>

          <ArrowRight size={15} strokeWidth={1.8} />
        </div>
      </div>
    </article>
  );
}