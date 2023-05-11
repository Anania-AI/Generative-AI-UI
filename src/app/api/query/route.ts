import { NextResponse } from 'next/server';
import getString from "@/utils/getString";

const DATA_SOURCE_URL = "https://api.openai.com/v1/chat/completions";
const key = `Bearer ${process.env.API_KEY}`;

export async function POST(request: Request) {
    const { query } = await request.json();
    const res = await fetch(DATA_SOURCE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: key
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system", "content": getString('api.systemMessage'),
                },
                {
                    "role": "user", "content": getString('api.userMessage'),
                },
                {
                    "role": "assistant", "content": getString('api.assistantMessage'),
                },
                {
                    "role": "user", "content": query,
                }
            ],
            "temperature": 0.7
        })
    });
    const data = await res.json();
    return NextResponse.json(data);
}