import { getAllSideQuests } from '../../lib/mdx-loader';
import ScrollReveal from '../../components/ScrollReveal';
import styles from '../projects/page.module.css';

const statusColors = {
    Active: { bg: 'rgba(74,222,128,0.1)', color: '#4ade80', border: 'rgba(74,222,128,0.3)' },
    'In progress': { bg: 'var(--color-accent-light)', color: 'var(--color-accent)', border: 'rgba(200,100,10,0.3)' },
    Experimental: { bg: 'var(--color-bg-subtle)', color: 'var(--color-text-muted)', border: 'var(--color-border)' },
};

export const metadata = {
    title: 'Side Quests',
    description: 'Personal experiments, hobby projects, and creative explorations.',
};

export default function SideQuestsPage() {
    const sideQuests = getAllSideQuests();

    return (
        <div className="container container--narrow">
            <header style={{ marginBottom: 'var(--space-12)' }}>
                <ScrollReveal animation="fade-up">
                    <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--weight-bold)', marginBottom: 'var(--space-2)' }}>Side Quests</h1>
                    <p className="text-muted">Personal experiments, hobby projects, and creative explorations.</p>
                </ScrollReveal>
            </header>

            <div className={styles.grid}>
                {sideQuests.map((quest, i) => {
                    const status = statusColors[quest.status] || statusColors.Experimental;
                    return (
                        <ScrollReveal key={quest.slug} animation="fade-up" delay={i * 50}>
                            <a
                                href={`/side-quests/${quest.slug}`}
                                className={`card ${styles.card}`}
                            >
                                <div className={styles.cardHeader}>
                                    <h2 className={styles.projectName}>{quest.title || quest.name}</h2>
                                    <span
                                        className={styles.status}
                                        style={{ background: status.bg, color: status.color, border: `1px solid ${status.border}` }}
                                    >
                                        {quest.status}
                                    </span>
                                </div>
                                <p className={`text-muted ${styles.description}`}>{quest.summary || quest.description}</p>
                                <div className={styles.tags}>
                                    {(quest.tags || []).map(t => <span key={t} className="tag">{t}</span>)}
                                </div>
                            </a>
                        </ScrollReveal>
                    );
                })}
            </div>
        </div>
    );
}
