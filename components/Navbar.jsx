'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/articles', label: 'Articles' },
    { href: '/notes', label: 'Notes' },
    { href: '/journal', label: 'Journal' },
    { href: '/now', label: 'Now' },
    { href: '/projects', label: 'Projects' },
    { href: '/side-quests', label: 'Side Quests' },
    { href: '/unfiltered', label: 'Unfiltered' },
    { href: '/about', label: 'About' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <nav className={styles.nav} aria-label="Main navigation">
                <Link href="/" className={styles.logo} aria-label="Home">
                    <span className={styles.logoText}>S.P.KUMAR</span>
                </Link>

                {/* Desktop links */}
                <ul className={styles.links} role="list">
                    {navLinks.map(({ href, label }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`${styles.link} ${pathname === href || (href !== '/' && pathname.startsWith(href)) ? styles.active : ''}`}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className={styles.actions}>
                    <ThemeToggle />
                    {/* Mobile menu button */}
                    <button
                        className={styles.menuBtn}
                        onClick={() => setMenuOpen(prev => !prev)}
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    >
                        <span className={`${styles.menuBar} ${menuOpen ? styles.bar1Open : ''}`} />
                        <span className={`${styles.menuBar} ${menuOpen ? styles.bar2Open : ''}`} />
                        <span className={`${styles.menuBar} ${menuOpen ? styles.bar3Open : ''}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div className={styles.mobileMenu}>
                    <ul role="list">
                        {navLinks.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={`${styles.mobileLink} ${pathname === href || (href !== '/' && pathname.startsWith(href)) ? styles.active : ''}`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
