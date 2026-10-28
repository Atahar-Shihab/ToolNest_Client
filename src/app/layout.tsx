import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToolNest | Premium AI Tool Discovery Platform",
  description: "Discover, compare, filter, and review 50+ top curated AI tools across writing, coding, design, video, and productivity.",
  keywords: ["AI Tools", "Artificial Intelligence", "ChatGPT", "Claude", "Cursor", "AI Directory", "Productivity"],
  authors: [{ name: "ToolNest Team" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  openGraph: {
    title: "ToolNest | AI Tool Hub",
    description: "Explore, compare, and review the best AI tools for developers, designers, and creators.",
    type: "website",
    siteName: "ToolNest",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolNest | AI Tool Hub",
    description: "Discover the best AI tools for every task.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <ScrollToTop />
            <Toaster position="bottom-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
