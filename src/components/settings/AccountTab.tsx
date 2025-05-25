
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

interface AccountTabProps {
  termsAgreed: boolean;
  setTermsAgreed: (agreed: boolean) => void;
  onSave: () => void;
  onDeleteAccount: () => void;
}

export const AccountTab: React.FC<AccountTabProps> = ({
  termsAgreed,
  setTermsAgreed,
  onSave,
  onDeleteAccount
}) => {
  return (
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
          <Button onClick={onSave}>
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
            <Button variant="destructive" onClick={onDeleteAccount}>
              Delete Account
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
