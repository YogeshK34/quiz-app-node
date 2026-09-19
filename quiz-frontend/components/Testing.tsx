"use client"
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { Label } from "./ui/label";

export default function Test() {
    const [result, setResult] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function test() {
            try {
                setLoading(true);
                const responseBackend = await fetch('http://localhost:3001/', {
                    method: 'GET',
                    headers: { 'Content-type': 'application/json' }
                });

                const data = await responseBackend.json();
                if (!responseBackend.ok) {
                    toast.error(data.error);
                    return;
                }

                setResult(JSON.stringify(data.message));
            } catch (error: any) {
                console.error(error.message);
                toast.error(error.message);
                return;
            } finally {
                setLoading(false);
            }
        };

        test();
    }, [])
    return (
        <div>
            {loading && <><Spinner /> <p>Loading...</p></>}

            <Label>Backend Response</Label> <br />
            <Label>{result}</Label>
        </div>
    )
}