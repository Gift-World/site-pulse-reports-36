
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ShieldCheck } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCurrency } from "@/contexts/CurrencyContext";
import { currencies, countries } from "@/data/settingsData";

interface GeneralSettingsTabProps {
  country: string;
  setCountry: (country: string) => void;
  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (enabled: boolean) => void;
  onSave: () => void;
}

export const GeneralSettingsTab: React.FC<GeneralSettingsTabProps> = ({
  country,
  setCountry,
  twoFactorEnabled,
  setTwoFactorEnabled,
  onSave
}) => {
  const { currency, setCurrency, language, setLanguage, translate } = useCurrency();

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          Manage your general application settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="currency">{translate("currency")}</Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((curr) => (
                <SelectItem key={curr.code} value={curr.code}>
                  {curr.code} - {curr.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="language">{translate("language")}</Label>
          <Select value={language} onValueChange={setLanguage}>
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
          <Label htmlFor="country">{translate("country")}</Label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
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
        
        <Button onClick={onSave}>
          {translate("saveChanges")}
        </Button>
      </CardContent>
    </Card>
  );
};
