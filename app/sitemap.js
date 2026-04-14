import { getAllArticles, getAllProjects, getAllJournalEntries, getAllNotes, getAllUnfiltered, getAllSideQuests } from '../lib/mdx-loader';

export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spkumarchalla.com';

    const articles = getAllArticles()
        .filter(a => !isNaN(new Date(a.date).getTime()))
        .map((article) => ({
            url: `${baseUrl}/articles/${article.slug}`,
            lastModified: new Date(article.date),
        }));

    const projects = getAllProjects()
        .filter(p => !isNaN(new Date(p.date).getTime()))
        .map((project) => ({
            url: `${baseUrl}/projects/${project.slug}`,
            lastModified: new Date(project.date),
        }));

    const journal = getAllJournalEntries()
        .filter(j => !isNaN(new Date(j.date).getTime()))
        .map((entry) => ({
            url: `${baseUrl}/journal/${entry.slug}`,
            lastModified: new Date(entry.date),
        }));

    const notes = getAllNotes()
        .filter(n => !isNaN(new Date(n.date).getTime()))
        .map((note) => ({
            url: `${baseUrl}/notes/${note.slug}`,
            lastModified: new Date(note.date),
        }));

    const unfiltered = getAllUnfiltered()
        .filter(u => !isNaN(new Date(u.date).getTime()))
        .map((post) => ({
            url: `${baseUrl}/unfiltered/${post.slug}`,
            lastModified: new Date(post.date),
        }));

    const sideQuests = getAllSideQuests()
        .filter(s => !isNaN(new Date(s.date).getTime()))
        .map((quest) => ({
            url: `${baseUrl}/side-quests/${quest.slug}`,
            lastModified: new Date(quest.date),
        }));

    const routes = ['', '/articles', '/projects', '/journal', '/notes', '/unfiltered', '/side-quests', '/about', '/now'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }));

    return [...routes, ...articles, ...projects, ...journal, ...notes, ...unfiltered, ...sideQuests];
}
