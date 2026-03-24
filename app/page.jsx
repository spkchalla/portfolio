import Link from 'next/link';
import { getAllArticles, getAllProjects, getAllSideQuests } from '../lib/mdx-loader';
import { buildContentIndex } from '../lib/content-index';
import Search from '../components/Search';
import MouseTracker from '../components/MouseTracker';
import GeometricHero from '../components/GeometricHero';
import ScrollReveal from '../components/ScrollReveal';
import styles from './page.module.css';

export default function HomePage() {
    const articles = getAllArticles().slice(0, 3);
    const projectsList = getAllProjects().slice(0, 3);
    const sideQuestsList = getAllSideQuests().slice(0, 3);
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
                        <h1 className={`${styles.heroHeading} text-glitch`} data-text="Systems, Rust, and Research">
                            Systems, Rust,<br />and Research
                        </h1>
                        <p className={styles.heroSub}>
                            I’m S.P. Kumar Challa. I build secure tools in <strong>Rust</strong>, explore <strong>Linux</strong> systems, and research the geometry of <strong>neural networks</strong>.
                        </p>
                        {/* Hidden SEO keywords for indexers, using aria-hidden to avoid screen reader clutter */}
                        <div style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: '0' }} aria-hidden="true">
                            Shanmukha Padma Kumar Challa (spkchalla / SPK Challa)
                        </div>
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

            <section className={`container ${styles.section}`}>
                <ScrollReveal animation="fade-right">
                    <p className="section-label">Key Projects</p>
                </ScrollReveal>
                <div className={styles.projectGrid}>
                    {projectsList.map((project, i) => (
                        <ScrollReveal key={project.slug} animation="fade-up" delay={i * 100}>
                            <Link
                                href={`/projects/${project.slug}`}
                                className={`card ${styles.projectCard}`}
                            >
                                <h3 className={styles.projectName}>{project.title}</h3>
                                <p className={`text-muted text-sm ${styles.projectDesc}`}>
                                    {project.description}
                                </p>
                                <div className={styles.projectTags}>
                                    {project.tags?.slice(0, 3).map(tag => (
                                        <span key={tag} className="tag" style={{ background: 'var(--color-bg-subtle)' }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <span className={styles.readMore} style={{ marginTop: 'auto' }}>View Details &rarr;</span>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
                <ScrollReveal animation="fade-up">
                    <Link href="/projects" className={styles.viewAll}>View all projects &rarr;</Link>
                </ScrollReveal>
            </section>

            <div className="container">
                <hr className="divider" />
            </div>

            {/* Side Quests */}
            <section className={`container ${styles.section}`}>
                <ScrollReveal animation="fade-left">
                    <p className="section-label">Side Quests</p>
                </ScrollReveal>
                <div className={styles.projectGrid}>
                    {sideQuestsList.map((quest, i) => (
                        <ScrollReveal key={quest.slug} animation="fade-up" delay={i * 100}>
                            <Link
                                href={`/side-quests/${quest.slug}`}
                                className={`card ${styles.projectCard}`}
                            >
                                <h3 className={styles.projectName}>{quest.title}</h3>
                                <p className={`text-muted text-sm ${styles.projectDesc}`}>
                                    {quest.summary || quest.description}
                                </p>
                                <div className={styles.projectTags}>
                                    {quest.tags?.slice(0, 3).map(tag => (
                                        <span key={tag} className="tag" style={{ background: 'var(--color-bg-subtle)' }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <span className={styles.readMore} style={{ marginTop: 'auto' }}>Read Article &rarr;</span>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
                <ScrollReveal animation="fade-up">
                    <Link href="/side-quests" className={styles.viewAll}>View all side quests &rarr;</Link>
                </ScrollReveal>
            </section>
        </div>
    );
}
