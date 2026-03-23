import { getAllArticles, getAllProjects } from '../lib/mdx-loader';

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

    const routes = ['', '/articles', '/projects', '/about', '/now'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }));

    return [...routes, ...articles, ...projects];
}
