'use client';

import React, { useEffect } from 'react';
import { useLocaleStore } from '@/store/useLocaleStore';
import { translations } from '@/lib/translations';

// Simple fallback mappings for helper labels
const FALLBACKS: Record<string, Record<string, string>> = {
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

export default function TranslationProvider({ children }: { children: React.ReactNode }) {
  const language = useLocaleStore((state) => state.language);

  useEffect(() => {
    if (language === 'EN') return;

    const dict = translations[language] || {};
    const fallbackDict = FALLBACKS[language] || {};

    const getTranslation = (text: string): string | null => {
      const trimmed = text.trim();
      if (!trimmed) return null;

      // Check fallback first
      if (fallbackDict[trimmed]) return fallbackDict[trimmed];

      // Check direct dict
      if (dict[trimmed]) return dict[trimmed];

      // Case insensitive check
      const match = Object.keys(dict).find(k => k.toLowerCase() === trimmed.toLowerCase());
      if (match) return dict[match];

      return null;
    };

    const translateNode = (node: Node) => {
      // 1. Text node translation
      if (node.nodeType === Node.TEXT_NODE) {
        const translation = getTranslation(node.textContent || '');
        if (translation) {
          node.textContent = translation;
        }
      } 
      // 2. Element node translation (placeholders, inputs, etc.)
      else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        
        // Translate placeholders
        const placeholder = element.getAttribute('placeholder');
        if (placeholder) {
          const translation = getTranslation(placeholder);
          if (translation) {
            element.setAttribute('placeholder', translation);
          }
        }

        // Translate button inputs
        if (element.tagName === 'INPUT') {
          const type = element.getAttribute('type');
          if (type === 'button' || type === 'submit') {
            const value = element.getAttribute('value');
            if (value) {
              const translation = getTranslation(value);
              if (translation) {
                element.setAttribute('value', translation);
              }
            }
          }
        }

        // Recursively translate children
        element.childNodes.forEach(translateNode);
      }
    };

    // Initial translation run
    translateNode(document.body);

    // Setup MutationObserver to translate new/updated nodes dynamically
    const observer = new MutationObserver((mutations) => {
      observer.disconnect(); // Prevent observer loops while modifying DOM
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            translateNode(node);
          });
        } else if (mutation.type === 'characterData') {
          const translation = getTranslation(mutation.target.textContent || '');
          if (translation) {
            mutation.target.textContent = translation;
          }
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => observer.disconnect();
  }, [language]);

  return <>{children}</>;
}
