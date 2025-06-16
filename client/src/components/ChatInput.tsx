"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PaperAirplaneIcon,
  MicrophoneIcon,
  StopIcon,
} from "@heroicons/react/24/outline";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  mode: "text" | "voice";
  disabled?: boolean;
  sessionId?: string; // Add sessionId to track session changes
}

export default function ChatInput({
  onSendMessage,
  mode,
  disabled,
  sessionId,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null,
  );
  const [draftMessages, setDraftMessages] = useState<Record<string, string>>(
    {},
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.min(scrollHeight, 100);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  // Handle session changes - load the draft for the new session
  useEffect(() => {
    if (sessionId) {
      // Load the draft for the current session
      const savedDraft = draftMessages[sessionId] || "";
      setMessage(savedDraft);

      // Reset textarea height and then adjust for the loaded content
      if (textareaRef.current) {
        textareaRef.current.style.height = "48px";
        // Small delay to ensure the message is set before adjusting height
        setTimeout(() => {
          adjustTextareaHeight();
        }, 0);
      }
    } else {
      // No session, clear the message
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "48px";
      }
    }
  }, [sessionId]); // Only depend on sessionId, not draftMessages

  // Save draft message whenever message changes
  useEffect(() => {
    if (sessionId) {
      setDraftMessages((prev) => ({
        ...prev,
        [sessionId]: message,
      }));
    }
  }, [message, sessionId]);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setMessage((prev) => prev + finalTranscript);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");

      // Clear the draft for this session since message was sent
      if (sessionId) {
        setDraftMessages((prev) => ({
          ...prev,
          [sessionId]: "",
        }));
      }

      // Reset textarea height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = "48px";
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleRecording = () => {
    if (!recognition) return;

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  return (
    <div className="px-6 py-4 relative z-10 flex-shrink-0" data-oid="66a8dx6">
      {/* Enhanced Recording Status - Above input */}
      <AnimatePresence data-oid="zda-_.v">
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-3 flex justify-center"
            data-oid="ps53c19"
          >
            <motion.div
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl text-slate-200 px-3 py-2 rounded-2xl border border-slate-600/50 shadow-xl"
              animate={{
                boxShadow: [
                  "0 10px 30px -5px rgba(239, 68, 68, 0.2)",
                  "0 10px 30px -5px rgba(239, 68, 68, 0.4)",
                  "0 10px 30px -5px rgba(239, 68, 68, 0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              data-oid="v.:bhr-"
            >
              {/* Animated recording dot */}
              <motion.div className="relative w-2.5 h-2.5" data-oid="8es1-hw">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 rounded-full"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  data-oid="bbopu5t"
                />

                <motion.div
                  className="absolute inset-0 bg-red-400 rounded-full blur-sm"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  data-oid="j04ch68"
                />
              </motion.div>

              {/* Animated text */}
              <motion.span
                className="text-sm font-medium"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                data-oid="ncgz3_0"
              >
                Listening...
              </motion.span>

              {/* Sound waves animation */}
              <div
                className="flex items-center gap-0.5 ml-1"
                data-oid="n81mryv"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-gradient-to-t from-red-400 to-pink-500 rounded-full"
                    animate={{
                      height: [4, 12, 4],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    data-oid="m_a6ol2"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3"
        data-oid="wolmc6j"
      >
        {/* Voice Recording Button (Voice Mode) */}
        <AnimatePresence data-oid="2fddw91">
          {mode === "voice" && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -20 }}
              type="button"
              onClick={toggleRecording}
              disabled={disabled}
              className={`
                relative flex-shrink-0 w-12 h-12 rounded-full transition-all duration-300 shadow-lg flex items-center justify-center group overflow-hidden
                ${
                  isRecording
                    ? "bg-gradient-to-r from-red-500 to-pink-600 shadow-red-500/30"
                    : "bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 shadow-slate-500/20"
                }
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
              whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
              data-oid="byqt_k4"
            >
              {/* Animated background glow */}
              <motion.div
                className={`absolute inset-0 rounded-xl blur-md ${
                  isRecording ? "bg-red-500/40" : "bg-slate-500/20"
                }`}
                animate={isRecording ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                data-oid="g7-f2iw"
              />

              {/* Icon with animation */}
              <motion.div
                animate={isRecording ? { rotate: [0, 5, -5, 0] } : {}}
                transition={{
                  duration: 0.5,
                  repeat: isRecording ? Infinity : 0,
                }}
                data-oid="73_cuk-"
              >
                {isRecording ? (
                  <StopIcon
                    className="w-5 h-5 text-white relative z-10"
                    data-oid="5e9d74-"
                  />
                ) : (
                  <MicrophoneIcon
                    className="w-5 h-5 text-white relative z-10"
                    data-oid="jimhlj:"
                  />
                )}
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Enhanced Text Input */}
        <div className="flex-1 relative group" data-oid="_q2s3xl">
          <div className="relative" data-oid="5pcdysd">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                mode === "voice"
                  ? "Message ArguMentor..."
                  : "Message ArguMentor..."
              }
              className="w-full bg-slate-800/60 backdrop-blur-sm text-white placeholder-slate-400 rounded-3xl px-5 py-3 pr-14 resize-none focus:outline-none focus:bg-slate-800/80 transition-all duration-300 min-h-[48px] max-h-[100px] shadow-lg overflow-y-auto"
              rows={1}
              style={{ height: "48px" }}
              data-oid="i:9ohkd"
            />

            {/* Enhanced Glow Effect on Focus */}
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-violet-500/10 opacity-0 focus-within:opacity-100 transition-all duration-300 pointer-events-none blur-sm"
              data-oid="ypu:vke"
            />

            {/* Subtle border glow */}
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-violet-500/20 opacity-0 group-hover:opacity-50 focus-within:opacity-100 transition-all duration-300 pointer-events-none -z-10 blur-md"
              data-oid="g7ow6fd"
            />
          </div>

          {/* Recording Indicator */}
          <AnimatePresence data-oid="l2ofoj7">
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-pink-600 text-white px-2.5 py-1.5 rounded-xl text-xs shadow-lg backdrop-blur-sm"
                data-oid="iye9slx"
              >
                <motion.div
                  className="w-1.5 h-1.5 bg-white rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  data-oid="885-al7"
                />

                <span className="font-medium" data-oid="678osbs">
                  REC
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Send Button */}
        <motion.button
          type="submit"
          disabled={!message.trim() || disabled}
          className={`
            relative flex-shrink-0 w-11 h-11 rounded-full transition-all duration-300 flex items-center justify-center group overflow-hidden
            ${
              message.trim() && !disabled
                ? "bg-white text-slate-900 hover:bg-slate-100"
                : "bg-slate-600 text-slate-400 cursor-not-allowed"
            }
          `}
          whileHover={message.trim() && !disabled ? { scale: 1.1 } : {}}
          whileTap={message.trim() && !disabled ? { scale: 0.95 } : {}}
          data-oid="lielmlb"
        >
          <PaperAirplaneIcon className="w-4 h-4" data-oid="s7wc0j1" />
        </motion.button>
      </form>{" "}
    </div>
  );
}
