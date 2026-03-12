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
                        <h1 className={styles.title}>{title}</h1>
                        <div className={styles.meta}>
                            {formattedDate && <time dateTime={date} className={styles.date}>{formattedDate}</time>}
                            {tags?.length > 0 && (
                                <div className={styles.tags}>
                                    {tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
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
