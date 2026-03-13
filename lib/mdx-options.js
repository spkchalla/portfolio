import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

export const mdxOptions = {
    mdxOptions: {
        remarkPlugins: [remarkMath, remarkGfm],
        rehypePlugins: [
            [rehypePrettyCode, { theme: 'github-dark', keepBackground: true }],
            rehypeKatex,
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ],
    },
};
