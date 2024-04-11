export const TYPE: "TASK" = "TASK";

export interface DraggableTask {
  id: number;
  projectName: string;
  title: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "inProgress" | "done";
}
