
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

const features = [
  {
    icon: "💰",
    title: "Só paga se ganhar",
    description: "Você só desembolsa se ganhar. E se ganhar, cobramos apenas 35% do valor."
  },
  {
    icon: "🇧🇷",
    title: "Atendimento no Brasil",
    description: "Seja atendido totalmente em português por um time no Brasil."
  },
  {
    icon: "✈️",
    title: "Todas as companhias aéreas",
    description: "Independentemente do país e da companhia aérea, nós lhe atendemos."
  },
  {
    icon: "👥",
    title: "2.5 milhões de clientes",
    description: "Uma empresa global e com mais de 10 anos de especialidade."
  }
];

const testimonials = [
  {
    stars: 5,
    timeAgo: "9 horas atrás",
    text: "A Passageiro Legal foi muito prestável na ajuda que nos deu e a situação foi resolvida muito rapidamente! Obrigado e recomendamos!",
    author: "Rita Rodrigues"
  },
  {
    stars: 4,
    timeAgo: "13 horas atrás",
    text: "Muito boa experiência e rápido serviço.",
    author: "Marco Santos Rebelo"
  },
  {
    stars: 4,
    timeAgo: "a day ago",
    text: "Passageiro Legal ajudaram muito na devolução do dinheiro por causa do voo atrasado. Sem problemas recebi o dinheiro na conta.",
    author: "Joanna Maria Leite"
  }
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="section bg-gray-50 py-16">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 hover:shadow-md transition-all duration-300">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Nós só recebemos quando você ganhar */}
        <div className="mt-24 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <div className="text-sm font-medium text-blue-600 uppercase mb-2">SEM PAGAMENTOS ANTECIPADOS</div>
              <h2 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-4">
                Nós só recebemos quando você ganhar
              </h2>
              <p className="text-muted-foreground mb-6">
                Nossa tarifa é deduzida da indenização que ganhamos para você. Isso significa que nada sai da sua conta bancária e você não tem nada a perder. Nossa tarifa padrão é de 35% e já inclui todas as taxas, ou seja, sem surpresas no final.
              </p>
              <Link href="/login">
                <Button className="bg-indigo-800 hover:bg-indigo-700">
                  Verificar meu direito
                </Button>
              </Link>
            </div>

            <div className="md:col-span-5">
              <div className="relative">
                <img src="/lovable-uploads/Viajante.jpg" alt="Viajante" className="w-full max-w-[300px] h-[200px] mx-auto bg-blue-100 rounded-lg flex items-center justify-center" />
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full z-0"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-100 rounded-full z-0"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Avaliações */}
        <div className="mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8 text-center">
            O que nossos clientes dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex mb-3">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4">{testimonial.text}</p>
                <div className="flex justify-between items-center">
                  <div className="font-medium text-blue-900">{testimonial.author}</div>
                  <div className="text-xs text-gray-500">{testimonial.timeAgo}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { number: '2,5 milhões', text: 'Já ajudamos 2,5 milhões de passageiros a receber suas indenizações' },
            { number: '400+', text: 'Suporte especializado da nossa equipe de mais de 400 profissionais' },
            { number: '99%', text: 'de taxa de sucesso em tribunais' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <p className="text-muted-foreground text-sm">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
