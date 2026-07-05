'use client';

export default function Divider() {
    return (
        <div style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)',
            margin: 'var(--space-7) 0',
            opacity: 0.6,
            boxShadow: '0 0 10px var(--color-glow)'
        }} aria-hidden="true" />
    );
}
