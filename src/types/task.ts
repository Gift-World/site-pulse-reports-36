
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
}
