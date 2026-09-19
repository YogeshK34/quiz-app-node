import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Test your knowledge and compete on the leaderboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col bg-gradient-to-br from-slate-50 via-sky-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/60 text-foreground selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
        {/* Subtle glossy background glow orbs */}
        <div className="fixed top-0 left-1/4 -z-10 w-96 h-96 bg-blue-400/15 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 -z-10 w-96 h-96 bg-indigo-400/15 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <Toaster position="top-center" />
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
