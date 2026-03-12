import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
    var t = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', t || (prefersDark ? 'dark' : 'light'));
  } catch(e) {}
})();
`;

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
                    rel="stylesheet"
                />
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Navbar />
                    <main className="page-main">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
