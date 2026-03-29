"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTarotStore, DrawnCard } from "../store/useTarotStore";
import styles from "../styles/tarotSelection.module.css";

// 타로 3장 스프레드의 각 자리 의미
const SPREAD_POSITIONS = ["현재의 상태", "당면한 과제/조언", "오늘의 결과"];
const TOTAL_CARDS = 22;

export default function TarotCardSelection() {
  const { selectedCategory, selectedCards, addCard } = useTarotStore();
  
  // 아직 뽑히지 않은 덱 상태 관리
  const [availableCards, setAvailableCards] = useState<number[]>(
    Array.from({ length: TOTAL_CARDS }, (_, i) => i)
  );

  // 카드 뽑기 핸들러
  const handleDrawCard = (cardId: number) => {
    if (selectedCards.length >= 3) return; // 이미 3장 다 뽑았으면 무시

    // 🌟 핵심 로직: 50% 확률로 역방향(Reversed) 결정
    const isReversed = Math.random() < 0.5;
    
    addCard({ id: cardId, isReversed });
    setAvailableCards((prev) => prev.filter((id) => id !== cardId));
  };

  return (
    <div className={styles.selectionContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>당신의 카드를 3장 뽑아주세요</h2>
        <p className={styles.subtitle}>
          [{selectedCategory}] 운세를 위해 현재, 조언, 결과 카드를 차례로 선택합니다.
        </p>
      </div>

      {/* 🌟 상단: 선택된 카드들이 들어갈 3개의 슬롯 */}
      <div className={styles.slotsContainer}>
        {SPREAD_POSITIONS.map((pos, index) => {
          const drawnCard = selectedCards[index]; // 해당 자리에 뽑힌 카드 유무 확인
          return (
            <div key={index} className={styles.slotWrapper}>
              <div className={styles.slotLabel}>{pos}</div>
              <div className={styles.slot}>
                <AnimatePresence>
                  {drawnCard && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, y: 50 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        y: 0,
                        // 역방향이면 180도 뒤집어서 꽂히는 애니메이션
                        rotate: drawnCard.isReversed ? 180 : 0 
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className={styles.drawnCard}
                    >
                      {/* 카드 뒷면 디자인 (결과 화면에서 앞면 공개) */}
                      <div className={styles.cardBacking} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🌟 하단: 남아있는 타로 카드 무대 (부채꼴 펼치기) */}
      <div className={styles.cardsStage}>
        {availableCards.map((cardId, index) => {
          // 중앙 정렬을 위한 각도/위치 계산
          const centerIndex = availableCards.length / 2;
          const offset = index - centerIndex;

          return (
            <motion.div
              key={cardId}
              layoutId={`card-${cardId}`} // 부드러운 위치 이동을 위한 layoutId
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: 1,
                x: offset * 25,
                y: Math.abs(offset) * 4,
                rotate: offset * 2.5,
              }}
              whileHover={{ y: -30, scale: 1.1, zIndex: 50 }}
              className={styles.card}
              onClick={() => handleDrawCard(cardId)}
            >
              <div className={styles.cardBacking} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}