
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Task } from "@/types/task";
import { useToast } from "@/components/ui/use-toast";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  initials: string;
}

interface TaskAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onAssign: (taskId: number, assignee: string) => void;
}

// This would typically come from a database or API
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Project Manager",
    avatar: "/placeholder.svg",
    initials: "SJ"
  },
  {
    id: 2,
    name: "David Lee",
    role: "Site Engineer",
    avatar: "/placeholder.svg",
    initials: "DL"
  },
  {
    id: 3,
    name: "Michael Robinson",
    role: "Safety Officer",
    avatar: "/placeholder.svg",
    initials: "MR"
  },
  {
    id: 4,
    name: "Jennifer Chen",
    role: "Architect",
    avatar: "/placeholder.svg",
    initials: "JC"
  },
  {
    id: 5,
    name: "Robert Wilson",
    role: "Construction Manager",
    avatar: "/placeholder.svg",
    initials: "RW"
  },
  {
    id: 6,
    name: "Emily Davis",
    role: "Procurement Specialist",
    avatar: "/placeholder.svg",
    initials: "ED"
  }
];

const TaskAssignmentModal: React.FC<TaskAssignmentModalProps> = ({
  isOpen,
  onClose,
  task,
  onAssign
}) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const { toast } = useToast();

  const handleAssign = () => {
    if (selectedMember) {
      onAssign(task.id, selectedMember.name);
      toast({
        title: "Task Assigned",
        description: `"${task.title}" has been assigned to ${selectedMember.name}`,
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Task</DialogTitle>
          <DialogDescription>
            Assign "{task.title}" to a team member
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className={`flex items-center gap-3 p-3 rounded-md cursor-pointer ${
                  selectedMember?.id === member.id 
                    ? "bg-construction-blue/10 border border-construction-blue" 
                    : "hover:bg-muted"
                }`}
                onClick={() => setSelectedMember(member)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleAssign}
            disabled={!selectedMember}
          >
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskAssignmentModal;
