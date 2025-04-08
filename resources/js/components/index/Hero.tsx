
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlaneTakeoff, Search, Star, Check, BarChart, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-sky-50 to-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 -top-24 w-1/2 h-1/2 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -left-1/4 top-1/4 w-1/2 h-1/2 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
      <div className="page-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className={cn(
            "w-full lg:w-1/2 space-y-6 transition-all duration-700 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-200 text-indigo-600 text-sm font-medium mb-2">
              <Star className="h-4 w-4 fill-orange-400 text-orange-400" /> Avaliado em 4.9/5 por nossos clientes
            </div>

            <h1 className="font-bold leading-tight text-3xl md:text-4xl lg:text-5xl text-blue-900">
              Seu voo foi <span className="text-orange-300">cancelado</span> ou <span className="text-orange-300">atrasou</span>?
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
              Receba até <span className="font-semibold text-indigo-800">R$ 10.000 de indenização</span> por passageiro, seja qual for o preço da passagem. Você só paga se ganhar!
            </p>

            <div className="mt-8 w-full">
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <PlaneTakeoff className="h-5 w-5 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Input
                      placeholder="Número do voo (ex: LA1234)"
                      className="pl-10 border bg-gray-50 h-12"
                    />
                  </div>

                  <div>
                    <Button className="w-full md:w-auto h-12 bg-orange-100 hover:bg-orange-200 text-base text-indigo-8">
                      <Search className="h-4 w-4 mr-2" />
                      Verificar indenização
                    </Button>
                  </div>
                </div>

                <div className="mt-4 text-sm text-center text-muted-foreground">
                  Simule a sua indenização sem compromisso algum. Não precisa de cartão de crédito.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="bg-blue-50 p-2 rounded-full mb-2">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div className="font-bold text-lg text-blue-900">+250 mil</div>
                <div className="text-xs text-muted-foreground">Passageiros ajudados</div>
              </div>

              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="bg-red-50 p-2 rounded-full mb-2">
                  <PlaneTakeoff className="h-5 w-5 text-red-500" />
                </div>
                <div className="font-bold text-lg text-blue-900">+120</div>
                <div className="text-xs text-muted-foreground">Companhias aéreas</div>
              </div>

              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="bg-green-50 p-2 rounded-full mb-2">
                  <BarChart className="h-5 w-5 text-green-600" />
                </div>
                <div className="font-bold text-lg text-blue-900">98%</div>
                <div className="text-xs text-muted-foreground">Taxa de sucesso</div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-lg blur opacity-20"></div>
              <div className="w-full h-80 md:h-96 rounded-lg shadow-lg relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src="/lovable-uploads/Passageira.jpg" alt="Passageira" className="w-full h-80 md:h-96 rounded-lg bg-red-600" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white shadow-lg rounded-lg p-4 max-w-xs">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Receba sua indenização em até 30 dias após o processo ser aceito</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
