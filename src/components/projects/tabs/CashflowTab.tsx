
import React from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface CashflowTabProps {
  project: Project;
}

export const CashflowTab: React.FC<CashflowTabProps> = ({ project }) => {
  // Example cashflow data
  const cashflowData = [
    { month: 'Jan', income: 10000, expenses: 8000 },
    { month: 'Feb', income: 15000, expenses: 10000 },
    { month: 'Mar', income: 12000, expenses: 12500 },
    { month: 'Apr', income: 18000, expenses: 14000 },
    { month: 'May', income: 14000, expenses: 9000 },
    { month: 'Jun', income: 22000, expenses: 16000 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Cashflow</CardTitle>
        <CardDescription>
          Track income and expenses for {project.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cashflowData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
                />
                <Legend />
                <Bar dataKey="income" name="Income" fill="#34A853" />
                <Bar dataKey="expenses" name="Expenses" fill="#EA4335" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Income</CardDescription>
                <CardTitle className="text-2xl text-green-600">
                  ${cashflowData.reduce((sum, item) => sum + item.income, 0).toLocaleString()}
                </CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Expenses</CardDescription>
                <CardTitle className="text-2xl text-red-600">
                  ${cashflowData.reduce((sum, item) => sum + item.expenses, 0).toLocaleString()}
                </CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Net Cashflow</CardDescription>
                <CardTitle className={`text-2xl ${
                  cashflowData.reduce((sum, item) => sum + item.income, 0) > 
                  cashflowData.reduce((sum, item) => sum + item.expenses, 0) 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  ${(
                    cashflowData.reduce((sum, item) => sum + item.income, 0) - 
                    cashflowData.reduce((sum, item) => sum + item.expenses, 0)
                  ).toLocaleString()}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
