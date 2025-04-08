
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlaneTakeoff, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "@inertiajs/react";

const Footer = () => {
  return (
    <footer id="contato" className="bg-gradient-to-b from-white to-sky-50 pt-20 pb-10">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 font-medium text-xl mb-4">
              <PlaneTakeoff className="h-6 w-6 text-sky-600" />
              <span className="font-semibold">Passageiro Legal</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Ajudamos passageiros a obter compensação por voos atrasados,
              cancelados ou com overbooking.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-sky-600 mr-3 mt-0.5" />
                <span>(11) 4000-5000</span>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-sky-600 mr-3 mt-0.5" />
                <span>contato@passageirolegal.com.br</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-sky-600 mr-3 mt-0.5" />
                <span>Av. Paulista, 1000 - São Paulo, SP</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-3">
              {[
                { name: "Como Funciona", href: "#como-funciona" },
                { name: "Seus Direitos", href: "#seus-direitos" },
                { name: "Verificar Elegibilidade", href: "#claim-form" },
                { name: "FAQ", href: "#faq" }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-sky-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Informações</h4>
            <ul className="space-y-3">
              {[
                { name: "Sobre Nós", href: "#" },
                { name: "Política de Privacidade", href: "#" },
                { name: "Termos de Uso", href: "#" },
                { name: "Trabalhe Conosco", href: "#" }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-sky-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Receba Atualizações</h4>
            <p className="text-muted-foreground mb-4">
              Assine nossa newsletter para receber dicas e atualizações sobre direitos dos passageiros.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Seu email"
                className="bg-white"
              />
              <Button variant="default" className="bg-sky-600 hover:bg-sky-700 whitespace-nowrap">
                Assinar
              </Button>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Passageiro Legal. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4">
            {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
              <a
                key={social}
                href={`#${social}`}
                className="text-muted-foreground hover:text-sky-600 transition-colors"
                aria-label={`Visite nosso ${social}`}
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-xs capitalize">{social.charAt(0)}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
