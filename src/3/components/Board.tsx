import React from "react";
import { useDroppable } from "@dnd-kit/core";
import SearchInput from "./SearchInput";
import { IoMdAddCircleOutline } from "react-icons/io";

interface BoardProps {
  id: string;
  children: React.ReactNode;
  setSearchTerm: (term: string) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export function Board({
  id,
  children,
  setSearchTerm,
  setIsModalOpen,
}: BoardProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  const handleSearchChange = (newTerm: string) => {
    setSearchTerm(newTerm);
  };

  return (
    <div ref={setNodeRef} className="kanban-board">
      <div className="header">
        <h2>{id}</h2>
      </div>
      <div className="search-row">
        <SearchInput onSearchChange={handleSearchChange} />
        <div className="add-button">
          <button onClick={() => setIsModalOpen(true)}>
            <IoMdAddCircleOutline className="icon" />
          </button>
        </div>
      </div>
      <div className="kanban-app">{children}</div>
    </div>
  );
}
