import Link from 'next/link';
import { getAllJournalEntries } from '../../lib/mdx-loader';
import styles from '../articles/page.module.css';

export const metadata = {
    title: 'Journal',
    description: 'Personal reflections on learning, studying, and ideas in progress.',
};

export default function JournalPage() {
    const entries = getAllJournalEntries();

    return (
        <div className="container container--narrow">
            <header className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Journal</h1>
                <p className="text-muted">Personal reflections — on studying, thinking, and ideas in progress.</p>
            </header>

            <ul className={styles.list} role="list">
                {entries.map((entry, i) => (
                    <li key={entry.slug} className={`animate-fade-in-up delay-${Math.min(i + 1, 5)}`}>
                        <Link href={`/journal/${entry.slug}`} className={styles.item}>
                            <div className={styles.itemLeft}>
                                <time className="text-sm text-faint">
                                    {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </time>
                                <h2 className={styles.itemTitle}>{entry.title}</h2>
                                <p className={`text-sm text-muted ${styles.itemSummary}`}>{entry.summary}</p>
                                <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)', flexWrap: 'wrap' }}>
                                    {entry.tags?.map(t => <span key={t} className="tag">{t}</span>)}
                                </div>
                            </div>
                            <span className={styles.arrow}>&rarr;</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
