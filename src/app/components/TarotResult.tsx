"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useTarotStore } from "../store/useTarotStore";
import { useLanguageStore } from "../store/useLanguageStore";
import translations from "../i18n/translations";
import styles from "../styles/tarotResult.module.css";

export default function TarotResult() {
  const { selectedCategory, selectedCards, userMbti, resetTarot } = useTarotStore();
  const { lang } = useLanguageStore();
  const t = translations[lang].result;

  const [isLoading, setIsLoading] = useState(true);
  const [resultText, setResultText] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const cardNames = selectedCards
        .map((c) => `[${t.cardNames[c.id] ?? `#${c.id}`} - ${c.isReversed ? t.reversed : t.upright}]`)
        .join(", ");

      setResultText(
        lang === 'ko'
          ? `당신의 성향을 바탕으로 카드를 읽어보았습니다.\n\n당신이 뽑은 카드는 ${cardNames} 입니다.\n\n이 카드들의 흐름을 보면, 현재 상황에서 서두르기보다는 내면의 소리에 귀를 기울이는 것이 좋습니다. 특히 두 번째 카드의 조언을 받아들인다면, 저녁쯤에는 당신이 원하는 평안한 결과를 얻을 수 있을 것입니다.`
          : `The cards have been read with your energy in mind.\n\nThe cards you drew are ${cardNames}.\n\nLooking at the flow of these cards, it is better to listen to your inner voice rather than rush. If you heed the advice of the second card, you are likely to find the calm resolution you seek by the end of the day.`
      );
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [selectedCategory, selectedCards, userMbti, lang]);

  const flipVariants: Variants = {
    hidden: { rotateY: 0 },
    visible: (i: number) => ({
      rotateY: 180,
      transition: {
        delay: i * 0.4,
        duration: 0.8,
        type: "spring",
        damping: 15,
      },
    }),
  };

  return (
    <div className={styles.resultContainer}>
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.loadingScreen}
        >
          <h2 className={styles.loadingText}>{t.loading}</h2>
          <div className={styles.spinner} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.resultContent}
        >
          <h2 className={styles.resultTitle}>{t.title}</h2>

          <div className={styles.cardsRow}>
            {selectedCards.map((card, index) => (
              <div key={index} className={styles.cardWrapper}>
                <div className={styles.positionLabel}>{t.positions[index]}</div>

                <div className={styles.perspectiveContainer}>
                  <motion.div
                    className={styles.cardInner}
                    custom={index}
                    variants={flipVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className={styles.cardBack} />
                    <div className={styles.cardFront}>
                      <div
                        className={styles.cardContent}
                        style={{ transform: card.isReversed ? 'rotate(180deg)' : 'none' }}
                      >
                        <span className={styles.cardNumber}>{card.id}</span>
                        <span className={styles.cardName}>
                          {t.cardNames[card.id] ?? `#${card.id}`}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className={styles.directionLabel}>
                  {card.isReversed ? t.reversed : t.upright}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.textDisplay}>
            <p className={styles.resultDesc}>{resultText}</p>
            <button className={styles.resetButton} onClick={resetTarot}>
              {t.reset}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
