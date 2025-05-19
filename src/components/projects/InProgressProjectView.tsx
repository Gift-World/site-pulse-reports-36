
import React, { useState } from "react";
import { Project } from "@/types/project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./tabs/OverviewTab";
import { MilestonesTab } from "./tabs/MilestonesTab";
import { TeamTab } from "./tabs/TeamTab";
import { DocumentsTab } from "./tabs/DocumentsTab";
import { GalleryTab } from "./tabs/GalleryTab";
import { SafetyTab } from "./tabs/SafetyTab";
import { InventoryTab } from "./tabs/InventoryTab";
import { LaborTab } from "./tabs/LaborTab";
import { PlantTab } from "./tabs/PlantTab";
import { ProgramTab } from "./tabs/ProgramTab";

interface InProgressProjectViewProps {
  project: Project;
}

export function InProgressProjectView({ project }: InProgressProjectViewProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <Tabs 
      defaultValue="overview" 
      className="w-full"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <TabsList className="flex flex-wrap h-auto">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="milestones">Milestones</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
        <TabsTrigger value="safety">Safety</TabsTrigger>
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
        <TabsTrigger value="labor">Labor</TabsTrigger>
        <TabsTrigger value="plant">Plant & Equipment</TabsTrigger>
        <TabsTrigger value="program">Program</TabsTrigger>
      </TabsList>
      
      <div className="mt-6">
        <TabsContent value="overview" className="mt-0">
          <OverviewTab project={project} setActiveTab={setActiveTab} />
        </TabsContent>
        
        <TabsContent value="milestones" className="mt-0">
          <MilestonesTab project={project} />
        </TabsContent>
        
        <TabsContent value="team" className="mt-0">
          <TeamTab project={project} />
        </TabsContent>
        
        <TabsContent value="documents" className="mt-0">
          <DocumentsTab project={project} />
        </TabsContent>
        
        <TabsContent value="gallery" className="mt-0">
          <GalleryTab />
        </TabsContent>
        
        <TabsContent value="safety" className="mt-0">
          <SafetyTab project={project} />
        </TabsContent>
        
        <TabsContent value="inventory" className="mt-0">
          <InventoryTab project={project} />
        </TabsContent>
        
        <TabsContent value="labor" className="mt-0">
          <LaborTab project={project} />
        </TabsContent>
        
        <TabsContent value="plant" className="mt-0">
          <PlantTab project={project} />
        </TabsContent>
        
        <TabsContent value="program" className="mt-0">
          <ProgramTab project={project} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
