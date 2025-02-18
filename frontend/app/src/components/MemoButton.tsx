import React from "react";

interface MemoButtonProps {
  type?: "button" | "submit";
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function MemoButton({
  type = "button",
  onClick,
  children,
  style,
}: MemoButtonProps) {
  return (
    <button type={type} onClick={onClick} style={style}>
      {children}
    </button>
  );
}
