import Link from 'next/link';
import { getAllJournalEntries } from '../../lib/mdx-loader';
import styles from './timeline.module.css';

export const metadata = {
    title: 'Journal',
    description: 'Direct log of my learning process, daily building, and technical progress.',
};

export default function JournalPage() {
    const entries = getAllJournalEntries();

    return (
        <div className="container container--narrow">
            <header style={{ marginBottom: 'var(--space-12)', textAlign: 'center' }}>
                <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>Journal</h1>
                <p className="text-muted">A log of my learning process and technical research.</p>
            </header>

            <div className={styles.timeline}>
                {entries.map((entry, i) => (
                    <div key={entry.slug} className={`${styles.item} animate-fade-in-up delay-${Math.min(i + 1, 5)}`}>
                        <div className={styles.dot} />
                        <Link href={`/journal/${entry.slug}`} className={styles.card}>
                            <time className={styles.date}>
                                {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </time>
                            <h2 className={styles.title}>{entry.title}</h2>
                            <p className={styles.summary}>{entry.summary}</p>
                            <div className={styles.tags}>
                                {entry.tags?.map(t => <span key={t} className="tag">{t}</span>)}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
