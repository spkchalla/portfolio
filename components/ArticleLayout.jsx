'use client';

import { useEffect, useState, useRef } from 'react';
import ReadingProgress from './ReadingProgress';
import styles from './ArticleLayout.module.css';

function TableOfContents({ headings }) {
    const [active, setActive] = useState('');

    useEffect(() => {
        if (!headings?.length) return;
        const observer = new IntersectionObserver(
            entries => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                        break;
                    }
                }
            },
            { rootMargin: '-10% 0px -80% 0px' }
        );
        const els = headings.map(h => document.getElementById(h.id)).filter(Boolean);
        els.forEach(el => observer.observe(el));
        return () => els.forEach(el => observer.unobserve(el));
    }, [headings]);

    if (!headings?.length) return null;

    return (
        <nav className={styles.toc} aria-label="Table of contents">
            <p className={styles.tocLabel}>On this page</p>
            <ul>
                {headings.map(h => (
                    <li key={h.id} className={h.depth === 3 ? styles.tocIndent : ''}>
                        <a
                            href={`#${h.id}`}
                            className={`${styles.tocLink} ${active === h.id ? styles.tocActive : ''}`}
                        >
                            {h.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default function ArticleLayout({ frontmatter, children, headings }) {
    const { title, date, tags, summary } = frontmatter ?? {};

    const formattedDate = date
        ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : null;

    return (
        <>
            <ReadingProgress />
            <div className={styles.wrapper}>
                {/* Article body */}
                <article className={styles.article}>
                    <header className={styles.header}>
                        <div className={styles.titleRow}>
                            <h1 className={styles.title}>{title}</h1>
                            {frontmatter.github && (
                                <a
                                    href={frontmatter.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.githubLink}
                                    title="View on GitHub"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                    </svg>
                                    <span>GitHub</span>
                                </a>
                            )}
                        </div>
                        <div className={styles.meta}>
                            {formattedDate && <time dateTime={date} className={styles.date}>{formattedDate}</time>}
                            {tags?.length > 0 && (
                                <div className={styles.tags}>
                                    {tags.map(tag => (
                                        <span key={tag} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                        {summary && <p className={styles.summary}>{summary}</p>}
                    </header>

                    <div className="prose">
                        {children}
                    </div>
                </article>

                {/* Sidebar ToC */}
                <aside className={styles.sidebar}>
                    <div className={styles.stickyBox}>
                        <TableOfContents headings={headings} />
                    </div>
                </aside>
            </div>
        </>
    );
}
