"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useTarotStore } from "../store/useTarotStore";
import { useLanguageStore } from "../store/useLanguageStore";
import translations from "../i18n/translations";
import Image from "next/image";
import CARD_ASSETS from "../lib/cardAssets";
import styles from "../styles/tarotResult.module.css";

export default function TarotResult() {
  const { selectedCategory, selectedCards, userMbti } = useTarotStore();
  const { lang } = useLanguageStore();
  const t = translations[lang].result;

  const [isLoading, setIsLoading] = useState(true);
  const [resultText, setResultText] = useState("");

  const EN_CARD_NAMES = translations['en'].result.cardNames;
  const POSITIONS = ['past', 'present', 'future'] as const;

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    const cards = selectedCards.map((card, index) => {
      const entry: { name: string; position: string; reversed?: boolean } = {
        name: EN_CARD_NAMES[card.id] ?? `#${card.id}`,
        position: POSITIONS[index],
      };
      if (card.isReversed) entry.reversed = true;
      return entry;
    });

    const payload = {
      mbti: userMbti ?? '',
      category: selectedCategory ?? '',
      cards,
    };

    fetch('/api/tarot/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setResultText(data.resultText ?? '');
        setIsLoading(false);
        fetch('/api/tarot/stats/today', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ todayCount: 1 }),
        }).catch(() => {});
      })
      .catch(() => {
        if (cancelled) return;
        setResultText(lang === 'ko' ? '결과를 불러오지 못했습니다.' : 'Failed to load result.');
        setIsLoading(false);
      });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedCards, userMbti]);

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
                        {CARD_ASSETS[card.id] ? (
                          <Image
                            src={CARD_ASSETS[card.id]}
                            alt={t.cardNames[card.id] ?? `#${card.id}`}
                            fill
                            className={styles.cardVideo}
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <>
                            <span className={styles.cardNumber}>{card.id}</span>
                            <span className={styles.cardName}>
                              {t.cardNames[card.id] ?? `#${card.id}`}
                            </span>
                          </>
                        )}
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
            {resultText.split('\n\n').filter(Boolean).map((paragraph, i) => (
              <motion.div
                key={i}
                className={i === 0 ? styles.resultIntro : styles.resultParagraph}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
              >
                {paragraph}
              </motion.div>
            ))}
            <motion.a
              href="https://ko-fi.com/jindev0221"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.donationBtn}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Image src="/ko-fi-icon.png" alt="support" width={20} height={20} className={styles.donationIcon} />
              {t.donation}
            </motion.a>
          </div>
        </motion.div>
      )}
    </div>
  );
}
