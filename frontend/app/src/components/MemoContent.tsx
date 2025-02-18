import React, { useState, useRef, useEffect } from "react";
import DropdownMenu from "./DropdownMenu";

interface MemoContentProps {
  content: string;
}

export default function MemoContent({ content }: MemoContentProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleEdit = () => {
    console.log("編集を選択");
    setMenuOpen(false);
  };

  const handleDelete = () => {
    console.log("削除を選択");
    setMenuOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative p-4 bg-gradient-to-r from-white to-gray-50 shadow-lg rounded-md"
    >
      <p className="text-gray-800 text-base font-medium">{content}</p>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
      >
        &#8942;
      </button>
      {menuOpen && <DropdownMenu onEdit={handleEdit} onDelete={handleDelete} />}
    </div>
  );
}
