import styles from './page.module.css';

export const metadata = {
    title: 'About',
    description: 'About S.P. Kumar Challa — CS student, systems enthusiast, and occasional writer.',
};

const interests = [
    'Neural Networks',
    'Mathematics',
    'Linux',
    'Projects in Rust',
    'Technical writing',
];

export default function AboutPage() {
    return (
        <div className="container container--narrow">
            <div className={styles.page}>
                <header className={`animate-fade-in-up ${styles.header}`}>
                    <h1 className={styles.title}>About</h1>
                </header>

                <div className={`animate-fade-in-up delay-1 prose ${styles.bio}`}>
                    <p>
                        I am {process.env.NEXT_PUBLIC_NAME || 'S.P. Kumar Challa'}, a Computer Science student with a focus on Neural Networks, Mathematics and Linux Systems.
                        I build tools, read source code, and write about what I find.
                    </p>
                    <p>
                        This site is where I publish technical articles on topics I am actively studying,
                        journal entries on the process of learning, and exploratory ideas — some of which become projects.
                    </p>
                    <p>
                        I am currently spending most of my time understanding how neural networks work at the deepest level possible,
                        writing Rust, and exploring mathematics.
                    </p>
                </div>

                <section className={`animate-fade-in-up delay-2 ${styles.section}`}>
                    <h2 className={styles.sectionTitle}>Current interests</h2>
                    <ul className={styles.interestList} role="list">
                        {interests.map(item => (
                            <li key={item} className={styles.interestItem}>
                                <span className={styles.bullet} aria-hidden="true" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className={`animate-fade-in-up delay-3 ${styles.section}`}>
                    <h2 className={styles.sectionTitle}>Contact</h2>
                    <p className="text-muted" style={{ fontSize: 'var(--text-base)' }}>
                        Find my work on{' '}
                        <a
                            href={process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/spkchalla'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link"
                        >
                            GitHub
                        </a>
                        . For anything else, reach out via GitHub issues or discussions on any of my repositories.
                    </p>
                </section>
            </div>
        </div>
    );
}
