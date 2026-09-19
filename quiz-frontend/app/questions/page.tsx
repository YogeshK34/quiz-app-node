"use client"

import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Question {
    id: string,
    question: string,
    option_a: string,
    option_b: string,
    option_c: string,
    option_d: string,
    correct_answer: string
}

export default function Quiz() {

    const [questions, setQuestions] = useState<Question[]>([]);
    const [fetchingQuestions, setFetchingQuestions] = useState<boolean>(false);

    useEffect(() => {
        async function fetchQues() {
            try {
                setFetchingQuestions(true);
                const result = await fetch('http://localhost:3001/questions', {
                    method: 'GET',
                    headers: { 'Content-type': 'application/json' },
                })

                const data = await result.json();
                if (!result.ok) return toast.error(data.error);

                setQuestions(data.result);

            } catch (error: any) {
                console.error(error);
                toast.error(error.message);
                return;
            } finally {
                setFetchingQuestions(false);
            }
        }
        fetchQues()
    }, [])

    return (
        <div>
            {fetchingQuestions && <><Spinner /> <p>Loading Question</p></>}

            <Label>Questions</Label>
            {questions.map((q) => (
                <div key={q.id}>
                    <p>{q.question}</p>
                    <p>{q.option_a}</p>
                    <p>{q.option_b}</p>
                    <p>{q.option_c}</p>
                    <p>{q.option_d}</p>

                    <br />
                </div>
            ))}
        </div>
    )
}