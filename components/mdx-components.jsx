import Mermaid from './Mermaid';

const Problem = ({ children }) => (
    <div className="callout callout--problem">
        <div className="callout-header">
            <span aria-hidden="true">✕</span> The Friction
        </div>
        {children}
    </div>
);

const Solution = ({ children }) => (
    <div className="callout callout--solution">
        <div className="callout-header">
            <span aria-hidden="true">✓</span> The System
        </div>
        {children}
    </div>
);

export const mdxComponents = {
    // ... items from previous turn
    Mermaid: Mermaid,
    Problem,
    Solution,
};
