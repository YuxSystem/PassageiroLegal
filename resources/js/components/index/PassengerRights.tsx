import { Button } from "@/components/ui/button";
import { Check, Award, PlaneTakeoff } from "lucide-react";

const PassengerRights = () => {
  return (
    <section id="seus-direitos" className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Passageiro Legal+</h2>

            <p className="mb-8 text-blue-100">
              Obtenha proteção extra e cuidado especial em suas viagens com nosso serviço premium
            </p>

            <Button className="bg-orange-200 hover:bg-orange-100 text-indigo-800 border-0">
              Saiba mais sobre o Passageiro Legal+
            </Button>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">R$ 100 para problemas com voo</h3>
                  <p className="text-sm text-blue-100">Compensação imediata para qualquer problema</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Acesso à sala VIP durante um problema</h3>
                  <p className="text-sm text-blue-100">Espere confortavelmente enquanto resolvemos seu caso</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">R$ 100 por perda ou atraso de mala</h3>
                  <p className="text-sm text-blue-100">Compensação por transtornos com bagagem</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Assistência 24 horas, todos os dias</h3>
                  <p className="text-sm text-blue-100">Suporte completo quando você mais precisar</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-300 rounded-full opacity-20"></div>

            <div className="relative z-10 w-full rounded-lg shadow-xl bg-gradient-to-r from-indigo-600 to-indigo-400 p-8 h-80 flex items-center justify-center">
              <div className="text-center">
                <img src="/lovable-uploads/SeloQualidade.png" alt="Selo de qualidade" className="h-40 w-40 mx-auto mb-4 text-blue-100" />
                <h3 className="text-xl font-bold">Passageiro Legal+</h3>
                <p className="text-blue-100 mt-2">Proteção premium para suas viagens</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h3 className="text-center text-sm uppercase tracking-wider mb-8">A Passageiro Legal foi mencionada:</h3>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="h-8 w-32 bg-white/30 rounded-md"></div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="h-8 w-36 bg-white/30 rounded-md"></div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="h-8 w-28 bg-white/30 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PassengerRights;
