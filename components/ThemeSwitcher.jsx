'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
    const [activeTheme, setActiveTheme] = useState('dark');

    useEffect(() => {
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        setActiveTheme(theme);

        const observer = new MutationObserver(() => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            setActiveTheme(currentTheme);
        });

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    const getThemeColor = () => {
        switch (activeTheme) {
            case 'nature': return '#2e7d32';
            case 'midnight': return '#38bdf8';
            case 'volcanic': return '#ff4d00';
            case 'light': return '#0066cc';
            default: return '#3b82f6';
        }
    };

    return (
        <Link
            href="/themes"
            className="theme-switcher-fab"
            title="Select Theme"
            style={{
                position: 'fixed',
                bottom: 'var(--space-8)',
                right: 'var(--space-6)',
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-surface)',
                border: `2px solid ${getThemeColor()}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                boxShadow: 'var(--shadow-md)',
                transition: 'all var(--duration-normal) var(--ease-premium)',
                cursor: 'pointer'
            }}
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={getThemeColor()}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <style jsx>{`
        .theme-switcher-fab:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 0 20px ${getThemeColor()}80;
        }
        @media (max-width: 768px) {
          .theme-switcher-fab {
            bottom: var(--space-6);
            right: var(--space-4);
          }
        }
      `}</style>
        </Link>
    );
}
