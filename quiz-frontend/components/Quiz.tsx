"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Spinner } from "./ui/spinner";
import { ArrowRight, CheckCircle2, Check, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizProps {
  username: string;
  onFinish: (score: number) => void;
}

interface Question {
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
}

export default function Quiz({ username, onFinish }: QuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/questions");
        const data = await response.json();
        if (!response.ok) {
          toast.error(data.error);
          return;
        }
        setQuestions(data.result);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  function handleAnswer(option: string) {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: option,
    }));
  }

  function handleNext() {
    if (!userAnswers[currentIndex]) {
      toast.error("Please select an answer!");
      return;
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function handleSubmit() {
    if (!userAnswers[currentIndex]) {
      toast.error("Please select an answer!");
      return;
    }
    let score = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.correct_answer) score++;
    });
    onFinish(score);
  }

  if (loading) {
    return (
      <div className="w-full max-w-xl mx-auto">
        <Card className="glossy-card text-center p-12 flex flex-col items-center justify-center gap-4">
          <div className="size-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
            <Spinner className="size-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Loading Questions</h3>
            <p className="text-sm text-muted-foreground mt-1">Preparing your quiz challenge...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="w-full max-w-xl mx-auto">
        <Card className="glossy-card text-center p-8">
          <p className="text-muted-foreground">No questions found.</p>
        </Card>
      </div>
    );
  }

  const current = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const optionKeys = ["option_a", "option_b", "option_c", "option_d"] as const;
  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between px-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 text-xs font-medium text-foreground shadow-sm">
            <User className="size-3 text-blue-500" />
            {username}
          </span>
        </div>

        <span className="font-semibold text-xs tracking-wider uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
          Question {currentIndex + 1} of {questions.length}
        </span>
      </div>

      {/* Glossy Progress Bar */}
      <div className="w-full h-2 rounded-full bg-slate-200/60 dark:bg-slate-800/60 overflow-hidden backdrop-blur-sm p-0.5 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400 rounded-full transition-all duration-300 shadow-sm"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Question Card */}
      <Card className="glossy-card border border-white/40 dark:border-white/10 shadow-2xl">
        <CardHeader className="pb-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
            {current?.question}
          </h2>
        </CardHeader>

        <CardContent className="space-y-3 pt-2">
          {optionKeys.map((opt, idx) => {
            const isSelected = userAnswers[currentIndex] === current[opt];
            return (
              <button
                key={opt}
                onClick={() => handleAnswer(current[opt])}
                style={{
                  background: isSelected ? "blue" : "grey",
                  color: isSelected ? "white" : "black",
                  padding: "14px 18px",
                  margin: "6px 0",
                  borderRadius: "14px",
                  cursor: "pointer",
                }}
                className={cn(
                  "w-full text-left font-medium text-base transition-all duration-200 border border-white/25 dark:border-white/10 flex items-center justify-between gap-3 shadow-md backdrop-blur-md select-none",
                  isSelected
                    ? "shadow-blue-500/30 ring-2 ring-blue-400/50 scale-[1.01]"
                    : "hover:brightness-110 active:scale-[0.99]"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "size-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors",
                      isSelected
                        ? "bg-white/25 text-white"
                        : "bg-black/15 text-black"
                    )}
                  >
                    {optionLabels[idx]}
                  </span>
                  <span className="leading-tight">{current[opt]}</span>
                </div>

                {isSelected && (
                  <Check className="size-5 shrink-0 text-white animate-in zoom-in-50" />
                )}
              </button>
            );
          })}

          <div className="pt-4 flex justify-end">
            {currentIndex < questions.length - 1 ? (
              <Button
                onClick={handleNext}
                className="h-11 px-6 rounded-xl glossy-btn text-white font-semibold flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25"
              >
                <span>Next</span>
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="h-11 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/25"
              >
                <span>Submit</span>
                <CheckCircle2 className="size-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}