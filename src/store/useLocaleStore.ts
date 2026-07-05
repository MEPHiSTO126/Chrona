import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: 'EN', name: 'English', flag: '🇺🇸' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },
  { code: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'IT', name: 'Italiano', flag: '🇮🇹' },
  { code: 'PT', name: 'Português', flag: '🇵🇹' },
  { code: 'NL', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'PL', name: 'Polski', flag: '🇵🇱' },
  { code: 'SV', name: 'Svenska', flag: '🇸🇪' },
  { code: 'NO', name: 'Norsk', flag: '🇳🇴' },
];

interface LocaleState {
  language: string;
  location: string;
  setLanguage: (lang: string) => void;
  setLocation: (loc: string) => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      language: 'EN',
      location: 'Pune 412208',
      setLanguage: (language) => set({ language }),
      setLocation: (location) => set({ location }),
    }),
    {
      name: 'locale-storage',
    }
  )
);
