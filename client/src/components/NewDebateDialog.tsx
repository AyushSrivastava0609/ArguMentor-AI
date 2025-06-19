"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  ChevronDownIcon,
  CheckIcon,
  ChatBubbleLeftRightIcon,
  MicrophoneIcon,
  AcademicCapIcon,
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
    <Transition appear show={isOpen} as={Fragment} data-oid="r55-ywc">
      <Dialog
        as="div"
        className="relative z-50"
        onClose={handleClose}
        data-oid="-k0blg_"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          data-oid="lof5q8x"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            data-oid="-4iisd2"
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto" data-oid="c6g1tfj">
          <div
            className="flex min-h-full items-center justify-center p-4 text-center"
            data-oid="dh8aw:e"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              data-oid="c2ajwtd"
            >
              <Dialog.Panel
                className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-slate-800/90 backdrop-blur-xl p-8 text-left align-middle shadow-2xl transition-all border border-slate-700/50"
                data-oid="8c9vjcs"
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between mb-8"
                  data-oid="9nbo0on"
                >
                  <Dialog.Title
                    className="text-2xl font-bold text-white flex items-center gap-3"
                    data-oid=".jb62hu"
                  >
                    <div
                      className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-violet-600 rounded-2xl flex items-center justify-center"
                      data-oid="_5d38ym"
                    >
                      <SparklesIcon
                        className="w-5 h-5 text-white"
                        data-oid="9-y-oug"
                      />
                    </div>
                    Start New Debate
                  </Dialog.Title>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors"
                    data-oid="_br2v:e"
                  >
                    <XMarkIcon
                      className="w-6 h-6 text-slate-400"
                      data-oid="qkminxm"
                    />
                  </button>
                </div>

                <AnimatePresence mode="wait" data-oid="moj.9:m">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      data-oid="zak7xh7"
                    >
                      {/* Step 1: Mode Selection */}
                      <div className="mb-8" data-oid="8rtuh7s">
                        <h3
                          className="text-lg font-semibold text-white mb-4"
                          data-oid="1syb5-5"
                        >
                          Choose Your Debate Mode
                        </h3>
                        <div
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          data-oid=":9sy7ee"
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
                            data-oid="k9ezkuc"
                          >
                            <ChatBubbleLeftRightIcon
                              className={`w-8 h-8 mx-auto mb-3 ${
                                selectedMode === "text"
                                  ? "text-cyan-400"
                                  : "text-slate-400"
                              }`}
                              data-oid=":ajwf2a"
                            />

                            <h4
                              className="font-semibold text-white mb-2"
                              data-oid="vmt8-i9"
                            >
                              Text Debate
                            </h4>
                            <p
                              className="text-sm text-slate-400"
                              data-oid="g57gt2h"
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
                            data-oid="1vdhbcz"
                          >
                            <MicrophoneIcon
                              className={`w-8 h-8 mx-auto mb-3 ${
                                selectedMode === "voice"
                                  ? "text-violet-400"
                                  : "text-slate-400"
                              }`}
                              data-oid="dyl10kc"
                            />

                            <h4
                              className="font-semibold text-white mb-2"
                              data-oid="ocluzbk"
                            >
                              Voice Debate
                            </h4>
                            <p
                              className="text-sm text-slate-400"
                              data-oid="uz:vrv5"
                            >
                              Have natural voice conversations and debates with
                              AI
                            </p>
                          </motion.button>
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-end" data-oid="vk3y38-">
                        <motion.button
                          onClick={() => setStep(2)}
                          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="vs.k0e3"
                        >
                          Next
                          <ArrowRightIcon
                            className="w-4 h-4"
                            data-oid="mbwk38o"
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
                      data-oid="146-c:o"
                    >
                      {/* Step 2: Style Selection */}
                      <div className="mb-6" data-oid="2ap7n-s">
                        <h3
                          className="text-lg font-semibold text-white mb-3"
                          data-oid=".wp88_n"
                        >
                          Select Debate Style
                        </h3>
                        <p
                          className="text-slate-400 text-sm mb-4"
                          data-oid="-t75_63"
                        >
                          Choose your preferred argumentation approach
                        </p>

                        <div
                          className="space-y-2 max-h-48 overflow-y-auto p-1"
                          data-oid="ifjry8m"
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
                              data-oid="k7t3-z_"
                            >
                              <div
                                className="flex items-center gap-3"
                                data-oid="c__kzyw"
                              >
                                <div
                                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                    selectedStyle.id === style.id
                                      ? "border-cyan-500 bg-cyan-500"
                                      : "border-slate-500"
                                  }`}
                                  data-oid="txvhh1q"
                                >
                                  {selectedStyle.id === style.id && (
                                    <div
                                      className="w-2 h-2 bg-white rounded-full"
                                      data-oid=".dxd57q"
                                    />
                                  )}
                                </div>
                                <div
                                  className="flex-1 min-w-0"
                                  data-oid="ia-mx6w"
                                >
                                  <h4
                                    className="font-medium text-white text-sm"
                                    data-oid="99hae.7"
                                  >
                                    {style.name}
                                  </h4>
                                  <p
                                    className="text-xs text-slate-400 truncate"
                                    data-oid="jvqeyjb"
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
                      <div className="flex justify-between" data-oid="p3pls8:">
                        <motion.button
                          onClick={() => setStep(1)}
                          className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="4sfyg5z"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          onClick={() => setStep(3)}
                          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="hhhssss"
                        >
                          Next
                          <ArrowRightIcon
                            className="w-4 h-4"
                            data-oid="jhgqp3j"
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
                      data-oid="jf_xdt:"
                    >
                      {/* Step 3: Ethics Selection */}
                      <div className="mb-8" data-oid="y63b05f">
                        <h3
                          className="text-lg font-semibold text-white mb-4"
                          data-oid=":75gtpx"
                        >
                          Choose Ethical Frameworks
                        </h3>
                        <p
                          className="text-slate-400 text-sm mb-6"
                          data-oid="y7s8mi9"
                        >
                          Select one or more ethical perspectives for the AI to
                          consider
                        </p>

                        <div
                          className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1"
                          data-oid="zbcf06i"
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
                              data-oid="g5vrz_o"
                            >
                              <div
                                className="flex items-start gap-3"
                                data-oid="ttnrc2e"
                              >
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                                    selectedPrinciples.some(
                                      (p) => p.id === principle.id,
                                    )
                                      ? "border-cyan-500 bg-cyan-500"
                                      : "border-slate-500"
                                  }`}
                                  data-oid="2fckrrb"
                                >
                                  {selectedPrinciples.some(
                                    (p) => p.id === principle.id,
                                  ) && (
                                    <CheckIcon
                                      className="w-3 h-3 text-white"
                                      data-oid="hx71uq3"
                                    />
                                  )}
                                </div>
                                <div data-oid="uazxc-s">
                                  <h4
                                    className="font-medium text-white"
                                    data-oid="ixe42za"
                                  >
                                    {principle.name}
                                  </h4>
                                  <p
                                    className="text-sm text-slate-400 mt-1"
                                    data-oid="wdo_29j"
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
                      <div className="flex justify-between" data-oid="jw6m:-w">
                        <motion.button
                          onClick={() => setStep(2)}
                          className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="nndvxni"
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
                          data-oid="mrqe-ef"
                        >
                          Start Debate
                          <SparklesIcon
                            className="w-4 h-4"
                            data-oid="4mf:.so"
                          />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Step Indicator */}
                <div
                  className="flex justify-center mt-8 space-x-2"
                  data-oid="jtsuun0"
                >
                  {[1, 2, 3].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        step >= stepNumber ? "bg-cyan-500" : "bg-slate-600"
                      }`}
                      data-oid="ukk9xx9"
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
