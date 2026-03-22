import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ThemeSwitcher from '../components/ThemeSwitcher';
import Script from 'next/script'; // Import Script for GA
import './globals.css';
import './typography.css';
import 'katex/dist/katex.min.css';

export const metadata = {
    title: {
        default: process.env.NEXT_PUBLIC_NAME || 'S.P. Kumar Challa',
        template: `%s | ${process.env.NEXT_PUBLIC_NAME || 'S.P. Kumar Challa'}`,
    },
    description: 'Personal site — technical articles on Linux, systems programming, and computer science.',
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
