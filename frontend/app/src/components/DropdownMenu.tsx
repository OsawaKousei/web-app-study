import React from "react";

interface DropdownMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function DropdownMenu({ onEdit, onDelete }: DropdownMenuProps) {
  return (
    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded-md z-50">
      <ul className="py-1">
        <li>
          <button
            onClick={onEdit}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            編集
          </button>
        </li>
        <li>
          <button
            onClick={onDelete}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            削除
          </button>
        </li>
      </ul>
    </div>
  );
}
