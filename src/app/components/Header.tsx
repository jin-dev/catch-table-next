'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from '../styles/header.module.css';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

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
          
          <div className={styles.authSection}>
            {status === 'loading' ? (
              <span className={styles.loading}>...</span>
            ) : session ? (
              <div className={styles.userProfile}>
                <span className={styles.userName}>{session.user?.name}</span>
                <button onClick={() => signOut()} className={styles.authBtn}>Logout</button>
              </div>
            ) : (
              <button onClick={() => signIn('google')} className={styles.authBtn}>Login</button>
            )}
          </div>
        </nav>

        {/* Hamburger Button with X transformation */}
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
          
          <div className={styles.mobileAuthSection}>
            {session ? (
              <>
                <span className={styles.mobileUserName}>{session.user?.name}</span>
                <button onClick={() => { signOut(); closeMenu(); }} className={styles.mobileAuthBtn}>
                  Logout
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