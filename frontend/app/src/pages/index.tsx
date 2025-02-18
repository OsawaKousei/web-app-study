"use client";
import React, { useState, useEffect, FormEvent } from "react";
import Layout from "../components/layout";
import MemoForm from "../components/MemoForm";
import MemoContent from "../components/MemoContent";

interface Memo {
  id: number;
  content: string;
}

export default function HomePage() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [newMemo, setNewMemo] = useState("");

  // ...existing code: API経由でメモ一覧を取得...
  const fetchMemos = async () => {
    try {
      const res = await fetch("/api/memos");
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
      console.error("メモの取得に失敗しました: GET-/api/memos", error);
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
      await fetch("/api/memos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newMemo }),
      });
      setNewMemo("");
      fetchMemos();
    } catch (error) {
      console.error("メモの投稿に失敗しました: POST-/api/memos", error);
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
        <MemoForm
          newMemo={newMemo}
          onMemoChange={setNewMemo}
          onSubmit={handleSubmit}
        />
        <ul style={{ listStyle: "none", padding: 0 }}>
          {memos.map((memo) => (
            <li key={memo.id} style={{ marginBottom: "1rem" }}>
              <MemoContent content={memo.content} />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
