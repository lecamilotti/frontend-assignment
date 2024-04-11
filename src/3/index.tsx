import React, { useState } from "react";

import Header from "./components/Header";

import "./index.scss";
import TaskList from "./components/TaskList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface TaskProps {
  id: number;
  projectName: string;
  title: string;
  priority: "low" | "medium" | "high";
  isComplete: boolean;
  status: "todo" | "inProgress" | "done";
}

const Task3: React.FunctionComponent = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([
    {
      id: 1,
      projectName: "Project 1",
      title: "Task 1",
      priority: "low",
      isComplete: false,
      status: "inProgress",
    },
  ]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div id="task-3">
        <Header
          onAddTask={function (): void {
            throw new Error("Function not implemented.");
          }}
          onFilter={function (filterText: string): void {
            throw new Error("Function not implemented.");
          }}
        />

        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
};

export default Task3;
