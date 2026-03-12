import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <p className={styles.copy}>
                    &copy; {year} {process.env.NEXT_PUBLIC_NAME || 'S.P. Kumar Challa'}. Built with Next.js and MDX.
                </p>
                <nav className={styles.links} aria-label="Footer links">
                    <a
                        href={process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/spkchalla'}
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                    <Link href="/articles" className={styles.link}>Articles</Link>
                    <Link href="/about" className={styles.link}>About</Link>
                </nav>
            </div>
        </footer>
    );
}
