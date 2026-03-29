import Link from 'next/link';
import styles from '../styles/footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand */}
        <div className={styles.brand}>
          <h2>MyApp</h2>
          <p>Building modern web experiences.</p>
        </div>

        {/* Navigation */}
        <div className={styles.links}>
          <div>
            <h4>Company</h4>
            <Link href="/about">About</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div>
            <h4>Resources</h4>
            <Link href="/blog">Blog</Link>
            <Link href="/docs">Docs</Link>
            <Link href="/support">Support</Link>
          </div>

          <div>
            <h4>Legal</h4>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        <span>© {currentYear} MyApp. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;