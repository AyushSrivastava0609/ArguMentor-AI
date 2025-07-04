"use client";

import {
  MicrophoneIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  StopIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  mode: "text" | "voice";
  disabled?: boolean;
  sessionId?: string;
}

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (message: string) => Promise<void>;
  isRecording: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  toggleRecording: () => void;
  stopSpeaking: () => void;
  interruptAI: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

const VoiceModal: React.FC<VoiceModalProps> = ({
  isOpen,
  onClose,
  onSendMessage,
  isRecording,
  isSpeaking,
  isProcessing,
  toggleRecording,
  stopSpeaking,
  interruptAI,
}) => {
  const getStatusText = () => {
    if (isRecording) return "Listening...";
    if (isProcessing) return "Processing...";
    if (isSpeaking) return "AI is speaking...";
    return "Click to start speaking";
  };

  return (
    <AnimatePresence data-oid="qlwwcot">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          data-oid="rz7uzuy"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-800 rounded-2xl p-6 max-w-md w-full mx-4 relative"
            data-oid="l49.ipm"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors duration-200"
              data-oid="vjbv1wn"
            >
              <XMarkIcon className="w-6 h-6" data-oid="6dsmir2" />
            </button>

            <div className="text-center" data-oid="qwgyaed">
              <h2
                className="text-xl font-semibold text-white mb-4"
                data-oid="c9z:9ak"
              >
                Voice Conversation
              </h2>

              <div
                className="voice-visualization mb-8 h-48 flex items-center justify-center relative"
                data-oid="-5kho:_"
              >
                {/* Recording State - Modern Waveform */}
                {isRecording && (
                  <div
                    className="relative flex items-center justify-center"
                    data-oid="i3.zgk:"
                  >
                    {/* Outer pulse ring */}
                    <motion.div
                      className="absolute w-40 h-40 rounded-full border-2 border-cyan-400/30"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.8, 0.2, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      data-oid="gdtm9vs"
                    />

                    {/* Middle pulse ring */}
                    <motion.div
                      className="absolute w-28 h-28 rounded-full border-2 border-cyan-400/50"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 0.1, 0.6],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3,
                      }}
                      data-oid="jjbsp1h"
                    />

                    {/* Central microphone icon with glow */}
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl relative z-10"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(6, 182, 212, 0.5)",
                          "0 0 40px rgba(6, 182, 212, 0.8)",
                          "0 0 20px rgba(6, 182, 212, 0.5)",
                        ],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      data-oid="oepsxi6"
                    >
                      <MicrophoneIcon
                        className="w-8 h-8 text-white"
                        data-oid="i2eaz7q"
                      />
                    </motion.div>

                    {/* Dynamic waveform bars */}
                    <div
                      className="absolute top-28 left-1/2 transform -translate-x-1/2"
                      data-oid="0uj.j0n"
                    >
                      <div
                        className="flex items-center gap-1"
                        data-oid="_g9mdqx"
                      >
                        {[...Array(7)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 bg-gradient-to-t from-cyan-400 to-blue-500 rounded-full"
                            animate={{
                              height: [8, 24, 8],
                              opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.1,
                              ease: "easeInOut",
                            }}
                            data-oid="j5t2jv3"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Speaking State - Modern Sound Waves */}
                {isSpeaking && (
                  <div
                    className="relative flex items-center justify-center"
                    data-oid="cdifbme"
                  >
                    {/* Animated sound waves */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full border-2 border-emerald-400/40"
                        animate={{
                          scale: [0.5, 1.8, 0.5],
                          opacity: [0.8, 0, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeOut",
                        }}
                        style={{
                          width: `${70 + i * 25}px`,
                          height: `${70 + i * 25}px`,
                        }}
                        data-oid="xd54dx0"
                      />
                    ))}

                    {/* Central AI icon */}
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-2xl relative z-10"
                      animate={{
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          "0 0 20px rgba(16, 185, 129, 0.5)",
                          "0 0 40px rgba(16, 185, 129, 0.8)",
                          "0 0 20px rgba(16, 185, 129, 0.5)",
                        ],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      data-oid="uq3-p83"
                    >
                      <SparklesIcon
                        className="w-8 h-8 text-white"
                        data-oid="l4wg8ws"
                      />
                    </motion.div>

                    {/* Frequency bars */}
                    <div
                      className="absolute top-28 left-1/2 transform -translate-x-1/2"
                      data-oid="kwqn1.."
                    >
                      <div
                        className="flex items-center gap-1"
                        data-oid="lu-hs40"
                      >
                        {[...Array(9)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 bg-gradient-to-t from-emerald-400 to-green-500 rounded-full"
                            animate={{
                              height: [6, 20, 6],
                              opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.08,
                              ease: "easeInOut",
                            }}
                            data-oid="4-3jdco"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Processing State - Modern Loading */}
                {isProcessing && (
                  <div
                    className="relative flex items-center justify-center"
                    data-oid="knph2.6"
                  >
                    {/* Rotating gradient ring */}
                    <motion.div
                      className="w-24 h-24 rounded-full relative"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      data-oid="lfqrz4w"
                    >
                      <div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-400 via-purple-500 to-violet-400 opacity-20"
                        data-oid="0x1i4wz"
                      />

                      <div
                        className="absolute inset-1 rounded-full bg-slate-800"
                        data-oid="rh70jnw"
                      />

                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            "conic-gradient(from 0deg, transparent 0deg, #8b5cf6 90deg, transparent 360deg)",
                        }}
                        data-oid="29mh90k"
                      />
                    </motion.div>

                    {/* Central processing icon */}
                    <motion.div
                      className="absolute inset-0 w-24 h-24 flex items-center justify-center"
                      animate={{
                        scale: [0.9, 1.1, 0.9],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      data-oid="el4s8fq"
                    >
                      <div
                        className="w-14 h-14 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center"
                        data-oid="zrm9h4e"
                      >
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          data-oid="apb6q00"
                        >
                          <SparklesIcon
                            className="w-6 h-6 text-white"
                            data-oid="-z3dbr5"
                          />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Processing dots */}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      data-oid="6adnx0j"
                    >
                      <div
                        className="flex items-center gap-1"
                        style={{ transform: "translateY(60px)" }}
                        data-oid="24-gcmg"
                      >
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-violet-400 rounded-full"
                            animate={{
                              scale: [0.5, 1, 0.5],
                              opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: "easeInOut",
                            }}
                            data-oid="3ogpvgv"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Default State - Idle Animation */}
                {!isRecording && !isSpeaking && !isProcessing && (
                  <div
                    className="relative flex items-center justify-center"
                    data-oid="a:l0wdh"
                  >
                    {/* Subtle pulse ring */}
                    <motion.div
                      className="absolute w-24 h-24 rounded-full border border-slate-500/20"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.1, 0.5],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      data-oid="znmdrqt"
                    />

                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center shadow-lg border border-slate-500/30 relative z-10"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      data-oid="6zkpzn_"
                    >
                      <MicrophoneIcon
                        className="w-8 h-8 text-slate-300"
                        data-oid="mrexn8o"
                      />
                    </motion.div>
                  </div>
                )}
              </div>

              <p className="text-slate-300 mb-6 text-lg" data-oid="1gimepf">
                {getStatusText()}
              </p>

              <div className="flex justify-center gap-6" data-oid="cd55a_:">
                {isSpeaking ? (
                  <motion.button
                    onClick={interruptAI}
                    className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-white font-semibold shadow-lg overflow-hidden"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    data-oid="uxqiam1"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        background: [
                          "linear-gradient(45deg, #f59e0b, #ea580c)",
                          "linear-gradient(45deg, #ea580c, #f59e0b)",
                          "linear-gradient(45deg, #f59e0b, #ea580c)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      data-oid="-athx4a"
                    />

                    <div
                      className="relative flex items-center gap-3"
                      data-oid="txxpssh"
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        data-oid="r-54emx"
                      >
                        <StopIcon className="w-5 h-5" data-oid="-lx0gvb" />
                      </motion.div>
                      Interrupt AI
                    </div>
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={toggleRecording}
                    disabled={isProcessing}
                    className={`group relative px-8 py-4 rounded-2xl transition-all duration-300 font-semibold shadow-lg overflow-hidden ${
                      isRecording
                        ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
                        : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                    } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                    whileHover={!isProcessing ? { scale: 1.05, y: -2 } : {}}
                    whileTap={!isProcessing ? { scale: 0.95 } : {}}
                    data-oid="ztg30ni"
                  >
                    {/* Animated background for active states */}
                    {(isRecording || !isProcessing) && (
                      <motion.div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                          isRecording
                            ? "bg-gradient-to-r from-red-400 to-pink-400"
                            : "bg-gradient-to-r from-cyan-400 to-blue-400"
                        }`}
                        animate={
                          isRecording
                            ? {
                                background: [
                                  "linear-gradient(45deg, #ef4444, #ec4899)",
                                  "linear-gradient(45deg, #ec4899, #ef4444)",
                                  "linear-gradient(45deg, #ef4444, #ec4899)",
                                ],
                              }
                            : {}
                        }
                        transition={{ duration: 1.5, repeat: Infinity }}
                        data-oid="a5-_upz"
                      />
                    )}

                    <div
                      className="relative flex items-center gap-3"
                      data-oid="ikuti_o"
                    >
                      {isRecording ? (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          data-oid="hweailz"
                        >
                          <StopIcon className="w-5 h-5" data-oid="mctxr.f" />
                        </motion.div>
                      ) : (
                        <motion.div
                          animate={
                            !isProcessing
                              ? {
                                  scale: [1, 1.1, 1],
                                  rotate: [0, 5, -5, 0],
                                }
                              : {}
                          }
                          transition={{ duration: 2, repeat: Infinity }}
                          data-oid="wn79n.1"
                        >
                          <MicrophoneIcon
                            className="w-5 h-5"
                            data-oid="rc0ttnh"
                          />
                        </motion.div>
                      )}
                      {isRecording ? "Stop" : "Start"}
                    </div>

                    {/* Pulse effect for recording */}
                    {isRecording && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-red-300"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                        data-oid="5g705uq"
                      />
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function ChatInput({
  onSendMessage,
  mode,
  disabled,
  sessionId,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [lastSpeechTime, setLastSpeechTime] = useState<number>(Date.now());
  const [autoStopTimer, setAutoStopTimer] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [recognition, setRecognition] = useState<any>(null);
  const [draftMessages, setDraftMessages] = useState<Record<string, string>>(
    {},
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleMessageFlow = async (message: string) => {
    setIsProcessing(true);
    try {
      await onSendMessage(message);
      // The parent component will handle the text-to-speech
      setIsProcessing(false);
    } catch (error) {
      console.error("Error processing message:", error);
      setIsProcessing(false);
    }
  };

  // Monitor speech synthesis state
  useEffect(() => {
    const handleSpeechStart = () => {
      setIsSpeaking(true);
      setIsProcessing(false);
    };

    const handleSpeechEnd = () => {
      setIsSpeaking(false);
    };

    window.addEventListener("speak", handleSpeechStart);
    window.addEventListener("end", handleSpeechEnd);

    return () => {
      window.removeEventListener("speak", handleSpeechStart);
      window.removeEventListener("end", handleSpeechEnd);
    };
  }, []);

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

  const startSpeechMonitoring = () => {
    if (autoStopTimer) {
      clearTimeout(autoStopTimer);
    }

    const timer = setTimeout(() => {
      const timeSinceLastSpeech = Date.now() - lastSpeechTime;
      if (timeSinceLastSpeech > 2000) {
        if (recognition && isRecording) {
          recognition.stop();
          setIsRecording(false);
        }
      }
    }, 2000);

    setAutoStopTimer(timer);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      window.dispatchEvent(new Event("end"));
    }
  };

  const interruptAI = () => {
    stopSpeaking();
    if (recognition && !isRecording) {
      recognition.start();
      setIsRecording(true);
      setLastSpeechTime(Date.now());
      startSpeechMonitoring();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event: any) => {
        let finalTranscript = "";
        let interimTranscript = "";

        setLastSpeechTime(Date.now());

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            recognitionInstance.stop();
            setIsRecording(false);
            handleMessageFlow(finalTranscript);
          } else {
            interimTranscript += transcript;
          }
        }
      };

      recognitionInstance.onaudiostart = () => {
        setIsRecording(true);
        startSpeechMonitoring();
      };

      recognitionInstance.onaudioend = () => {
        setIsRecording(false);
        if (autoStopTimer) {
          clearTimeout(autoStopTimer);
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
        if (autoStopTimer) {
          clearTimeout(autoStopTimer);
        }
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
        if (autoStopTimer) {
          clearTimeout(autoStopTimer);
        }
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  // Modify the useEffect that handles session changes
  useEffect(() => {
    if (sessionId) {
      // Load the draft for the current session
      const savedDraft = draftMessages[sessionId] || "";
      setMessage(savedDraft);

      // Reset textarea height and then adjust for the loaded content
      if (textareaRef.current) {
        textareaRef.current.style.height = "48px";
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
  }, [sessionId]); // Only depend on sessionId

  // Save draft message whenever message changes
  useEffect(() => {
    if (sessionId) {
      setDraftMessages((prev) => ({
        ...prev,
        [sessionId]: message,
      }));
    }
  }, [message, sessionId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      handleMessageFlow(message);
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
      if (autoStopTimer) {
        clearTimeout(autoStopTimer);
      }
    } else {
      recognition.start();
      setIsRecording(true);
      setLastSpeechTime(Date.now());
      startSpeechMonitoring();
    }
  };

  const handleVoiceButtonClick = () => {
    setIsVoiceModalOpen(true);
  };

  const handleCloseModal = () => {
    stopSpeaking();
    if (recognition) {
      recognition.stop();
    }
    setIsRecording(false);
    setIsVoiceModalOpen(false);
    setIsProcessing(false);
    if (autoStopTimer) {
      clearTimeout(autoStopTimer);
    }
  };

  return (
    <>
      <VoiceModal
        isOpen={isVoiceModalOpen}
        onClose={handleCloseModal}
        onSendMessage={handleMessageFlow}
        isRecording={isRecording}
        isSpeaking={isSpeaking}
        isProcessing={isProcessing}
        toggleRecording={toggleRecording}
        stopSpeaking={stopSpeaking}
        interruptAI={interruptAI}
        data-oid="vt:yz6d"
      />

      <div
        className="px-3 sm:px-6 py-3 sm:py-4 relative z-10 flex-shrink-0"
        data-oid="3i5f0qz"
      >
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 sm:gap-3"
          data-oid="pwlxnhl"
        >
          <AnimatePresence data-oid="vwrhkjw">
            {mode === "voice" && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -20 }}
                type="button"
                onClick={handleVoiceButtonClick}
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
                data-oid="82ivp3a"
              >
                <MicrophoneIcon
                  className="w-5 h-5 text-white relative z-10"
                  data-oid="f2g3rti"
                />
              </motion.button>
            )}
          </AnimatePresence>

          <div className="flex-1 relative group" data-oid="wssayeq">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message ArguMentor AI..."
              className="w-full bg-slate-800/60 backdrop-blur-sm text-white placeholder-slate-400 rounded-3xl px-4 sm:px-5 py-3 pr-12 sm:pr-14 resize-none focus:outline-none focus:bg-slate-800/80 transition-all duration-300 min-h-[44px] sm:min-h-[48px] max-h-[100px] shadow-lg overflow-y-auto text-sm sm:text-base"
              rows={1}
              style={{ height: "44px" }}
              data-oid="y5sc9zl"
            />
          </div>

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
            data-oid="-cy8xik"
          >
            <PaperAirplaneIcon className="w-4 h-4" data-oid="1mz072h" />
          </motion.button>
        </form>
      </div>
    </>
  );
}
