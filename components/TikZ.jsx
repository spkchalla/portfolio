'use client';

import React from 'react';

/**
 * TikZ component that renders TikZ code using tikzjax.
 * It wraps the code in a <script type="text/tikz"> tag which tikzjax picks up.
 */
const TikZ = ({ code }) => {
    // Basic cleanup of the code to ensure it's valid TikZ if it came from a math block
    const cleanCode = code.trim();

    return (
        <div className="tikz-container" style={{
            margin: '2rem 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflowX: 'auto',
            width: '100%'
        }}>
            <script type="text/tikz">
                {cleanCode}
            </script>
        </div>
    );
};

export default TikZ;
