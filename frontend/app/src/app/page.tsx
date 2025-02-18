"use client";
import React, { useState, useEffect, FormEvent } from 'react';

interface Memo {
  id: number;
  content: string;
}

export default function Page() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [newMemo, setNewMemo] = useState('');

  // API経由でメモ一覧を取得
  const fetchMemos = async () => {
    try {
      const res = await fetch('http://localhost:8000/memos');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setMemos(data);
      } else {
        const errorText = await res.text();
        throw new Error(`Unexpected response type: ${errorText}`);
      }
    } catch (error) {
      console.error('メモの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  // 新規メモ投稿処理
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMemo.trim()) return;
    try {
      await fetch('http://localhost:8000/memos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMemo })
      });
      setNewMemo('');
      fetchMemos();
    } catch (error) {
      console.error('メモの投稿に失敗しました:', error);
    }
  };

  return (
    <div>
      <h1>Memo App</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={newMemo} 
          onChange={(e) => setNewMemo(e.target.value)} 
          placeholder="Enter memo"
        />
        <button type="submit">Post Memo</button>
      </form>
      <ul>
        {memos.map((memo) => (
          <li key={memo.id}>{memo.content}</li>
        ))}
      </ul>
    </div>
  );
}
