'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const THEME_RETURN_PATH_KEY = 'themeReturnPath';

export default function ThemeSwitcher() {
    const [activeTheme, setActiveTheme] = useState('dark');
    const pathname = usePathname();
    const router = useRouter();

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

    const openOrCloseThemes = () => {
        if (pathname === '/themes') {
            const returnPath = sessionStorage.getItem(THEME_RETURN_PATH_KEY) || '/';
            sessionStorage.removeItem(THEME_RETURN_PATH_KEY);
            router.push(returnPath);
            return;
        }

        const currentPath = `${window.location.pathname}${window.location.search}`;
        sessionStorage.setItem(THEME_RETURN_PATH_KEY, currentPath || '/');
        router.push('/themes');
    };

    const isThemesPage = pathname === '/themes';

    return (
        <button
            type="button"
            onClick={openOrCloseThemes}
            className="theme-switcher-fab"
            title={isThemesPage ? 'Return to previous page' : 'Select Theme'}
            aria-label={isThemesPage ? 'Return to previous page' : 'Select Theme'}
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
                padding: 0,
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
                {isThemesPage ? (
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                ) : (
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                )}
            </svg>
            <style jsx>{`
        .theme-switcher-fab:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 0 20px ${getThemeColor()}80;
        }
        .theme-switcher-fab:focus-visible {
          outline: 3px solid ${getThemeColor()}66;
          outline-offset: 3px;
        }
        @media (max-width: 768px) {
          .theme-switcher-fab {
            bottom: var(--space-6);
            right: var(--space-4);
          }
        }
      `}</style>
        </button>
    );
}
