
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SafetyMetrics = () => {
  const navigate = useNavigate();

  const safetyMetrics = [
    {
      projectName: "Riverfront Commercial Complex",
      safeDays: 45,
      incidents: 0,
      nearMisses: 2,
      lastInspection: "May 15, 2025",
      safetyScore: 98,
      status: "Excellent"
    },
    {
      projectName: "Parkview Residential Towers",
      safeDays: 23,
      incidents: 1,
      nearMisses: 3,
      lastInspection: "May 10, 2025",
      safetyScore: 85,
      status: "Good"
    },
    {
      projectName: "Downtown Hotel Renovation",
      safeDays: 12,
      incidents: 0,
      nearMisses: 1,
      lastInspection: "May 12, 2025",
      safetyScore: 92,
      status: "Good"
    },
    {
      projectName: "City Center Shopping Mall",
      safeDays: 365,
      incidents: 0,
      nearMisses: 0,
      lastInspection: "April 30, 2025",
      safetyScore: 100,
      status: "Completed"
    }
  ];

  const safetyRecommendations = [
    {
      priority: "High",
      title: "Weekly Safety Briefings",
      description: "Conduct mandatory weekly safety briefings for all project teams to review recent incidents and safety protocols."
    },
    {
      priority: "Medium",
      title: "Equipment Inspection Schedule",
      description: "Implement daily equipment inspections to prevent mechanical failures that could lead to accidents."
    },
    {
      priority: "Medium",
      title: "Weather Safety Protocols",
      description: "Establish clear protocols for working in adverse weather conditions, especially during monsoon season."
    },
    {
      priority: "Low",
      title: "Safety Recognition Program",
      description: "Create an incentive program to recognize teams and individuals who maintain excellent safety records."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent": return "success";
      case "Good": return "secondary";
      case "Completed": return "outline";
      default: return "destructive";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Safety Metrics</h1>
          <p className="text-muted-foreground">
            Comprehensive safety overview across all projects
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Safety Overview</CardTitle>
            <CardDescription>Safety metrics for all active and completed projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {safetyMetrics.map((metric, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{metric.projectName}</h3>
                      <p className="text-sm text-muted-foreground">Last inspection: {metric.lastInspection}</p>
                    </div>
                    <Badge variant={getStatusColor(metric.status)}>
                      {metric.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Shield className="h-4 w-4 mr-1 text-green-600" />
                        <span className="text-sm font-medium">Safe Days</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">{metric.safeDays}</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <AlertTriangle className="h-4 w-4 mr-1 text-red-600" />
                        <span className="text-sm font-medium">Incidents</span>
                      </div>
                      <p className="text-2xl font-bold text-red-600">{metric.incidents}</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Clock className="h-4 w-4 mr-1 text-yellow-600" />
                        <span className="text-sm font-medium">Near Misses</span>
                      </div>
                      <p className="text-2xl font-bold text-yellow-600">{metric.nearMisses}</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">Safety Score</span>
                      </div>
                      <p className={`text-2xl font-bold ${getScoreColor(metric.safetyScore)}`}>
                        {metric.safetyScore}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Safety Recommendations</CardTitle>
            <CardDescription>Action items to improve overall safety performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {safetyRecommendations.map((rec, index) => (
                <Alert key={index}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="flex items-center gap-2">
                    {rec.title}
                    <Badge variant={rec.priority === "High" ? "destructive" : rec.priority === "Medium" ? "secondary" : "outline"}>
                      {rec.priority} Priority
                    </Badge>
                  </AlertTitle>
                  <AlertDescription>{rec.description}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SafetyMetrics;
