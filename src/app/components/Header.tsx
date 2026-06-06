'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useLanguageStore } from '../store/useLanguageStore';
import styles from '../styles/header.module.css';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const { lang, setLang } = useLanguageStore();
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Set language from browser on first client render
  useEffect(() => {
    const browserLang = navigator.language ?? navigator.languages?.[0] ?? '';
    if (browserLang.startsWith('ko')) setLang('ko');
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = session?.user?.name
    ? session.user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          MyApp
        </Link>

        {/* Desktop Menu */}
        <nav className={styles.nav}>
          <Link href="/about">About</Link>
          <Link href="/products/1">Product</Link>

          {/* Language Switcher */}
          <div className={styles.langSwitcher}>
            <button
              className={`${styles.langBtn} ${lang === 'ko' ? styles.langActive : ''}`}
              onClick={() => setLang('ko')}
            >
              KOR
            </button>
            <span className={styles.langDivider}>|</span>
            <button
              className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`}
              onClick={() => setLang('en')}
            >
              ENG
            </button>
          </div>

          <div className={styles.authSection}>
            {status === 'loading' ? (
              <span className={styles.loading}>...</span>
            ) : session ? (
              <div className={styles.profileWrapper} ref={profileRef}>
                <button
                  className={styles.profileBtn}
                  onClick={() => setIsProfileOpen((v) => !v)}
                  aria-label="Profile menu"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name ?? 'Profile'}
                      width={36}
                      height={36}
                      className={styles.avatarImg}
                    />
                  ) : (
                    <span className={styles.avatarInitials}>{initials}</span>
                  )}
                </button>

                {isProfileOpen && (
                  <div className={styles.profileDropdown}>
                    <div className={styles.dropdownInfo}>
                      <p className={styles.dropdownName}>{session.user?.name}</p>
                      <p className={styles.dropdownEmail}>{session.user?.email}</p>
                    </div>
                    <hr className={styles.dropdownDivider} />
                    <button
                      className={styles.dropdownSignOut}
                      onClick={() => { signOut(); setIsProfileOpen(false); }}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => signIn('google')} className={styles.authBtn}>Login</button>
            )}
          </div>
        </nav>

        {/* Hamburger Button */}
        <button
          className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className={styles.mobileNav}>
          <Link href="/about" onClick={closeMenu}>About</Link>
          <Link href="/products/1" onClick={closeMenu}>Product</Link>

          <div className={styles.mobileLangSwitcher}>
            <button
              className={`${styles.langBtn} ${lang === 'ko' ? styles.langActive : ''}`}
              onClick={() => setLang('ko')}
            >
              KOR
            </button>
            <span className={styles.langDivider}>|</span>
            <button
              className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`}
              onClick={() => setLang('en')}
            >
              ENG
            </button>
          </div>

          <div className={styles.mobileAuthSection}>
            {session ? (
              <>
                <div className={styles.mobileProfile}>
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name ?? 'Profile'}
                      width={40}
                      height={40}
                      className={styles.avatarImg}
                    />
                  ) : (
                    <span className={styles.avatarInitials}>{initials}</span>
                  )}
                  <div>
                    <p className={styles.dropdownName}>{session.user?.name}</p>
                    <p className={styles.dropdownEmail}>{session.user?.email}</p>
                  </div>
                </div>
                <button onClick={() => { signOut(); closeMenu(); }} className={styles.mobileAuthBtn}>
                  Sign out
                </button>
              </>
            ) : (
              <button onClick={() => { signIn('google'); closeMenu(); }} className={styles.mobileAuthBtn}>
                Login with Google
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
