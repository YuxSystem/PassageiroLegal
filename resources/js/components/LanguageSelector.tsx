import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "@/hooks/useLocale";

interface LanguageSelectorProps {
  variant?: "default" | "compact";
  className?: string;
}

export const LanguageSelector = ({ variant = "default", className }: LanguageSelectorProps) => {
  const { locale, changeLanguage } = useLocale();

  if (variant === "compact") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className={`gap-2 ${className}`}>
            <Globe className="h-4 w-4" />
            <span>{locale === 'pt-BR' ? 'PT' : 'EN'}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => changeLanguage('pt-BR')}>
            <span className={locale === 'pt-BR' ? 'font-bold' : ''}>Português (BR)</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage('en')}>
            <span className={locale === 'en' ? 'font-bold' : ''}>English</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={`gap-2 ${className}`}>
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{locale === 'pt-BR' ? 'PT' : 'EN'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage('pt-BR')}>
          <span className={locale === 'pt-BR' ? 'font-bold' : ''}>Português (BR)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('en')}>
          <span className={locale === 'en' ? 'font-bold' : ''}>English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

