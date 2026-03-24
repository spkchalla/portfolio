'use client';

import { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';
import styles from './Search.module.css';

import { createPortal } from 'react-dom';

const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const typeLabels = {
    articles: 'Article',
    journal: 'Journal',
    ideas: 'Idea',
    'side-quests': 'Side Quest',
    projects: 'Project',
    notes: 'Note'
};
const typeHrefs = {
    articles: '/articles',
    journal: '/journal',
    ideas: '/ideas',
    'side-quests': '/side-quests',
    projects: '/projects',
    notes: '/notes'
};

export default function Search({ index }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    const fuse = useRef(null);
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        fuse.current = new Fuse(index, {
            keys: ['title', 'summary', 'tags'],
            threshold: 0.35,
            includeScore: true,
        });
    }, [index]);

    // Scroll lock
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    // Keyboard shortcut Cmd/Ctrl+K
    useEffect(() => {
        const handler = e => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setOpen(true);
                setTimeout(() => inputRef.current?.focus(), 50);
            }
            if (e.key === 'Escape') {
                setOpen(false);
                setQuery('');
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    // Click outside to close (fallback for backdrop)
    useEffect(() => {
        const handler = e => {
            if (containerRef.current && !containerRef.current.contains(e.target) && !e.target.closest('#search-trigger')) {
                // setOpen(false); // Backdrop handles it now, let's keep it safe
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleChange = e => {
        const q = e.target.value;
        setQuery(q);
        if (q.trim() && fuse.current) {
            setResults(fuse.current.search(q).slice(0, 6).map(r => r.item));
        } else {
            setResults([]);
        }
    };

    const searchModal = open && mounted ? (
        <div className={styles.modalRoot}>
            <div className={styles.backdrop} onClick={() => setOpen(false)} aria-hidden="true" />
            <div className={styles.panel} role="dialog" aria-label="Search" ref={containerRef}>
                <div className={styles.inputRow}>
                    <SearchIcon />
                    <input
                        ref={inputRef}
                        className={styles.input}
                        type="search"
                        placeholder="Search articles, journal, ideas..."
                        value={query}
                        onChange={handleChange}
                        autoComplete="off"
                        aria-label="Search query"
                    />
                </div>

                {query.trim() && (
                    <ul className={styles.results} role="listbox">
                        {results.length === 0 ? (
                            <li className={styles.empty}>No results for &ldquo;{query}&rdquo;</li>
                        ) : (
                            results.map(item => (
                                <li key={`${item.type}-${item.slug}`}>
                                    <Link
                                        href={`${typeHrefs[item.type]}/${item.slug}`}
                                        className={styles.result}
                                        onClick={() => { setOpen(false); setQuery(''); }}
                                    >
                                        <span className={styles.resultTitle}>{item.title}</span>
                                        <div className={styles.resultMeta}>
                                            <span className="tag">{typeLabels[item.type]}</span>
                                            {item.date && (
                                                <span className={styles.resultDate}>
                                                    {new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>
        </div>
    ) : null;

    return (
        <div className={styles.root}>
            <button
                className={styles.trigger}
                onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
                aria-label="Search"
                id="search-trigger"
            >
                <SearchIcon />
                <span className={styles.triggerText}>Search</span>
                <kbd className={styles.kbd}>⌘K</kbd>
            </button>

            {mounted && typeof document !== 'undefined' && searchModal ? createPortal(searchModal, document.body) : null}
        </div>
    );
}
