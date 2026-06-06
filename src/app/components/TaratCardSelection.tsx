"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTarotStore } from "../store/useTarotStore";
import { useLanguageStore } from "../store/useLanguageStore";
import translations from "../i18n/translations";
import Image from "next/image";
import CARD_ASSETS from "../lib/cardAssets";
import styles from "../styles/tarotSelection.module.css";

const TOTAL_CARDS = 22;

export default function TarotCardSelection() {
  const { selectedCategory, selectedCards, addCard, setResultReady } = useTarotStore();
  const { lang } = useLanguageStore();
  const t = translations[lang].cardSelection;

  const [availableCards, setAvailableCards] = useState<number[]>(
    Array.from({ length: TOTAL_CARDS }, (_, i) => i)
  );

  // Pre-generate reversed states once on mount so Math.random() is never called during render
  const [reversedMap] = useState<boolean[]>(() =>
    Array.from({ length: TOTAL_CARDS }, () => Math.random() < 0.5)
  );

  const handleDrawCard = (cardId: number) => {
    if (selectedCards.length >= 3) return;
    addCard({ id: cardId, isReversed: reversedMap[cardId] });
    setAvailableCards((prev) => prev.filter((id) => id !== cardId));
  };

  // 3번째 카드 선택 후 문구(1.3s) + 읽는 시간(2s) = 3.3s 뒤 결과 페이지로 이동
  useEffect(() => {
    if (selectedCards.length < 3) return;
    const timer = setTimeout(() => setResultReady(true), 3300);
    return () => clearTimeout(timer);
  }, [selectedCards.length, setResultReady]);

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
                      initial={{ opacity: 0, scale: 0.6, y: -60 }}
                      animate={{
                        opacity: 1, scale: 1, y: 0,
                        rotate: drawnCard.isReversed ? 180 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 220, damping: 22 }}
                      className={styles.drawnCard}
                    >
                      <div className={styles.drawnCardOuter}>
                        <motion.div
                          className={styles.drawnCardInner}
                          style={{ transformStyle: 'preserve-3d' }}
                          initial={{ rotateY: 180 }}
                          animate={{ rotateY: 0 }}
                          transition={{ delay: 0.45, duration: 0.65, ease: "easeOut" }}
                        >
                          <div className={styles.drawnCardBack} />
                          <div className={styles.drawnCardFront}>
                            {CARD_ASSETS[drawnCard.id] ? (
                              <Image
                                src={CARD_ASSETS[drawnCard.id]}
                                alt={translations[lang].result.cardNames[drawnCard.id] ?? `#${drawnCard.id}`}
                                fill
                                className={styles.cardFrontVideo}
                                style={{ objectFit: 'cover' }}
                              />
                            ) : (
                              <div className={styles.cardFrontOverlay}>
                                <span className={styles.cardFrontNumber}>{drawnCard.id}</span>
                                <span className={styles.cardFrontName}>
                                  {translations[lang].result.cardNames[drawnCard.id] ?? `#${drawnCard.id}`}
                                </span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {drawnCard && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className={styles.cardRevealDesc}
                >
                  {t.positionDescs[index]}
                </motion.p>
              )}
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
