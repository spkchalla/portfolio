import Link from 'next/link';
import { getAllUnfiltered } from '../../lib/mdx-loader';
import styles from '../journal/timeline.module.css';

export const metadata = {
    title: 'Unfiltered',
    description: 'Raw thoughts, interests, ideas, feelings, and opinions.',
};

export default function UnfilteredPage() {
    const posts = getAllUnfiltered();

    return (
        <div className="container container--narrow">
            <header style={{ marginBottom: 'var(--space-12)', textAlign: 'center' }}>
                <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>Unfiltered</h1>
                <p className="text-muted">A space for my interests, thoughts, and raw opinions.</p>
            </header>

            <div className={styles.timeline}>
                {posts.map((post, i) => (
                    <div key={post.slug} className={`${styles.item} animate-fade-in-up delay-${Math.min(i + 1, 5)}`}>
                        <div className={styles.dot} />
                        <Link href={`/unfiltered/${post.slug}`} className={styles.card}>
                            <time className={styles.date}>
                                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </time>
                            <h2 className={styles.title}>{post.title}</h2>
                            <p className={styles.summary}>{post.summary}</p>
                            <div className={styles.tags}>
                                {post.tags?.map(t => <span key={t} className="tag">{t}</span>)}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
