import { useLocaleStore } from '@/store/useLocaleStore';
import { translations } from '@/lib/translations';

const FALLBACK_TRANSLATIONS: Record<string, Record<string, string>> = {
  ES: { "Deal of the Day": "Oferta del Día", "Or": "O", "Saving...": "Guardando...", "Detect My Location": "Detectar mi ubicación" },
  FR: { "Deal of the Day": "Offre du Jour", "Or": "Ou", "Saving...": "Enregistrement...", "Detect My Location": "Détecter ma position" },
  DE: { "Deal of the Day": "Angebot des Tages", "Or": "Oder", "Saving...": "Speichern...", "Detect My Location": "Meinen Standort erfassen" },
  IT: { "Deal of the Day": "Offerta del Giorno", "Or": "O", "Saving...": "Salvataggio...", "Detect My Location": "Rileva la mia posizione" },
  PT: { "Deal of the Day": "Oferta do Dia", "Or": "Ou", "Saving...": "A guardar...", "Detect My Location": "Detetar minha localização" },
  NL: { "Deal of the Day": "Deal van de Dag", "Or": "Of", "Saving...": "Opslaan...", "Detect My Location": "Mijn locatie detecteren" },
  PL: { "Deal of the Day": "Oferta Dnia", "Or": "Lub", "Saving...": "Zapisywanie...", "Detect My Location": "Wykryj moją lokalizację" },
  SV: { "Deal of the Day": "Dagens Deal", "Or": "Eller", "Saving...": "Sparar...", "Detect My Location": "Hitta min position" },
  NO: { "Deal of the Day": "Dagens Deal", "Or": "Eller", "Saving...": "Lagrer...", "Detect My Location": "Finn min posisjon" },
};

export function useTranslation() {
  const language = useLocaleStore((state) => state.language);
  const setLanguage = useLocaleStore((state) => state.setLanguage);

  const t = (key: string): string => {
    if (!key) return '';
    const normKey = key.trim();
    if (language === 'EN') return key;

    // Check fallback translations first
    const fallbackDict = FALLBACK_TRANSLATIONS[language];
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
