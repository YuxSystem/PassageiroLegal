
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ClaimForm from "@/components/ClaimForm";
import HowItWorks from "@/components/HowItWorks";
import PassengerRights from "@/components/PassengerRights";
import FlightProblems from "@/components/FlightProblems";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PlaneTakeoff, ArrowRight } from "lucide-react";

const FloatingCTA = () => {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 mx-auto w-full max-w-3xl px-4">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-lg p-4 flex items-center justify-between transition-all hover:shadow-xl">
        <div className="flex items-center">
          <div className="bg-white/20 p-2 rounded-full mr-3">
            <PlaneTakeoff className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-medium">Reivindique até R$ 10.000 pelo atraso ou cancelamento do seu voo.</h3>
          </div>
        </div>
        <Button className="bg-white text-blue-600 hover:bg-blue-50 whitespace-nowrap group transition-all">
          Verificar indenização
          <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

const Index = () => {
  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchorElement = target.closest('a[href^="#"]');

      if (anchorElement) {
        e.preventDefault();
        const href = anchorElement.getAttribute('href');

        if (href) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <FlightProblems />
        <PassengerRights />
        <FAQ />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;
