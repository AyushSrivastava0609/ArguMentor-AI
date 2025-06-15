"use client";

import { useState } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId ? { ...session, ...updates } : session,
      ),
    );
    if (currentSession?.id === sessionId) {
      setCurrentSession((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    if (!currentSession) return;

    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    const updatedMessages = [...currentSession.messages, newMessage];
    updateSession(currentSession.id, { messages: updatedMessages });

    // Update session title based on first user message
    if (message.sender === "user" && currentSession.messages.length === 0) {
      const title =
        message.content.slice(0, 50) +
        (message.content.length > 50 ? "..." : "");
      updateSession(currentSession.id, { title });
    }
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
      className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      data-oid="fb:7rzz"
    >
      <HistorySidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        sessions={sessions}
        currentSession={currentSession}
        onSessionSelect={setCurrentSession}
        onNewSession={handleNewDebateClick}
        data-oid="amq9x_:"
      />

      <div className="flex-1 flex flex-col" data-oid="t8q_r_x">
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
          data-oid="914qux0"
        />
      </div>

      <NewDebateDialog
        isOpen={isNewDebateDialogOpen}
        onClose={() => setIsNewDebateDialogOpen(false)}
        onStartDebate={handleStartDebate}
        data-oid="rqnld7u"
      />
    </div>
  );
}
