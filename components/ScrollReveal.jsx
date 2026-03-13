'use client';

import { useEffect, useRef } from 'react';

export default function ScrollReveal({
    children,
    animation = 'fade-up',
    delay = 0,
    threshold = 0.1,
    parallaxSpeed = 0
}) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add('is-visible');
                }
            },
            { threshold }
        );

        observer.observe(element);

        let animationFrameId;
        const handleScroll = () => {
            if (parallaxSpeed !== 0) {
                const scrolled = window.scrollY;
                const rect = element.getBoundingClientRect();
                const offset = (rect.top + scrolled) - window.innerHeight / 2;
                const move = (scrolled - offset) * parallaxSpeed;
                element.style.transform = `translateY(${move}px)`;
            }
        };

        if (parallaxSpeed !== 0) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            observer.disconnect();
            if (parallaxSpeed !== 0) {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [threshold, parallaxSpeed]);

    return (
        <div
            ref={ref}
            className={`reveal reveal-${animation}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
