import { create } from 'zustand';

export type Lang = 'ko' | 'en';

interface LanguageState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: 'en',
  setLang: (lang) => set({ lang }),
}));
