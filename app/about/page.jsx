import styles from './page.module.css';

export const metadata = {
    title: 'About',
    description: 'About S.P. Kumar Challa — CS student, systems enthusiast, and occasional writer.',
};

const interests = [
    'Neural Networks (Geometric Perspective)',
    'Systems Programming (Rust)',
    'Mathematical Models',
    'Foundations of Data Science',
    'Internal Mechanics',
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
                        I’m Shanmukha Padma Kumar Challa, a CSE student exploring how systems and mathematical models work beneath the surface.
                    </p>
                    <p>
                        Right now, I’m focused on neural networks from a geometric perspective, particularly around the idea of equivalent representations. Alongside that, I’m working in Rust by building a password manager and strengthening my understanding of systems through hands-on work. I’m also studying concepts from <em>Foundations of Data Science</em> to ground this exploration in theory.
                    </p>
                    <p>
                        I tend to build things either to understand something properly or to remove friction I’ve personally experienced. Projects like MenU came out of that—taking a small but recurring problem and turning it into a simple, usable system.
                    </p>
                    <p>
                        My approach is problem-driven. I go as deep as needed to solve what’s in front of me, and if something continues to hold my attention, I follow it further. I’m particularly drawn to understanding internals—how things actually work rather than just how to use them.
                    </p>
                    <p>
                        Over time, I aim to move deeper into systems and research-oriented work, whether that takes shape through engineering or more theoretical exploration.
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
