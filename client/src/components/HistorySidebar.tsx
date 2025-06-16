"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  PlusIcon,
  ChatBubbleLeftIcon,
  MicrophoneIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { ChatSession } from "./ChatLayout";
import Link from "next/link";

interface HistorySidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  onSessionSelect: (session: ChatSession) => void;
  onNewSession: () => void;
}

export default function HistorySidebar({
  isOpen,
  onToggle,
  sessions,
  currentSession,
  onSessionSelect,
  onNewSession,
}: HistorySidebarProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence data-oid="cd0-8.k">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onToggle}
            data-oid="wl.5z8g"
          />
        )}
      </AnimatePresence>

      {/* Enhanced Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: isOpen ? 340 : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative bg-slate-800/30 backdrop-blur-xl border-r border-slate-700/50 z-50 overflow-hidden"
        data-oid="j6m_j1m"
      >
        <div className="flex flex-col h-full" data-oid="79orehc">
          {/* Enhanced Header */}
          <div
            className="flex items-center justify-between p-5 "
            data-oid="ewx1cx2"
          >
            <motion.div className="relative" data-oid="q3u1gz3">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto shadow-2xl"
                data-oid=":tbslt4"
              >
                <Link href="/" data-oid="ms24jiy">
                  <SparklesIcon
                    className="w-6 h-6 text-white"
                    data-oid="kbp2_bp"
                  />
                </Link>
              </motion.div>
            </motion.div>
            <motion.button
              onClick={onNewSession}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              data-oid="xulhysx"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                data-oid="9_1n07h"
              >
                <SparklesIcon className="w-4 h-4" data-oid="qyuee9e" />
              </motion.div>
              New Debate
            </motion.button>
          </div>

          {/* Debates Heading */}
          <div className="px-5 py-3" data-oid="vxa:0.u">
            <h2
              className="text-sm font-semibold text-slate-300 uppercase tracking-wider"
              data-oid="vpxr6su"
            >
              Your Debates
            </h2>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto px-4 py-1" data-oid="gy1ir1s">
            <AnimatePresence data-oid=":eso0_2">
              {sessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onSessionSelect(session)}
                  className={`
                    group cursor-pointer p-4 rounded-2xl mb-1 transition-all duration-300 relative overflow-hidden
                    ${
                      currentSession?.id === session.id
                        ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 shadow-lg"
                        : "hover:bg-slate-700/30 border border-transparent hover:border-slate-600/50"
                    }
                  `}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  data-oid="3p.sm8v"
                >
                  {/* Glow effect for active session */}
                  {currentSession?.id === session.id && (
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-2xl"
                      data-oid="2nplqch"
                    />
                  )}

                  <div
                    className="flex items-start gap-3 relative z-10"
                    data-oid="v:9slif"
                  >
                    <div
                      className={`
                      flex-shrink-0 mt-1 p-2 rounded-xl
                      ${
                        session.mode === "voice"
                          ? "bg-gradient-to-br from-violet-500/20 to-purple-500/20"
                          : "bg-gradient-to-br from-cyan-500/20 to-blue-500/20"
                      }
                    `}
                      data-oid="s2nvcq7"
                    >
                      {session.mode === "voice" ? (
                        <MicrophoneIcon
                          className="w-4 h-4 text-violet-400"
                          data-oid="-_y68es"
                        />
                      ) : (
                        <ChatBubbleLeftIcon
                          className="w-4 h-4 text-cyan-400"
                          data-oid="1r-ovhg"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0" data-oid="paf3dn2">
                      <h3
                        className="text-sm font-semibold text-white truncate mb-1"
                        data-oid="e._imv0"
                      >
                        {session.title}
                      </h3>
                      <div
                        className="flex items-center gap-2"
                        data-oid="adp722w"
                      >
                        <ClockIcon
                          className="w-3 h-3 text-slate-500"
                          data-oid="j306yw7"
                        />

                        <span
                          className="text-xs text-slate-500"
                          data-oid="zrqho7n"
                        >
                          {formatDate(session.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {/* Enhanced Empty State */}
            {sessions.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
                data-oid="j1_pjgq"
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-violet-500/20 rounded-3xl flex items-center justify-center mx-auto mb-4"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  data-oid="r6bzy7w"
                >
                  <SparklesIcon
                    className="w-8 h-8 text-slate-400"
                    data-oid="plogzga"
                  />
                </motion.div>
                <h3
                  className="text-slate-400 text-sm font-medium mb-2"
                  data-oid="8-k5q4u"
                >
                  No conversations yet
                </h3>
                <p className="text-slate-600 text-xs" data-oid="puok0.5">
                  Start a new debate to begin your journey
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Toggle Button (when sidebar is closed) */}
      <AnimatePresence data-oid="k_ff_.7">
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={onToggle}
            className="fixed top-6 left-6 z-50 p-4 bg-slate-800/80 backdrop-blur-xl hover:bg-slate-700/80 rounded-2xl transition-all duration-300 border border-slate-600/50 hover:border-cyan-500/50 shadow-xl"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 10px 30px -5px rgba(6, 182, 212, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            data-oid="z9y1lcd"
          >
            <Bars3Icon className="w-5 h-5 text-slate-300" data-oid="zx5id2h" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
