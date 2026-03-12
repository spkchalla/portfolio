import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

/**
 * Read and parse a single MDX file by type and slug.
 * Returns { frontmatter, content (raw MDX string) }
 */
export function getContentBySlug(type, slug) {
    const filePath = path.join(CONTENT_ROOT, type, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return { frontmatter: data, content };
}

/**
 * Get all content of a given type ('articles' | 'journal' | 'ideas').
 * Returns array sorted by date descending.
 */
export function getAllContent(type) {
    const dir = path.join(CONTENT_ROOT, type);
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

    const items = files.map(file => {
        const slug = file.replace(/\.mdx$/, '');
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        const raw = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(raw);

        // Fallback for missing frontmatter fields
        const title = data.title || data.name || (content.match(/^#\s+(.*)/m)?.[1]) || slug;

        // Extract first paragraph for summary if missing
        let summary = data.summary || data.description || '';
        if (!summary) {
            const paragraphs = content
                .split('\n')
                .map(p => p.trim())
                .filter(p => p.length > 0 && !p.startsWith('#') && !p.startsWith('!') && !p.startsWith('<'));
            summary = paragraphs[0] ? paragraphs[0].slice(0, 160) + (paragraphs[0].length > 160 ? '...' : '') : '';
        }

        const date = data.date || stats.mtime.toISOString().split('T')[0];

        return {
            slug,
            ...data,
            title,
            summary,
            date
        };
    });

    return items.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/** Get all articles */
export function getAllArticles() {
    return getAllContent('articles');
}

/** Get all journal entries */
export function getAllJournalEntries() {
    return getAllContent('journal');
}

/** Get all projects */
export function getAllProjects() {
    return getAllContent('projects');
}

/** Get slugs for static params generation */
export function getSlugsForType(type) {
    const dir = path.join(CONTENT_ROOT, type);
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir)
        .filter(f => f.endsWith('.mdx'))
        .map(f => ({ slug: f.replace(/\.mdx$/, '') }));
}
