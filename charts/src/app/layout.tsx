import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Providers } from "@/components/providers/Providers";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MainSidebar } from "@/components/layout/MainSidebar";
import { SidebarProvider } from "@/components/providers/SidebarProvider";
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crypto Charts',
  description: 'Cryptocurrency market analysis dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="light" storageKey="app-theme">
          <Providers>
            <SidebarProvider>
              <div className="flex min-h-screen">
                <MainSidebar />
                <main className="flex-1 overflow-y-auto">
                  <div className="fixed top-4 right-4 z-50">
                    <ThemeToggle />
                  </div>
                  {children}
                </main>
              </div>
            </SidebarProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
