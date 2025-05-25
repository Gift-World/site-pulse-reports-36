
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  Settings as SettingsIcon, 
  CreditCard, 
  UserCircle, 
  Building2 
} from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { GeneralSettingsTab } from "@/components/settings/GeneralSettingsTab";
import { OrganizationTab } from "@/components/settings/OrganizationTab";
import { CurrentPlanTab } from "@/components/settings/CurrentPlanTab";
import { AccountTab } from "@/components/settings/AccountTab";

const Settings = () => {
  const { toast } = useToast();
  const { translate } = useCurrency();
  const [country, setCountry] = useState(() => {
    return localStorage.getItem("country") || "US";
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(() => {
    return localStorage.getItem("twoFactorEnabled") === "true";
  });
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
    localStorage.setItem("country", country);
    localStorage.setItem("twoFactorEnabled", twoFactorEnabled.toString());
    
    toast({
      title: translate("settingsSaved"),
      description: translate("settingsSavedDesc"),
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
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast({
        title: "Account Deletion Requested",
        description: "Your account deletion request has been submitted.",
        variant: "destructive"
      });
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
          <h1 className="text-3xl font-bold tracking-tight">{translate("settings")}</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            {translate("general")}
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
          <GeneralSettingsTab
            country={country}
            setCountry={setCountry}
            twoFactorEnabled={twoFactorEnabled}
            setTwoFactorEnabled={setTwoFactorEnabled}
            onSave={handleSaveGeneralSettings}
          />
        </TabsContent>
        
        <TabsContent value="organization">
          <OrganizationTab
            orgDetails={orgDetails}
            setOrgDetails={setOrgDetails}
            onSave={handleSaveOrgSettings}
          />
        </TabsContent>
        
        <TabsContent value="current-plan">
          <CurrentPlanTab
            currentPlan={currentPlan}
            nextBillingDate={nextBillingDate}
            onUpgrade={handleUpgradePlan}
          />
        </TabsContent>
        
        <TabsContent value="account">
          <AccountTab
            termsAgreed={termsAgreed}
            setTermsAgreed={setTermsAgreed}
            onSave={handleSaveAccountSettings}
            onDeleteAccount={handleDeleteAccount}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
