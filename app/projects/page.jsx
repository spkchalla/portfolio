import { getAllProjects } from '../../lib/mdx-loader';
import styles from './page.module.css';

const statusColors = {
    Active: { bg: 'rgba(74,222,128,0.1)', color: '#4ade80', border: 'rgba(74,222,128,0.3)' },
    'In progress': { bg: 'var(--color-accent-light)', color: 'var(--color-accent)', border: 'rgba(200,100,10,0.3)' },
    Experimental: { bg: 'var(--color-bg-subtle)', color: 'var(--color-text-muted)', border: 'var(--color-border)' },
};

export default function ProjectsPage() {
    const projects = getAllProjects();
    return (
        <div className="container container--narrow">
            <header className={styles.header}>
                <h1 className={styles.title}>Projects</h1>
                <p className="text-muted">Things I have built — systems tools, research experiments, and explorations.</p>
            </header>

            <div className={styles.grid}>
                {projects.map((project, i) => {
                    const status = statusColors[project.status];
                    return (
                        <a
                            key={project.slug}
                            href={project.href || `/projects/${project.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`card animate-fade-in-up delay-${i + 1} ${styles.card}`}
                        >
                            <div className={styles.cardHeader}>
                                <h2 className={styles.projectName}>{project.name}</h2>
                                <span
                                    className={styles.status}
                                    style={{ background: status.bg, color: status.color, border: `1px solid ${status.border}` }}
                                >
                                    {project.status}
                                </span>
                            </div>
                            <p className={`text-muted ${styles.description}`}>{project.description}</p>
                            <div className={styles.tags}>
                                {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
