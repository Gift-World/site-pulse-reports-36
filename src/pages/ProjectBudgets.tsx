
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { projects } from "./Projects";

const ProjectBudgets = () => {
  const navigate = useNavigate();

  const getBudgetStatus = (budget: { total: number; spent: number; remaining: number }) => {
    const percentageSpent = (budget.spent / budget.total) * 100;
    if (percentageSpent > 100) return "overspent";
    if (percentageSpent > 90) return "critical";
    if (percentageSpent > 75) return "warning";
    return "healthy";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "overspent": return "destructive";
      case "critical": return "destructive";
      case "warning": return "secondary";
      case "healthy": return "outline";
      default: return "secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "overspent": return "Over Budget";
      case "critical": return "Critical";
      case "warning": return "Warning";
      case "healthy": return "On Track";
      default: return "Unknown";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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
            Monitor budget status across all projects
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {projects.map((project) => {
          if (!project.budget) return null;
          
          const budgetStatus = getBudgetStatus(project.budget);
          const percentageSpent = (project.budget.spent / project.budget.total) * 100;
          const variance = project.budget.remaining;
          
          return (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {project.name}
                      <Badge variant={getStatusColor(budgetStatus)}>
                        {getStatusText(budgetStatus)}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {budgetStatus === "overspent" || budgetStatus === "critical" ? (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    ) : budgetStatus === "warning" ? (
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    ) : (
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                    <p className="text-2xl font-bold">{formatCurrency(project.budget.total)}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Amount Spent</p>
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(project.budget.spent)}</p>
                    <p className="text-sm text-muted-foreground">{percentageSpent.toFixed(1)}% of budget</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {variance >= 0 ? "Remaining" : "Overspend"}
                    </p>
                    <p className={`text-2xl font-bold ${variance >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {formatCurrency(Math.abs(variance))}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <div className="flex flex-col gap-1">
                      <Badge variant={getStatusColor(budgetStatus)} className="w-fit">
                        {getStatusText(budgetStatus)}
                      </Badge>
                      {budgetStatus === "overspent" && (
                        <p className="text-sm text-red-600">
                          {((Math.abs(variance) / project.budget.total) * 100).toFixed(1)}% over budget
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {(budgetStatus === "overspent" || budgetStatus === "critical") && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-800">
                      <strong>Budget Alert:</strong> {
                        budgetStatus === "overspent" 
                          ? `This project is over budget by ${formatCurrency(Math.abs(variance))}. Immediate action required.`
                          : "This project is approaching budget limits. Monitor spending closely."
                      }
                    </p>
                  </div>
                )}
                
                {budgetStatus === "warning" && (
                  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Budget Warning:</strong> This project has used {percentageSpent.toFixed(1)}% of its budget. Consider reviewing upcoming expenses.
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

export default ProjectBudgets;
