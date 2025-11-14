
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";

const Header = () => {
  const { t } = useTranslation();
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
    { name: t("header.howItWorks"), href: "#como-funciona" },
    { name: t("header.yourRights"), href: "#seus-direitos" },
    { name: t("header.faq"), href: "#faq" },
    { name: t("header.contact"), href: "#contato" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white md:bg-transparent"
      )}
    >
      <div className="page-container">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 font-medium text-xl md:text-2xl"
            onClick={closeMenu}
          >
            <img src="/lovable-uploads/LogoHorizontal.png" alt="Logo" className="h-10 w-full" />
          </Link>

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
            <LanguageSelector />
            <Link href="/login">
              <Button className="bg-indigo-800 hover:bg-indigo-700 btn-glow transition-all duration-300">
                {t("header.requestRefund")}
              </Button>
            </Link>
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
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-foreground hover:text-sky-600 transition-colors"
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            <Button className="w-full mt-2 bg-indigo-800 hover:bg-indigo-700">
              {t("header.requestRefund")}
            </Button>
            <div className="mt-2">
              <LanguageSelector variant="compact" />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
