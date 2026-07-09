import { useLocaleStore } from '@/store/useLocaleStore';
import { translations } from '@/lib/translations';
import { TRANSLATION_FALLBACKS } from '@/lib/translationFallbacks';

export function useTranslation() {
  const language = useLocaleStore((state) => state.language);
  const setLanguage = useLocaleStore((state) => state.setLanguage);

  const t = (key: string): string => {
    if (!key) return '';
    const normKey = key.trim();
    if (language === 'EN') return key;

    // Check fallback translations first
    const fallbackDict = TRANSLATION_FALLBACKS[language];
    if (fallbackDict && fallbackDict[normKey]) {
      return fallbackDict[normKey];
    }

    const langDict = translations[language];
    if (langDict && langDict[normKey]) {
      return langDict[normKey];
    }
    // Fallback: Case-insensitive search
    if (langDict) {
      const match = Object.keys(langDict).find(
        (k) => k.toLowerCase() === normKey.toLowerCase()
      );
      if (match) return langDict[match];
    }
    return key;
  };

  return { t, language, setLanguage };
}
