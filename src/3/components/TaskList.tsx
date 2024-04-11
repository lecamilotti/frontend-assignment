import React from "react";

import Items from "./Items";
import { TYPE } from "../constants/constants";
import { useDrop } from "react-dnd";

interface TaskProps {
  tasks: Array<{
    id: number;
    projectName: string;
    title: string;
    priority: "low" | "medium" | "high";
    isComplete: boolean;
    status: "todo" | "inProgress" | "done";
  }>;
  setTasks: (tasks: TaskProps["tasks"]) => void;
}

interface useDropProps {
  accept: string;
  drop: (item: any) => void;
  isDragging: boolean;
}

const TaskList: React.FC<TaskProps> = ({ tasks, setTasks }) => {
  const [{ isDragging }, drop] = useDrop<useDropProps>(() => ({
    accept: TYPE || "TASK", // Use defined type or default
    drop: (item) => console.log("Dropped item:", item), // Handle dropped item (replace with your logic)
  })) as [useDropProps, any];

  const sortTasks = (tasks: TaskProps["tasks"]) =>
    tasks.sort((a, b) => {
      if (a.priority === "high" && b.priority !== "high") return -1;
      if (a.priority !== "high" && b.priority === "high") return 1;
      return a.id - b.id; // Default sort by ID
    });

  const filterTasksByStatus = (status: "todo" | "inProgress" | "done") =>
    sortTasks(tasks.filter((task) => task.status === status));

  return (
    <section
      className="task-list"
      ref={drop}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="columns">
        <div className="column">
          <h3>Todo</h3>
          {filterTasksByStatus("todo").map((task) => (
            <Items key={task.id} tasks={tasks} />
          ))}
        </div>
        <div className="column">
          <h3>In Progress</h3>
          {filterTasksByStatus("inProgress").map((task) => (
            <Items key={task.id} tasks={tasks} />
          ))}
        </div>
        <div className="column">
          <h3>Done</h3>
          {filterTasksByStatus("done").map((task) => (
            <Items key={task.id} tasks={tasks} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TaskList;
