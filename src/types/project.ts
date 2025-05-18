
export interface Project {
  id: number;
  name: string;
  description: string;
  status: "In Progress" | "Planning" | "Completed" | "On Hold";
  progress: number;
  timelapse?: number;
  team: number;
  dueDate: string;
  location?: string;
  client?: string;
  budget?: {
    total: number;
    spent: number;
    remaining: number;
  };
  tasks?: {
    total: number;
    completed: number;
    overdue: number;
  };
  materials?: {
    allocated: number;
    used: number;
  };
  contacts?: {
    name: string;
    role: string;
    phone?: string;
    email?: string;
  }[];
  milestones?: {
    name: string;
    dueDate: string;
    status: "Completed" | "In Progress" | "Pending" | "Overdue";
  }[];
  notes?: string;
  defectsLiability?: {
    lapseDate: string;
    endDate: string;
  };
  finalReports?: {
    projectReport: string;
    safetyReport: string;
    budgetReport: string;
  };
  keyImpacts?: {
    positive: string[];
    negative: string[];
  };
}
