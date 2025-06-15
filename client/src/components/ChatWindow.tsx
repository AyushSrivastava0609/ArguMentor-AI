"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownIcon,
  SparklesIcon,
  BoltIcon,
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
    data-oid="xlhm19w"
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      messagesContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isNearBottom && (session?.messages.length || 0) > 0);
  };

  useEffect(() => {
    scrollToBottom();
  }, [session?.messages]);

  const handleSendMessage = async (content: string) => {
    if (!session || !content.trim()) return;

    // Add user message
    onAddMessage({
      content: content.trim(),
      sender: "user",
    });

    setIsLoading(true);

    try {
      // Simulate API call
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"}/chat`,
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
          content:
            data.response ||
            "I understand your point. Let me offer a counterargument...",
          sender: "ai",
          principles:
            settings.principles.length > 1 ? settings.principles : undefined,
        });

        // Text-to-speech for AI response
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(
            data.response ||
              "I understand your point. Let me offer a counterargument...",
          );
          utterance.rate = 0.9;
          utterance.pitch = 1;
          speechSynthesis.speak(utterance);
        }
      } else {
        throw new Error("Failed to get response");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      onAddMessage({
        content:
          "I apologize, but I encountered an error. Let me try to respond to your argument anyway. Could you please rephrase your point?",
        sender: "ai",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <div
        className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
        data-oid="aswvmws"
      >
        {/* Animated Background */}
        <div className="absolute inset-0" data-oid="dtwxwto">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" data-oid="det85uy">
            <svg className="absolute inset-0 w-full h-full" data-oid="5pta9dq">
              <defs data-oid="f16kiw4">
                <pattern
                  id="chat-grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                  data-oid="8xgp2.i"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(6, 182, 212, 0.2)"
                    strokeWidth="1"
                    data-oid="n1otldu"
                  />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#chat-grid)"
                data-oid="4vuobvx"
              />
            </svg>
          </div>

          {/* Floating Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.2} data-oid="588rx1s" />
          ))}

          {/* Gradient Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/5 to-blue-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            data-oid="3e6ky57"
          />

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-violet-400/5 to-purple-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
            data-oid="9t0oq_4"
          />
        </div>

        {/* Empty State Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10 max-w-md mx-auto px-6"
          data-oid="nfgi5r_"
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
            data-oid="q3u1gz3"
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
              data-oid=":tbslt4"
            >
              <SparklesIcon
                className="w-10 h-10 text-white"
                data-oid="kbp2_bp"
              />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl font-bold text-white mb-4"
            data-oid="q21sbpf"
          >
            Start a New{" "}
            <span
              className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent"
              data-oid="q29d4hm"
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
            data-oid=".5zq4v0"
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
            data-oid="i8yw8ra"
          >
            <motion.button
              onClick={onNewSession}
              className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg mx-auto"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -12px rgba(6, 182, 212, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              data-oid="kk:bwmf"
            >
              <SparklesIcon className="w-5 h-5" data-oid="p01tmz2" />
              Start New Debate
              <ArrowRightIcon className="w-5 h-5" data-oid="cej6gye" />
            </motion.button>
          </motion.div>

          {/* Quick Start Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
            data-oid="--529k4"
          >
            <div
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50"
              data-oid="8:sg3kx"
            >
              <div
                className="text-cyan-400 font-semibold mb-1"
                data-oid="unkkjlf"
              >
                💬 Text Mode
              </div>
              <div className="text-slate-400" data-oid="2nwkf-y">
                Type your arguments
              </div>
            </div>
            <div
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50"
              data-oid="l:2urd0"
            >
              <div
                className="text-violet-400 font-semibold mb-1"
                data-oid="62eht3c"
              >
                🎤 Voice Mode
              </div>
              <div className="text-slate-400" data-oid="q76d2p.">
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
      className="flex-1 flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative"
      data-oid="pc6ueqp"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5" data-oid=".v85v.n">
        <svg className="absolute inset-0 w-full h-full" data-oid="8rnj-88">
          <defs data-oid="jw14-oe">
            <pattern
              id="message-grid"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
              data-oid="t751.-y"
            >
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="rgba(6, 182, 212, 0.3)"
                strokeWidth="1"
                data-oid="ff.2677"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#message-grid)"
            data-oid="joxhgmg"
          />
        </svg>
      </div>

      {/* Chat Header */}
      <div
        className="border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-xl px-6 py-3 relative z-10"
        data-oid=".yi0z:k"
      >
        <div className="flex flex-col gap-1" data-oid="km:yjf2">
          <h1 className="text-lg font-bold text-white" data-oid="nhe-8r_">
            {session?.title || "ArguMentor-AI"}
          </h1>
          {session && (
            <div
              className="flex items-center gap-2 flex-wrap"
              data-oid="ay7ki0."
            >
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  session.mode === "voice"
                    ? "bg-violet-500/20 text-violet-300"
                    : "bg-cyan-500/20 text-cyan-300"
                }`}
                data-oid="f7i4lyl"
              >
                {session.mode === "voice" ? "🎤 Voice" : "💬 Text"}
              </span>
              <span
                className="text-xs px-2 py-1 rounded-full bg-slate-700/50 text-slate-300"
                data-oid="s1jd:cn"
              >
                {session.settings.style}
              </span>
              {session.settings.principles.map((principle) => (
                <span
                  key={principle}
                  className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300"
                  data-oid="yeocsrk"
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
        className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10"
        data-oid="0sj:03h"
      >
        <AnimatePresence initial={false} data-oid="nf1gdji">
          {session.messages.map((message, index) => (
            <MessageBubble
              key={message.id}
              message={message}
              isLast={index === session.messages.length - 1}
              data-oid="uu46hke"
            />
          ))}
        </AnimatePresence>

        {/* Enhanced Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
            data-oid="y2.z31q"
          >
            <div
              className="bg-slate-800/50 backdrop-blur-xl rounded-3xl px-6 py-4 max-w-xs border border-slate-700/50"
              data-oid="5fx4ko_"
            >
              <div className="flex items-center gap-3" data-oid="80am4g:">
                <div className="typing-indicator" data-oid="x6lbw-g">
                  <div className="typing-dot" data-oid="wy_f.0b"></div>
                  <div className="typing-dot" data-oid="3bcol4w"></div>
                  <div className="typing-dot" data-oid="x7jpgmc"></div>
                </div>
                <span className="text-slate-400 text-sm" data-oid="ikk60_3">
                  AI is thinking...
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} data-oid="0tu4opf" />
      </div>

      {/* Enhanced Scroll to Bottom Button */}
      <AnimatePresence data-oid="bcppxuv">
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToBottom}
            className="absolute bottom-28 right-6 bg-slate-800/80 backdrop-blur-xl hover:bg-slate-700/80 text-white p-4 rounded-full shadow-xl transition-all duration-300 z-10 border border-slate-600/50 hover:border-cyan-500/50"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 10px 30px -5px rgba(6, 182, 212, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            data-oid=":gmrff3"
          >
            <ArrowDownIcon className="w-5 h-5" data-oid="hwjy1nd" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        mode={settings.mode}
        disabled={isLoading}
        data-oid=".ob3x0z"
      />
    </div>
  );
}
