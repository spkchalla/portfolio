'use client';

import { useEffect, useState } from 'react';
import styles from './themes.module.css';

const THEMES = [
    { id: 'dark', name: 'Ultra Dark', color: '#050505', accent: '#3b82f6', desc: 'The refined original workspace.' },
    { id: 'light', name: 'Paper White', color: '#f5f5f7', accent: '#0066cc', desc: 'Clean, crisp, and professional.' },
    { id: 'nature', name: 'Forest Moss', color: '#0d1a15', accent: '#2e7d32', desc: 'Organic tones for deep focus.' },
    { id: 'midnight', name: 'Deep Ocean', color: '#020617', accent: '#38bdf8', desc: 'Futuristic midnight blues.' },
    { id: 'volcanic', name: 'Magma Ash', color: '#0c0000', accent: '#ff4d00', desc: 'High energy, high contrast.' },
];

export default function ThemesPage() {
    const [currentTheme, setCurrentTheme] = useState('dark');

    useEffect(() => {
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        setCurrentTheme(theme);
    }, []);

    const selectTheme = (id) => {
        document.documentElement.setAttribute('data-theme', id);
        localStorage.setItem('theme', id);
        setCurrentTheme(id);
    };

    return (
        <div className="container container--narrow">
            <header style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }}>
                <h1 className="text-4xl font-heading" style={{ marginBottom: 'var(--space-2)' }}>Select Workspace Aesthetic</h1>
                <p className="text-muted">Choose the color palette that best fits your current environment.</p>
            </header>

            <div className={styles.themeGrid}>
                {THEMES.map((theme) => (
                    <button
                        key={theme.id}
                        onClick={() => selectTheme(theme.id)}
                        className={`${styles.themeCard} ${currentTheme === theme.id ? styles.active : ''}`}
                        style={{ '--theme-accent': theme.accent, '--theme-bg': theme.color }}
                    >
                        <div className={styles.preview}>
                            <div className={styles.circle} style={{ backgroundColor: theme.accent }}></div>
                            <div className={styles.line}></div>
                            <div className={styles.line} style={{ width: '60%' }}></div>
                        </div>
                        <div className={styles.info}>
                            <h3 className={styles.name}>{theme.name}</h3>
                            <p className={styles.desc}>{theme.desc}</p>
                        </div>
                        {currentTheme === theme.id && <span className={styles.check}>✓</span>}
                    </button>
                ))}
            </div>

            <style jsx>{`
        .container {
           padding-top: var(--space-8);
           padding-bottom: var(--space-9);
        }
      `}</style>
        </div>
    );
}
