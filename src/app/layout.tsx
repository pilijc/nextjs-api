import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import { AppNavbar } from "@/components/app-navbar"

export const metadata: Metadata = {
  title: "Movie Finder and Watchlist",
  description: "Search for movies and maintain a personal watchlist.",
};

/**
 * Provides the shared app shell, theme support, navigation, and toast outlet.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppNavbar />
          <div className="flex-1">
            {children}
          </div>
          <footer className="border-t py-6 md:py-0">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
              <p className="text-sm text-muted-foreground">
                Movie Finder & Watchlist
              </p>
              <p className="text-sm text-muted-foreground text-right max-w-[250px] sm:max-w-none">
                This product uses the TMDB API but is not endorsed or certified by TMDB.
              </p>
            </div>
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
