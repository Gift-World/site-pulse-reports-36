
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { projects } from "./Projects";

const Budgets = () => {
  const navigate = useNavigate();

  const getBudgetStatus = (spent: number, total: number) => {
    const percentage = (spent / total) * 100;
    if (percentage > 100) return { status: "overspend", color: "destructive", icon: TrendingUp };
    if (percentage > 90) return { status: "warning", color: "warning", icon: AlertTriangle };
    return { status: "ontrack", color: "success", icon: TrendingDown };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Budgets</h1>
          <p className="text-muted-foreground">
            Detailed budget overview for all projects
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => {
          const budget = project.budget;
          if (!budget) return null;

          const spentPercentage = (budget.spent / budget.total) * 100;
          const remaining = budget.total - budget.spent;
          const budgetStatus = getBudgetStatus(budget.spent, budget.total);
          const StatusIcon = budgetStatus.icon;

          return (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {project.name}
                      <Badge variant={project.status === "Completed" ? "outline" : "default"}>
                        {project.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIcon className="h-5 w-5 text-muted-foreground" />
                    <Badge 
                      variant={budgetStatus.status === "overspend" ? "destructive" : 
                              budgetStatus.status === "warning" ? "secondary" : "outline"}
                    >
                      {budgetStatus.status === "overspend" ? "Over Budget" :
                       budgetStatus.status === "warning" ? "At Risk" : "On Track"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                    <p className="text-2xl font-bold">${budget.total.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Spent</p>
                    <p className="text-2xl font-bold text-red-600">${budget.spent.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Remaining</p>
                    <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${Math.abs(remaining).toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Progress</p>
                    <p className="text-2xl font-bold">{project.progress}%</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Budget Utilization</span>
                    <span>{spentPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={Math.min(spentPercentage, 100)} 
                    className="h-3"
                    indicatorClassName={
                      spentPercentage > 100 ? "bg-red-500" :
                      spentPercentage > 90 ? "bg-yellow-500" : "bg-green-500"
                    }
                  />
                  {spentPercentage > 100 && (
                    <p className="text-sm text-red-600 font-medium">
                      Overspent by ${(budget.spent - budget.total).toLocaleString()}
                    </p>
                  )}
                </div>

                {remaining < 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-800">
                      <strong>Budget Exceeded:</strong> This project has exceeded its allocated budget by ${Math.abs(remaining).toLocaleString()}.
                    </p>
                  </div>
                )}
                
                {spentPercentage > 90 && spentPercentage <= 100 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Budget Warning:</strong> This project has used {spentPercentage.toFixed(1)}% of its budget.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Budgets;
