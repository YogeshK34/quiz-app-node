"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { Trophy, RotateCcw, Award } from "lucide-react";

interface ResultProps {
  username: string;
  score: number;
  total: number;
  onRestart: () => void;
}

export default function Result({ username, score, total, onRestart }: ResultProps) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function submitScore() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, score }),
        });

        const data = await response.json();
        if (!response.ok) {
          toast.error(data.error);
          return;
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    submitScore();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card className="glossy-card text-center p-12 flex flex-col items-center justify-center gap-4">
          <div className="size-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">
            <Spinner className="size-7 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Saving your score...</h3>
            <p className="text-sm text-muted-foreground mt-1">Recording your achievement on the leaderboard</p>
          </div>
        </Card>
      </div>
    );
  }

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const isGreat = percentage >= 70;

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="glossy-card border border-white/40 dark:border-white/10 shadow-2xl text-center">
        <CardHeader className="pb-2">
          {/* Trophy badge */}
          <div className="mx-auto size-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-600 p-[1.5px] shadow-lg shadow-amber-500/30 mb-3 flex items-center justify-center">
            <div className="w-full h-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-[14.5px] flex items-center justify-center">
              <Trophy className="size-8 text-amber-500 animate-bounce" />
            </div>
          </div>

          <CardTitle className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 dark:from-white dark:via-blue-100 dark:to-indigo-200 bg-clip-text text-transparent">
            Quiz Complete!
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground mt-1">
            Hey <span className="font-semibold text-foreground">{username}</span>, you scored{" "}
            <span className="font-bold text-blue-600 dark:text-blue-400">{score}</span> out of{" "}
            <span className="font-bold text-foreground">{total}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-4">
          {/* Score display circle/pill */}
          <div className="py-4 px-6 rounded-2xl bg-white/50 dark:bg-black/20 border border-white/30 dark:border-white/5 backdrop-blur-sm">
            <div className="text-4xl font-black tracking-tight text-foreground">
              {percentage}%
            </div>
            <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mt-1">
              {isGreat ? "🎉 Outstanding Performance!" : "👍 Good Effort!"}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={onRestart}
              className="flex-1 h-11 px-5 rounded-xl glossy-btn text-white font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25 transition-all text-sm"
            >
              <RotateCcw className="size-4" />
              <span>Take Quiz Again</span>
            </button>

            <Link
              href="/rankings"
              className="flex-1 h-11 px-5 rounded-xl bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-foreground font-semibold flex items-center justify-center gap-2 border border-black/10 dark:border-white/10 shadow-sm transition-all text-sm"
            >
              <Award className="size-4 text-amber-500" />
              <span>Leaderboard</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}