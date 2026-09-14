'use client';

import React, { useEffect } from 'react';
import { useLocaleStore } from '@/store/useLocaleStore';

/**
 * TranslationProvider keeps the HTML document language attribute synchronized
 * with the active locale state. Component-level translations are handled
 * safely via the React useTranslation() hook without mutating the raw DOM.
 */
export default function TranslationProvider({ children }: { children: React.ReactNode }) {
  const language = useLocaleStore((state) => state.language);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = (language || 'en').toLowerCase();
    }
  }, [language]);

  return <>{children}</>;
}
