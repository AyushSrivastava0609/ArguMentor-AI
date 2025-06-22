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
    <Transition appear show={isOpen} as={Fragment} data-oid="ht1obsw">
      <Dialog
        as="div"
        className="relative z-50"
        onClose={handleClose}
        data-oid="ji4j8-f"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          data-oid="vao.-rd"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            data-oid="g:suacb"
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto" data-oid="m5xy9m:">
          <div
            className="flex min-h-full items-center justify-center p-4 text-center"
            data-oid="1283gzj"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              data-oid="o3jb_-9"
            >
              <Dialog.Panel
                className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-slate-800/90 backdrop-blur-xl p-8 text-left align-middle shadow-2xl transition-all border border-slate-700/50"
                data-oid="--:27ku"
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between mb-8"
                  data-oid="9oust1r"
                >
                  <Dialog.Title
                    className="text-2xl font-bold text-white flex items-center gap-3"
                    data-oid="3s.zn2h"
                  >
                    <div
                      className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-violet-600 rounded-2xl flex items-center justify-center"
                      data-oid="6jx9as2"
                    >
                      <SparklesIcon
                        className="w-5 h-5 text-white"
                        data-oid="k5mm1zm"
                      />
                    </div>
                    Start New Debate
                  </Dialog.Title>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors"
                    data-oid="q7n6sdn"
                  >
                    <XMarkIcon
                      className="w-6 h-6 text-slate-400"
                      data-oid="3rskf_d"
                    />
                  </button>
                </div>

                <AnimatePresence mode="wait" data-oid="bc0ziyf">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      data-oid=":vsyy24"
                    >
                      {/* Step 1: Mode Selection */}
                      <div className="mb-8" data-oid="0168m..">
                        <h3
                          className="text-lg font-semibold text-white mb-4"
                          data-oid="do6n.2-"
                        >
                          Choose Your Debate Mode
                        </h3>
                        <div
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          data-oid="e:0bei2"
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
                            data-oid="mbgem9x"
                          >
                            <ChatBubbleLeftRightIcon
                              className={`w-8 h-8 mx-auto mb-3 ${
                                selectedMode === "text"
                                  ? "text-cyan-400"
                                  : "text-slate-400"
                              }`}
                              data-oid="1quck2u"
                            />

                            <h4
                              className="font-semibold text-white mb-2"
                              data-oid="d47tj6."
                            >
                              Text Debate
                            </h4>
                            <p
                              className="text-sm text-slate-400"
                              data-oid="l5npat3"
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
                            data-oid="n6x2f-i"
                          >
                            <MicrophoneIcon
                              className={`w-8 h-8 mx-auto mb-3 ${
                                selectedMode === "voice"
                                  ? "text-violet-400"
                                  : "text-slate-400"
                              }`}
                              data-oid="spe3wkh"
                            />

                            <h4
                              className="font-semibold text-white mb-2"
                              data-oid="95ot:ym"
                            >
                              Voice Debate
                            </h4>
                            <p
                              className="text-sm text-slate-400"
                              data-oid="9j80-c1"
                            >
                              Have natural voice conversations and debates with
                              AI
                            </p>
                          </motion.button>
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-end" data-oid="o8st6xa">
                        <motion.button
                          onClick={() => setStep(2)}
                          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid=".k_miae"
                        >
                          Next
                          <ArrowRightIcon
                            className="w-4 h-4"
                            data-oid="lj86.f0"
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
                      data-oid="qkxdwi4"
                    >
                      {/* Step 2: Style Selection */}
                      <div className="mb-6" data-oid="h1e4yto">
                        <h3
                          className="text-lg font-semibold text-white mb-3"
                          data-oid="1ywnwqe"
                        >
                          Select Debate Style
                        </h3>
                        <p
                          className="text-slate-400 text-sm mb-4"
                          data-oid="tlyireg"
                        >
                          Choose your preferred argumentation approach
                        </p>

                        <div
                          className="space-y-2 max-h-48 overflow-y-auto p-1"
                          data-oid="s0mp0k8"
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
                              data-oid="zhyqnk8"
                            >
                              <div
                                className="flex items-center gap-3"
                                data-oid="g2q4wec"
                              >
                                <div
                                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                    selectedStyle.id === style.id
                                      ? "border-cyan-500 bg-cyan-500"
                                      : "border-slate-500"
                                  }`}
                                  data-oid="vi2vftb"
                                >
                                  {selectedStyle.id === style.id && (
                                    <div
                                      className="w-2 h-2 bg-white rounded-full"
                                      data-oid="kb1f02v"
                                    />
                                  )}
                                </div>
                                <div
                                  className="flex-1 min-w-0"
                                  data-oid="5hl0s0e"
                                >
                                  <h4
                                    className="font-medium text-white text-sm"
                                    data-oid="f0.b1d-"
                                  >
                                    {style.name}
                                  </h4>
                                  <p
                                    className="text-xs text-slate-400 truncate"
                                    data-oid="4..22cj"
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
                      <div className="flex justify-between" data-oid="mv9m_b5">
                        <motion.button
                          onClick={() => setStep(1)}
                          className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="dtt3qh_"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          onClick={() => setStep(3)}
                          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="1n-lvat"
                        >
                          Next
                          <ArrowRightIcon
                            className="w-4 h-4"
                            data-oid="_x-43gu"
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
                      data-oid="fhucnpa"
                    >
                      {/* Step 3: Ethics Selection */}
                      <div className="mb-8" data-oid=".f4asg0">
                        <h3
                          className="text-lg font-semibold text-white mb-4"
                          data-oid="ik8_5xp"
                        >
                          Choose Ethical Frameworks
                        </h3>
                        <p
                          className="text-slate-400 text-sm mb-6"
                          data-oid="k-a3vqy"
                        >
                          Select one or more ethical perspectives for the AI to
                          consider
                        </p>

                        <div
                          className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1"
                          data-oid="todjx6:"
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
                              data-oid="f92y7q4"
                            >
                              <div
                                className="flex items-start gap-3"
                                data-oid="lnxq7-w"
                              >
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                                    selectedPrinciples.some(
                                      (p) => p.id === principle.id,
                                    )
                                      ? "border-cyan-500 bg-cyan-500"
                                      : "border-slate-500"
                                  }`}
                                  data-oid="6x9zc49"
                                >
                                  {selectedPrinciples.some(
                                    (p) => p.id === principle.id,
                                  ) && (
                                    <CheckIcon
                                      className="w-3 h-3 text-white"
                                      data-oid="py1i8s3"
                                    />
                                  )}
                                </div>
                                <div data-oid="kg56l4q">
                                  <h4
                                    className="font-medium text-white"
                                    data-oid="k.etinj"
                                  >
                                    {principle.name}
                                  </h4>
                                  <p
                                    className="text-sm text-slate-400 mt-1"
                                    data-oid=":0roda:"
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
                      <div className="flex justify-between" data-oid="hncezyo">
                        <motion.button
                          onClick={() => setStep(2)}
                          className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="f3l---1"
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
                          data-oid="lkcd6d0"
                        >
                          Start Debate
                          <SparklesIcon
                            className="w-4 h-4"
                            data-oid="cu.glc_"
                          />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Step Indicator */}
                <div
                  className="flex justify-center mt-8 space-x-2"
                  data-oid="tsej956"
                >
                  {[1, 2, 3].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        step >= stepNumber ? "bg-cyan-500" : "bg-slate-600"
                      }`}
                      data-oid=".w.k9_."
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
