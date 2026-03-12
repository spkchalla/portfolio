import Link from 'next/link';
import { getAllArticles, getAllProjects } from '../lib/mdx-loader';
import { buildContentIndex } from '../lib/content-index';
import Search from '../components/Search';
import styles from './page.module.css';

export default function HomePage() {
    const articles = getAllArticles().slice(0, 3);
    const projectsList = getAllProjects().slice(0, 3);
    const index = buildContentIndex();

    return (
        <>
            {/* Hero */}
            <section className={`container container--narrow ${styles.hero}`}>
                <div className={`animate-fade-in-up ${styles.heroInner}`}>
                    <p className={styles.heroEyebrow}>S.P.Kumar Challa</p>
                    <h1 className={styles.heroHeading}>
                        I’m S.P. Kumar Challa. I write about computer science, mathematics, and the systems I explore.
                    </h1>
                    <p className={styles.heroSub}>
                        Computer Science student. I build tools, Learn math and science, and publish notes on what I find.
                    </p>
                    <div className={styles.heroActions}>
                        <Link href="/articles" className={styles.btnPrimary}>Read Articles</Link>
                        <Link href="/about" className={styles.btnGhost}>About me</Link>
                    </div>
                </div>
            </section>

            <div className={`container ${styles.dividerWrap}`}>
                <hr className="divider" />
            </div>

            {/* Recent Articles */}
            <section className={`container ${styles.section}`}>
                <div className={styles.sectionHeader}>
                    <p className="section-label">Recent Articles</p>
                    <Search index={index} />
                </div>
                <div className={styles.articleGrid}>
                    {articles.map((article, i) => (
                        <Link
                            href={`/articles/${article.slug}`}
                            key={article.slug}
                            className={`card animate-fade-in-up delay-${i + 1} ${styles.articleCard}`}
                        >
                            <div className={styles.articleCardMeta}>
                                <time className="text-sm text-muted">
                                    {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </time>
                                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                                    {article.tags?.slice(0, 2).map(t => <span key={t} className="tag">{t}</span>)}
                                </div>
                            </div>
                            <h2 className={styles.articleCardTitle}>{article.title}</h2>
                            <p className={`text-muted ${styles.articleCardSummary}`}>{article.summary}</p>
                            <span className={styles.readMore}>Read &rarr;</span>
                        </Link>
                    ))}
                </div>
                <Link href="/articles" className={styles.viewAll}>View all articles &rarr;</Link>
            </section>

            <div className="container">
                <hr className="divider" />
            </div>

            {/* Projects */}
            <section className={`container ${styles.section}`}>
                <p className="section-label">Projects</p>
                <div className={styles.projectGrid}>
                    {projectsList.map((p, i) => (
                        <Link
                            href={p.href || `/projects/${p.slug}`}
                            key={p.slug}
                            className={`card animate-fade-in-up delay-${i + 1} ${styles.projectCard}`}
                        >
                            <h3 className={styles.projectName}>{p.name || p.title}</h3>
                            <p className={`text-muted text-sm ${styles.projectDesc}`}>{p.description}</p>
                            <div className={styles.projectTags}>
                                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                            </div>
                        </Link>
                    ))}
                </div>
                <Link href="/projects" className={styles.viewAll}>View all projects &rarr;</Link>
            </section>
        </>
    );
}
