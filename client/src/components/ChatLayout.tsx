"use client";

import { useEffect, useState } from "react";
import HistorySidebar from "./HistorySidebar";
import ChatWindow from "./ChatWindow";
import NewDebateDialog from "./NewDebateDialog";

export interface ChatSession {
  id: string;
  title: string;
  date: string;
  mode: "text" | "voice";
  messages: Message[];
  settings: DebateSettings;
}

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  principles?: string[];
}

export interface DebateSettings {
  mode: "text" | "voice";
  style: string;
  principles: string[];
}

export default function ChatLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (window.innerWidth >= 1024) {
      return true;
    }
    return false;
  });
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(
    null,
  );
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isNewDebateDialogOpen, setIsNewDebateDialogOpen] = useState(false);

  const createNewSession = (settings: DebateSettings) => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Debate",
      date: new Date().toISOString(),
      mode: settings.mode,
      messages: [],
      settings,
    };
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSession(newSession);
  };

  const updateSession = (sessionId: string, updates: Partial<ChatSession>) => {
    console.log("Updating session:", sessionId, "with updates:", updates);

    setSessions((prev) => {
      const newSessions = prev.map((session) =>
        session.id === sessionId ? { ...session, ...updates } : session,
      );
      console.log("New sessions array:", newSessions);
      return newSessions;
    });

    // Update current session immediately to ensure UI reflects changes
    setCurrentSession((prev) => {
      if (prev?.id === sessionId) {
        const newSession = { ...prev, ...updates };
        console.log("New current session:", newSession);
        return newSession;
      }
      return prev;
    });
  };

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    if (!currentSession) {
      console.log("No current session, cannot add message");
      return;
    }

    console.log("Adding message to session:", currentSession.id, message);

    const newMessage: Message = {
      ...message,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };

    // Use functional update to ensure we're working with the latest state
    setCurrentSession((prevSession) => {
      if (!prevSession || prevSession.id !== currentSession.id) {
        return prevSession;
      }

      const updatedMessages = [...prevSession.messages, newMessage];
      console.log("Updated messages array:", updatedMessages);

      const updatedSession = {
        ...prevSession,
        messages: updatedMessages,
        // Update session title based on first user message
        title:
          message.sender === "user" && prevSession.messages.length === 0
            ? message.content.slice(0, 50) +
              (message.content.length > 50 ? "..." : "")
            : prevSession.title,
      };

      // Also update the sessions array
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === currentSession.id ? updatedSession : session,
        ),
      );

      return updatedSession;
    });
  };

  const handleNewDebateClick = () => {
    setIsNewDebateDialogOpen(true);
  };

  const handleStartDebate = (settings: DebateSettings) => {
    createNewSession(settings);
    setIsNewDebateDialogOpen(false);
  };

  return (
    <div
      className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
      data-oid="zph7ft0"
    >
      <HistorySidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        sessions={sessions}
        currentSession={currentSession}
        onSessionSelect={setCurrentSession}
        onNewSession={handleNewDebateClick}
        data-oid="k24zbv-"
      />

      <div className="flex-1 flex flex-col min-w-0" data-oid=":g7:hyo">
        <ChatWindow
          session={currentSession}
          settings={
            currentSession?.settings || {
              mode: "text",
              style: "Persuasive",
              principles: ["Normal"],
            }
          }
          onAddMessage={addMessage}
          onNewSession={handleNewDebateClick}
          data-oid="xoh8cai"
        />
      </div>

      <NewDebateDialog
        isOpen={isNewDebateDialogOpen}
        onClose={() => setIsNewDebateDialogOpen(false)}
        onStartDebate={handleStartDebate}
        data-oid="d8wkw84"
      />
    </div>
  );
}
