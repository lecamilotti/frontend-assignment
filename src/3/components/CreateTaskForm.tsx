import React, { useState } from "react";
import toast from "react-hot-toast";

interface CreateTaskFormProps {
  onSubmit: (title: string, priority: string, content: string) => void;
  handleModalClose: () => void;
  initialTitle?: string; 
  initialPriority?: string; 
  initialContent?: string; 
  onEdit?: () => void;
  newTask?: boolean;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  onSubmit,
  handleModalClose,
  onEdit,
  initialTitle,
  initialPriority,
  initialContent,
  newTask,
}) => {
  const [title, setTitle] = useState(initialTitle || "");
  const [priority, setPriority] = useState(initialPriority || "");
  const [description, setDescription] = useState(initialContent || "");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    newTask && toast.success("Task added successfully");

    onSubmit(title, priority, description);
    setTitle("");
    setPriority("");
    setDescription("");
    handleModalClose();
  };

  return (
    <form onSubmit={handleSubmit} className="create-task-form ">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={handleTitleChange}
        required
      />
      <select value={priority} onChange={handlePriorityChange} required>
        <option value="">Select Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={handleDescriptionChange}
        required
      ></textarea>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default CreateTaskForm;
