import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getContentBySlug, getSlugsForType } from '../../../lib/mdx-loader';
import { mdxOptions } from '../../../lib/mdx-options';
import ArticleLayout from '../../../components/ArticleLayout';
import { mdxComponents } from '../../../components/mdx-components';

export async function generateStaticParams() {
    return getSlugsForType('articles');
}

export async function generateMetadata({ params }) {
    try {
        const { slug } = await params;
        const { frontmatter } = getContentBySlug('articles', slug);
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

export default async function ArticlePage({ params }) {
    let frontmatter, content;
    try {
        const { slug } = await params;
        ({ frontmatter, content } = getContentBySlug('articles', slug));
    } catch {
        notFound();
    }

    const headings = extractHeadings(content);

    return (
        <ArticleLayout frontmatter={frontmatter} headings={headings}>
            <MDXRemote components={mdxComponents} source={content} options={mdxOptions} />
        </ArticleLayout>
    );
}
