'use client';

import React, { useEffect } from 'react';
import { useLocaleStore } from '@/store/useLocaleStore';
import { translations } from '@/lib/translations';
import { TRANSLATION_FALLBACKS } from '@/lib/translationFallbacks';

export default function TranslationProvider({ children }: { children: React.ReactNode }) {
  const language = useLocaleStore((state) => state.language);

  useEffect(() => {
    if (language === 'EN') return;

    const dict = translations[language] || {};
    const fallbackDict = TRANSLATION_FALLBACKS[language] || {};

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
