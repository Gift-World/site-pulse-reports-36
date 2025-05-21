
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Send, Paperclip, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotifications } from "@/hooks/use-notifications";

// Mock data for chats
const chatData = {
  contacts: [
    { id: 1, name: "John Smith", role: "Project Manager", avatar: "JS", online: true, unread: 0 },
    { id: 2, name: "Maria Garcia", role: "Engineer", avatar: "MG", online: true, unread: 3 },
    { id: 3, name: "Robert Johnson", role: "Foreman", avatar: "RJ", online: false, unread: 0 },
    { id: 4, name: "Sarah Williams", role: "Architect", avatar: "SW", online: true, unread: 1 },
    { id: 5, name: "David Brown", role: "Electrician", avatar: "DB", online: false, unread: 0 },
    { id: 6, name: "Team Channel", role: "Group Chat", avatar: "TC", online: true, unread: 5, isGroup: true },
    { id: 7, name: "Safety Committee", role: "Group Chat", avatar: "SC", online: true, unread: 0, isGroup: true },
  ],
  messages: [
    { id: 1, senderId: 2, text: "Hi there! I've reviewed the structural plans for Building B.", time: "10:32 AM", date: "Today" },
    { id: 2, senderId: 0, text: "Great! Any issues we need to address?", time: "10:35 AM", date: "Today" },
    { id: 3, senderId: 2, text: "Yes, we need to adjust the foundation depth in the north corner.", time: "10:38 AM", date: "Today" },
    { id: 4, senderId: 2, text: "I'll send you the revised calculations later today.", time: "10:39 AM", date: "Today" },
    { id: 5, senderId: 0, text: "That's perfect. I'll discuss with the team and get back to you.", time: "10:42 AM", date: "Today" },
    { id: 6, senderId: 0, text: "Also, are you coming to the site visit tomorrow?", time: "10:43 AM", date: "Today" },
    { id: 7, senderId: 2, text: "Yes, I'll be there at 9 AM.", time: "10:45 AM", date: "Today" },
  ]
};

const Chat = () => {
  const [activeContact, setActiveContact] = useState(chatData.contacts[1]);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState(chatData.contacts);
  const [messages, setMessages] = useState(chatData.messages);
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Check if we have a team member to message
    const chatWithMember = sessionStorage.getItem("chatWithMember");
    
    if (chatWithMember) {
      const memberData = JSON.parse(chatWithMember);
      
      // Check if contact already exists
      const existingContact = contacts.find(c => c.name === memberData.name);
      
      if (existingContact) {
        // Use existing contact
        setActiveContact(existingContact);
      } else {
        // Create new contact
        const newContact = {
          id: contacts.length + 1,
          name: memberData.name,
          role: memberData.role,
          avatar: memberData.initials,
          online: true,
          unread: 0
        };
        
        setContacts(prev => [newContact, ...prev]);
        setActiveContact(newContact);
      }
      
      // Clear the stored data after using it
      sessionStorage.removeItem("chatWithMember");
    }
  }, []);

  // Clear unread messages when opening a chat
  useEffect(() => {
    if (activeContact) {
      const updatedContacts = contacts.map(contact => 
        contact.id === activeContact.id 
          ? { ...contact, unread: 0 }
          : contact
      );
      setContacts(updatedContacts);
    }
  }, [activeContact]);

  // Simulate receiving a message every 30 seconds (for demo purposes)
  useEffect(() => {
    const simulateIncomingMessage = () => {
      // Only simulate messages occasionally
      if (Math.random() > 0.7) {
        // Pick a random contact
        const randomContactIndex = Math.floor(Math.random() * contacts.length);
        const sender = contacts[randomContactIndex];
        
        if (sender.id !== activeContact.id) {
          // Update the contacts with unread count
          const updatedContacts = contacts.map(c => 
            c.id === sender.id ? { ...c, unread: c.unread + 1 } : c
          );
          setContacts(updatedContacts);
          
          // Send a notification for the new message
          addNotification({
            title: `New message from ${sender.name}`,
            message: sender.isGroup ? "New message in group chat" : "You received a new direct message",
            type: "chat"
          });
        } else {
          // Add to current conversation
          const newMessage = {
            id: messages.length + 1,
            senderId: sender.id,
            text: "This is a simulated incoming message for testing purposes.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: "Today"
          };
          
          setMessages(prev => [...prev, newMessage]);
        }
      }
    };
    
    const interval = setInterval(simulateIncomingMessage, 30000);
    return () => clearInterval(interval);
  }, [contacts, activeContact, messages, addNotification]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        senderId: 0, // Current user
        text: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: "Today"
      };
      
      setMessages([...messages, newMessage]);
      setMessageText("");
      
      // Simulate reply after a delay (for demo purposes)
      if (Math.random() > 0.3) {
        setTimeout(() => {
          const replyMessage = {
            id: messages.length + 2,
            senderId: activeContact.id,
            text: `This is an automatic reply from ${activeContact.name}.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: "Today"
          };
          
          setMessages(prev => [...prev, replyMessage]);
          
          // Don't show notification for active contact's messages
        }, 2000 + Math.random() * 3000);
      }
    }
  };

  const handleAttachFile = () => {
    // In a real app, this would open a file picker
    console.log("Attach file button clicked");
    // Implementation would typically involve a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.click();
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle clicking on a contact
  const handleContactClick = (contact: any) => {
    setActiveContact(contact);
    
    // If the contact has unread messages, clear them
    if (contact.unread > 0) {
      const updatedContacts = contacts.map(c => 
        c.id === contact.id ? { ...c, unread: 0 } : c
      );
      setContacts(updatedContacts);
    }
  };

  return (
    <div className="h-[calc(100vh-11rem)] flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Contacts Sidebar */}
        <div className="w-80 border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Messages</h2>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Users className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search contacts..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-muted ${activeContact.id === contact.id ? 'bg-muted' : ''}`}
                onClick={() => handleContactClick(contact)}
              >
                <div className="relative">
                  <Avatar>
                    {contact.isGroup ? (
                      <div className="bg-construction-navy text-white h-full w-full flex items-center justify-center">
                        <Users className="h-4 w-4" />
                      </div>
                    ) : (
                      <>
                        <AvatarImage src={`/placeholder.svg`} />
                        <AvatarFallback className="bg-construction-navy text-white">{contact.avatar}</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  {contact.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium truncate">{contact.name}</p>
                    {contact.unread > 0 && (
                      <span className="bg-construction-navy text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{contact.role}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar>
                {activeContact.isGroup ? (
                  <div className="bg-construction-navy text-white h-full w-full flex items-center justify-center">
                    <Users className="h-4 w-4" />
                  </div>
                ) : (
                  <>
                    <AvatarImage src={`/placeholder.svg`} />
                    <AvatarFallback className="bg-construction-navy text-white">{activeContact.avatar}</AvatarFallback>
                  </>
                )}
              </Avatar>
              <div>
                <p className="font-medium">{activeContact.name}</p>
                <p className="text-xs text-muted-foreground flex items-center">
                  {activeContact.online ? (
                    <>
                      <span className="h-2 w-2 rounded-full bg-green-500 inline-block mr-1"></span>
                      Online
                    </>
                  ) : (
                    'Offline'
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {messages.map((message) => {
              const isUser = message.senderId === 0;
              return (
                <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex gap-3 max-w-[70%]">
                    {!isUser && (
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg`} />
                        <AvatarFallback className="bg-construction-navy text-white">{activeContact.avatar}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <Card className={`${isUser ? 'bg-construction-navy text-white shadow-lg' : 'bg-white shadow'}`}>
                        <CardContent className="p-3">
                          <p className="text-sm">{message.text}</p>
                        </CardContent>
                      </Card>
                      <p className="text-xs text-muted-foreground mt-1">{message.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleAttachFile}
                className="hover:bg-muted"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                className="bg-construction-navy hover:bg-construction-darkBlue" 
                size="icon"
                onClick={handleSendMessage}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
