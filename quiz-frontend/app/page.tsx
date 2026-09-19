"use client"

import Quiz from "@/components/Quiz";
import Result from "@/components/Result";
import UsernameForm from "@/components/UsernameForm";
import { useState } from "react"

export default function Home() {
  const [phase, setPhase] = useState<'username' | 'quiz' | 'result'>('username');
  const [username, setUsername] = useState<string>('');
  const [score, setScore] = useState<number>(0);

  return (
    <div>
      {phase === 'username' && <UsernameForm onSubmit={(name) => {
        setUsername(name);
        setPhase('quiz');
      }} />}

      {phase === 'quiz' && <Quiz username={username} onFinish={(score) => {
        setScore(score)
        setPhase('result');
      }} />}

      {phase === 'result' && (
        <Result
          username={username}
          score={score}
          total={10}
          onRestart={() => {
            setPhase('username');
            setScore(0);
            setUsername('');
          }}
        />
      )}
    </div>
  )
}