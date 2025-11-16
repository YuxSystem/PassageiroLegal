import { useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import i18n from '@/i18n/config';

export const useLocale = () => {
  const { locale } = usePage().props as { locale?: string };

  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
      localStorage.setItem('i18nextLng', locale);
    }
  }, [locale]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    // Update locale in Laravel session via query parameter
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    router.visit(url.toString(), { preserveState: true, preserveScroll: true });
  };

  return { locale: locale || 'pt-BR', changeLanguage };
};

