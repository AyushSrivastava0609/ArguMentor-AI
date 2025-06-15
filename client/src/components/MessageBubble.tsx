"use client";

import { motion } from "framer-motion";
import { Message } from "./ChatLayout";
import { UserIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface MessageBubbleProps {
  message: Message;
  isLast: boolean;
}

export default function MessageBubble({ message, isLast }: MessageBubbleProps) {
  const isUser = message.sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} group`}
      data-oid="c16j1lk"
    >
      <div
        className={`flex items-start gap-4 max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"}`}
        data-oid="xdk500u"
      >
        {/* Enhanced Avatar */}
        <motion.div
          className={`
            flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg
            ${
              isUser
                ? "bg-gradient-to-br from-cyan-500 to-blue-600"
                : "bg-gradient-to-br from-violet-500 to-purple-600"
            }
          `}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
          data-oid="p524lz0"
        >
          {isUser ? (
            <UserIcon className="w-5 h-5 text-white" data-oid="_2ygupo" />
          ) : (
            <SparklesIcon className="w-5 h-5 text-white" data-oid="6ds8-rb" />
          )}
        </motion.div>

        {/* Enhanced Message Content */}
        <motion.div
          className={`
            rounded-3xl px-6 py-4 shadow-xl backdrop-blur-sm relative
            ${
              isUser
                ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white"
                : "bg-slate-800/70 text-slate-100 border border-slate-700/50"
            }
          `}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          data-oid="9_hp3n8"
        >
          {/* Glow Effect */}
          <div
            className={`
            absolute inset-0 rounded-3xl blur-xl opacity-20 -z-10
            ${
              isUser
                ? "bg-gradient-to-br from-cyan-400 to-blue-500"
                : "bg-gradient-to-br from-violet-400 to-purple-500"
            }
          `}
            data-oid="o3jf1iz"
          />

          {/* Ethics Principles (for AI messages in ethics mode) */}
          {!isUser && message.principles && message.principles.length > 1 && (
            <div
              className="mb-4 pb-3 border-b border-slate-600/50"
              data-oid="5pnpbqa"
            >
              <div className="flex flex-wrap gap-2" data-oid="wo15xq6">
                {message.principles.map((principle) => (
                  <motion.span
                    key={principle}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-300 px-3 py-1 rounded-full border border-violet-500/30 backdrop-blur-sm"
                    data-oid="3u3movi"
                  >
                    {principle}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Message Text */}
          <div
            className="text-sm leading-relaxed whitespace-pre-wrap"
            data-oid="0gl093h"
          >
            {message.content}
          </div>

          {/* Enhanced Timestamp */}
          <div
            className={`
            text-xs mt-3 opacity-60 flex items-center gap-1
            ${isUser ? "text-cyan-100" : "text-slate-400"}
          `}
            data-oid="0stf5km"
          >
            <div
              className={`w-1 h-1 rounded-full ${isUser ? "bg-cyan-200" : "bg-slate-400"}`}
              data-oid="x4j5f7f"
            />
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>

          {/* Message Tail */}
          <div
            className={`
            absolute top-4 w-3 h-3 transform rotate-45
            ${
              isUser
                ? "right-[-6px] bg-gradient-to-br from-cyan-500 to-blue-600"
                : "left-[-6px] bg-slate-800/70 border-l border-t border-slate-700/50"
            }
          `}
            data-oid="jelm0l_"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
