import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface ColumnProps {
  id: string;
  children: React.ReactNode;
  cards: CardType[];
}

interface CardType {
  id: string;
  status: string;
}

export function Column({ id, children, cards }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  const filteredCards = cards.filter((card) => card.status === id); // Filter cards with matching status

  const hasDoneTasks = filteredCards.some((card) => card.status === "Done"); // Check if any card has "Done" status

  return (
    <div
      ref={setNodeRef}
      className={`column ${hasDoneTasks ? "column--done" : ""}`}
      data-status={id} // Use the column ID for data (optional)
    >
      {children}
    </div>
  );
}
