export default function HeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-screen overflow-hidden pointer-events-none z-0">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8yLcg6gY9XJoPG2to1e06L0vzfC30TTKnpI5IkEhBIwSyJmwbnFeY9b95JhAlAuSAA8WQVM6hgkh6hlL9itmSi2evATtBsdParGSojNf1Z4jXbtZmADbNt84-iML-HEgDfcbsDc57beldmTrqzKF_R9K8An-qASSjSeHNKTCx-_F7XXDekhYgI7vVdwMzdpjmoocnygMrj9r4XVtTMtF5GBUEjdrimUClXnRTHjjRwJUafolmCmb5PZpQsB6vLiL7AV5M0BX4JNktTn8"
        alt="Solitary traveler walking a meditative curving path"
        className="
          w-full
          h-full
          object-cover
          object-[60%_70%]
          transition-transform
          duration-700
        "
        style={{
          filter: "contrast(1.12) brightness(1.01)",
        }}
      />

      {/* Left-side readability gradient */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-[#fdf9f3]/55
          via-[#fdf9f3]/15
          to-transparent
        "
      />

      {/* Subtle top tint */}
      <div
        className="
          absolute top-0 left-0 right-0
          h-36
          bg-gradient-to-b
          from-[#c82858]/45
          via-[#c82858]/10
          to-transparent
        "
      />

      {/* Very subtle center fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 40% at 50% 25%, rgba(253, 249, 243, 0.30) 0%, rgba(253, 249, 243, 0.12) 45%, transparent 75%)",
        }}
      />
    </div>
  );
}