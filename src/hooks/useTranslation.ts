import { useLocaleStore } from '@/store/useLocaleStore';
import { translations } from '@/lib/translations';

const FALLBACK_TRANSLATIONS: Record<string, Record<string, string>> = {
  ES: { 
    "Deal of the Day": "Oferta del Día", 
    "Or": "O", 
    "Saving...": "Guardando...", 
    "Detect My Location": "Detectar mi ubicación",
    "Coming Soon": "Próximamente",
    "We're working hard to bring this page to life! Stay tuned for updates on our premium e-commerce features.": "¡Estamos trabajando duro para dar vida a esta página! Estén atentos a las actualizaciones de nuestras funciones premium de comercio electrónico."
  },
  FR: { 
    "Deal of the Day": "Offre du Jour", 
    "Or": "Ou", 
    "Saving...": "Enregistrement...", 
    "Detect My Location": "Détecter ma position",
    "Coming Soon": "Bientôt disponible",
    "We're working hard to bring this page to life! Stay tuned for updates on our premium e-commerce features.": "Nous travaillons dur pour donner vie à cette page ! Restez à l'écoute pour les mises à jour de nos fonctionnalités e-commerce premium."
  },
  DE: { 
    "Deal of the Day": "Angebot des Tages", 
    "Or": "Oder", 
    "Saving...": "Speichern...", 
    "Detect My Location": "Meinen Standort erfassen",
    "Coming Soon": "Demnächst",
    "We're working hard to bring this page to life! Stay tuned for updates on our premium e-commerce features.": "Wir arbeiten hart daran, diese Seite zum Leben zu erwecken! Bleiben Sie dran für Updates zu unseren Premium-E-Commerce-Funktionen."
  },
  IT: { 
    "Deal of the Day": "Offerta del Giorno", 
    "Or": "O", 
    "Saving...": "Salvataggio...", 
    "Detect My Location": "Rileva la mia posizione",
    "Coming Soon": "Prossimamente",
    "We're working hard to bring this page to life! Stay tuned for updates on our premium e-commerce features.": "Stiamo lavorando sodo per dare vita a questa pagina! Restate sintonizzati per gli aggiornamenti sulle nostre funzionalità e-commerce premium."
  },
  PT: { 
    "Deal of the Day": "Oferta do Dia", 
    "Or": "Ou", 
    "Saving...": "A guardar...", 
    "Detect My Location": "Detetar minha localização",
    "Coming Soon": "Brevemente",
    "We're working hard to bring this page to life! Stay tuned for updates on our premium e-commerce features.": "Estamos a trabalhar arduamente para dar vida a esta página! Fique atento às atualizações dos nossos recursos premium de e-commerce."
  },
  NL: { 
    "Deal of the Day": "Deal van de Dag", 
    "Or": "Of", 
    "Saving...": "Opslaan...", 
    "Detect My Location": "Mijn locatie detecteren",
    "Coming Soon": "Binnenkort beschikbaar",
    "We're working hard to bring this page to life! Stay tuned for updates on our premium e-commerce features.": "We werken hard om deze pagina tot leven te brengen! Blijf op de hoogte van updates voor onze premium e-commercefuncties."
  },
  PL: { 
    "Deal of the Day": "Oferta Dnia", 
    "Or": "Lub", 
    "Saving...": "Zapisywanie...", 
    "Detect My Location": "Wykryj moją lokalizację",
    "Coming Soon": "Wkrótce",
    "We're working hard to bring this page to life! Stay tuned for updates on our premium e-commerce features.": "Ciężko pracujemy, aby powołać tę stronę do życia! Bądź na bieżąco z aktualizacjami dotyczącymi naszych funkcji e-commerce premium."
  },
  SV: { 
    "Deal of the Day": "Dagens Deal", 
    "Or": "Eller", 
    "Saving...": "Sparar...", 
    "Detect My Location": "Hitta min position",
    "Coming Soon": "Kommer snart",
    "We're working hard to bring this page to life! Stay tuned for updates on our premium e-commerce features.": "Vi arbetar hårt för att väcka den här sidan till liv! Håll dig uppdaterad för uppdateringar om våra förstklassiga e-handelsfunktioner."
  },
  NO: { 
    "Deal of the Day": "Dagens Deal", 
    "Or": "Eller", 
    "Saving...": "Lagrer...", 
    "Detect My Location": "Finn min posisjon",
    "Coming Soon": "Kommer snart",
    "We're working hard to bring this page to life! Stay tuned for updates on our premium e-commerce features.": "Vi jobber hardt for å vekke denne siden til live! Hold deg oppdatert for oppdateringer om våre premium e-handelsfunksjoner."
  },
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
