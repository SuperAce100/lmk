import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "LMK Notify",
  description: "Notification service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <body className="min-h-screen antialiased font-sans">
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
