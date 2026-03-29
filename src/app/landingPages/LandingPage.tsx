"use client";

import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import { useTarotStore } from "../store/useTarotStore";
import styles from '../styles/landing.module.css';

export default function LandingPage() {
  const { setStarted } = useTarotStore();

  return (
    <div className={styles.landingContainer}>
      {/* 배경 장식용 별빛 애니메이션 */}
      <div className={styles.starsOverlay} />

      <main className={styles.heroSection}>
        {/* 상단 로고/이름 */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.navbar}
        >
          <span className={styles.logo}>AI TAROT MASTER</span>
        </motion.nav>

        {/* 메인 비주얼 (Lottie) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className={styles.lottieWrapper}
        >
         <Lottie
            loop
            path="https://assets2.lottiefiles.com/packages/lf20_w51pcehl.json" 
            play
            className={styles.mainLottie}
            style={{ width: 300, height: 300 }}
          />
        </motion.div>

        {/* 텍스트 컨텐츠 */}
        <div className={styles.contentWrapper}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={styles.mainTitle}
          >
            오늘 당신을 기다리는 <br />
            <span className={styles.highlight}>운명의 메시지</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={styles.subDescription}
          >
            데이터와 영감이 만나는 곳, AI 타로 마스터가 <br />
            당신의 고민에 대한 명확한 해답을 제시합니다.
          </motion.p>

          {/* 시작 버튼 */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(212, 175, 55, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className={styles.ctaButton}
            onClick={() => setStarted(true)}
          >
            운세 확인하기
          </motion.button>
        </div>

        {/* 사회적 증거 (Social Proof) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className={styles.socialProof}
        >
          <p>오늘 이미 <strong>1,248명</strong>이 고민을 해결했습니다</p>
        </motion.div>
      </main>
    </div>
  );
}