import { visit } from 'unist-util-visit';

/**
 * Remark plugin to detect TikZ code inside math blocks and transform them into TikZ components.
 */
export default function remarkTikz() {
    return (tree) => {
        visit(tree, 'math', (node) => {
            // Check if the math block starts with tikzpicture
            if (node.value && (node.value.includes('\\begin{tikzpicture}') || node.value.includes('\\begin{circuitikz}'))) {
                // Transform the math node into an MDX JSX node
                node.type = 'mdxJsxFlowElement';
                node.name = 'TikZ';
                node.attributes = [
                    {
                        type: 'mdxJsxAttribute',
                        name: 'code',
                        value: node.value,
                    },
                ];
                node.children = [];
            }
        });
    };
}
