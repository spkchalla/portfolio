import Link from 'next/link';
import { getAllArticles } from '../../lib/mdx-loader';
import { buildContentIndex } from '../../lib/content-index';
import Search from '../../components/Search';
import styles from './page.module.css';

export const metadata = {
    title: 'Articles',
    description: 'Technical writing on Linux internals, systems programming, and computer science.',
};

export default function ArticlesPage() {
    const articles = getAllArticles();
    const index = buildContentIndex();

    return (
        <div className="container container--narrow">
            <header className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Articles</h1>
                <p className="text-muted">Technical writing on Linux, systems programming, and CS fundamentals.</p>
                <div style={{ marginTop: 'var(--space-4)' }}>
                    <Search index={index} />
                </div>
            </header>

            <ul className={styles.list} role="list">
                {articles.map((article, i) => (
                    <li key={article.slug} className={`animate-fade-in-up delay-${Math.min(i + 1, 5)}`}>
                        <Link href={`/articles/${article.slug}`} className={styles.item}>
                            <div className={styles.itemLeft}>
                                <time className="text-sm text-faint">
                                    {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </time>
                                <h2 className={styles.itemTitle}>{article.title}</h2>
                                <p className={`text-sm text-muted ${styles.itemSummary}`}>{article.summary}</p>
                                <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)', flexWrap: 'wrap' }}>
                                    {article.tags?.map(t => <span key={t} className="tag">{t}</span>)}
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
