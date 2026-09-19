"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Trophy, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/75 dark:bg-slate-950/75 border-b border-black/5 dark:border-white/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="size-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 p-[1px] shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[11px] flex items-center justify-center">
              <Sparkles className="size-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-200 bg-clip-text text-transparent">
            QuizApp
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all",
              pathname === "/"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10"
            )}
          >
            <Home className="size-3.5" />
            <span>Quiz</span>
          </Link>

          <Link
            href="/rankings"
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all",
              pathname === "/rankings"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10"
            )}
          >
            <Trophy className="size-3.5" />
            <span>Leaderboard</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
