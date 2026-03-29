import { create } from 'zustand';

// 🌟 뽑은 카드 객체 타입 정의 (정/역방향 포함)
export interface DrawnCard {
  id: number;
  isReversed: boolean;
}

interface TarotState {
    isStarted: boolean;
    userMbti: string | null;
    selectedCategory: string | null;
    selectedCards: DrawnCard[]; // 🌟 3장의 카드를 담을 배열
    
    setStarted: (started: boolean) => void;
    setMbti: (mbti: string) => void;
    setCategory: (category: string) => void;
    addCard: (card: DrawnCard) => void; // 🌟 카드 추가 함수
    resetTarot: () => void;
}

export const useTarotStore = create<TarotState>((set) => ({
    isStarted: false,
    userMbti: null,
    selectedCategory: null,
    selectedCards: [],
    
    setStarted: (started) => set({ isStarted: started}),
    setMbti: (mbti) => set({ userMbti: mbti }),
    setCategory: (category) => set({ selectedCategory: category }),
    
    // 🌟 카드가 3장 미만일 때만 배열에 추가
    addCard: (card) => set((state) => {
        if (state.selectedCards.length >= 3) return state;
        return { selectedCards: [...state.selectedCards, card] };
    }),
    
    resetTarot: () => set({ 
        isStarted: false, 
        userMbti: null,
        selectedCategory: null, 
        selectedCards: [] 
    }),
}));