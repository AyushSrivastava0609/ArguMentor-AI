"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { ChatSession, Message, DebateSettings } from "./ChatLayout";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

interface ChatWindowProps {
  session: ChatSession | null;
  settings: DebateSettings;
  onAddMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  onNewSession: () => void;
}

// Floating particles for empty state
const FloatingParticle = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400/30 to-violet-400/30 rounded-full"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [0, -50, 0],
      x: [0, Math.random() * 20 - 10, 0],
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5],
    }}
    transition={{
      duration: Math.random() * 4 + 3,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    data-oid="k8zalxy"
  />
);

export default function ChatWindow({
  session,
  settings,
  onAddMessage,
  onNewSession,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  const scrollToBottom = (smooth = true) => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      if (smooth) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      } else {
        container.scrollTop = container.scrollHeight;
      }
    }
  };

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      messagesContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

    setShowScrollButton(!isNearBottom && (session?.messages.length || 0) > 0);
    setShouldAutoScroll(isNearBottom);

    // Detect user scrolling
    setIsUserScrolling(true);

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Reset user scrolling flag after scroll ends
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 150);
  };

  // Auto-scroll only when new messages arrive and user is at bottom
  useEffect(() => {
    if (session?.messages && shouldAutoScroll && !isUserScrolling) {
      // Small delay to ensure message is rendered
      const timeoutId = setTimeout(() => {
        scrollToBottom(true);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [session?.messages?.length, shouldAutoScroll, isUserScrolling]);

  // Handle session changes
  useEffect(() => {
    if (session?.id) {
      // Reset scroll state for new session
      setShouldAutoScroll(true);
      setIsUserScrolling(false);

      // Scroll to bottom for new session
      setTimeout(() => {
        scrollToBottom(false);
      }, 50);
    }
  }, [session?.id]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleSendMessage = async (content: string) => {
    if (!session || !content.trim()) return;

    // Ensure we're at bottom for new messages
    setShouldAutoScroll(true);

    // Add user message
    onAddMessage({
      content: content.trim(),
      sender: "user",
    });

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"}/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userText: content.trim(),
            mode: settings.mode,
            style: settings.style,
            principles: settings.principles,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();

        // Add AI response
        onAddMessage({
          content: data.aiText,
          sender: "ai",
          principles:
            settings.principles.length > 1 ? settings.principles : undefined,
        });

        // Text-to-speech for AI response
        if (settings.mode === "voice" && "speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(data.aiText);
          utterance.rate = 1;
          utterance.pitch = 1;

          // Add event handlers
          utterance.onstart = () => {
            // You can emit an event or use a callback here
            window.dispatchEvent(new Event("speak"));
          };

          utterance.onend = () => {
            window.dispatchEvent(new Event("end"));
          };

          utterance.onerror = () => {
            window.dispatchEvent(new Event("end"));
          };

          speechSynthesis.speak(utterance);
        }
      } else {
        throw new Error("Failed to get response");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      onAddMessage({
        content:
          "I apologize, but I encountered an error. I guess my API limits are exhausted due to which I cannot process further requests 😫, Meanwhile you can check our demo ! Thankyou !!",
        sender: "ai",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <div
        className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden overflow-x-auto"
        data-oid="d5o_y0r"
      >
        {/* Animated Background */}
        <div className="absolute inset-0" data-oid="ryq3gjs">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" data-oid="7506:i.">
            <svg className="absolute inset-0 w-full h-full" data-oid="d8h7l0r">
              <defs data-oid=":6sten4">
                <pattern
                  id="chat-grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                  data-oid="2o.plub"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(6, 182, 212, 0.2)"
                    strokeWidth="1"
                    data-oid="mnsdtft"
                  />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#chat-grid)"
                data-oid="dq.e:ep"
              />
            </svg>
          </div>

          {/* Floating Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.2} data-oid="atn9ykz" />
          ))}

          {/* Gradient Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/5 to-blue-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            data-oid="xz3tztp"
          />

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-violet-400/5 to-purple-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
            data-oid="m2xgqk:"
          />
        </div>

        {/* Empty State Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10 max-w-md mx-auto px-6"
          data-oid="_ti8h43"
        >
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="relative mb-8"
            data-oid="5an0::m"
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl"
              animate={{
                boxShadow: [
                  "0 20px 40px -12px rgba(6, 182, 212, 0.3)",
                  "0 25px 50px -12px rgba(139, 92, 246, 0.4)",
                  "0 20px 40px -12px rgba(6, 182, 212, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              data-oid="4unonjp"
            >
              <SparklesIcon
                className="w-10 h-10 text-white"
                data-oid="u18z69p"
              />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl font-bold text-white mb-4"
            data-oid="grosq-o"
          >
            Start a New{" "}
            <span
              className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent"
              data-oid="l2d90a6"
            >
              Debate
            </span>
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-slate-400 mb-8 leading-relaxed"
            data-oid="21oatyt"
          >
            Choose your debate mode and begin an engaging conversation with AI.
            Explore different perspectives and sharpen your argumentation
            skills.
          </motion.p>

          {/* Start Debate Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-8"
            data-oid="0xt2-zi"
          >
            <motion.button
              onClick={onNewSession}
              className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg mx-auto"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -12px rgba(6, 182, 212, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              data-oid="lud:7yh"
            >
              <SparklesIcon className="w-5 h-5" data-oid="kcwp4s1" />
              Start New Debate
              <ArrowRightIcon className="w-5 h-5" data-oid="r7e:t._" />
            </motion.button>
          </motion.div>

          {/* Quick Start Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
            data-oid="vj-x2g5"
          >
            <div
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50"
              data-oid="_udym6j"
            >
              <div
                className="text-cyan-400 font-semibold mb-1"
                data-oid="v28saub"
              >
                💬 Text Mode
              </div>
              <div className="text-slate-400" data-oid="qew1t6g">
                Type your arguments
              </div>
            </div>
            <div
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50"
              data-oid="wy1vv97"
            >
              <div
                className="text-violet-400 font-semibold mb-1"
                data-oid="uoztm-r"
              >
                🎤 Voice Mode
              </div>
              <div className="text-slate-400" data-oid=".quujt0">
                Speak your thoughts
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative h-screen overflow-hidden"
      data-oid="jrlhct4"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5" data-oid="w3pmgl2">
        <svg className="absolute inset-0 w-full h-full" data-oid="_zr7l97">
          <defs data-oid="lmcjcq-">
            <pattern
              id="message-grid"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
              data-oid="mk1:8b3"
            >
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="rgba(6, 182, 212, 0.3)"
                strokeWidth="1"
                data-oid="7:keohw"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#message-grid)"
            data-oid="cluvjpm"
          />
        </svg>
      </div>

      {/* Chat Header */}
      <div
        className="border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-xl px-6 py-3 relative z-10"
        data-oid="y-_gr3q"
      >
        <div className="flex flex-col gap-1" data-oid="tvqfhe6">
          <h1 className="text-lg font-bold text-white" data-oid="610dcb6">
            {session?.title || "ArguMentor-AI"}
          </h1>
          {session && (
            <div
              className="flex items-center gap-2 flex-wrap"
              data-oid="a_x8dsl"
            >
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  session.mode === "voice"
                    ? "bg-violet-500/20 text-violet-300"
                    : "bg-cyan-500/20 text-cyan-300"
                }`}
                data-oid="pt19fuw"
              >
                {session.mode === "voice" ? "🎤 Voice" : "💬 Text"}
              </span>
              <span
                className="text-xs px-2 py-1 rounded-full bg-slate-700/50 text-slate-300"
                data-oid="e.mev1_"
              >
                {session.settings.style}
              </span>
              {session.settings.principles.map((principle) => (
                <span
                  key={principle}
                  className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300"
                  data-oid="n7s8fhf"
                >
                  {principle}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 chat-scroll overflow-x-hidden p-6 space-y-6 relative z-10 min-h-0"
        style={{ maxHeight: "calc(100vh - 140px)" }}
        data-oid="ncpfrdg"
      >
        <AnimatePresence initial={false} data-oid="znwt5v8">
          {session.messages.map((message, index) => {
            console.log("Rendering message:", message, "Index:", index);
            return (
              <MessageBubble
                key={message.id}
                message={message}
                isLast={index === session.messages.length - 1}
                data-oid="zh.uze_"
              />
            );
          })}
        </AnimatePresence>

        {/* Enhanced Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
            data-oid="0y9jud1"
          >
            <div
              className="bg-slate-800/50 backdrop-blur-xl rounded-3xl px-6 py-4 max-w-xs border border-slate-700/50"
              data-oid="mitck82"
            >
              <div className="flex items-center gap-3" data-oid="mp59t6t">
                <div className="typing-indicator" data-oid="x001weg">
                  <div className="typing-dot" data-oid="ng-hmc1"></div>
                  <div className="typing-dot" data-oid="k9xzjpn"></div>
                  <div className="typing-dot" data-oid="liips7a"></div>
                </div>
                <span className="text-slate-400 text-sm" data-oid="mdwjo6:">
                  AI is thinking...
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} data-oid="tz8aqzv" />
      </div>

      {/* Enhanced Scroll to Bottom Button */}
      <AnimatePresence data-oid="9rtrwpr">
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => {
              setShouldAutoScroll(true);
              scrollToBottom(true);
            }}
            className="absolute bottom-28 right-2 bg-slate-800/80 backdrop-blur-xl hover:bg-slate-700/80 text-white p-4 rounded-full shadow-xl transition-all duration-300 z-10 border border-slate-600/50 hover:border-cyan-500/50"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 10px 30px -5px rgba(6, 182, 212, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            data-oid="-a3dmp8"
          >
            <ArrowDownIcon className="w-5 h-5" data-oid="qq_1p_z" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        mode={settings.mode}
        disabled={isLoading}
        sessionId={session?.id}
        data-oid=":wok467"
      />
    </div>
  );
}
