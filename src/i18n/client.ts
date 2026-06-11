// Client-side i18n utilities for dynamic translation
import { ui, defaultLang, languages } from './ui';

export type Language = keyof typeof ui;
export type TranslationKey = keyof typeof ui[typeof defaultLang];

declare global {
  interface Window {
    translations: typeof ui;
    currentLang: Language;
    setLanguage: (lang: Language) => void;
    updatePageTranslations: () => void;
  }
}

class I18nClient {
  private currentLang: Language = defaultLang;
  private listeners: Set<() => void> = new Set();

  constructor() {
    // Initialize language from localStorage or browser settings
    if (typeof window !== 'undefined') {
      const queryLang = new URLSearchParams(window.location.search).get('lang') as Language | null;
      const storedLang = localStorage.getItem('user-lang') as Language;

      if (queryLang && queryLang in ui) {
        this.currentLang = queryLang;
        localStorage.setItem('user-lang', this.currentLang);
      } else if (storedLang && storedLang in ui) {
        this.currentLang = storedLang;
      } else {
        // Detect browser language
        const browserLang = navigator.language;
        const preferredLang = browserLang.toLowerCase().startsWith('en') ? 'en' : 'ru';
        this.currentLang = preferredLang in ui ? preferredLang : defaultLang;
        localStorage.setItem('user-lang', this.currentLang);
      }
      
      // Sync with global window object
      window.currentLang = this.currentLang;
      window.translations = ui;
    }
  }

  getCurrentLang(): Language {
    return this.currentLang;
  }

  setLanguage(lang: Language) {
    if (!(lang in ui)) return;

    this.currentLang = lang;
    window.currentLang = lang;
    localStorage.setItem('user-lang', lang);

    const targetUrl = this.getUrlForLanguage(lang);
    if (targetUrl !== window.location.href) {
      window.location.href = targetUrl;
      return;
    }

    this.notifyListeners();
    this.updateDocumentLanguage();
    updatePageTranslations();
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
  }

  translate(key: string): string {
    const lang = this.currentLang;
    // @ts-ignore - dynamic key access
    return ui[lang]?.[key] || ui[defaultLang][key] || key;
  }

  // Subscribe to language changes
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  private updateDocumentLanguage() {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.currentLang;

      // Update hreflang links
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        const currentPath = window.location.pathname;
        const cleanPath = this.getCleanPath(currentPath);
        canonicalLink.setAttribute('href', `${window.location.origin}${cleanPath}`);
      }
    }
  }

  private getUrlForLanguage(lang: Language): string {
    const url = new URL(window.location.href);
    url.searchParams.delete('lang');
    const cleanPath = url.pathname.replace(/^\/(ru|en)(?=\/|$)/, '') || '/';
    url.pathname = lang === defaultLang ? cleanPath : `/${lang}${cleanPath === '/' ? '/' : cleanPath}`;
    return url.href;
  }

  getCleanPath(pathname: string): string {
    // Remove language prefix from path
    const langPrefixes = Object.keys(ui).join('|');
    const regex = new RegExp(`^\\/(${langPrefixes})(\\/|$)`);
    return pathname.replace(regex, '/') || '/';
  }

  getAlternatePaths(): Record<Language, string> {
    const currentPath = window.location.pathname;
    const cleanPath = this.getCleanPath(currentPath);

    const paths: Record<Language, string> = {} as Record<Language, string>;

    Object.keys(ui).forEach((lang) => {
      const language = lang as Language;
      if (language === defaultLang) {
        paths[language] = cleanPath;
      } else {
        paths[language] = `/${language}${cleanPath}`;
      }
    });

    return paths;
  }

  // Get all available languages
  getLanguages(): typeof languages {
    return languages;
  }
}

// Global instance
export const i18nClient = new I18nClient();

// Helper to update all elements with data-i18n attributes
export function updatePageTranslations() {
  if (typeof document === 'undefined') return;

  const currentLang = i18nClient.getCurrentLang();
  const translations = ui[currentLang] || ui[defaultLang];

  // Update elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (key && translations[key as keyof typeof translations]) {
      const translatedText = translations[key as keyof typeof translations];

      // Handle different element types
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        (element as HTMLInputElement).placeholder = translatedText;
      } else if (element.tagName === 'A' && element.hasAttribute('data-i18n-title')) {
        element.setAttribute('title', translatedText);
      } else {
        element.textContent = translatedText;
      }
    }
  });

  // Update elements with data-i18n-html attribute
  const htmlElements = document.querySelectorAll('[data-i18n-html]');
  htmlElements.forEach(element => {
    const key = element.getAttribute('data-i18n-html');
    if (key && translations[key as keyof typeof translations]) {
      element.innerHTML = translations[key as keyof typeof translations];
    }
  });

  // Update elements with data-i18n-placeholder attribute
  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (key && translations[key as keyof typeof translations]) {
      (element as HTMLInputElement | HTMLTextAreaElement).placeholder = translations[key as keyof typeof translations];
    }
  });
}

// React-like hook for components (vanilla JS version)
export function useTranslation() {
  return {
    t: (key: string) => i18nClient.translate(key),
    lang: i18nClient.getCurrentLang(),
    setLanguage: (lang: Language) => i18nClient.setLanguage(lang),
    languages: i18nClient.getLanguages(),
    updatePageTranslations
  };
}

// Initialize on page load
if (typeof window !== 'undefined') {
  window.setLanguage = (lang: Language) => i18nClient.setLanguage(lang);
  window.updatePageTranslations = updatePageTranslations;

  // Update after Astro view transitions
  document.addEventListener('astro:after-swap', updatePageTranslations);
  
  // Initial update if needed
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    updatePageTranslations();
  } else {
    document.addEventListener('DOMContentLoaded', updatePageTranslations);
  }
}
