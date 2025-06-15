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
];

const ethicalPrinciples = [
  { id: "Normal", name: "Normal", description: "Standard debate approach" },
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
    <Transition appear show={isOpen} as={Fragment} data-oid="9d8j5au">
      <Dialog
        as="div"
        className="relative z-50"
        onClose={handleClose}
        data-oid="lhhvyn1"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          data-oid="145._eb"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            data-oid="8_1n7px"
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto" data-oid=".b2x97f">
          <div
            className="flex min-h-full items-center justify-center p-4 text-center"
            data-oid="4vuma._"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              data-oid="78xfmec"
            >
              <Dialog.Panel
                className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-slate-800/90 backdrop-blur-xl p-8 text-left align-middle shadow-2xl transition-all border border-slate-700/50"
                data-oid="k_9zk2a"
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between mb-8"
                  data-oid="8rvjg.f"
                >
                  <Dialog.Title
                    className="text-2xl font-bold text-white flex items-center gap-3"
                    data-oid="15pfudm"
                  >
                    <div
                      className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-violet-600 rounded-2xl flex items-center justify-center"
                      data-oid="5:89ndk"
                    >
                      <SparklesIcon
                        className="w-5 h-5 text-white"
                        data-oid="g9n443f"
                      />
                    </div>
                    Start New Debate
                  </Dialog.Title>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors"
                    data-oid="oel41bi"
                  >
                    <XMarkIcon
                      className="w-6 h-6 text-slate-400"
                      data-oid="cmgn3lc"
                    />
                  </button>
                </div>

                <AnimatePresence mode="wait" data-oid="2sktld1">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      data-oid="9imlwny"
                    >
                      {/* Step 1: Mode Selection */}
                      <div className="mb-8" data-oid="ln-hh_h">
                        <h3
                          className="text-lg font-semibold text-white mb-4"
                          data-oid="ufma:eh"
                        >
                          Choose Your Debate Mode
                        </h3>
                        <div
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          data-oid="p.pcfvi"
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
                            data-oid="s4_59eb"
                          >
                            <ChatBubbleLeftRightIcon
                              className={`w-8 h-8 mx-auto mb-3 ${
                                selectedMode === "text"
                                  ? "text-cyan-400"
                                  : "text-slate-400"
                              }`}
                              data-oid="k6_x1hb"
                            />

                            <h4
                              className="font-semibold text-white mb-2"
                              data-oid="p-p_0rl"
                            >
                              Text Debate
                            </h4>
                            <p
                              className="text-sm text-slate-400"
                              data-oid="n5-bchp"
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
                            data-oid="wwim2kt"
                          >
                            <MicrophoneIcon
                              className={`w-8 h-8 mx-auto mb-3 ${
                                selectedMode === "voice"
                                  ? "text-violet-400"
                                  : "text-slate-400"
                              }`}
                              data-oid="le:rqhg"
                            />

                            <h4
                              className="font-semibold text-white mb-2"
                              data-oid="p_w2_v5"
                            >
                              Voice Debate
                            </h4>
                            <p
                              className="text-sm text-slate-400"
                              data-oid="tumu_ur"
                            >
                              Have natural voice conversations and debates with
                              AI
                            </p>
                          </motion.button>
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-end" data-oid="e:94j8e">
                        <motion.button
                          onClick={() => setStep(2)}
                          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="yle:-x."
                        >
                          Next
                          <ArrowRightIcon
                            className="w-4 h-4"
                            data-oid="0shdgfi"
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
                      data-oid="qzpt9t7"
                    >
                      {/* Step 2: Style Selection */}
                      <div className="mb-6" data-oid="-bqhpy-">
                        <h3
                          className="text-lg font-semibold text-white mb-3"
                          data-oid="8f._7_3"
                        >
                          Select Debate Style
                        </h3>
                        <p
                          className="text-slate-400 text-sm mb-4"
                          data-oid=":iybwer"
                        >
                          Choose your preferred argumentation approach
                        </p>

                        <div
                          className="space-y-2 max-h-48 overflow-y-auto p-1"
                          data-oid="npjmkou"
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
                              data-oid="wrgg4yn"
                            >
                              <div
                                className="flex items-center gap-3"
                                data-oid="f4lvvu2"
                              >
                                <div
                                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                    selectedStyle.id === style.id
                                      ? "border-cyan-500 bg-cyan-500"
                                      : "border-slate-500"
                                  }`}
                                  data-oid=":7c:2x:"
                                >
                                  {selectedStyle.id === style.id && (
                                    <div
                                      className="w-2 h-2 bg-white rounded-full"
                                      data-oid="w29squ0"
                                    />
                                  )}
                                </div>
                                <div
                                  className="flex-1 min-w-0"
                                  data-oid="xg4a4jl"
                                >
                                  <h4
                                    className="font-medium text-white text-sm"
                                    data-oid="43o-1zm"
                                  >
                                    {style.name}
                                  </h4>
                                  <p
                                    className="text-xs text-slate-400 truncate"
                                    data-oid="6da1yx4"
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
                      <div className="flex justify-between" data-oid="tkl9stk">
                        <motion.button
                          onClick={() => setStep(1)}
                          className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="ud7nf4p"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          onClick={() => setStep(3)}
                          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="hgdk0uu"
                        >
                          Next
                          <ArrowRightIcon
                            className="w-4 h-4"
                            data-oid="e0vo_bm"
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
                      data-oid="hu37bx0"
                    >
                      {/* Step 3: Ethics Selection */}
                      <div className="mb-8" data-oid="fw58r42">
                        <h3
                          className="text-lg font-semibold text-white mb-4"
                          data-oid="2g_jmqz"
                        >
                          Choose Ethical Frameworks
                        </h3>
                        <p
                          className="text-slate-400 text-sm mb-6"
                          data-oid="d5sphz7"
                        >
                          Select one or more ethical perspectives for the AI to
                          consider
                        </p>

                        <div
                          className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1"
                          data-oid="aigevl2"
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
                              data-oid="15:98ys"
                            >
                              <div
                                className="flex items-start gap-3"
                                data-oid="kkwlwx6"
                              >
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                                    selectedPrinciples.some(
                                      (p) => p.id === principle.id,
                                    )
                                      ? "border-cyan-500 bg-cyan-500"
                                      : "border-slate-500"
                                  }`}
                                  data-oid="fe0z_i:"
                                >
                                  {selectedPrinciples.some(
                                    (p) => p.id === principle.id,
                                  ) && (
                                    <CheckIcon
                                      className="w-3 h-3 text-white"
                                      data-oid="he8fnp1"
                                    />
                                  )}
                                </div>
                                <div data-oid="2bx.x3j">
                                  <h4
                                    className="font-medium text-white"
                                    data-oid="ehosyl5"
                                  >
                                    {principle.name}
                                  </h4>
                                  <p
                                    className="text-sm text-slate-400 mt-1"
                                    data-oid="om57-_b"
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
                      <div className="flex justify-between" data-oid="r-mddsu">
                        <motion.button
                          onClick={() => setStep(2)}
                          className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          data-oid="c3x3:7z"
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
                          data-oid="qhuwt9-"
                        >
                          Start Debate
                          <SparklesIcon
                            className="w-4 h-4"
                            data-oid="3yb5ehf"
                          />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Step Indicator */}
                <div
                  className="flex justify-center mt-8 space-x-2"
                  data-oid="m5q67x-"
                >
                  {[1, 2, 3].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        step >= stepNumber ? "bg-cyan-500" : "bg-slate-600"
                      }`}
                      data-oid="opeqh4v"
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
