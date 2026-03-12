import createMDX from '@next/mdx';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

const prettyCodeOptions = {
    theme: 'github-dark',
    keepBackground: true,
};

const withMDX = createMDX({
    options: {
        remarkPlugins: [remarkMath, remarkGfm],
        rehypePlugins: [
            [rehypePrettyCode, prettyCodeOptions],
            rehypeKatex,
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ],
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
    experimental: {
        mdxRs: false,
    },
};

export default withMDX(nextConfig);
