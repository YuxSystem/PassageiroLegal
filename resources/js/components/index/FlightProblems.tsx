
import { PlaneTakeoff, Clock, Users, Building, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const problemTypes = [
  {
    icon: <PlaneTakeoff className="h-8 w-8 text-blue-500" />,
    title: "Voos cancelados",
    description: "Voo cancelado em cima da hora? Você pode ter direito a uma indenização de até R$ 10.000."
  },
  {
    icon: <Clock className="h-8 w-8 text-blue-500" />,
    title: "Atrasos de voos",
    description: "Se o seu voo atrasou mais de 2 horas, veja se nossos especialistas podem conseguir uma indenização de até R$ 10.000 para você."
  },
  {
    icon: <Users className="h-8 w-8 text-blue-500" />,
    title: "Perda de voo de conexão",
    description: "Se você aterrissou no seu destino final com mais de 4 horas de atraso sem ter tido nenhuma responsabilidade nisso, faça um pedido de indenização."
  },
  {
    icon: <Building className="h-8 w-8 text-blue-500" />,
    title: "Companhias aéreas que não cooperam",
    description: "A companhia aérea está ignorando ou rejeitando o seu pedido de indenização? Nós fazemos uma verificação independente da validade do pedido."
  }
];

const compareItems = [
  {
    negative: true,
    title: "Estressante",
    description: "Você tem que realizar todo o processo sozinho, incluindo negociações com a companhia aérea.",
  },
  {
    negative: true,
    title: "Muita burocracia",
    description: "Saber quais são os formulários necessários e para onde enviá-los pode ser complicado.",
  },
  {
    negative: true,
    title: "Lento",
    description: "O vaivém da documentação pode durar meses e você pode passar horas ao telefone com as centrais de atendimento.",
  },
  {
    negative: false,
    title: "Fácil e sem problemas",
    description: "Com a Passageiro Legal, todo o processo do pedido de indenização fica por nossa conta, do início até o recebimento.",
  },
  {
    negative: false,
    title: "Nós cuidamos dele",
    description: "Orientamos você sobre documentos essenciais e enviamos a documentação em seu nome.",
  },
  {
    negative: false,
    title: "Economize tempo",
    description: "Você simplesmente envia os seus documentos para a companhia aérea através de nós, e nós assumimos a partir daí.",
  },
];

const FlightProblems = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="page-container">
        <div className="text-center mb-16">
          <div className="text-sm font-medium text-blue-600 uppercase mb-2">POR QUE ESCOLHER A PASSAGEIRO LEGAL?</div>
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
            Nós resolvemos mais problemas com voos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Como somos a maior empresa de indenização de voos do mundo, trabalhamos em mais países e podemos ajudar em mais situações do que qualquer outra.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problemTypes.map((problem, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300">
              <div className="rounded-full bg-blue-50 p-4 inline-flex mb-4">
                {problem.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2 text-blue-900">{problem.title}</h3>
              <p className="text-muted-foreground text-sm">{problem.description}</p>
            </div>
          ))}
        </div>

        {/* Por que escolher a Passageiro Legal */}
        <div className="mt-24 mb-16">
          <div className="text-center mb-16">
            <div className="text-sm font-medium text-blue-600 uppercase mb-2">QUEM COMPARA ESCOLHE A PASSAGEIRO LEGAL</div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
              Por que escolher a Passageiro Legal?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Faça você mesmo a sua reclamação</h3>
              {compareItems.slice(0, 3).map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-500">!</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Com a Passageiro Legal</h3>
              {compareItems.slice(3).map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg h-auto">
              Verificar Indenização
            </Button>
          </div>
        </div>

        {/* Legislação */}
        <div className="mt-24 bg-gray-50 rounded-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-2">
              A PASSAGEIRO LEGAL PROTEGE OS DIREITOS DO PASSAGEIRO AÉREO
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
              <img src="/lovable-uploads/e93d2528-7af4-4fa0-ae0e-7e5639850faf.png" alt="Brasil" className="w-8 h-8" />
              <span className="text-sm font-medium">CÓDIGO DE DEFESA DO CONSUMIDOR</span>
            </div>
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">400</div>
              <span className="text-sm font-medium">RESOLUÇÃO Nº 400 DA ANAC</span>
            </div>
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <span className="text-sm font-medium">CONVENÇÃO DE MONTREAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlightProblems;
