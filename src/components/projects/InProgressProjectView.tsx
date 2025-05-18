
import React, { useState } from "react";
import { Project } from "@/types/project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectInfoCards } from "./ProjectInfoCards";
import { OverviewTab } from "./tabs/OverviewTab";
import { MilestonesTab } from "./tabs/MilestonesTab";
import { TeamTab } from "./tabs/TeamTab";
import { InventoryTab } from "./tabs/InventoryTab";
import { LaborTab } from "./tabs/LaborTab";
import { PlantTab } from "./tabs/PlantTab";
import { GalleryTab } from "./tabs/GalleryTab";
import { SafetyTab } from "./tabs/SafetyTab";
import { ProgramTab } from "./tabs/ProgramTab";
import { DocumentsTab } from "./tabs/DocumentsTab";

interface InProgressProjectViewProps {
  project: Project;
}

export const InProgressProjectView: React.FC<InProgressProjectViewProps> = ({ project }) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      {/* Key Info Cards with Enhanced Graphics */}
      <ProjectInfoCards project={project} />
      
      {/* Main Content with Additional Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="labor">Labor</TabsTrigger>
          <TabsTrigger value="plant">Plant & Equipment</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="safety">Safety Reports</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="program">Program of Works</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <OverviewTab project={project} setActiveTab={setActiveTab} />
        </TabsContent>
        
        <TabsContent value="milestones">
          <MilestonesTab project={project} />
        </TabsContent>
        
        <TabsContent value="team">
          <TeamTab project={project} />
        </TabsContent>
        
        <TabsContent value="inventory">
          <InventoryTab project={project} />
        </TabsContent>
        
        <TabsContent value="labor">
          <LaborTab project={project} />
        </TabsContent>
        
        <TabsContent value="plant">
          <PlantTab project={project} />
        </TabsContent>
        
        <TabsContent value="gallery">
          <GalleryTab project={project} />
        </TabsContent>
        
        <TabsContent value="safety">
          <SafetyTab project={project} />
        </TabsContent>
        
        <TabsContent value="documents">
          <DocumentsTab project={project} />
        </TabsContent>
        
        <TabsContent value="program">
          <ProgramTab project={project} />
        </TabsContent>
      </Tabs>
    </>
  );
};
