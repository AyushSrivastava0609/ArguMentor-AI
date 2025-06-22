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
    data-oid="1vifmp4"
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
        data-oid="r:4q:7c"
      >
        {/* Animated Background */}
        <div className="absolute inset-0" data-oid="wq45h8_">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" data-oid="u19cmyu">
            <svg className="absolute inset-0 w-full h-full" data-oid="8fk4xqv">
              <defs data-oid="b67hcp0">
                <pattern
                  id="chat-grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                  data-oid="ey3gw8d"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(6, 182, 212, 0.2)"
                    strokeWidth="1"
                    data-oid="cm-_87e"
                  />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#chat-grid)"
                className="w-[1106px] h-[1025px]"
                data-oid="_pizm8o"
              />
            </svg>
          </div>

          {/* Floating Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.2} data-oid="vnkqnf-" />
          ))}

          {/* Gradient Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/5 to-blue-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            data-oid="4tm.8dq"
          />

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-violet-400/5 to-purple-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
            data-oid="_nt:kwe"
          />
        </div>

        {/* Empty State Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10 max-w-sm sm:max-w-md mx-auto px-4 sm:px-6"
          data-oid="uaod_:j"
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
            data-oid="jw7evq9"
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
              data-oid=":0rjsrg"
            >
              <SparklesIcon
                className="w-8 sm:w-10 h-8 sm:h-10 text-white"
                data-oid="p1g0q.f"
              />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4"
            data-oid="r1s3vl5"
          >
            Start a New{" "}
            <span
              className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent"
              data-oid="bpuw1nr"
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
            data-oid="z68z59a"
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
            data-oid="u9_3w1f"
          >
            <motion.button
              onClick={onNewSession}
              className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-300 shadow-lg mx-auto text-sm sm:text-base"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -12px rgba(6, 182, 212, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              data-oid="85p:dy9"
            >
              <SparklesIcon
                className="w-4 sm:w-5 h-4 sm:h-5"
                data-oid="zqb8:wz"
              />
              Start New Debate
              <ArrowRightIcon
                className="w-4 sm:w-5 h-4 sm:h-5"
                data-oid="vf_mzv7"
              />
            </motion.button>
          </motion.div>

          {/* Quick Start Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm"
            data-oid="hqnc8ez"
          >
            <div
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-slate-700/50"
              data-oid="1x-k_sc"
            >
              <div
                className="text-cyan-400 font-semibold mb-1"
                data-oid="zkzm-4c"
              >
                💬 Text Mode
              </div>
              <div className="text-slate-400" data-oid="n6396-f">
                Type your arguments
              </div>
            </div>
            <div
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-slate-700/50"
              data-oid="nictvf-"
            >
              <div
                className="text-violet-400 font-semibold mb-1"
                data-oid="og9.u_h"
              >
                🎤 Voice Mode
              </div>
              <div className="text-slate-400" data-oid="p3ym.e1">
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
      data-oid="4qdntg4"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5" data-oid="7ohdl0a">
        <svg className="absolute inset-0 w-full h-full" data-oid="nnnf76f">
          <defs data-oid=":xm38vt">
            <pattern
              id="message-grid"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
              data-oid="vvy8pf6"
            >
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="rgba(6, 182, 212, 0.3)"
                strokeWidth="1"
                data-oid="kz7ryp_"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#message-grid)"
            data-oid="9n5gyj7"
          />
        </svg>
      </div>

      {/* Chat Header */}
      <div
        className="border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-xl px-4 sm:px-6 py-3 relative z-10"
        data-oid="tjzixyq"
      >
        <div className="flex flex-col gap-1" data-oid=".s_y82w">
          <h1
            className="text-base sm:text-lg font-bold text-white truncate"
            data-oid="9:3m92w"
          >
            {session?.title || "ArguMentor-AI"}
          </h1>
          {session && (
            <div
              className="flex items-center gap-1 sm:gap-2 flex-wrap"
              data-oid="0acqs.h"
            >
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  session.mode === "voice"
                    ? "bg-violet-500/20 text-violet-300"
                    : "bg-cyan-500/20 text-cyan-300"
                }`}
                data-oid="ty08u9l"
              >
                {session.mode === "voice" ? "🎤 Voice" : "💬 Text"}
              </span>
              <span
                className="text-xs px-2 py-1 rounded-full bg-slate-700/50 text-slate-300 truncate max-w-24 sm:max-w-none"
                data-oid="jtrt2an"
              >
                {session.settings.style}
              </span>
              {session.settings.principles.slice(0, 2).map((principle) => (
                <span
                  key={principle}
                  className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300 truncate max-w-20 sm:max-w-none"
                  data-oid="b_.6i7x"
                >
                  {principle}
                </span>
              ))}
              {session.settings.principles.length > 2 && (
                <span
                  className="text-xs px-2 py-1 rounded-full bg-slate-600/50 text-slate-400"
                  data-oid="w-o5z25"
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
        data-oid="suqzp4l"
      >
        <AnimatePresence initial={false} data-oid="23fmed5">
          {session.messages.map((message, index) => {
            console.log("Rendering message:", message, "Index:", index);
            return (
              <MessageBubble
                key={message.id}
                message={message}
                isLast={index === session.messages.length - 1}
                data-oid="2_ehh43"
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
            data-oid="xnpjh87"
          >
            <div
              className="bg-slate-800/50 backdrop-blur-xl rounded-3xl px-4 sm:px-6 py-3 sm:py-4 max-w-xs border border-slate-700/50"
              data-oid="vdo7uvg"
            >
              <div
                className="flex items-center gap-2 sm:gap-3"
                data-oid="adxs7lv"
              >
                <div className="typing-indicator" data-oid="t0oym1g">
                  <div className="typing-dot" data-oid="crs:6j:"></div>
                  <div className="typing-dot" data-oid="t41.3st"></div>
                  <div className="typing-dot" data-oid="09rcyit"></div>
                </div>
                <span
                  className="text-slate-400 text-xs sm:text-sm"
                  data-oid=".lc_v_3"
                >
                  AI is thinking...
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} data-oid="8vel444" />
      </div>

      {/* Enhanced Scroll to Bottom Button */}
      <AnimatePresence data-oid="kqw.9w6">
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
            data-oid="l_2s:4r"
          >
            <ArrowDownIcon
              className="w-4 sm:w-5 h-4 sm:h-5"
              data-oid="n:204l-"
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
        data-oid="rt-f279"
      />
    </div>
  );
}
