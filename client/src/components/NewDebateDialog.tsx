"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  CheckIcon,
  ChatBubbleLeftRightIcon,
  MicrophoneIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { DebateSettings } from "./ChatLayout";

interface NewDebateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDebate: (settings: DebateSettings) => void;
}

const debateStyles = [
  {
    id: "Persuasive",
    name: "Persuasive",
    description: "Focus on emotional appeal and conviction",
  },
  {
    id: "Logical",
    name: "Logical",
    description: "Emphasize facts, data, and reasoning",
  },
  {
    id: "Humorous",
    name: "Humorous",
    description: "Use wit and humor to make points",
  },
  {
    id: "Aggressive",
    name: "Aggressive",
    description: "Direct and confrontational approach",
  },
  {
    id: "Diplomatic",
    name: "Diplomatic",
    description: "Respectful and balanced discussion",
  },
  {
    id: "Academic",
    name: "Academic",
    description: "Scholarly and research-based arguments",
  },
  {
    id: "Mock Trial",
    name: "Mock Trial",
    description:
      "Simulates legal proceedings with evidence and cross-examination",
  },
  {
    id: "Policy Debate",
    name: "Policy Debate",
    description: "Focused on specific policies or proposals",
  },
  {
    id: "Oxford-Style Debate",
    name: "Oxford-Style Debate",
    description: "Structured format with points of information and rebuttals",
  },
  {
    id: "Public Forum Debate",
    name: "Public Forum Debate",
    description: "Engages broader audience on public policy issues",
  },
];

const ethicalPrinciples = [
  { id: "Normal", name: "Normal", description: "Standard debate approach" },
  {
    id: "Bhagavad Gita",
    name: "Bhagavad Gita",
    description:
      "Ancient Hindu scripture offering philosophical and moral guidance",
  },
  {
    id: "Utilitarianism",
    name: "Utilitarianism",
    description: "Greatest good for greatest number",
  },
  {
    id: "Kantian Ethics",
    name: "Kantian Ethics",
    description: "Duty-based moral reasoning",
  },
  {
    id: "Virtue Ethics",
    name: "Virtue Ethics",
    description: "Character-based moral philosophy",
  },
  {
    id: "Relativism",
    name: "Relativism",
    description: "Context-dependent moral judgments",
  },
  {
    id: "Deontological",
    name: "Deontological",
    description: "Rule-based ethical framework",
  },
  {
    id: "Consequentialism",
    name: "Consequentialism",
    description: "Outcome-focused ethics",
  },
  {
    id: "Care Ethics",
    name: "Care Ethics",
    description: "Relationship and care-focused approach",
  },
  {
    id: "Ethical Egoism",
    name: "Ethical Egoism",
    description: "Actions that maximize self-interest",
  },
];

export default function NewDebateDialog({
  isOpen,
  onClose,
  onStartDebate,
}: NewDebateDialogProps) {
  const [selectedMode, setSelectedMode] = useState<"text" | "voice">("text");
  const [selectedStyle, setSelectedStyle] = useState(debateStyles[0]);
  const [selectedPrinciples, setSelectedPrinciples] = useState([
    ethicalPrinciples[0],
  ]);
  const [step, setStep] = useState(1);

  const handlePrincipleToggle = (principle: (typeof ethicalPrinciples)[0]) => {
    const isSelected = selectedPrinciples.some((p) => p.id === principle.id);

    if (isSelected) {
      // Don't allow deselecting if it's the only one selected
      if (selectedPrinciples.length === 1) return;
      setSelectedPrinciples(
        selectedPrinciples.filter((p) => p.id !== principle.id),
      );
    } else {
      setSelectedPrinciples([...selectedPrinciples, principle]);
    }
  };

  const handleStartDebate = () => {
    const settings: DebateSettings = {
      mode: selectedMode,
      style: selectedStyle.id,
      principles: selectedPrinciples.map((p) => p.id),
    };
    onStartDebate(settings);
    onClose();
    // Reset for next time
    setStep(1);
    setSelectedMode("text");
    setSelectedStyle(debateStyles[0]);
    setSelectedPrinciples([ethicalPrinciples[0]]);
  };

  const handleClose = () => {
    onClose();
    // Reset state when closing
    setTimeout(() => {
      setStep(1);
      setSelectedMode("text");
      setSelectedStyle(debateStyles[0]);
      setSelectedPrinciples([ethicalPrinciples[0]]);
    }, 300);
  };

  return (
    <Transition appear show={isOpen} as={Fragment} data-oid="upx91tw">
      <Dialog
        as="div"
        className="relative z-50"
        onClose={handleClose}
        data-oid="gjyekr1"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          data-oid="dpcbzxi"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            data-oid="25-3y5s"
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto" data-oid="kepr286">
          <div
            className="flex min-h-full items-center justify-center p-4 text-center"
            data-oid="7pc2s-s"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              data-oid="vgxrnyx"
            >
              <Dialog.Panel
                className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-slate-800/90 backdrop-blur-xl p-8 text-left align-middle shadow-2xl transition-all border border-slate-700/50"
                data-oid="..xcfug"
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between mb-8"
                  data-oid="ea4orw-"
                >
                  <Dialog.Title
                    className="text-2xl font-bold text-white flex items-center gap-3"
                    data-oid="cw-5cig"
                  >
                    <div
                      className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-violet-600 rounded-2xl flex items-center justify-center"
                      data-oid="x-mf:yq"
                    >
                      <SparklesIcon
                        className="w-5 h-5 text-white"
                        data-oid="pku4.7f"
                      />
                    </div>
                    Start New Debate
                  </Dialog.Title>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors"
                    data-oid="9pbkkvs"
                  >
                    <XMarkIcon
                      className="w-6 h-6 text-slate-400"
                      data-oid="kdimzxj"
                    />
                  </button>
                </div>

                <AnimatePresence mode="wait" data-oid="v3ax9f_">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      data-oid="aqt52-1"
                    >
                      {/* Step 1: Mode Selection */}
                      <div className="mb-8" data-oid="qdrx:b2">
                        <h3
                          className="text-lg font-semibold text-white mb-4"
                          data-oid="dydag1-"
                        >
                          Choose Your Debate Mode
                        </h3>
                        <div
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          data-oid="hzqm-wm"
                        >
                          <motion.button
                            onClick={() => setSelectedMode("text")}
                            className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                              selectedMode === "text"
                                ? "border-cyan-500 bg-cyan-500/10"
                                : "border-slate-600 hover:border-slate-500 bg-slate-700/30"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            data-oid="1n-r6uh"
                          >
                            <ChatBubbleLeftRightIcon
                              className={`w-8 h-8 mx-auto mb-3 ${
                                selectedMode === "text"
                                  ? "text-cyan-400"
                                  : "text-slate-400"
                              }`}
                              data-oid="q-iy:xm"
                            />

                            <h4
                              className="font-semibold text-white mb-2"
                              data-oid="zb-bkds"
                            >
                              Text Debate
                            </h4>
                            <p
                              className="text-sm text-slate-400"
                              data-oid="e4auor_"
                            >
                              Engage in thoughtful written debates with AI on
                              any topic
                            </p>
                          </motion.button>

                          <motion.button
                            onClick={() => setSelectedMode("voice")}
                            className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                              selectedMode === "voice"
                                ? "border-violet-500 bg-violet-500/10"
                                : "border-slate-600 hover:border-slate-500 bg-slate-700/30"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            data-oid="zowjeoz"
                          >
                            <MicrophoneIcon
                              className={`w-8 h-8 mx-auto mb-3 ${
                                selectedMode === "voice"
                                  ? "text-violet-400"
                                  : "text-slate-400"
                              }`}
                              data-oid="3cb2sq4"
                            />

                            <h4
                              className="font-semibold text-white mb-2"
                              data-oid="srpm315"
                            >
                              Voice Debate
                            </h4>
                            <p
                              className="text-sm text-slate-400"
                              data-oid="swrbtla"
                            >
                              Have natural voice conversations and debates with
                              AI
                            </p>
                          </motion.button>
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-end" data-oid="ylkg9nb">
                        <motion.button
                          onClick={() => setStep(2)}
                          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="j439q-l"
                        >
                          Next
                          <ArrowRightIcon
                            className="w-4 h-4"
                            data-oid="7adc-bq"
                          />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      data-oid="ihalbic"
                    >
                      {/* Step 2: Style Selection */}
                      <div className="mb-6" data-oid="wd7naht">
                        <h3
                          className="text-lg font-semibold text-white mb-3"
                          data-oid="14-:v9n"
                        >
                          Select Debate Style
                        </h3>
                        <p
                          className="text-slate-400 text-sm mb-4"
                          data-oid="-71pgmr"
                        >
                          Choose your preferred argumentation approach
                        </p>

                        <div
                          className="space-y-2 max-h-48 overflow-y-auto p-1"
                          data-oid="nb1fu:i"
                        >
                          {debateStyles.map((style) => (
                            <motion.button
                              key={style.id}
                              onClick={() => setSelectedStyle(style)}
                              className={`w-full p-3 rounded-lg border transition-all duration-300 text-left ${
                                selectedStyle.id === style.id
                                  ? "border-cyan-500 bg-cyan-500/10"
                                  : "border-slate-600 hover:border-slate-500 bg-slate-700/30"
                              }`}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              data-oid="yj9a2fo"
                            >
                              <div
                                className="flex items-center gap-3"
                                data-oid="boj241e"
                              >
                                <div
                                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                    selectedStyle.id === style.id
                                      ? "border-cyan-500 bg-cyan-500"
                                      : "border-slate-500"
                                  }`}
                                  data-oid="xz0r.km"
                                >
                                  {selectedStyle.id === style.id && (
                                    <div
                                      className="w-2 h-2 bg-white rounded-full"
                                      data-oid="mdoim4u"
                                    />
                                  )}
                                </div>
                                <div
                                  className="flex-1 min-w-0"
                                  data-oid="kgzv_0x"
                                >
                                  <h4
                                    className="font-medium text-white text-sm"
                                    data-oid="9oj0bxj"
                                  >
                                    {style.name}
                                  </h4>
                                  <p
                                    className="text-xs text-slate-400 truncate"
                                    data-oid="5tr1o1p"
                                  >
                                    {style.description}
                                  </p>
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-between" data-oid=".08:c0j">
                        <motion.button
                          onClick={() => setStep(1)}
                          className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="82967yu"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          onClick={() => setStep(3)}
                          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="4qfjwe."
                        >
                          Next
                          <ArrowRightIcon
                            className="w-4 h-4"
                            data-oid="tx5jy17"
                          />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      data-oid="_4x0iot"
                    >
                      {/* Step 3: Ethics Selection */}
                      <div className="mb-8" data-oid="qnbxscc">
                        <h3
                          className="text-lg font-semibold text-white mb-4"
                          data-oid="_i.zi_s"
                        >
                          Choose Ethical Frameworks
                        </h3>
                        <p
                          className="text-slate-400 text-sm mb-6"
                          data-oid="tkulw.9"
                        >
                          Select one or more ethical perspectives for the AI to
                          consider
                        </p>

                        <div
                          className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1"
                          data-oid="md.238_"
                        >
                          {ethicalPrinciples.map((principle) => (
                            <motion.button
                              key={principle.id}
                              onClick={() => handlePrincipleToggle(principle)}
                              className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                                selectedPrinciples.some(
                                  (p) => p.id === principle.id,
                                )
                                  ? "border-cyan-500 bg-cyan-500/10"
                                  : "border-slate-600 hover:border-slate-500 bg-slate-700/30"
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              data-oid="fmob3f5"
                            >
                              <div
                                className="flex items-start gap-3"
                                data-oid="g3ekmg8"
                              >
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                                    selectedPrinciples.some(
                                      (p) => p.id === principle.id,
                                    )
                                      ? "border-cyan-500 bg-cyan-500"
                                      : "border-slate-500"
                                  }`}
                                  data-oid="u2hrdpk"
                                >
                                  {selectedPrinciples.some(
                                    (p) => p.id === principle.id,
                                  ) && (
                                    <CheckIcon
                                      className="w-3 h-3 text-white"
                                      data-oid="huuploh"
                                    />
                                  )}
                                </div>
                                <div data-oid="..z75d2">
                                  <h4
                                    className="font-medium text-white"
                                    data-oid="m0ngryr"
                                  >
                                    {principle.name}
                                  </h4>
                                  <p
                                    className="text-sm text-slate-400 mt-1"
                                    data-oid=".ne1n4j"
                                  >
                                    {principle.description}
                                  </p>
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-between" data-oid="3blcnk2">
                        <motion.button
                          onClick={() => setStep(2)}
                          className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="slqz-8d"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          onClick={handleStartDebate}
                          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-2xl transition-all duration-300 shadow-lg"
                          whileHover={{
                            scale: 1.05,
                            boxShadow:
                              "0 10px 30px -5px rgba(6, 182, 212, 0.4)",
                          }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="9eyn1d5"
                        >
                          Start Debate
                          <SparklesIcon
                            className="w-4 h-4"
                            data-oid="l162n1m"
                          />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Step Indicator */}
                <div
                  className="flex justify-center mt-8 space-x-2"
                  data-oid="l4dhi5f"
                >
                  {[1, 2, 3].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        step >= stepNumber ? "bg-cyan-500" : "bg-slate-600"
                      }`}
                      data-oid="7cpzd_p"
                    />
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
