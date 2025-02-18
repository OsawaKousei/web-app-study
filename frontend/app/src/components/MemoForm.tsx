import React, { FormEvent } from "react";
import MemoButton from "./MemoButton";

interface MemoFormProps {
  newMemo: string;
  onMemoChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function MemoForm({
  newMemo,
  onMemoChange,
  onSubmit,
}: MemoFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}
    >
      <input
        type="text"
        value={newMemo}
        onChange={(e) => onMemoChange(e.target.value)}
        placeholder="Enter memo"
        style={{
          flex: 1,
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ddd",
        }}
      />
      <MemoButton
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
      </MemoButton>
    </form>
  );
}
