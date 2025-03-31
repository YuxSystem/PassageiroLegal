
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, PlaneTakeoff, LogIn, UserPlus } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Como Funciona", href: "#como-funciona" },
    { name: "Seus Direitos", href: "#seus-direitos" },
    { name: "Perguntas Frequentes", href: "#faq" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="page-container">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2 font-medium text-xl md:text-2xl" onClick={closeMenu}>
            <PlaneTakeoff className="h-6 w-6 text-sky-600" />
            <span className="font-semibold">Passageiro Legal</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-sky-600 transition-colors"
              >
                {item.name}
              </a>
            ))}

            <div className="flex items-center space-x-2 ml-4">
              <a href="/login">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <LogIn className="h-4 w-4" />
                  <span>Entrar</span>
                </Button>
              </a>
              <a href="/cadastro">
                <Button variant="default" size="sm" className="bg-sky-600 hover:bg-sky-700 flex items-center gap-1">
                  <UserPlus className="h-4 w-4" />
                  <span>Cadastrar</span>
                </Button>
              </a>

            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4 animate-fade-in">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-foreground hover:text-sky-600 transition-colors"
                onClick={closeMenu}
              >
                {item.name}
              </a>
            ))}

            <div className="flex flex-col space-y-2 pt-2">
              <a href="/login" onClick={closeMenu}>
                <Button variant="outline" className="w-full justify-start">
                  <LogIn className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
              </a>
              <a href="/cadastro" onClick={closeMenu}>
                <Button variant="default" className="w-full justify-start">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Cadastrar
                </Button>
              </a>

            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
