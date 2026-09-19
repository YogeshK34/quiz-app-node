"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Trophy, ArrowLeft, RefreshCw, AlertCircle, Medal, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Ranking {
  rank?: number | string;
  username: string;
  score: number;
}

export default function RankingsPage() {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchRankings() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:3001/rankings");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch rankings");
      }

      setRankings(data);
    } catch (err: any) {
      setError(err.message || "Failed to load rankings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRankings();
  }, []);

  function getRankBadge(rankNumber: number) {
    if (rankNumber === 1) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
          <Crown className="size-3.5 text-amber-500 fill-amber-500" />
          #1
        </span>
      );
    }
    if (rankNumber === 2) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-400/15 text-slate-600 dark:text-slate-300 border border-slate-400/30">
          <Medal className="size-3.5 text-slate-400 fill-slate-400" />
          #2
        </span>
      );
    }
    if (rankNumber === 3) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-700/15 text-amber-800 dark:text-amber-600 border border-amber-700/30">
          <Medal className="size-3.5 text-amber-700 fill-amber-700" />
          #3
        </span>
      );
    }
    return (
      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold text-muted-foreground bg-black/5 dark:bg-white/5">
        #{rankNumber}
      </span>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Quiz</span>
        </Link>

        <Button
          onClick={fetchRankings}
          variant="outline"
          size="sm"
          className="h-8 px-3 rounded-full text-xs font-medium border-white/20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md cursor-pointer hover:bg-white/80 dark:hover:bg-slate-800/80"
          disabled={loading}
        >
          <RefreshCw className={cn("size-3 mr-1.5", loading && "animate-spin")} />
          <span>Refresh</span>
        </Button>
      </div>

      <Card className="glossy-card border border-white/40 dark:border-white/10 shadow-2xl overflow-hidden">
        <CardHeader className="pb-4 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-400 p-[1.5px] shadow-md shadow-amber-500/20 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-[14.5px] flex items-center justify-center">
                <Trophy className="size-5 text-amber-500" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 dark:from-white dark:via-blue-100 dark:to-indigo-200 bg-clip-text text-transparent">
                Leaderboard
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                Top quiz scores ranked in real time
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 sm:p-0">
          {/* Loading State */}
          {loading && (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-center">
              <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Spinner className="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Loading rankings...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="m-6 p-6 rounded-2xl bg-destructive/10 border border-destructive/20 text-center space-y-3">
              <div className="mx-auto size-10 rounded-full bg-destructive/15 flex items-center justify-center">
                <AlertCircle className="size-5 text-destructive" />
              </div>
              <div>
                <h4 className="font-semibold text-destructive">Failed to Load Rankings</h4>
                <p className="text-xs text-muted-foreground mt-1">{error}</p>
              </div>
              <Button
                onClick={fetchRankings}
                variant="outline"
                size="sm"
                className="mt-2 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Leaderboard Table */}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <th scope="col" className="py-3.5 px-6 w-24">
                      Rank
                    </th>
                    <th scope="col" className="py-3.5 px-6">
                      Username
                    </th>
                    <th scope="col" className="py-3.5 px-6 text-right w-28">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {rankings.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-12 text-center text-muted-foreground">
                        <div className="space-y-3">
                          <p className="text-sm font-medium">No scores recorded yet.</p>
                          <Link href="/">
                            <Button size="sm" className="glossy-btn text-white rounded-xl text-xs font-semibold">
                              Take the Quiz
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    rankings.map((item, index) => {
                      const rankNum = Number(item.rank ?? index + 1);
                      return (
                        <tr
                          key={index}
                          className="hover:bg-white/40 dark:hover:bg-white/[0.03] transition-colors"
                        >
                          <td className="py-4 px-6 font-medium">
                            {getRankBadge(rankNum)}
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-semibold text-foreground tracking-tight">
                              {item.username}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <span className="inline-block font-mono font-bold text-base text-blue-600 dark:text-blue-400">
                              {item.score}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
