import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ArticleLayout from '../../../components/ArticleLayout';
import { mdxComponents } from '../../../components/mdx-components';
import { getContentBySlug, getSlugsForType } from '../../../lib/mdx-loader';
import { mdxOptions } from '../../../lib/mdx-options';

export async function generateStaticParams() {
    return getSlugsForType('projects');
}

export async function generateMetadata({ params }) {
    try {
        const { slug } = await params;
        const { frontmatter } = getContentBySlug('projects', slug);
        const title = frontmatter.title;
        const description = frontmatter.summary || frontmatter.description;
        const keywords = frontmatter.tags || [];

        return {
            title,
            description,
            keywords,
            openGraph: {
                title,
                description,
                type: 'website',
                images: frontmatter.image ? [{ url: frontmatter.image }] : undefined,
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: frontmatter.image ? [frontmatter.image] : undefined,
            },
        };
    } catch {
        return {};
    }
}

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

export default async function ProjectPage({ params }) {
    let frontmatter, content;
    try {
        const { slug } = await params;
        ({ frontmatter, content } = getContentBySlug('projects', slug));
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
