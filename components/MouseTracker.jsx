'use client';

import { useEffect } from 'react';

export default function MouseTracker() {
    useEffect(() => {
        const handleMouseMove = (e) => {
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate position relative to center for tilt (range -0.5 to 0.5)
                const xc = (x / rect.width) - 0.5;
                const yc = (y / rect.height) - 0.5;

                // Set variables for glow
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                // Set variables for 3D tilt
                card.style.setProperty('--tilt-x', `${yc * -20}deg`); // Invert Y for pitch
                card.style.setProperty('--tilt-y', `${xc * 20}deg`);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return null;
}
