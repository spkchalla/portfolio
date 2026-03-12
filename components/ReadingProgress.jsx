'use client';

import { useEffect, useRef } from 'react';
import styles from './ReadingProgress.module.css';

export default function ReadingProgress() {
    const barRef = useRef(null);

    useEffect(() => {
        const update = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            if (barRef.current) {
                barRef.current.style.width = `${Math.min(progress, 100)}%`;
            }
        };

        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, []);

    return (
        <div className={styles.track} aria-hidden="true">
            <div ref={barRef} className={styles.bar} />
        </div>
    );
}
