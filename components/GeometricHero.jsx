'use client';

import { useEffect, useRef } from 'react';

export default function GeometricHero() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;

        const layers = [3, 5, 5, 3]; // Neural network layer architecture
        const nodes = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initNodes();
        };

        const initNodes = () => {
            nodes.length = 0;
            const layerSpacing = canvas.width / (layers.length + 1);

            layers.forEach((count, lIndex) => {
                const x = layerSpacing * (lIndex + 1);
                const nodeSpacing = canvas.height / (count + 1);

                for (let i = 0; i < count; i++) {
                    nodes.push({
                        x,
                        y: nodeSpacing * (i + 1),
                        baseY: nodeSpacing * (i + 1),
                        lIndex,
                        nIndex: i,
                        phase: Math.random() * Math.PI * 2,
                    });
                }
            });
        };

        window.addEventListener('resize', resize);
        resize();

        const animate = () => {
            time += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update node positions (symmetry/equivalent representation simulation)
            nodes.forEach(node => {
                // Nodes in the same layer "float" and swap influence
                node.y = node.baseY + Math.sin(time + node.phase) * 20;
            });

            // Draw connections
            ctx.lineWidth = 1;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const n1 = nodes[i];
                    const n2 = nodes[j];

                    // Only connect adjacent layers
                    if (n2.lIndex === n1.lIndex + 1) {
                        const dist = Math.sqrt((n1.x - n2.x) ** 2 + (n1.y - n2.y) ** 2);
                        const opacity = 0.15 * (1 - dist / (canvas.width / 2));

                        if (opacity > 0) {
                            ctx.beginPath();
                            ctx.moveTo(n1.x, n1.y);
                            ctx.lineTo(n2.x, n2.y);
                            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;

                            // Pulse effect on some connections
                            if ((n1.nIndex + n2.nIndex) % 3 === 0) {
                                ctx.strokeStyle = `rgba(59, 130, 246, ${opacity + Math.sin(time * 2) * 0.1})`;
                            }

                            ctx.stroke();
                        }
                    }
                }
            }

            // Draw nodes
            nodes.forEach(node => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = 'var(--color-accent)';
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'var(--color-accent)';
                ctx.fill();
                ctx.shadowBlur = 0;

                // Outer ring
                ctx.beginPath();
                ctx.arc(node.x, node.y, 8 + Math.sin(time + node.phase) * 2, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(59, 130, 246, 0.2)`;
                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                opacity: 0.4,
                zIndex: 0
            }}
        />
    );
}
