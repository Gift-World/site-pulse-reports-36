import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type?: "report" | "chat" | "system";
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "time" | "read">) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Initial notifications
const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "New Project Assigned",
    message: "You have been assigned to Building A renovation",
    time: "10 minutes ago",
    read: false
  },
  {
    id: 2,
    title: "Safety Report Due",
    message: "Weekly safety report for Project Skyline is due tomorrow",
    time: "1 hour ago",
    read: false
  },
  {
    id: 3,
    title: "Material Delivery",
    message: "Concrete delivery scheduled for tomorrow at 9am",
    time: "3 hours ago",
    read: false
  }
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, "id" | "time" | "read">) => {
    const now = new Date();
    const newNotification: Notification = {
      id: Date.now(),
      ...notification,
      time: "Just now",
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for new notification
    toast({
      title: notification.title,
      description: notification.message,
    });
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Update relative timestamps periodically
  useEffect(() => {
    const updateTimestamps = () => {
      setNotifications(prev => 
        prev.map(notification => {
          // In a real app, this would calculate relative time properly
          // For now we'll just keep it simple
          return notification;
        })
      );
    };
    
    const interval = setInterval(updateTimestamps, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      addNotification, 
      markAsRead, 
      markAllAsRead,
      unreadCount
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
