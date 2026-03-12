import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { getContentBySlug, getSlugsForType } from '../../../lib/mdx-loader';
import ArticleLayout from '../../../components/ArticleLayout';

export async function generateStaticParams() {
    return getSlugsForType('articles');
}

export async function generateMetadata({ params }) {
    try {
        const { frontmatter } = getContentBySlug('articles', params.slug);
        return {
            title: frontmatter.title,
            description: frontmatter.summary,
        };
    } catch {
        return {};
    }
}

// Extract headings from MDX content string for ToC
function extractHeadings(content) {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const headings = [];
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
        const depth = match[1].length;
        const text = match[2].replace(/\*+/g, '').trim();
        const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
        headings.push({ depth, text, id });
    }
    return headings;
}

const mdxOptions = {
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

export default function ArticlePage({ params }) {
    let frontmatter, content;
    try {
        ({ frontmatter, content } = getContentBySlug('articles', params.slug));
    } catch {
        notFound();
    }

    const headings = extractHeadings(content);

    return (
        <ArticleLayout frontmatter={frontmatter} headings={headings}>
            <MDXRemote source={content} options={mdxOptions} />
        </ArticleLayout>
    );
}
