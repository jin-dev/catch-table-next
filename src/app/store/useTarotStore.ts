import { create } from 'zustand';

export interface DrawnCard {
  id: number;
  isReversed: boolean;
}

interface TarotState {
  isStarted: boolean;
  isResultReady: boolean;
  userMbti: string | null;
  selectedCategory: string | null;
  selectedCards: DrawnCard[];

  setStarted: (started: boolean) => void;
  setResultReady: (ready: boolean) => void;
  setMbti: (mbti: string) => void;
  setCategory: (category: string) => void;
  addCard: (card: DrawnCard) => void;
  resetTarot: () => void;
}

export const useTarotStore = create<TarotState>((set) => ({
  isStarted: false,
  isResultReady: false,
  userMbti: null,
  selectedCategory: null,
  selectedCards: [],

  setStarted: (started) => set({ isStarted: started }),
  setResultReady: (ready) => set({ isResultReady: ready }),
  setMbti: (mbti) => set({ userMbti: mbti }),
  setCategory: (category) => set({ selectedCategory: category }),

  addCard: (card) => set((state) => {
    if (state.selectedCards.length >= 3) return state;
    return { selectedCards: [...state.selectedCards, card] };
  }),

  resetTarot: () => set({
    isStarted: false,
    isResultReady: false,
    userMbti: null,
    selectedCategory: null,
    selectedCards: [],
  }),
}));
