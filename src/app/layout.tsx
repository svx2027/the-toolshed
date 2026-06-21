import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://shivamvashisth.com"),
  title: "Code for Creatives India: you don't need to be a coder. Build tiny apps with AI.",
  description:
    "Code for Creatives India. A YouTube strategist building tiny apps with AI, and showing creators how to build their own. No dev team, no CS degree.",
  alternates: { canonical: "/" },
  icons: { icon: "/assets/favicon.svg" },
  openGraph: {
    type: "website",
    title: "Code for Creatives India: you don't need to be a coder",
    description:
      "I'm a YouTube strategist who builds tiny apps with AI. If you can write a prompt, you can build one too. I'll show you how.",
    url: "/",
    images: ["/assets/og-home.png"],
  },
  twitter: { card: "summary_large_image" },
};

// Anti-FOUC: set the theme before paint so dark mode never flashes. Shares the `ts_theme`
// key with the static tool pages so the choice persists across the whole site.
const themeScript = `try{var t=localStorage.getItem('ts_theme')||((window.matchMedia&&matchMedia('(prefers-color-scheme:dark)').matches)?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme',t);}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
