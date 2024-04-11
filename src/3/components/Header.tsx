import React from "react";
import Input from "./Input";

interface HeaderProps {
  onAddTask: () => void;
  onFilter: (filterText: string) => void;
  isModalOpen?: boolean;
  placeholder?: string;
}

const Header: React.FC<HeaderProps> = ({ onAddTask, onFilter }) => {
  // Handle button clicks and input change to call onAddTask and onFilter from props
  return (
    <header>
      <button>Add Task</button>
      <button
        onClick={() => {
          /* Open modal for project name */
        }}
      >
        Add Project
      </button>
      {/* <Input onInputChange={onFilter} placeholder="Filter by ID or Title" /> */}
      <div>{/* Render progress timeline (Todo, In Progress, Done) */}</div>
      <Input onSearchChange={onFilter} placeHolder="Search for task..." />
    </header>
  );
};

export default Header;
