import Link from 'next/link';
import { getAllNotes } from '../../lib/mdx-loader';
import styles from '../journal/timeline.module.css';

export const metadata = {
    title: 'Research Notes',
    description: 'Technical notes and study reflections on systems and mathematics.',
};

export default function NotesPage() {
    const notes = getAllNotes();

    return (
        <div className="container container--narrow">
            <header style={{ marginBottom: 'var(--space-12)', textAlign: 'center' }}>
                <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>Research Notes</h1>
                <p className="text-muted">A digital garden of my technical explorations and study materials.</p>
            </header>

            <div className={styles.timeline}>
                {notes.map((note, i) => (
                    <div key={note.slug} className={`${styles.item} animate-fade-in-up delay-${Math.min(i + 1, 5)}`}>
                        <div className={styles.dot} />
                        <Link href={`/notes/${note.slug}`} className={styles.card}>
                            <time className={styles.date}>
                                {new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </time>
                            <h2 className={styles.title}>{note.title}</h2>
                            <p className={styles.summary}>{note.summary}</p>
                            <div className={styles.tags}>
                                {note.tags?.map(t => <span key={t} className="tag">{t}</span>)}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
