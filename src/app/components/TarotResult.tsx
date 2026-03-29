"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useTarotStore } from "../store/useTarotStore";
import styles from "../styles/tarotResult.module.css";

const SPREAD_POSITIONS = ["현재의 상태", "당면한 과제/조언", "오늘의 결과"];

// 임시 카드 데이터 매핑 (나중에 실제 이미지 URL과 이름으로 교체)
const getCardName = (id: number) => {
  const names = ["바보", "마법사", "고위 여사제", "여황제", "황제", "교황", "연인", "전차", "힘", "은둔자", "운명의 수레바퀴", "정의", "매달린 사람", "죽음", "절제", "악마", "탑", "별", "달", "태양", "심판", "세계"];
  return names[id] || `카드 ${id}`;
};

export default function TarotResult() {
  const { selectedCategory, selectedCards, userMbti, resetTarot } = useTarotStore();
  const [isLoading, setIsLoading] = useState(true);
  const [resultText, setResultText] = useState("");

  useEffect(() => {
    // 임시 로딩 시뮬레이션 (실제로는 여기서 Express API를 호출합니다)
    const timer = setTimeout(() => {
      const cardNames = selectedCards.map(c => 
        `[${getCardName(c.id)} - ${c.isReversed ? '역방향' : '정방향'}]`
      ).join(", ");

      setResultText(
        `당신의 성향을 바탕으로 카드를 읽어보았습니다.\n\n` +
        `당신이 뽑은 카드는 ${cardNames} 입니다.\n\n` +
        `이 카드들의 흐름을 보면, 현재 상황에서 서두르기보다는 내면의 소리에 귀를 기울이는 것이 좋습니다. 특히 두 번째 카드의 조언을 받아들인다면, 저녁쯤에는 당신이 원하는 평안한 결과를 얻을 수 있을 것입니다.`
      );
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [selectedCategory, selectedCards, userMbti]);

  // 카드 뒤집기 애니메이션 설정 (순차적 딜레이)
  const flipVariants: Variants = {
    hidden: { rotateY: 0 },
    visible: (i: number) => ({
      rotateY: 180,
      transition: { 
        delay: i * 0.4, // 0.4초 간격으로 착, 착, 착 뒤집힘
        duration: 0.8, 
        type: "spring",
        damping: 15
      }
    })
  };

  return (
    <div className={styles.resultContainer}>
      {isLoading ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className={styles.loadingScreen}
        >
          <h2 className={styles.loadingText}>
            마스터가 당신의 카드를 읽고 있습니다...
          </h2>
          <div className={styles.spinner} />
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className={styles.resultContent}
        >
          <h2 className={styles.resultTitle}>당신의 운명의 메시지</h2>
          
          {/* 3장 카드 보여주기 영역 */}
          <div className={styles.cardsRow}>
            {selectedCards.map((card, index) => (
              <div key={index} className={styles.cardWrapper}>
                <div className={styles.positionLabel}>{SPREAD_POSITIONS[index]}</div>
                
                <div className={styles.perspectiveContainer}>
                  <motion.div
                    className={styles.cardInner}
                    custom={index}
                    variants={flipVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* 뒷면 (초기 상태) */}
                    <div className={styles.cardBack} />
                    
                    {/* 앞면 (결과 확인) */}
                    <div className={styles.cardFront}>
                      {/* 역방향일 경우 이미지(내용)를 180도 회전 */}
                      <div 
                        className={styles.cardContent}
                        style={{ transform: card.isReversed ? 'rotate(180deg)' : 'none' }}
                      >
                        <span className={styles.cardNumber}>{card.id}</span>
                        <span className={styles.cardName}>{getCardName(card.id)}</span>
                        {/* 실제 이미지가 있다면 여기에 img 태그를 넣습니다 */}
                        {/* <img src={`/images/cards/${card.id}.png`} alt="tarot" /> */}
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* 정/역방향 텍스트 표시 */}
                <div className={styles.directionLabel}>
                  {card.isReversed ? '▼ 역방향' : '▲ 정방향'}
                </div>
              </div>
            ))}
          </div>

          {/* AI 해설 텍스트 */}
          <div className={styles.textDisplay}>
            <p className={styles.resultDesc}>{resultText}</p>
            <button className={styles.resetButton} onClick={resetTarot}>
              다시 상담하기
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}