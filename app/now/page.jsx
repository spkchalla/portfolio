import styles from './page.module.css';

export const metadata = {
    title: 'Now',
    description: 'What S.P. Kumar Challa is focused on right now.',
};

export default function NowPage() {
    return (
        <div className="container container--narrow">
            <header className={`animate-fade-in-up ${styles.header}`}>
                <h1 className={styles.title}>What I'm doing now</h1>
                <p className="text-muted">Updated March 2026</p>
            </header>

            <div className={`animate-fade-in-up delay-1 ${styles.content}`}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Primary Focus</h2>
                    <p className="prose">
                        Deep-diving into <strong>neural networks from a geometric perspective</strong>.
                        Specifically, I'm exploring the idea of equivalent representations and how
                        internal symmetries influence learning dynamics.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Building</h2>
                    <ul className={styles.list}>
                        <li>
                            <strong>Rust Password Manager:</strong> Strengthening my understanding of systems
                            programming, memory safety, and cryptography by building a CLI tool from scratch.
                        </li>
                        <li>
                            <strong>MenU:</strong> Maintaining and refining my full-stack menu management
                            system to further reduce friction in daily planning.
                        </li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Studying</h2>
                    <p className="prose">
                        Working through <em>Foundations of Data Science</em> to ground my empirical
                        observations in rigorous theory. I'm particularly interested in the high-dimensional
                        geometry of data.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Exploring</h2>
                    <p className="prose">
                        Following any system internal that catches my attention. Currently, that involves
                        a lot of source code reading and understanding how complex systems (like compilers
                        and kernels) handle the abstractions we use every day.
                    </p>
                </section>
            </div>
        </div>
    );
}
