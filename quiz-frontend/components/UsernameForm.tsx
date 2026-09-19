"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Sparkles, ArrowRight, User } from "lucide-react";

interface UsernameFormProps {
  onSubmit: (username: string) => void;
}

export default function UsernameForm({ onSubmit }: UsernameFormProps) {
  const [username, setUsername] = useState<string>("");

  function handleSubmit() {
    if (!username.trim()) {
      toast.error("Username is required!");
      return;
    }
    onSubmit(username.trim());
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="glossy-card border border-white/40 dark:border-white/10 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto size-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 p-[1.5px] shadow-lg shadow-blue-500/30 mb-3 flex items-center justify-center">
            <div className="w-full h-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-[14.5px] flex items-center justify-center">
              <Sparkles className="size-7 text-blue-600 dark:text-blue-400 animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 dark:from-white dark:via-blue-100 dark:to-indigo-200 bg-clip-text text-transparent">
            Welcome to the Quiz!
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1">
            Enter your nickname or username to begin and compete for the top spot.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <User className="size-3.5" />
              Username
            </Label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="e.g. Alex"
                className="h-11 px-4 text-base bg-white/60 dark:bg-black/30 border border-white/40 dark:border-white/10 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 shadow-inner backdrop-blur-sm"
                autoFocus
                required
              />
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full h-11 text-base font-semibold rounded-xl glossy-btn text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25 transition-all"
          >
            <span>Start Quiz</span>
            <ArrowRight className="size-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}