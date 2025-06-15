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
}

export default function ChatInput({
  onSendMessage,
  mode,
  disabled,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null,
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
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

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <div
      className="border-t border-slate-700/50 bg-slate-800/30 backdrop-blur-xl p-6"
      data-oid="66a8dx6"
    >
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-4"
        data-oid="wolmc6j"
      >
        {/* Voice Recording Button (Voice Mode) */}
        <AnimatePresence data-oid="2fddw91">
          {mode === "voice" && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={toggleRecording}
              disabled={disabled}
              className={`
                flex-shrink-0 p-4 rounded-2xl transition-all duration-300 shadow-lg
                ${
                  isRecording
                    ? "bg-gradient-to-r from-red-500 to-pink-600 pulse-recording shadow-red-500/25"
                    : "bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 shadow-slate-500/25"
                }
                ${
                  disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                }
              `}
              whileHover={!disabled ? { scale: 1.05 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
              data-oid="byqt_k4"
            >
              {isRecording ? (
                <StopIcon className="w-6 h-6 text-white" data-oid="5e9d74-" />
              ) : (
                <MicrophoneIcon
                  className="w-6 h-6 text-white"
                  data-oid="jimhlj:"
                />
              )}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Enhanced Text Input */}
        <div className="flex-1 relative" data-oid="_q2s3xl">
          <div className="relative" data-oid="5pcdysd">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                mode === "voice"
                  ? "Click the mic to speak or type your message..."
                  : "Type your argument here..."
              }
              disabled={disabled}
              className="w-full bg-slate-800/50 backdrop-blur-sm text-white placeholder-slate-400 rounded-3xl px-6 py-4 pr-16 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:bg-slate-800/70 transition-all duration-300 min-h-[56px] max-h-[120px] border border-slate-700/50 hover:border-slate-600/50"
              rows={1}
              data-oid="i:9ohkd"
            />

            {/* Glow Effect on Focus */}
            <div
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-violet-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
              data-oid="ypu:vke"
            />
          </div>

          {/* Recording Indicator */}
          <AnimatePresence data-oid="l2ofoj7">
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute top-3 right-3 flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-2 rounded-full text-sm shadow-lg"
                data-oid="iye9slx"
              >
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  data-oid="885-al7"
                />
                Recording...
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Send Button */}
        <motion.button
          type="submit"
          disabled={!message.trim() || disabled}
          className={`
            flex-shrink-0 p-4 rounded-2xl transition-all duration-300 shadow-lg
            ${
              message.trim() && !disabled
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-cyan-500/25"
                : "bg-slate-700 text-slate-400 cursor-not-allowed shadow-slate-500/25"
            }
          `}
          whileHover={message.trim() && !disabled ? { scale: 1.05 } : {}}
          whileTap={message.trim() && !disabled ? { scale: 0.95 } : {}}
          data-oid="lielmlb"
        >
          <PaperAirplaneIcon className="w-6 h-6" data-oid="s7wc0j1" />
        </motion.button>
      </form>

      {/* Enhanced Recording Status */}
      <AnimatePresence data-oid="zda-_.v">
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 text-center"
            data-oid="ps53c19"
          >
            <div
              className="inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm text-slate-300 px-4 py-2 rounded-full border border-slate-700/50"
              data-oid="v.:bhr-"
            >
              <motion.div
                className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                data-oid="8es1-hw"
              />

              <span className="text-sm" data-oid="ncgz3_0">
                Listening... Speak clearly into your microphone
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
