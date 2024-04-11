import React from "react";

interface Task {
  id: number;
  projectName: string;
  title: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "inProgress" | "done";
}

type TaskListProps = {
  tasks: Task[];
};

const Items: React.FC<TaskListProps> = ({ tasks }) => {
  const sortTasks = (tasks: Task[]) =>
    tasks.sort((a, b) => {
      if (a.priority === "high" && b.priority !== "high") return -1;
      if (a.priority !== "high" && b.priority === "high") return 1;
      return a.id - b.id; // Default sort by ID
    });

  const filterTasksByStatus = (status: "todo" | "inProgress" | "done") =>
    sortTasks(tasks.filter((task) => task.status === status));

  const { id, projectName, title, priority } = tasks[0];
  // Implement priority color coding based on priority level

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "low":
        return "blue";
      case "medium":
        return "orange";
      case "high":
        return "red";
    }
  };

  // Implement kebab menu functionality (delete, mark as Todo/In Progress/Done)

  return (
    <div
      className="item"
      style={{ backgroundColor: getPriorityColor(priority) }}
    >
      <h3>
        {projectName} - {id}
      </h3>
      <p>{title}</p>
      {/* Kebab menu with icons or text for actions */}
    </div>
  );
};

export default Items;
