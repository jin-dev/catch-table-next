'use client'

import Image from "next/image";
import Form from 'next/form';
import styles from "./page.module.css";
import SSRBlock from "./_components/SSRBlock";
import { MyLottieComponent } from "./_components/MyLottieLogo";
import Home_login  from "./components/home";
import Header from "./components/Header";
import Footer from "./components/Footer";

import LandingPage from "./landingPages/LandingPage";
import CategorySelection from './landingPages/CategorySelection';
import TarotCardSelection from "./components/TaratCardSelection";
import TarotResult from "./components/TarotResult";
import { useTarotStore } from "./store/useTarotStore";


export default function Home() {
  const { isStarted, selectedCategory, selectedCards } = useTarotStore();

  // 1. 시작 전
  if (!isStarted) return <LandingPage />;

  // 2. 카테고리 선택
  if (!selectedCategory) return <CategorySelection />;

  // 3. 카드 선택
  if (selectedCards.length < 3) {
    return <TarotCardSelection />;
  }
  // 4. 결과 화면 (모든 단계를 통과했을 때)
  return (
    <div className={styles.page}>
    <Header />
    <main className={styles.main}>
      <TarotResult />
    </main>
    <Footer />
  </div>
  );
  
}
