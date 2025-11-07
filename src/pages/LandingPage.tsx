import CompanyInfo from "../components/landing-page-components/CompanyInfo";
import Features from "../components/landing-page-components/Features";
import Footer from "../components/landing-page-components/Footer";
import Hero from "../components/landing-page-components/Hero";

export default function LandingPage() {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <CompanyInfo />
      </main>
      <Footer />
    </>
  );
}
