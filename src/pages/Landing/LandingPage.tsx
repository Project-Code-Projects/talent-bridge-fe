import CompanyInfo from "../../components/landing-page/CompanyInfo";
import Features from "../../components/landing-page/Features";
import Footer from "../../components/landing-page/Footer";
import Hero from "../../components/landing-page/Hero";

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
