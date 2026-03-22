'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad: true,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'var(--font-sans)',
});

export default function Mermaid({ chart }) {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            mermaid.contentLoaded();
        }
    }, [chart]);

    return (
        <div className="mermaid-container" style={{ margin: 'var(--space-8) 0', display: 'flex', justifyContent: 'center' }}>
            <div className="mermaid" ref={ref}>
                {chart}
            </div>
        </div>
    );
}
