import React from "react";
import { useDraggable } from "@dnd-kit/core";

interface CardProps {
  id: string;
  children: React.ReactNode;
  onEdit?: () => void;
  onClick?: (Event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Card({ id, children, onClick }: CardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        cursor: "grab",
      }}
      {...attributes}
      {...listeners}
      className="task"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
