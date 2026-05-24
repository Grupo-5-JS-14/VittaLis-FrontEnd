import Beneficios from "../components/home/Beneficios";
import CarrosselPlanos from "../components/home/CarrosselPlanos";
import Emotional from "../components/home/Emotional";
import Faq from "../components/home/Faq";
import Hero from "../components/home/Hero";
import Testimonials from "../components/home/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans antialiased">
      <Hero />
      <CarrosselPlanos />
      <Beneficios />
      <Emotional />
      <Testimonials />
      <Faq />
    </div>
  );
}
