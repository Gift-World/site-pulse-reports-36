
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CurrentPlanTabProps {
  currentPlan: string;
  nextBillingDate: string;
  onUpgrade: () => void;
}

export const CurrentPlanTab: React.FC<CurrentPlanTabProps> = ({
  currentPlan,
  nextBillingDate,
  onUpgrade
}) => {
  const getPlanFeatures = (plan: string) => {
    const features = {
      Free: [
        "Manage up to 1 active project",
        "Invite up to 5 team members",
        "Upload and share documents (limited to 1GB)",
        "Email notifications for tasks and updates",
        "5GB storage limit"
      ],
      Basic: [
        "Manage up to 5 active projects",
        "Invite up to 15 team members",
        "Gantt chart view",
        "Calendar integration",
        "20GB storage limit"
      ],
      Professional: [
        "Unlimited active projects",
        "Invite up to 50 team members",
        "Task automation & reminders",
        "Priority email support",
        "Advanced reporting"
      ],
      Enterprise: [
        "Unlimited everything",
        "Custom reports",
        "Slack integration",
        "Trello integration",
        "Priority support"
      ]
    };
    return features[plan as keyof typeof features] || [];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Subscription Plan</CardTitle>
        <CardDescription>
          View and manage your current subscription plan.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border p-4 bg-muted/30">
          <div className="font-medium text-lg mb-2">Current Plan: {currentPlan}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Next Billing Date</p>
              <p>{nextBillingDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
              <p>Credit Card (•••• 4242)</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Plan Features</h3>
          <ul className="space-y-2">
            {getPlanFeatures(currentPlan).map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-4">
          <Button onClick={onUpgrade} className="w-full md:w-auto">
            Upgrade Subscription
          </Button>
          
          {currentPlan !== "Free" && (
            <Button variant="outline" className="w-full md:w-auto">
              View Billing History
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
