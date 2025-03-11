"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      router.push("/");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            ユーザー名:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            パスワード:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "none",
            background: "#0070f3",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          ログイン
        </button>
      </form>
    </div>
  );
}
