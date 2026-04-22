import Mermaid from './Mermaid';

import { MDXImage } from './MDXImage';

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

const Note = ({ children, title = "Note" }) => (
    <div className="callout callout--note">
        <div className="callout-header">
            <span aria-hidden="true">ℹ</span> {title}
        </div>
        {children}
    </div>
);

export const mdxComponents = {
    Image: MDXImage,
    Mermaid: Mermaid,
    Problem,
    Solution,
    Note,
};
