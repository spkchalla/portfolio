import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
    serverExternalPackages: ['katex'],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
