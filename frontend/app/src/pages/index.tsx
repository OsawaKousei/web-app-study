"use client";
import React, { useState, useEffect, FormEvent } from "react";
import Layout from "../components/layout";

interface Memo {
  id: number;
  content: string;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function HomePage() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [newMemo, setNewMemo] = useState("");

  // ...existing code: API経由でメモ一覧を取得...
  const fetchMemos = async () => {
    try {
      const res = await fetch(`${API_URL}/memos`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        setMemos(data);
      } else {
        const errorText = await res.text();
        throw new Error(`Unexpected response type: ${errorText}`);
      }
    } catch (error) {
      console.error("メモの取得に失敗しました:", error);
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  // ...existing code: 新規メモ投稿処理...
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMemo.trim()) return;
    try {
      await fetch(`${API_URL}/memos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newMemo }),
      });
      setNewMemo("");
      fetchMemos();
    } catch (error) {
      console.error("メモの投稿に失敗しました:", error);
    }
  };

  return (
    <Layout
      sidebar={
        <div>
          <h2>Control Panel</h2>
          {/* 将来的なコントロールパネルの要素 */}
        </div>
      }
    >
      <section>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Memo App</h1>
        <form
          onSubmit={handleSubmit}
          style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}
        >
          <input
            type="text"
            value={newMemo}
            onChange={(e) => setNewMemo(e.target.value)}
            placeholder="Enter memo"
            style={{
              flex: 1,
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              border: "none",
              background: "#0070f3",
              color: "#fff",
            }}
          >
            Post Memo
          </button>
        </form>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {memos.map((memo) => (
            <li
              key={memo.id}
              style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}
            >
              {memo.content}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
