import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "AI Stress Detection",
    description:
      "Analyzes facial, vocal and behavioral cues to identify early signs of stress and burnout.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-4y-OcEj5GKMEoukrvAo03X7aFfjnLZY8BcWfEcMYWiekw6_TxlOv5ZRWt_ck7VNnqSZk6WZnkOt8hzwaa1j7VRRIcUMekC31J8FY1l7_GEaHuU8r-RqGWWKvk7Smr40y_17b0rSXhdsi2cVC29Z-BHOowTUqwtJ6wlIr_2bnO-L9gsreUMmspu1eSm_Mk-lTEGg83aVWbBDdUwymNBpV0guK1pG1NbQNrcsogTeZ-X1SzVljgFqX",
    // Replace with your own icon if needed
    icon: null,
  },

  {
    title: "Your Privacy, Our Priority",
    description:
      "Built with strong data protection and role-based access to ensure your information stays safe.",
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=85",
    icon: null,
  },

  {
    title: "Continuous Well-being",
    description:
      "Track your mental wellness over time with personalized insights and support.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
    icon: null,
  },

  {
    title: "Early Intervention",
    description:
      "Identify emerging stress patterns early so that appropriate support can be provided before they escalate.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
    icon: null,
  },

  {
    title: "Personalized Insights",
    description:
      "Transform assessment results into meaningful insights that help personnel understand their own well-being.",
    image:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=85",
    icon: null,
  },

  {
    title: "Welfare Support",
    description:
      "Provide authorized welfare teams with meaningful indicators that can guide timely support and intervention.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85",
    icon: null,
  },
  {
    title: "Stress monitoring system",
    description:
      "Provide authorized welfare teams with meaningful indicators that can guide timely support and intervention.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85",
    icon: null,
  }
];

export default function FeatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(features.length);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const [visibleCards, setVisibleCards] = useState(3);

  const trackRef = useRef(null);

  /*
   * Responsive number of cards.
   */
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1100) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();

    window.addEventListener("resize", updateVisibleCards);

    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);

  /*
   * We render the array three times.
   *
   * Example:
   *
   * 1 2 3 4 5 6 | 1 2 3 4 5 6 | 1 2 3 4 5 6
   *              ↑
   *          starting point
   *
   * This allows the carousel to appear infinite.
   */
  const carouselItems = [
    ...features,
    ...features,
    ...features,
  ];

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const previousSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  /*
   * After reaching the duplicated section, silently
   * jump back to the equivalent position in the middle.
   */
  useEffect(() => {
    if (!isTransitioning) return;

    if (currentIndex >= features.length * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(features.length);
      }, 550);

      return () => clearTimeout(timer);
    }

    if (currentIndex < features.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(features.length * 2 - 1);
      }, 550);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, isTransitioning]);

  /*
   * Restore transition after the invisible reset.
   */
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 30);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  /*
   * Determine the active dot.
   */
  const activeDot = currentIndex % features.length;

  return (
    <div className="relative w-full">
      {/* Carousel viewport */}
      <div
        className="
          relative
          w-full
          overflow-hidden
          px-1
          py-4
        "
      >
        {/* Left arrow */}
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous feature"
          className="
            absolute
            left-0
            top-1/2
            z-20
            hidden
            h-14
            w-14
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white
            bg-white/90
            text-[#c82858]
            shadow-[0_8px_25px_rgba(168,44,82,0.14)]
            backdrop-blur-md
            transition-all
            duration-300
            hover:scale-110
            hover:bg-white
            sm:flex
          "
        >
          <ChevronLeft size={30} strokeWidth={1.8} />
        </button>

        {/* Cards track */}
        <div
          ref={trackRef}
          className="flex"
          style={{
            "--card-gap": "1.5rem",
            "--card-width":
              visibleCards === 1
                ? "100%"
                : visibleCards === 2
                  ? "calc((100% - 1.5rem) / 2)"
                  : "calc((100% - 3rem) / 3)",

            gap: "var(--card-gap)",

            transform: `translate3d(
              calc(
                -${currentIndex} *
                (var(--card-width) + var(--card-gap))
              ),
              0,
              0
            )`,

            transition: isTransitioning
              ? "transform 550ms cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
          }}
        >
          {carouselItems.map((feature, index) => (
            <div
              key={`${feature.title}-${index}`}
              className="shrink-0"
              style={{
                width: "var(--card-width)",
              }}
            >
              <FeatureCard
                {...feature}
                index={index % features.length}
              />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next feature"
          className="
            absolute
            right-0
            top-1/2
            z-20
            hidden
            h-14
            w-14
            translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white
            bg-white/90
            text-[#c82858]
            shadow-[0_8px_25px_rgba(168,44,82,0.14)]
            backdrop-blur-md
            transition-all
            duration-300
            hover:scale-110
            hover:bg-white
            sm:flex
          "
        >
          <ChevronRight size={30} strokeWidth={1.8} />
        </button>
      </div>

      {/* Mobile controls */}
      <div className="mt-5 flex items-center justify-center gap-5 sm:hidden">
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous feature"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-[#c82858]/20
            bg-white
            text-[#c82858]
            shadow-sm
          "
        >
          <ChevronLeft size={21} />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next feature"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-[#c82858]/20
            bg-white
            text-[#c82858]
            shadow-sm
          "
        >
          <ChevronRight size={21} />
        </button>
      </div>

      {/* Pagination */}
      <div
        className="
          mt-7
          flex
          items-center
          justify-center
          gap-2
        "
        aria-label="Feature pagination"
      >
        {features.map((_, index) => {
          const isActive = activeDot === index;

          return (
            <button
              key={index}
              type="button"
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(features.length + index);
              }}
              aria-label={`Go to feature ${index + 1}`}
              className={`
                h-2
                rounded-full
                transition-all
                duration-300
                ${
                  isActive
                    ? "w-8 bg-[#a72c52] shadow-sm shadow-[#a72c52]/30"
                    : "w-2 bg-rose-200"
                }
              `}
            />
          );
        })}
      </div>
    </div>
  );
}