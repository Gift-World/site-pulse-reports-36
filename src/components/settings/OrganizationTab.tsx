
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface OrganizationTabProps {
  orgDetails: {
    name: string;
    address: string;
    phone: string;
    type: string;
    industry: string;
    size: string;
    description: string;
  };
  setOrgDetails: (details: any) => void;
  onSave: () => void;
}

export const OrganizationTab: React.FC<OrganizationTabProps> = ({
  orgDetails,
  setOrgDetails,
  onSave
}) => {
  return (
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
          
          <Button type="button" onClick={onSave}>
            Save Organization Details
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
