"use client";

import { motion, Variants } from "framer-motion";
import { useTarotStore } from "../store/useTarotStore";
import { useLanguageStore } from "../store/useLanguageStore";
import translations from "../i18n/translations";
import styles from "../styles/categorySelection.module.css";

const CATEGORY_IDS = ["today", "love", "wealth", "career", "relationship", "secret"];
const CATEGORY_ICONS = ["✨", "❤️", "💰", "💼", "🤝", "👁️"];

export default function CategorySelection() {
  const { setCategory } = useTarotStore();
  const { lang } = useLanguageStore();
  const t = translations[lang].category;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className={styles.categoryContainer}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.header}
      >
        <h2 className={styles.title}>{t.title}</h2>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </motion.div>

      <motion.div
        className={styles.gridContainer}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {CATEGORY_IDS.map((id, index) => (
          <motion.div
            key={id}
            variants={itemVariants}
            whileHover={{ scale: 1.04, y: -10 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
            className={styles.categoryCard}
            onClick={() => setCategory(id)}
          >
            <div className={styles.iconWrapper}>{CATEGORY_ICONS[index]}</div>
            <h3 className={styles.cardTitle}>{t.items[index].title}</h3>
            <p className={styles.cardDesc}>{t.items[index].desc}</p>
            <div className={styles.cardGlow} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
