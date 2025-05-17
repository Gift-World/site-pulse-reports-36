
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Phone, Video, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const sampleMessages = [
  {
    id: 1,
    content: "Hi team, we need to discuss the concrete delivery for tomorrow. Any concerns?",
    sender: "Sarah Johnson",
    role: "Project Manager",
    time: "10:30 AM",
    isCurrentUser: false,
    avatar: "/placeholder.svg",
    initials: "SJ"
  },
  {
    id: 2,
    content: "I'm concerned about the weather forecast. It shows rain starting at 11 AM.",
    sender: "You",
    role: "Site Engineer",
    time: "10:32 AM",
    isCurrentUser: true,
    avatar: "/placeholder.svg",
    initials: "DL"
  },
  {
    id: 3,
    content: "Good point. Let me call the supplier to see if we can move it up to 9 AM instead.",
    sender: "Sarah Johnson",
    role: "Project Manager",
    time: "10:35 AM",
    isCurrentUser: false,
    avatar: "/placeholder.svg",
    initials: "SJ"
  },
  {
    id: 4,
    content: "That would be ideal. We need at least 2 hours of clear weather for the pour.",
    sender: "You",
    role: "Site Engineer",
    time: "10:36 AM",
    isCurrentUser: true,
    avatar: "/placeholder.svg",
    initials: "DL"
  },
  {
    id: 5,
    content: "Just spoke with them. They can come at 8:30 AM. I'll update the schedule now.",
    sender: "Sarah Johnson",
    role: "Project Manager",
    time: "10:42 AM",
    isCurrentUser: false,
    avatar: "/placeholder.svg",
    initials: "SJ"
  },
];

const channels = [
  { id: 1, name: "General", unread: 0 },
  { id: 2, name: "Site A Team", unread: 3 },
  { id: 3, name: "Site B Team", unread: 0 },
  { id: 4, name: "Architects", unread: 1 },
  { id: 5, name: "Safety", unread: 0 }
];

const Communication = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Communication</h1>
        <p className="text-muted-foreground">
          Team messaging and project communication
        </p>
      </div>

      <Card className="h-[calc(100vh-220px)]">
        <Tabs defaultValue="chat">
          <div className="flex border-b">
            <TabsList className="ml-4 mt-2">
              <TabsTrigger value="chat">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="calls">
                <Phone className="mr-2 h-4 w-4" />
                Calls
              </TabsTrigger>
              <TabsTrigger value="meetings">
                <Video className="mr-2 h-4 w-4" />
                Meetings
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="chat" className="flex flex-col m-0 h-[calc(100vh-280px)]">
            <div className="flex h-full">
              <div className="w-72 border-r p-4 hidden md:block">
                <div className="mb-4">
                  <Input placeholder="Search channels..." />
                </div>
                <div className="space-y-1">
                  {channels.map((channel) => (
                    <Button
                      key={channel.id}
                      variant={channel.id === 2 ? "secondary" : "ghost"}
                      className="w-full justify-start"
                    >
                      # {channel.name}
                      {channel.unread > 0 && (
                        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-construction-blue text-xs text-white">
                          {channel.unread}
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 flex flex-col h-full">
                <CardHeader className="border-b py-3">
                  <CardTitle className="text-lg"># Site A Team</CardTitle>
                  <CardDescription>5 members, 3 online</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-6">
                    {sampleMessages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-3",
                          message.isCurrentUser && "flex-row-reverse"
                        )}
                      >
                        <Avatar>
                          <AvatarImage src={message.avatar} />
                          <AvatarFallback>{message.initials}</AvatarFallback>
                        </Avatar>
                        <div className={cn(
                          "rounded-lg px-3 py-2 max-w-[80%]",
                          message.isCurrentUser 
                            ? "bg-construction-blue text-white"
                            : "bg-muted"
                        )}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={cn(
                              "font-medium text-sm",
                              message.isCurrentUser ? "text-white" : "text-foreground"
                            )}>
                              {message.sender}
                            </span>
                            <span className={cn(
                              "text-xs",
                              message.isCurrentUser ? "text-white/70" : "text-muted-foreground"
                            )}>
                              {message.time}
                            </span>
                          </div>
                          <p className={cn(
                            message.isCurrentUser ? "text-white" : "text-foreground"
                          )}>
                            {message.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <div className="border-t p-3 flex items-center gap-2">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="calls" className="h-[calc(100vh-280px)]">
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Phone className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">No recent calls</h3>
                <p className="text-muted-foreground">
                  Start a call with your team members
                </p>
                <Button className="mt-4">
                  Start a Call
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="meetings" className="h-[calc(100vh-280px)]">
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">No scheduled meetings</h3>
                <p className="text-muted-foreground">
                  Schedule a meeting with your team
                </p>
                <Button className="mt-4">
                  Schedule Meeting
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Communication;
