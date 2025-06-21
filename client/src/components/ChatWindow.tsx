"use client";

import {
  ArrowDownIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import { ChatSession, DebateSettings, Message } from "./ChatLayout";
import MessageBubble from "./MessageBubble";

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
    data-oid="3-..nsn"
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

  useEffect(() => {
    if (session?.id && session.messages.length === 0) {
      // Send initial message when a new empty session is created
      const sendInitialMessage = async () => {
        let initialMessage = "Hey, What's on your Mind Today ?";

        onAddMessage({
          content: initialMessage,
          sender: "ai",
          principles:
            settings.principles.length > 1 ? settings.principles : undefined,
        });
      };

      sendInitialMessage();
    }
  }, [session?.id]);

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

  function loadVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
      const voices = speechSynthesis.getVoices();
      if (voices.length) {
        resolve(voices);
      } else {
        speechSynthesis.onvoiceschanged = () => {
          resolve(speechSynthesis.getVoices());
        };
      }
    });
  }

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
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "https://argumentor-ai-production.up.railway.app"}/api/chat`,
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
        const speakAIResponse = async (text: string) => {
          if (settings.mode !== "voice" || !("speechSynthesis" in window))
            return;

          try {
            const voices = await loadVoices();

            // Try to pick a female voice
            const femaleVoice =
              voices.find((v) =>
                /(Google UK English Female|Google US English|Samantha|Jenny|Zira|Victoria|Susan)/i.test(
                  v.name,
                ),
              ) || voices.find((v) => v.name.toLowerCase().includes("female"));

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = femaleVoice || voices[0]; // fallback
            utterance.rate = 0.95;
            utterance.pitch = 1.05;
            utterance.volume = 1.0;

            utterance.onstart = () => window.dispatchEvent(new Event("speak"));
            utterance.onend = () => window.dispatchEvent(new Event("end"));
            utterance.onerror = () => window.dispatchEvent(new Event("end"));

            speechSynthesis.cancel(); // prevent overlap
            speechSynthesis.speak(utterance);
          } catch (error) {
            console.error("Error in voice synthesis:", error);
          }
        };
        await speakAIResponse(data.aiText);
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
        data-oid="daaqzui"
      >
        {/* Animated Background */}
        <div className="absolute inset-0" data-oid="4zqlaq_">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" data-oid="9_ke_8q">
            <svg className="absolute inset-0 w-full h-full" data-oid="0utrew0">
              <defs data-oid="mq38a5j">
                <pattern
                  id="chat-grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                  data-oid=".w_mpx2"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(6, 182, 212, 0.2)"
                    strokeWidth="1"
                    data-oid="pv2ps7t"
                  />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#chat-grid)"
                data-oid="7c:iabj"
              />
            </svg>
          </div>

          {/* Floating Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.2} data-oid="k4p8zww" />
          ))}

          {/* Gradient Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/5 to-blue-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            data-oid="z7t3w-w"
          />

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-violet-400/5 to-purple-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
            data-oid="kw0i2tv"
          />
        </div>

        {/* Empty State Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10 max-w-sm sm:max-w-md mx-auto px-4 sm:px-6"
          data-oid="hcynytv"
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
            className="relative mb-6 sm:mb-8"
            data-oid="u-5og:8"
          >
            <motion.div
              className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl"
              animate={{
                boxShadow: [
                  "0 20px 40px -12px rgba(6, 182, 212, 0.3)",
                  "0 25px 50px -12px rgba(139, 92, 246, 0.4)",
                  "0 20px 40px -12px rgba(6, 182, 212, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              data-oid="nbri4ep"
            >
              <SparklesIcon
                className="w-8 sm:w-10 h-8 sm:h-10 text-white"
                data-oid="r_9j393"
              />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4"
            data-oid="a8m-u_b"
          >
            Start a New{" "}
            <span
              className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent"
              data-oid="ja0-gp4"
            >
              Debate
            </span>
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-slate-400 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base"
            data-oid="ki9y:tx"
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
            className="mb-6 sm:mb-8"
            data-oid="s2p89ub"
          >
            <motion.button
              onClick={onNewSession}
              className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-300 shadow-lg mx-auto text-sm sm:text-base"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -12px rgba(6, 182, 212, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              data-oid="ocd_g-t"
            >
              <SparklesIcon
                className="w-4 sm:w-5 h-4 sm:h-5"
                data-oid="w1aa9y-"
              />
              Start New Debate
              <ArrowRightIcon
                className="w-4 sm:w-5 h-4 sm:h-5"
                data-oid="n5eflcp"
              />
            </motion.button>
          </motion.div>

          {/* Quick Start Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm"
            data-oid="ta1q06x"
          >
            <div
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-slate-700/50"
              data-oid="set1uxa"
            >
              <div
                className="text-cyan-400 font-semibold mb-1"
                data-oid="9.48rgh"
              >
                💬 Text Mode
              </div>
              <div className="text-slate-400" data-oid="bg7u4rn">
                Type your arguments
              </div>
            </div>
            <div
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-slate-700/50"
              data-oid="ju7:dsn"
            >
              <div
                className="text-violet-400 font-semibold mb-1"
                data-oid="5gn_b74"
              >
                🎤 Voice Mode
              </div>
              <div className="text-slate-400" data-oid="gs4poay">
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
      data-oid="2sfov:e"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5" data-oid="1h5f2x4">
        <svg className="absolute inset-0 w-full h-full" data-oid="b.7abfm">
          <defs data-oid="zuaor0l">
            <pattern
              id="message-grid"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
              data-oid="7xcv28h"
            >
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="rgba(6, 182, 212, 0.3)"
                strokeWidth="1"
                data-oid="h8oa2tr"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#message-grid)"
            data-oid="m.a:uei"
          />
        </svg>
      </div>

      {/* Chat Header */}
      <div
        className="border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-xl px-4 sm:px-6 py-3 relative z-10"
        data-oid="l3f1i96"
      >
        <div className="flex flex-col gap-1" data-oid="9s8b:r-">
          <h1
            className="text-base sm:text-lg font-bold text-white truncate"
            data-oid="-3awr4."
          >
            {session?.title || "ArguMentor-AI"}
          </h1>
          {session && (
            <div
              className="flex items-center gap-1 sm:gap-2 flex-wrap"
              data-oid="0rtcp5k"
            >
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  session.mode === "voice"
                    ? "bg-violet-500/20 text-violet-300"
                    : "bg-cyan-500/20 text-cyan-300"
                }`}
                data-oid="4v4rr.a"
              >
                {session.mode === "voice" ? "🎤 Voice" : "💬 Text"}
              </span>
              <span
                className="text-xs px-2 py-1 rounded-full bg-slate-700/50 text-slate-300 truncate max-w-24 sm:max-w-none"
                data-oid="x_4ols-"
              >
                {session.settings.style}
              </span>
              {session.settings.principles.slice(0, 2).map((principle) => (
                <span
                  key={principle}
                  className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300 truncate max-w-20 sm:max-w-none"
                  data-oid="4.tkih1"
                >
                  {principle}
                </span>
              ))}
              {session.settings.principles.length > 2 && (
                <span
                  className="text-xs px-2 py-1 rounded-full bg-slate-600/50 text-slate-400"
                  data-oid=":axgipw"
                >
                  +{session.settings.principles.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 chat-scroll overflow-x-hidden p-3 sm:p-6 space-y-4 sm:space-y-6 relative z-10 min-h-0"
        style={{ maxHeight: "calc(100vh - 140px)" }}
        data-oid="pds7crq"
      >
        <AnimatePresence initial={false} data-oid="50lvizn">
          {session.messages.map((message, index) => {
            console.log("Rendering message:", message, "Index:", index);
            return (
              <MessageBubble
                key={message.id}
                message={message}
                isLast={index === session.messages.length - 1}
                data-oid="k7i7zh7"
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
            data-oid="_zxdug:"
          >
            <div
              className="bg-slate-800/50 backdrop-blur-xl rounded-3xl px-4 sm:px-6 py-3 sm:py-4 max-w-xs border border-slate-700/50"
              data-oid="b_j-6xw"
            >
              <div
                className="flex items-center gap-2 sm:gap-3"
                data-oid="urtr3wd"
              >
                <div className="typing-indicator" data-oid="ahh1jg_">
                  <div className="typing-dot" data-oid="lvj6krr"></div>
                  <div className="typing-dot" data-oid="a2.6a3o"></div>
                  <div className="typing-dot" data-oid="_xrftc2"></div>
                </div>
                <span
                  className="text-slate-400 text-xs sm:text-sm"
                  data-oid="h8eqkn3"
                >
                  AI is thinking...
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} data-oid="p0z7.r2" />
      </div>

      {/* Enhanced Scroll to Bottom Button */}
      <AnimatePresence data-oid="4nq1nyo">
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => {
              setShouldAutoScroll(true);
              scrollToBottom(true);
            }}
            className="absolute bottom-20 sm:bottom-28 right-2 sm:right-4 bg-slate-800/80 backdrop-blur-xl hover:bg-slate-700/80 text-white p-3 sm:p-4 rounded-full shadow-xl transition-all duration-300 z-10 border border-slate-600/50 hover:border-cyan-500/50"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 10px 30px -5px rgba(6, 182, 212, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            data-oid="_h:y9o6"
          >
            <ArrowDownIcon
              className="w-4 sm:w-5 h-4 sm:h-5"
              data-oid="mzia3aa"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        mode={settings.mode}
        disabled={isLoading}
        sessionId={session?.id}
        data-oid="92w:7-g"
      />
    </div>
  );
}
