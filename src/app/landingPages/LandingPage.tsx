"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import { signIn } from "next-auth/react";
import { useTarotStore } from "../store/useTarotStore";
import { useLanguageStore } from "../store/useLanguageStore";
import translations from "../i18n/translations";
import styles from '../styles/landing.module.css';

export default function LandingPage() {
  const { setStarted, setMbti } = useTarotStore();
  const { lang } = useLanguageStore();
  const [mbtiInput, setMbtiInput] = useState("");
  const t = translations[lang].landing;

  return (
    <div className={styles.landingContainer}>
      <div className={styles.starsOverlay} />

<main className={styles.heroSection}>
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.navbar}
        >
          <span className={styles.logo}>AI TAROT MASTER</span>
        </motion.nav>

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

        <div className={styles.contentWrapper}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={styles.mainTitle}
          >
            {t.title} <br />
            <span className={styles.highlight}>{t.titleHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={styles.subDescription}
          >
            {t.description}
          </motion.p>

          <motion.input
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95 }}
            className={styles.mbtiInput}
            type="text"
            maxLength={4}
            placeholder={t.mbtiPlaceholder}
            value={mbtiInput}
            onChange={(e) => setMbtiInput(e.target.value.toUpperCase())}
          />

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(212, 175, 55, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className={styles.ctaButton}
            onClick={() => {
              if (mbtiInput.trim()) setMbti(mbtiInput.trim());
              setStarted(true);
            }}
          >
            {t.cta}
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className={styles.socialProof}
        >
          <p>
            {t.socialProof} <strong>{t.socialProofCount}</strong> {t.socialProofSuffix}
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={styles.googleButton}
          onClick={() => signIn("google")}
        >
          <svg className={styles.googleIcon} viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {t.googleConnect}
        </motion.button>
      </main>
    </div>
  );
}
