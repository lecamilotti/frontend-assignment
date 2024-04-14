// Task3.js
import React, { useEffect, useRef, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Card } from "./components/Card";
import { Board } from "./components/Board";
import { Column } from "./components/Column";
import { VscKebabVertical } from "react-icons/vsc";
import "./index.scss";
import CreateTaskForm from "./components/CreateTaskForm";
import Modal from "./common/Modal";
import KebabMenuModal from "./common/KebabMenuModal";
import toast, { Toaster } from "react-hot-toast";

type ColumnType = "Backlog" | "Todo" | "Done";

export const mockData = {
  cards: [
    {
      id: "Id - 1",
      title: "Get UNIwise interview",
      content: "Keep in touch with the HR for the interview schedule",
      column: "Done",
      priority: "high",
      status: "done",
    },
    {
      id: "id - 2",
      title: "Get into the interview with Sune",
      content: "It was a great interview, I hope I get the job!",
      column: "Done",
      priority: "medium",
      status: "done",
    },
    {
      id: "id - 3",
      title: "Finish the Kanban app and other tasks",
      content: "The kanban app was a great challenge to work on",
      column: "Done",
      priority: "low",
      status: "done",
    },
    {
      id: "id - 4",
      title: "Get a job at UNIwise",
      content: "I hope I get the job at UNIwise",
      column: "Backlog",
      priority: "high",
      status: "backlog",
    },
  ],
};

function Task3() {
  const columns: ColumnType[] = ["Backlog", "Todo", "Done"];
  const [cards, setCards] = useState(mockData.cards);
  const [parent, setParent] = useState<ColumnType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState<boolean>(false);

  const [kebabMenuCoordinates, setKebabMenuCoordinates] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [newCard, setNewCard] = useState<boolean>(false);
  const [selectedCardForDescription, setSelectedCardForDescription] = useState<
    string | null
  >(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const kebabMenuRef = useRef<HTMLDivElement>(null);
  const CardIdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedCards = localStorage.getItem("kanban_cards");
    const parsedCards = savedCards ? JSON.parse(savedCards) : mockData.cards;
    if (JSON.stringify(parsedCards) !== JSON.stringify(cards)) {
      setCards(parsedCards);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(parent);

  useEffect(() => {
    localStorage.setItem("kanban_cards", JSON.stringify(cards));
  }, [cards]);
  console.log(cards);
  const handleKebabMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const iconPosition = event.currentTarget.getBoundingClientRect();
    setKebabMenuCoordinates({ x: iconPosition.left, y: iconPosition.bottom });
    setIsKebabMenuOpen(true);
    // get the clicked card id
    const cardId = event.currentTarget
      .closest(".task")
      ?.querySelector(".card-id")?.textContent;
    if (cardId) {
      setSelectedCardId(cardId);
    }
  };

  const handleEditModalOpen = (cardId: string) => {
    setSelectedCardId(cardId);
    setIsEditModalOpen(true);
  };

  // sort cards by priority when cards array lenght changes
  useEffect(() => {
    if (newCard) {
      const sortedCards = cards.sort((a, b) => {
        if (a.priority === "high" && b.priority !== "high") {
          return -1;
        } else if (a.priority === "medium" && b.priority === "low") {
          return -1;
        } else if (a.priority === "low" && b.priority !== "low") {
          return 1;
        }
        return 0;
      });

      setCards(sortedCards);
      setNewCard(false);
    }
  }, [cards, newCard]);

  // filter by title and content and id of the card
  const filteredCards = cards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCardClick = (cardId: string) => {
    setSelectedCardForDescription(cardId);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    setParent(over ? (over as { id: ColumnType }).id : null);

    if (over) {
      const draggedCardId = event.active.id;
      const newColumn = (over as { id: ColumnType }).id;
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === draggedCardId
            ? { ...card, column: newColumn, status: newColumn }
            : card
        )
      );
    }
    toast.success("Task moved successfully");
  };

  const generateUniqueId = (): string => {
    return `Id - ${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleTaskSubmit = (
    title: string,
    priority: string,
    content: string
  ) => {
    const newId = generateUniqueId();

    // Check if the generated ID already exists
    const idExists = cards.some((card) => card.id === newId);

    if (idExists) {
      // If the ID exists, generate a new one recursively
      handleTaskSubmit(title, priority, content);
      return;
    }

    const newCard = {
      id: newId,
      title,
      content,
      column: "Backlog",
      priority,
      status: "backlog",
    };

    // Insert the new card into the correct position based on its priority
    let insertionIndex = cards.length;
    for (let i = 0; i < cards.length; i++) {
      if (
        (priority === "high" && cards[i].priority !== "high") ||
        (priority === "medium" && cards[i].priority === "low") ||
        (priority === "low" && cards[i].priority !== "low")
      ) {
        insertionIndex = i;
        break;
      }
    }

    const updatedCards = [
      ...cards.slice(0, insertionIndex),
      newCard,
      ...cards.slice(insertionIndex),
    ];

    setCards(updatedCards);
  };

  return (
    <div id="task-3">
      <Toaster position="top-right" reverseOrder={false} />
      <KebabMenuModal
        isOpen={isKebabMenuOpen}
        onClose={() => setIsKebabMenuOpen(false)}
        onDelete={() => {
          setIsKebabMenuOpen(false);
          setCards((prevCards) =>
            prevCards.filter((card) => card.id !== selectedCardId)
          );
          toast.success(`Task ${selectedCardId} deleted successfully`);
        }}
        onEdit={() => {
          setIsKebabMenuOpen(false);
          setIsEditModalOpen(true);
          handleEditModalOpen(selectedCardId || "");
        }}
        classModal="kebab-menu-modal"
        coordinates={kebabMenuCoordinates || { x: 0, y: 0 }}
      />

      {isModalOpen && (
        <Modal
          title="Add a new task"
          onClose={handleModalClose}
          onButtonClick={() => console.log("Button clicked")}
          buttonLabel="Add Task"
          showButton={false}
        >
          <CreateTaskForm
            onSubmit={handleTaskSubmit}
            handleModalClose={handleModalClose}
            newTask={true}
            initialTitle=""
            initialPriority=""
            initialContent=""
          />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal
          title="Edit Task"
          onClose={() => setIsEditModalOpen(false)}
          onButtonClick={() => console.log("Edit Button clicked")}
          buttonLabel="Update Task"
          showButton={false}
        >
          <CreateTaskForm
            onSubmit={(title, priority, content) => {
              setCards((prevCards) =>
                prevCards.map((card) =>
                  card.id === selectedCardId
                    ? { ...card, title, priority, content }
                    : card
                )
              );
              toast.success(`Task ${selectedCardId} updated successfully`);
              setIsEditModalOpen(false);
            }}
            handleModalClose={() => setIsEditModalOpen(false)}
            initialTitle={
              cards.find((c) => c.id === selectedCardId)?.title || ""
            }
            initialPriority={
              cards.find((c) => c.id === selectedCardId)?.priority || ""
            }
            initialContent={
              cards.find((c) => c.id === selectedCardId)?.content || ""
            }
          />
        </Modal>
      )}

      {selectedCardForDescription && (
        <Modal
          title={
            cards.find((c) => c.id === selectedCardForDescription)?.title || ""
          }
          onClose={() => setSelectedCardForDescription(null)}
          onButtonClick={() => setSelectedCardForDescription(null)}
          buttonLabel="Close"
          showButton={true}
        >
          <div>
            {cards.find((c) => c.id === selectedCardForDescription)?.content}
          </div>
        </Modal>
      )}

      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <Board
          id="Kanban app"
          setSearchTerm={setSearchTerm}
          setIsModalOpen={setIsModalOpen}
        >
          {columns.map((column) => (
            <Column key={column} id={column} cards={filteredCards}>
              <h3 className="column-title">{column}</h3>
              {filteredCards
                .filter((card) => card.column === column)
                .map((card) => (
                  <Card
                    key={card.id}
                    id={card.id}
                    onEdit={() => handleEditModalOpen(card.id)}
                  >
                    <div className="task-priority">
                      <span
                        className={`priority ${card.priority}`}
                        style={{ width: "calc(100% - 40px)" }}
                      >
                        {card.priority.toUpperCase()}
                      </span>
                      <div className="kebab-menu" ref={kebabMenuRef}>
                        <button
                          className="btn"
                          type="button"
                          onClick={handleKebabMenuClick}
                        >
                          <VscKebabVertical className="icon" />
                        </button>
                      </div>
                    </div>
                    <div className="card-id">{card.id}</div>
                    <div
                      className="task-title"
                      ref={CardIdRef}
                      onClick={() => handleCardClick(card.id)}
                    >
                      {card.title}
                    </div>
                    <div
                      className="task-description"
                      ref={CardIdRef}
                      onClick={() => handleCardClick(card.id)}
                    >
                      {card.content}
                    </div>
                  </Card>
                ))}
            </Column>
          ))}
        </Board>
      </DndContext>
    </div>
  );
}

export default Task3;
