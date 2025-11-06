import CompanyInfo from "../components/landing-page-components/CompanyInfo";
import Features from "../components/landing-page-components/Features";
import Footer from "../components/landing-page-components/Footer";
import Hero from "../components/landing-page-components/Hero";
import Navbar from "../components/Navbar";

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
