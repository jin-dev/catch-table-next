"use client";

import { motion, Variants } from "framer-motion";
import { useTarotStore } from "../store/useTarotStore";
import styles from "../styles/categorySelection.module.css";

// 카테고리 데이터 정의 (추후 수익화를 위해 프리미엄 카테고리 분리 가능)
const CATEGORIES = [
  { id: "today", title: "오늘의 운세", desc: "오늘 하루의 전반적인 흐름과 조언", icon: "✨" },
  { id: "love", title: "연애운", desc: "솔로, 짝사랑, 연인과의 관계 흐름", icon: "❤️" },
  { id: "wealth", title: "금전/재물운", desc: "나의 재물 흐름과 투자 타이밍", icon: "💰" },
  { id: "career", title: "직장/사업운", desc: "이직, 취업, 사업 프로젝트의 향방", icon: "💼" },
  { id: "relationship", title: "인간관계", desc: "주변 사람들과의 갈등과 해결책", icon: "🤝" },
  { id: "secret", title: "상대방의 속마음", desc: "그 사람은 지금 나를 어떻게 생각할까?", icon: "👁️" },
];

export default function CategorySelection() {
  const { setCategory } = useTarotStore();

  // Framer Motion 애니메이션 설정 (부모)
  const containerVariants : Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // 자식 요소들이 0.1초 간격으로 나타남
      },
    },
  };

  // Framer Motion 애니메이션 설정 (자식)
  const itemVariants : Variants = {
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
        <h2 className={styles.title}>어떤 고민을 안고 오셨나요?</h2>
        <p className={styles.subtitle}>AI 타로 마스터가 해답을 찾아드릴 분야를 선택해주세요.</p>
      </motion.div>

      <motion.div 
        className={styles.gridContainer}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {CATEGORIES.map((cat) => (
          <motion.div
            key={cat.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05, translateY: -5 }}
            whileTap={{ scale: 0.95 }}
            className={styles.categoryCard}
            onClick={() => setCategory(cat.id)}
          >
            <div className={styles.iconWrapper}>{cat.icon}</div>
            <h3 className={styles.cardTitle}>{cat.title}</h3>
            <p className={styles.cardDesc}>{cat.desc}</p>
            <div className={styles.cardGlow}></div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}