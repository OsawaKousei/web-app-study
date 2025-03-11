import type { NextApiRequest, NextApiResponse } from "next";

// サーバーサイド用の環境変数を優先。なければNEXT_PUBLIC_API_URLへフォールバック
const BACKEND_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const response = await fetch(`${BACKEND_URL}/memos`);
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Backend error: ${response.status} - ${errText}`);
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        res.status(200).json(data);
      } else {
        const errorText = await response.text();
        res.status(500).json({ error: errorText });
      }
    } catch (error: unknown) {
      console.error(
        `アクセスに失敗しました。GET-${BACKEND_URL}/memos:`,
        error instanceof Error ? error.message : error
      );
      res.status(500).json({ error: "メモの取得に失敗しました" });
    }
  } else if (req.method === "POST") {
    try {
      const payload = req.body; // { content: string }
      const response = await fetch(`${BACKEND_URL}/memos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Backend error: ${response.status} - ${errText}`);
      }
      const result = await response.json();
      res.status(200).json(result);
    } catch (error: unknown) {
      console.error(
        `アクセスに失敗しました。POST-${BACKEND_URL}/memos:`,
        error instanceof Error ? error.message : error
      );
      res.status(500).json({ error: "メモの投稿に失敗しました" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} not allowed.`);
  }
}
