import { useEffect, useState } from "react";
import Header from "@/components/index/Header";
import Hero from "@/components/index/Hero";
import HowItWorks from "@/components/index/HowItWorks";
import PassengerRights from "@/components/index/PassengerRights";
import FlightProblems from "@/components/index/FlightProblems";
import FAQ from "@/components/index/FAQ";
import Footer from "@/components/index/Footer";
import { Button } from "@/components/ui/button";
import { PlaneTakeoff, ArrowRight, X } from "lucide-react";
import { Head } from '@inertiajs/react';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 mx-auto w-full max-w-3xl px-4">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-lg p-4 transition-all hover:shadow-xl relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-white text-blue-600 rounded-full p-1 hover:bg-blue-50 transition-colors"
          aria-label="Fechar banner"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-start sm:items-center flex-1">
            <div className="bg-white/20 p-2 rounded-full mr-3 shrink-0">
              <PlaneTakeoff className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h3 className="font-medium text-sm sm:text-base">
              Reivindique até R$ 10.000 pelo atraso ou cancelamento do seu voo.
            </h3>
          </div>

          <Button className="bg-white text-blue-600 hover:bg-blue-50 whitespace-nowrap group transition-all w-full sm:w-auto">
            Verificar indenização
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
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
    <>
      <Head title="Passageiro Legal" />

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
    </>
  );
};

export default Index;
