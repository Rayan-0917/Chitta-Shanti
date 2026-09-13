import Header from "../components/home/Header";
import HeroBackground from "../components/home/HeroBackground";
import Hero from "../components/home/Hero";
import FeaturesSection from "../components/home/FeaturesSection";
import Footer from "../components/home/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />

      <main>
        <section className="min-h-screen overflow-hidden">
          <HeroBackground />
          <Hero />
        </section>

        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
}