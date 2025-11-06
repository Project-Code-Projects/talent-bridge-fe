import CompanyInfo from "../components/CompanyInfo";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../layout/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <CompanyInfo />
      </main>
      <Footer />
    </div>
  );
}
