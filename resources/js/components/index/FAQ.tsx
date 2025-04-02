import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Quanto tempo leva para receber uma compensação?",
    answer: "O tempo para receber compensação varia de caso a caso. Algumas companhias aéreas respondem em algumas semanas, enquanto outras podem levar meses. Em média, nossos clientes recebem compensação em 4 a 12 semanas após enviar a reclamação. Trabalhamos para tornar esse processo o mais rápido possível."
  },
  {
    question: "Quais companhias aéreas estão cobertas pelo serviço?",
    answer: "Nosso serviço abrange todas as companhias aéreas que operam voos no Brasil, além de voos internacionais de/para a Europa onde se aplicam os regulamentos europeus. Isso inclui companhias nacionais como LATAM, GOL, Azul, e internacionais como TAP, Air France, Lufthansa, British Airways, entre outras."
  },
  {
    question: "Quanto custa usar o serviço Passageiro Legal?",
    answer: "Nosso serviço opera com base em taxa de sucesso. Isso significa que você não paga nada adiantado. Cobramos apenas 25% da compensação obtida, e somente se seu caso for bem-sucedido. Se não conseguirmos obter compensação para você, você não paga absolutamente nada."
  },
  {
    question: "Quanto tempo tenho para fazer uma reclamação?",
    answer: "No Brasil, você tem até 5 anos para entrar com uma reclamação sobre problemas com voos. Para voos internacionais sob regulamentação europeia (EC 261/2004), o prazo varia de 1 a 6 anos, dependendo do país de partida ou chegada. Recomendamos iniciar o processo o quanto antes para facilitar a coleta de provas."
  },
  {
    question: "Quais documentos preciso apresentar?",
    answer: "Para iniciar o processo, precisamos de: (1) cópia do seu bilhete/e-ticket, (2) documento de identidade, (3) cartão de embarque (se disponível), e (4) quaisquer comunicações da companhia aérea sobre o problema. Não se preocupe se não tiver todos esses documentos - podemos ajudar a obtê-los em muitos casos."
  },
  {
    question: "Meu voo foi cancelado devido a condições climáticas. Tenho direito a compensação?",
    answer: "Para cancelamentos devido a circunstâncias extraordinárias (como condições climáticas severas) fora do controle da companhia aérea, geralmente não há compensação financeira. No entanto, mesmo nestes casos, a companhia aérea ainda deve fornecer assistência, como refeições, acomodação e opções de reembolso ou rerouting. Entre em contato conosco para analisar seu caso específico."
  },
  {
    question: "O que acontece se minha reclamação for para tribunal?",
    answer: "Em alguns casos, podemos recomendar levar seu caso ao tribunal para obter compensação. Se isso acontecer, forneceremos representação legal completa. Você não precisará comparecer ao tribunal pessoalmente na maioria dos casos. Todos os custos legais serão cobertos por nós, mantendo nossa política de taxa apenas em caso de sucesso."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="section">
      <div className="page-container">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Perguntas Frequentes</h2>
          <p className="text-base text-muted-foreground">
            Confira as dúvidas mais comuns sobre o processo de solicitação de compensação e
            como o Passageiro Legal pode ajudar você.
          </p>
        </div>

        <div className="max-w-3xl mx-auto glass-panel rounded-2xl p-6 md:p-8">
          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-100 rounded-lg overflow-hidden bg-white/80 px-4"
              >
                <AccordionTrigger className="py-4 text-left text-sm md:text-base font-medium hover:text-sky-700 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="py-4 text-sm text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
