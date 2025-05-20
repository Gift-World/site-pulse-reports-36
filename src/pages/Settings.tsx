
import React, { useState, useContext, createContext } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  Settings as SettingsIcon, 
  CreditCard, 
  UserCircle, 
  Building2, 
  AlertTriangle,
  ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";

// Create a currency context
type CurrencyContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
  currencySymbol: string;
};

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
  currencySymbol: "$",
});

// Provider component that will be used in App.tsx
export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    // Try to get the currency from localStorage or use USD as fallback
    return localStorage.getItem("currency") || "USD";
  });

  const getCurrencySymbol = (currencyCode: string): string => {
    switch (currencyCode) {
      case "USD": return "$";
      case "EUR": return "€";
      case "GBP": return "£";
      case "JPY": return "¥";
      case "CAD": return "C$";
      case "AUD": return "A$";
      default: return "$";
    }
  };

  const handleSetCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency: handleSetCurrency,
      currencySymbol: getCurrencySymbol(currency)
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Hook to use the currency context
export const useCurrency = () => useContext(CurrencyContext);

const Settings = () => {
  const { toast } = useToast();
  const { currency, setCurrency } = useCurrency();
  const [language, setLanguage] = useState("en");
  const [country, setCountry] = useState("US");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [orgDetails, setOrgDetails] = useState({
    name: "",
    address: "",
    phone: "",
    type: "company",
    industry: "",
    size: "",
    description: ""
  });
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("Free");
  const [nextBillingDate, setNextBillingDate] = useState("N/A");

  const handleSaveGeneralSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your general settings have been saved successfully.",
    });
  };

  const handleSaveOrgSettings = () => {
    toast({
      title: "Organization Settings Saved",
      description: "Your organization details have been saved successfully.",
    });
  };

  const handleUpgradePlan = () => {
    toast({
      title: "Redirecting to Upgrade",
      description: "You will be redirected to upgrade your subscription.",
    });
    // Redirect logic would go here
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast({
        title: "Account Deletion Requested",
        description: "Your account deletion request has been submitted.",
        variant: "destructive"
      });
      // Actual deletion logic would go here
    }
  };

  const handleSaveAccountSettings = () => {
    if (!termsAgreed) {
      toast({
        title: "Agreement Required",
        description: "You must agree to the terms of service to save account settings.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Account Settings Saved",
      description: "Your account settings have been saved successfully.",
    });
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="organization" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="current-plan" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Current Plan
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" />
            Account
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your general application settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="currency">Currency</Label>
                <Select 
                  value={currency} 
                  onValueChange={(value) => setCurrency(value)}
                >
                  <SelectTrigger className="w-full md:w-[240px]">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">EUR - Euro (€)</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound (£)</SelectItem>
                    <SelectItem value="JPY">JPY - Japanese Yen (¥)</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar (C$)</SelectItem>
                    <SelectItem value="AUD">AUD - Australian Dollar (A$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="language">Language Preference</Label>
                <Select 
                  value={language} 
                  onValueChange={setLanguage}
                >
                  <SelectTrigger className="w-full md:w-[240px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="country">Country</Label>
                <Select 
                  value={country} 
                  onValueChange={setCountry}
                >
                  <SelectTrigger className="w-full md:w-[240px]">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                    <SelectItem value="DE">Germany</SelectItem>
                    <SelectItem value="FR">France</SelectItem>
                    <SelectItem value="JP">Japan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="2fa">Two-Factor Authentication (2FA)</Label>
                <div className="flex items-center gap-4">
                  <Switch 
                    id="2fa"
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                  <div>
                    <p className="text-sm font-medium">{twoFactorEnabled ? "Enabled" : "Disabled"}</p>
                    <p className="text-sm text-muted-foreground">
                      {twoFactorEnabled 
                        ? "Your account is protected with 2FA." 
                        : "Enable 2FA for additional security."}
                    </p>
                  </div>
                </div>
                {twoFactorEnabled && (
                  <div className="flex items-center gap-2 pt-2">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-green-600">2FA is active on this account</span>
                  </div>
                )}
              </div>
              
              <Button onClick={handleSaveGeneralSettings}>
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="organization">
          <Card>
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
              <CardDescription>
                Manage your organization or individual profile information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input
                    id="orgName"
                    placeholder="Enter organization name"
                    value={orgDetails.name}
                    onChange={(e) => setOrgDetails({...orgDetails, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="orgType">Organization Type</Label>
                  <RadioGroup 
                    value={orgDetails.type}
                    onValueChange={(value) => setOrgDetails({...orgDetails, type: value})}
                    className="flex items-center gap-6 pt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="company" id="company" />
                      <Label htmlFor="company">Company</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual">Individual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-profit" id="non-profit" />
                      <Label htmlFor="non-profit">Non-Profit</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="industry">Industry</Label>
                  <Select 
                    value={orgDetails.industry} 
                    onValueChange={(value) => setOrgDetails({...orgDetails, industry: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="orgSize">Company Size</Label>
                  <Select 
                    value={orgDetails.size} 
                    onValueChange={(value) => setOrgDetails({...orgDetails, size: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501+">501+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="orgAddress">Address</Label>
                  <Textarea
                    id="orgAddress"
                    placeholder="Enter organization address"
                    value={orgDetails.address}
                    onChange={(e) => setOrgDetails({...orgDetails, address: e.target.value})}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="orgPhone">Phone</Label>
                  <Input
                    id="orgPhone"
                    placeholder="Enter phone number"
                    value={orgDetails.phone}
                    onChange={(e) => setOrgDetails({...orgDetails, phone: e.target.value})}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="orgDescription">Description</Label>
                  <Textarea
                    id="orgDescription"
                    placeholder="Enter organization description"
                    value={orgDetails.description}
                    onChange={(e) => setOrgDetails({...orgDetails, description: e.target.value})}
                    className="min-h-[100px]"
                  />
                </div>
                
                <Button type="button" onClick={handleSaveOrgSettings}>
                  Save Organization Details
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="current-plan">
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
                  {currentPlan === "Free" && (
                    <>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Manage up to 1 active project
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Invite up to 5 team members
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Upload and share documents (limited to 1GB)
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Email notifications for tasks and updates
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        5GB storage limit
                      </li>
                    </>
                  )}
                  {currentPlan === "Basic" && (
                    <>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Manage up to 5 active projects
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Invite up to 15 team members
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Gantt chart view
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Calendar integration
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        20GB storage limit
                      </li>
                    </>
                  )}
                  {currentPlan === "Professional" && (
                    <>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Unlimited active projects
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Invite up to 50 team members
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Task automation & reminders
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Priority email support
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Advanced reporting
                      </li>
                    </>
                  )}
                  {currentPlan === "Enterprise" && (
                    <>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Unlimited everything
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Custom reports
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Slack integration
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Trello integration
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        Priority support
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleUpgradePlan} 
                  className="w-full md:w-auto"
                >
                  Upgrade Subscription
                </Button>
                
                {currentPlan !== "Free" && (
                  <Button 
                    variant="outline" 
                    className="w-full md:w-auto"
                  >
                    View Billing History
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account information and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="john.doe@example.com" type="email" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Your Company" />
                </div>
                <Button onClick={handleSaveAccountSettings}>
                  Update Account
                </Button>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 mb-6">
                  <Switch 
                    id="terms" 
                    checked={termsAgreed}
                    onCheckedChange={setTermsAgreed}
                  />
                  <div>
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link to="/terms-of-service" className="text-primary hover:underline" target="_blank">
                        Terms of Service
                      </Link>
                      {" "}and{" "}
                      <Link to="/privacy-policy" className="text-primary hover:underline" target="_blank">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Once you delete your account, there is no going back. This action cannot be undone.
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
