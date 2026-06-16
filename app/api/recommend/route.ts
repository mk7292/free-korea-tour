import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const { mood, companion, interests } = await req.json();

  const prompt = `당신은 서울 무료 관광지 전문 가이드입니다. 다음 여행자 정보를 바탕으로 서울의 무료 관광지 2~3곳을 코스로 추천해주세요.

여행자 정보:
- 현재 기분: ${mood}
- 동행자: ${companion}
- 관심사: ${interests.join(", ")}

다음 JSON 형식으로만 응답해주세요. 다른 텍스트는 포함하지 마세요:
{
  "spots": [
    {
      "name": "장소명",
      "description": "장소 설명 (2~3문장)",
      "isFree": true,
      "googleMapUrl": "https://maps.google.com/?q=장소명+서울",
      "officialUrl": "공식 홈페이지 URL (없으면 null)"
    }
  ]
}

반드시 무료로 입장 가능한 곳만 추천하세요. 실제 존재하는 서울의 관광지만 추천해주세요.`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    return NextResponse.json({ error: "Unexpected response" }, { status: 500 });
  }

  const jsonText = content.text.trim();
  const parsed = JSON.parse(jsonText);

  return NextResponse.json(parsed);
}
