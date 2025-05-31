
import React, { useState } from "react";
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/reports/FileUploader";
import { toast } from "@/hooks/use-toast";
import { Upload, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { 
  ComposedChart,
  Bar, 
  Line,
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

// Sample Bill of Quantities data
const boqItems = [
  { 
    id: 1, 
    item: "Concrete Foundation", 
    budgeted: 150000, 
    actual: 135000, 
    variance: -15000, 
    variancePercentage: -10,
    status: "saving" 
  },
  { 
    id: 2, 
    item: "Steel Structure", 
    budgeted: 200000, 
    actual: 225000, 
    variance: 25000, 
    variancePercentage: 12.5,
    status: "overrun" 
  },
  { 
    id: 3, 
    item: "Electrical Systems", 
    budgeted: 80000, 
    actual: 85000, 
    variance: 5000, 
    variancePercentage: 6.25,
    status: "overrun" 
  },
  { 
    id: 4, 
    item: "Plumbing", 
    budgeted: 60000, 
    actual: 52000, 
    variance: -8000, 
    variancePercentage: -13.33,
    status: "saving" 
  },
  { 
    id: 5, 
    item: "Finishes", 
    budgeted: 120000, 
    actual: 140000, 
    variance: 20000, 
    variancePercentage: 16.67,
    status: "overrun" 
  }
];

export const CashflowTab: React.FC<CashflowTabProps> = ({ project }) => {
  const [boqFile, setBoqFile] = useState<File | null>(null);
  
  // Enhanced cashflow data with project progress
  const cashflowData = [
    { month: 'Jan', income: 10000, expenses: 8000, progress: 5 },
    { month: 'Feb', income: 15000, expenses: 10000, progress: 15 },
    { month: 'Mar', income: 12000, expenses: 12500, progress: 25 },
    { month: 'Apr', income: 18000, expenses: 14000, progress: 40 },
    { month: 'May', income: 14000, expenses: 9000, progress: 55 },
    { month: 'Jun', income: 22000, expenses: 16000, progress: 65 },
  ];

  const handleBoqUpload = (files: File[]) => {
    if (files.length > 0) {
      setBoqFile(files[0]);
      toast({
        title: "Bill of Quantities Uploaded",
        description: `${files[0].name} has been uploaded successfully.`,
      });
    }
  };

  const totalBudgeted = boqItems.reduce((sum, item) => sum + item.budgeted, 0);
  const totalActual = boqItems.reduce((sum, item) => sum + item.actual, 0);
  const totalVariance = totalActual - totalBudgeted;
  const totalVariancePercentage = ((totalVariance / totalBudgeted) * 100);

  const significantItems = boqItems.filter(item => Math.abs(item.variancePercentage) > 10);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Cashflow Analysis</CardTitle>
          <CardDescription>
            Interactive cashflow tracking with project progress correlation for {project.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={cashflowData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'Progress') return [`${value}%`, 'Project Progress'];
                      return [`$${value.toLocaleString()}`, name];
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="income" name="Income" fill="#22bff0" />
                  <Bar yAxisId="left" dataKey="expenses" name="Expenses" fill="#ff9500" />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="progress" 
                    stroke="#1e3a8a" 
                    strokeWidth={3}
                    name="Progress"
                    dot={{ fill: '#1e3a8a', strokeWidth: 2, r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Income</CardDescription>
                  <CardTitle className="text-2xl" style={{ color: '#22bff0' }}>
                    ${cashflowData.reduce((sum, item) => sum + item.income, 0).toLocaleString()}
                  </CardTitle>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Expenses</CardDescription>
                  <CardTitle className="text-2xl" style={{ color: '#ff9500' }}>
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

      {/* Bill of Quantities Section */}
      <Card>
        <CardHeader>
          <CardTitle>Bill of Quantities</CardTitle>
          <CardDescription>
            Upload and manage project Bill of Quantities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload Bill of Quantities</label>
              <FileUploader 
                onFilesSelected={handleBoqUpload}
                acceptedFileTypes=".pdf,.xls,.xlsx"
                maxFiles={1}
              />
              {boqFile && (
                <div className="text-sm text-muted-foreground">
                  Selected file: {boqFile.name}
                </div>
              )}
              {!boqFile && (
                <div className="text-sm text-muted-foreground">
                  Supported formats: Excel (.xls, .xlsx) or PDF
                </div>
              )}
            </div>

            {/* BOQ Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Budgeted</CardDescription>
                  <CardTitle className="text-xl" style={{ color: '#22bff0' }}>
                    ${totalBudgeted.toLocaleString()}
                  </CardTitle>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Actual</CardDescription>
                  <CardTitle className="text-xl" style={{ color: '#ff9500' }}>
                    ${totalActual.toLocaleString()}
                  </CardTitle>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Variance</CardDescription>
                  <CardTitle className={`text-xl ${totalVariance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ${Math.abs(totalVariance).toLocaleString()} {totalVariance >= 0 ? 'Over' : 'Under'}
                  </CardTitle>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Variance %</CardDescription>
                  <CardTitle className={`text-xl ${totalVariancePercentage >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {totalVariancePercentage >= 0 ? '+' : ''}{totalVariancePercentage.toFixed(1)}%
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Significant Variance Items */}
            <div>
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Items with Significant Variance ({'>'}10%)
              </h4>
              <div className="space-y-3">
                {significantItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={`p-4 rounded-lg border ${
                      item.status === 'saving' 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {item.status === 'saving' ? (
                          <TrendingDown className="h-5 w-5 text-green-600" />
                        ) : (
                          <TrendingUp className="h-5 w-5 text-red-600" />
                        )}
                        <div>
                          <h5 className="font-medium">{item.item}</h5>
                          <p className="text-sm text-muted-foreground">
                            Budgeted: ${item.budgeted.toLocaleString()} | 
                            Actual: ${item.actual.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          item.status === 'saving' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.variancePercentage >= 0 ? '+' : ''}{item.variancePercentage.toFixed(1)}%
                        </div>
                        <div className={`text-sm ${
                          item.status === 'saving' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          ${Math.abs(item.variance).toLocaleString()} {item.status === 'saving' ? 'saved' : 'over'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
