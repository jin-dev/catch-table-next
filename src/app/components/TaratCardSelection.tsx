"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTarotStore } from "../store/useTarotStore";
import { useLanguageStore } from "../store/useLanguageStore";
import translations from "../i18n/translations";
import styles from "../styles/tarotSelection.module.css";

const TOTAL_CARDS = 22;

export default function TarotCardSelection() {
  const { selectedCategory, selectedCards, addCard } = useTarotStore();
  const { lang } = useLanguageStore();
  const t = translations[lang].cardSelection;

  const [availableCards, setAvailableCards] = useState<number[]>(
    Array.from({ length: TOTAL_CARDS }, (_, i) => i)
  );

  const handleDrawCard = (cardId: number) => {
    if (selectedCards.length >= 3) return;
    const isReversed = Math.random() < 0.5;
    addCard({ id: cardId, isReversed });
    setAvailableCards((prev) => prev.filter((id) => id !== cardId));
  };

  return (
    <div className={styles.selectionContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t.title}</h2>
        <p className={styles.subtitle}>{t.subtitle(selectedCategory ?? '')}</p>
      </div>

      <div className={styles.slotsContainer}>
        {t.positions.map((pos, index) => {
          const drawnCard = selectedCards[index];
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
                        rotate: drawnCard.isReversed ? 180 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className={styles.drawnCard}
                    >
                      <div className={styles.cardBacking} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.cardsStage}>
        {availableCards.map((cardId, index) => {
          const centerIndex = availableCards.length / 2;
          const offset = index - centerIndex;
          return (
            <motion.div
              key={cardId}
              layoutId={`card-${cardId}`}
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
