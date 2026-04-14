import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ThemeSwitcher from '../components/ThemeSwitcher';
import Script from 'next/script'; // Import Script for GA
import './globals.css';
import './typography.css';
import 'katex/dist/katex.min.css';

export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://spkumarchalla.com')),
    title: {
        default: 'S.P. Kumar Challa | Portfolio',
        template: `%s | S.P. Kumar Challa`,
    },
    description: 'Portfolio of Shanmukha Padma Kumar Challa (SPKumar). CSE student specializing in Rust, Linux systems, and Neural Networks research.',
    keywords: ['S.P. Kumar Challa', 'spkumar', 'spkumarchalla', 'spkchalla', 'Rust Developer', 'Linux Systems', 'Neural Networks', 'Systems Programming', 'Computer Science Portfolio'],
    authors: [{ name: 'S.P. Kumar Challa' }],
    openGraph: {
        title: 'S.P. Kumar Challa (SPKumar)',
        description: 'Exploring Rust, Linux systems, and Neural Networks research.',
        url: 'https://spkumarchalla.com',
        siteName: 'S.P. Kumar Challa | Portfolio',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'S.P. Kumar Challa Portfolio Overlay',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'S.P. Kumar Challa (SPKumar)',
        description: 'Rust development, Linux systems, and systems programming explorer.',
        images: ['/og-image.png'],
        creator: '@spkchalla', // Assumed handle, can be corrected by user
    },
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
        apple: '/favicon.png',
    },
};

// Prevent theme flash before hydration
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', t);
  } catch(e) {}
})();
`;

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Google Tag (gtag.js) */}
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-MXDHL8LHH5"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-MXDHL8LHH5');
                    `}
                </Script>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
                    rel="stylesheet"
                />
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body suppressHydrationWarning>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Navbar />
                    <main className="page-main">
                        {children}
                    </main>
                    <ThemeSwitcher />
                    <Footer />
                </div>
            </body>
        </html>
    );
}
