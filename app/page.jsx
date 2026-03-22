import Link from 'next/link';
import { getAllArticles, getAllProjects } from '../lib/mdx-loader';
import { buildContentIndex } from '../lib/content-index';
import Search from '../components/Search';
import MouseTracker from '../components/MouseTracker';
import GeometricHero from '../components/GeometricHero';
import ScrollReveal from '../components/ScrollReveal';
import styles from './page.module.css';

export default function HomePage() {
    const articles = getAllArticles().slice(0, 3);
    const projectsList = getAllProjects().slice(0, 3);
    const index = buildContentIndex();

    return (
        <div style={{ position: 'relative' }}>
            <MouseTracker />
            {/* Hero */}
            <section className={styles.hero}>
                <GeometricHero />
                <div className={styles.heroGradient}></div>

                {/* Parallax background blobs */}
                <ScrollReveal parallaxSpeed={-0.15}>
                    <div style={{
                        position: 'absolute',
                        top: '15%',
                        right: '8%',
                        width: '180px',
                        height: '180px',
                        background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
                        opacity: 0.08,
                        filter: 'blur(80px)',
                        zIndex: 0
                    }} />
                </ScrollReveal>
                <ScrollReveal parallaxSpeed={0.1}>
                    <div style={{
                        position: 'absolute',
                        bottom: '15%',
                        left: '8%',
                        width: '240px',
                        height: '240px',
                        background: 'radial-gradient(circle, #ff00c1 0%, transparent 70%)',
                        opacity: 0.08,
                        filter: 'blur(100px)',
                        zIndex: 0
                    }} />
                </ScrollReveal>

                <div className={styles.heroInner}>
                    <ScrollReveal animation="fade-up">
                        <span className={styles.heroEyebrow}>S.P.Kumar Challa</span>
                        <h1 className={`${styles.heroHeading} text-glitch`} data-text="Building Digital Experiences with Purpose">
                            Building Digital<br />Experiences with Purpose
                        </h1>
                        <p className={styles.heroSub}>
                            I’m S.P. Kumar Challa. I write about computer science, mathematics, and the systems I explore.
                        </p>
                        <div className={styles.heroActions}>
                            <Link href="/projects" className={styles.btnPrimary}>View Projects</Link>
                            <Link href="/about" className={styles.btnGhost}>About Me</Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <div className={`container ${styles.dividerWrap}`}>
                <hr className="divider" />
            </div>

            {/* Recent Articles */}
            <section className={`container ${styles.section}`}>
                <ScrollReveal animation="fade-left">
                    <div className={styles.sectionHeader}>
                        <p className="section-label">Recent Articles</p>
                        <Search index={index} />
                    </div>
                </ScrollReveal>
                <div className={styles.articleGrid}>
                    {articles.map((article, i) => (
                        <ScrollReveal key={article.slug} animation="fade-up" delay={i * 100}>
                            <Link
                                href={`/articles/${article.slug}`}
                                className={`card ${styles.articleCard}`}
                            >
                                <div className={styles.articleCardMeta}>
                                    <time className="text-sm text-muted">
                                        {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </time>
                                    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                                        {article.tags?.slice(0, 2).map(t => <span key={t} className="tag" style={{ background: 'var(--color-bg-subtle)' }}>{t}</span>)}
                                    </div>
                                </div>
                                <h2 className={styles.articleCardTitle}>{article.title}</h2>
                                <p className={`text-muted ${styles.articleCardSummary}`}>{article.summary}</p>
                                <span className={styles.readMore}>Read &rarr;</span>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
                <ScrollReveal animation="fade-up">
                    <Link href="/articles" className={styles.viewAll}>View all articles &rarr;</Link>
                </ScrollReveal>
            </section>

            <div className="container">
                <hr className="divider" />
            </div>

            {/* Projects */}
            <section className={`container ${styles.section}`}>
                <ScrollReveal animation="fade-right">
                    <p className="section-label">Projects</p>
                </ScrollReveal>
                <div className={styles.projectGrid}>
                    {projectsList.map((p, i) => (
                        <ScrollReveal key={p.slug} animation="fade-up" delay={i * 100}>
                            <Link
                                href={p.href || `/projects/${p.slug}`}
                                className={`card ${styles.projectCard}`}
                            >
                                <h3 className={styles.projectName}>{p.name || p.title}</h3>
                                <p className={`text-muted text-sm ${styles.projectDesc}`}>{p.description}</p>
                                <div className={styles.projectTags}>
                                    {p.tags.map(t => <span key={t} className="tag" style={{ background: 'var(--color-bg-subtle)' }}>{t}</span>)}
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
                <ScrollReveal animation="fade-up">
                    <Link href="/projects" className={styles.viewAll}>View all projects &rarr;</Link>
                </ScrollReveal>
            </section>
        </div>
    );
}
