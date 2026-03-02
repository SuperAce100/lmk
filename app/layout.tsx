import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "lmk",
  description: "Send me a text with an endpoint",
  metadataBase: new URL("https://lmk.asanshay.com"),
  openGraph: {
    title: "lmk",
    description: "Send me a text with an endpoint",
    url: "https://lmk.asanshay.com",
    siteName: "lmk",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <footer className="fixed bottom-0 left-0 right-0 flex justify-center gap-4 py-4 text-sm text-neutral-500">
            <a href="/tos" className="hover:text-neutral-700">
              Terms
            </a>
            <a href="/privacy" className="hover:text-neutral-700">
              Privacy
            </a>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
