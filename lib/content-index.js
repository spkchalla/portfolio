import { getAllContent } from './mdx-loader';

/**
 * Builds a flat JSON index of all content across all types.
 * Powers search and listing pages.
 * Shape: { title, slug, date, tags, summary, type }
 */
export function buildContentIndex() {
    const types = ['articles', 'journal', 'projects', 'ideas', 'side-quests', 'notes'];
    const index = [];

    for (const type of types) {
        const items = getAllContent(type);
        for (const item of items) {
            index.push({
                title: item.title ?? '',
                slug: item.slug,
                date: item.date ?? '',
                tags: item.tags ?? [],
                summary: item.summary ?? '',
                type,
            });
        }
    }

    return index;
}
