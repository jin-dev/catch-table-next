'use client'

import LandingPage from "./landingPages/LandingPage";
import CategorySelection from './landingPages/CategorySelection';
import TarotCardSelection from "./components/TaratCardSelection";
import TarotResult from "./components/TarotResult";
import { useTarotStore } from "./store/useTarotStore";
// import { useSession } from "next-auth/react"; // TODO: 배포 전 주석 해제


export default function Home() {
  const { isStarted, selectedCategory, selectedCards, isResultReady } = useTarotStore();
  // const { data: session, status } = useSession(); // TODO: 배포 전 주석 해제

  // 1. 시작 전 → 랜딩 페이지
  if (!isStarted) return <LandingPage />;

  // 2. 로그인 확인 (TODO: 개발 중 임시 비활성화 — 배포 전 주석 해제)
  // if (status === "loading") return null;
  // if (!session) return <LandingPage />;

  // 3. 카테고리 선택
  if (!selectedCategory) return <CategorySelection />;

  // 4. 카드 선택 (3장 미완료 or 결과 준비 전)
  if (selectedCards.length < 3 || !isResultReady) {
    return <TarotCardSelection />;
  }

  // 5. 결과 화면
  return <TarotResult />;
}
