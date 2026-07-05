import Image from 'next/image';
import styles from './page.module.css';

export const metadata = {
    title: 'About',
    description: 'Learn more about S.P. Kumar Challa, his background in CSE, interests in Rust, and systems programming explorer.',
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
        <div style={{ width: '100%' }}>
            <div className={styles.heroBanner}>
                {/* 
                  Please rename your uploaded image to 'about-hero.png' 
                  and place it in the 'public/images/' folder!
                */}
                <Image 
                    src="/images/about-hero.png" 
                    alt="Curious. Persistent. Purposeful."
                    width={1920}
                    height={1080}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    priority
                    quality={100}
                />
            </div>
            
            <div className="container container--narrow">
            <div className={styles.page}>
                <header className={`animate-fade-in-up ${styles.header}`}>
                    <h1 className={styles.title}>About Me</h1>
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
                        . I am always open to discussing systems engineering, research, and new collaborations. You can reach me at:{' '}
                        <span style={{ display: 'inline-block', marginTop: 'var(--space-2)' }}>
                            {(() => {
                                const email = process.env.NEXT_PUBLIC_EMAIL || '';
                                if (!email) return '';
                                const [user, domain] = email.split('@');
                                
                                // Map English chars to visually similar Cyrillic, Greek, Armenian, and alternate Latin chars
                                const homoglyphs = {
                                    'a': 'а', 'c': 'с', 'e': 'е', 'o': 'о', 'p': 'р', 'x': 'х', 'y': 'у', 
                                    'i': 'і', 'j': 'ј', 's': 'ѕ', 'd': 'ԁ', 'h': 'һ', 'l': 'ӏ', 'w': 'ԝ',
                                    'v': 'ν', 'u': 'υ', 'k': 'κ', 'g': 'ɡ', 'n': 'ո', 'm': 'м', 't': 'т'
                                };
                                
                                const obfuscatedUser = user.split('').map(c => homoglyphs[c.toLowerCase()] || c).join('');
                                const safeDomain = domain ? domain.replace(/\./g, ' ]dot[ ') : '';
                                
                                return (
                                    <>
                                        <strong>{obfuscatedUser} ]at[ {safeDomain}</strong>
                                        <span style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-accent)', marginTop: '4px', fontStyle: 'italic' }}>
                                            (Please type the address manually; copying may preserve lookalike characters.)
                                        </span>
                                    </>
                                );
                            })()}
                        </span>
                    </p>
                </section>
            </div>
            </div>
        </div>
    );
}
