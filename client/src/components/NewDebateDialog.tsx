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
    <Transition appear show={isOpen} as={Fragment} data-oid="cj5m4jj">
      <Dialog
        as="div"
        className="relative z-50"
        onClose={handleClose}
        data-oid="zmc0z4."
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          data-oid="tk58dps"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            data-oid="c_8xb_k"
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto" data-oid="jvx1891">
          <div
            className="flex min-h-full items-center justify-center p-4 text-center"
            data-oid="qm-l2-y"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              data-oid="g97iis6"
            >
              <Dialog.Panel
                className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-slate-800/90 backdrop-blur-xl p-8 text-left align-middle shadow-2xl transition-all border border-slate-700/50"
                data-oid="1fm91s5"
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between mb-8"
                  data-oid="o.eqw73"
                >
                  <Dialog.Title
                    className="text-2xl font-bold text-white flex items-center gap-3"
                    data-oid="p.-ucnl"
                  >
                    <div
                      className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-violet-600 rounded-2xl flex items-center justify-center"
                      data-oid="yakumck"
                    >
                      <SparklesIcon
                        className="w-5 h-5 text-white"
                        data-oid=".:q.8ac"
                      />
                    </div>
                    Start New Debate
                  </Dialog.Title>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors"
                    data-oid="uoe59aq"
                  >
                    <XMarkIcon
                      className="w-6 h-6 text-slate-400"
                      data-oid="r_uwplj"
                    />
                  </button>
                </div>

                <AnimatePresence mode="wait" data-oid="xd4p:ft">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      data-oid=".p1cg.x"
                    >
                      {/* Step 1: Mode Selection */}
                      <div className="mb-8" data-oid="b1cs4qp">
                        <h3
                          className="text-lg font-semibold text-white mb-4"
                          data-oid="pfe661w"
                        >
                          Choose Your Debate Mode
                        </h3>
                        <div
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          data-oid="vpc4o_z"
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
                            data-oid="b:55vfc"
                          >
                            <ChatBubbleLeftRightIcon
                              className={`w-8 h-8 mx-auto mb-3 ${
                                selectedMode === "text"
                                  ? "text-cyan-400"
                                  : "text-slate-400"
                              }`}
                              data-oid="xq7_26:"
                            />

                            <h4
                              className="font-semibold text-white mb-2"
                              data-oid="3eddu-1"
                            >
                              Text Debate
                            </h4>
                            <p
                              className="text-sm text-slate-400"
                              data-oid="cho60rh"
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
                            data-oid="x28i8hh"
                          >
                            <MicrophoneIcon
                              className={`w-8 h-8 mx-auto mb-3 ${
                                selectedMode === "voice"
                                  ? "text-violet-400"
                                  : "text-slate-400"
                              }`}
                              data-oid="dr5qkic"
                            />

                            <h4
                              className="font-semibold text-white mb-2"
                              data-oid="acm9j0l"
                            >
                              Voice Debate
                            </h4>
                            <p
                              className="text-sm text-slate-400"
                              data-oid="_hev70w"
                            >
                              Have natural voice conversations and debates with
                              AI
                            </p>
                          </motion.button>
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-end" data-oid="5c6gyv.">
                        <motion.button
                          onClick={() => setStep(2)}
                          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="20toxza"
                        >
                          Next
                          <ArrowRightIcon
                            className="w-4 h-4"
                            data-oid="t58n6f1"
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
                      data-oid="0e4:_x9"
                    >
                      {/* Step 2: Style Selection */}
                      <div className="mb-6" data-oid="08-go7m">
                        <h3
                          className="text-lg font-semibold text-white mb-3"
                          data-oid="msj5c-l"
                        >
                          Select Debate Style
                        </h3>
                        <p
                          className="text-slate-400 text-sm mb-4"
                          data-oid="aydtynm"
                        >
                          Choose your preferred argumentation approach
                        </p>

                        <div
                          className="space-y-2 max-h-48 overflow-y-auto p-1"
                          data-oid="vbwdg:_"
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
                              data-oid="er67931"
                            >
                              <div
                                className="flex items-center gap-3"
                                data-oid="f3y90pp"
                              >
                                <div
                                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                    selectedStyle.id === style.id
                                      ? "border-cyan-500 bg-cyan-500"
                                      : "border-slate-500"
                                  }`}
                                  data-oid="cdidnjc"
                                >
                                  {selectedStyle.id === style.id && (
                                    <div
                                      className="w-2 h-2 bg-white rounded-full"
                                      data-oid="kc5f8kf"
                                    />
                                  )}
                                </div>
                                <div
                                  className="flex-1 min-w-0"
                                  data-oid="tnqxd.m"
                                >
                                  <h4
                                    className="font-medium text-white text-sm"
                                    data-oid="xqajvuu"
                                  >
                                    {style.name}
                                  </h4>
                                  <p
                                    className="text-xs text-slate-400 truncate"
                                    data-oid=".i7hvw8"
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
                      <div className="flex justify-between" data-oid="97:q0fe">
                        <motion.button
                          onClick={() => setStep(1)}
                          className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="panl-a9"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          onClick={() => setStep(3)}
                          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="2qzejkn"
                        >
                          Next
                          <ArrowRightIcon
                            className="w-4 h-4"
                            data-oid="29ai82e"
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
                      data-oid="akl1rpx"
                    >
                      {/* Step 3: Ethics Selection */}
                      <div className="mb-8" data-oid="x0:nagm">
                        <h3
                          className="text-lg font-semibold text-white mb-4"
                          data-oid="x38zd8-"
                        >
                          Choose Ethical Frameworks
                        </h3>
                        <p
                          className="text-slate-400 text-sm mb-6"
                          data-oid="..:6cu9"
                        >
                          Select one or more ethical perspectives for the AI to
                          consider
                        </p>

                        <div
                          className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1"
                          data-oid="e-wccvp"
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
                              data-oid="o163n9f"
                            >
                              <div
                                className="flex items-start gap-3"
                                data-oid="r24w1c8"
                              >
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                                    selectedPrinciples.some(
                                      (p) => p.id === principle.id,
                                    )
                                      ? "border-cyan-500 bg-cyan-500"
                                      : "border-slate-500"
                                  }`}
                                  data-oid="iy15heh"
                                >
                                  {selectedPrinciples.some(
                                    (p) => p.id === principle.id,
                                  ) && (
                                    <CheckIcon
                                      className="w-3 h-3 text-white"
                                      data-oid="-lc1v89"
                                    />
                                  )}
                                </div>
                                <div data-oid="7dimavi">
                                  <h4
                                    className="font-medium text-white"
                                    data-oid="tv5ja2z"
                                  >
                                    {principle.name}
                                  </h4>
                                  <p
                                    className="text-sm text-slate-400 mt-1"
                                    data-oid="8plgyon"
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
                      <div className="flex justify-between" data-oid="gwxt_fp">
                        <motion.button
                          onClick={() => setStep(2)}
                          className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="dax.ea:"
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
                          data-oid="u-evh8j"
                        >
                          Start Debate
                          <SparklesIcon
                            className="w-4 h-4"
                            data-oid="55.j0nz"
                          />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Step Indicator */}
                <div
                  className="flex justify-center mt-8 space-x-2"
                  data-oid="5s-gfl8"
                >
                  {[1, 2, 3].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        step >= stepNumber ? "bg-cyan-500" : "bg-slate-600"
                      }`}
                      data-oid="k9bp260"
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
