
export interface Subtask {
  id: number;
  title: string;
  status: "Completed" | "In Progress" | "Pending" | "Overdue";
  progress: number;
  assignee: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "Completed" | "In Progress" | "Pending" | "Overdue";
  priority: "High" | "Medium" | "Low";
  assignee: string;
  dueDate: string;
  progress: number;
  startDate: string;
  endDate?: string;
  projectId?: number;
  projectName?: string;
  subtasks?: Subtask[];
  order?: number;
}
