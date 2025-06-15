"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChatBubbleLeftRightIcon,
  MicrophoneIcon,
  AcademicCapIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Text Debate",
    description: "Engage in thoughtful written debates with AI on any topic",
    color: "from-emerald-400 to-cyan-400",
  },
  {
    icon: MicrophoneIcon,
    title: "Voice Debate",
    description: "Have natural voice conversations and debates with AI",
    color: "from-violet-400 to-purple-400",
  },
  {
    icon: AcademicCapIcon,
    title: "Ethics Mode",
    description: "Explore different philosophical and ethical perspectives",
    color: "from-orange-400 to-pink-400",
  },
];

const FloatingOrb = ({
  delay = 0,
  duration = 20,
  size = "w-32 h-32",
  color = "bg-gradient-to-r from-cyan-400/20 to-blue-500/20",
}) => (
  <motion.div
    className={`absolute ${size} ${color} rounded-full blur-xl`}
    animate={{
      x: [0, 100, -50, 0],
      y: [0, -100, 50, 0],
      scale: [1, 1.2, 0.8, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    data-oid="1hzt_fn"
  />
);

const InteractiveGrid = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" data-oid="vlj_y:f">
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20" data-oid="6_7ynpe">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.15), transparent 40%)`,
          }}
          data-oid="o:vw1t7"
        />

        <svg className="absolute inset-0 w-full h-full" data-oid="ebonbo:">
          <defs data-oid="e9cmf_c">
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
              data-oid="vd_wpdt"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="rgba(6, 182, 212, 0.1)"
                strokeWidth="1"
                data-oid="-x1zg7."
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#grid)"
            data-oid="myvvl86"
          />
        </svg>
      </div>

      {/* Floating Orbs */}
      <FloatingOrb
        delay={0}
        size="w-64 h-64"
        color="bg-gradient-to-r from-cyan-400/10 to-blue-500/10"
        data-oid="8697ktm"
      />

      <FloatingOrb
        delay={5}
        size="w-48 h-48"
        color="bg-gradient-to-r from-violet-400/10 to-purple-500/10"
        data-oid="lkh:s2u"
      />

      <FloatingOrb
        delay={10}
        size="w-32 h-32"
        color="bg-gradient-to-r from-emerald-400/10 to-teal-500/10"
        data-oid="4yf4ani"
      />

      <FloatingOrb
        delay={15}
        size="w-40 h-40"
        color="bg-gradient-to-r from-orange-400/10 to-pink-500/10"
        data-oid="-v-8vvn"
      />

      {/* Particle System */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          data-oid="k8w8cag"
        />
      ))}
    </div>
  );
};

export default function LandingPage() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
      data-oid="9w4k8g_"
    >
      {/* Interactive Background */}
      <InteractiveGrid data-oid="92ra.y2" />

      {/* Hero Section */}
      <div
        className="relative min-h-screen flex items-center justify-center"
        data-oid="7qvfen2"
      >
        <motion.div
          style={{ y }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
          data-oid="8b.6xk2"
        >
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="flex justify-center mb-8"
            data-oid="42w6bvr"
          >
            <div className="relative" data-oid="c1cnaiy">
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 rounded-3xl flex items-center justify-center shadow-2xl"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.5)",
                }}
                animate={{
                  boxShadow: [
                    "0 20px 40px -12px rgba(6, 182, 212, 0.3)",
                    "0 25px 50px -12px rgba(139, 92, 246, 0.4)",
                    "0 20px 40px -12px rgba(6, 182, 212, 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                data-oid="8epvqj9"
              >
                <SparklesIcon
                  className="w-12 h-12 text-white"
                  data-oid="rxpshul"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Title with Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            data-oid="__i0706"
          >
            <h1
              className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
              data-oid="wj4ku55"
            >
              <motion.span
                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
                data-oid="x:ghza9"
              >
                ArguMentor
              </motion.span>
              <span className="text-white" data-oid="4dhllmj">
                -AI
              </span>
            </h1>
          </motion.div>

          {/* Enhanced Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl text-slate-300 mb-4 max-w-4xl mx-auto"
            data-oid="1_aj7g9"
          >
            Your AI Voice & Text Debater
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto"
            data-oid=".3gktak"
          >
            Engage in intelligent debates, explore ethical perspectives, and
            sharpen your argumentation skills with cutting-edge AI technology
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            data-oid="o5b:iwj"
          >
            <motion.button
              onClick={() => router.push("/chat")}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -12px rgba(6, 182, 212, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              data-oid=":9-5:e-"
            >
              Start Debating
              <ArrowRightIcon
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                data-oid="asbfyfg"
              />
            </motion.button>

            <motion.button
              className="group inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-300 border border-slate-600 hover:border-slate-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-oid="0bdy4e6"
            >
              Watch Demo
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                data-oid="6.vrba2"
              >
                <SparklesIcon className="w-5 h-5" data-oid="2kgezik" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          data-oid="o4h7:w:"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center"
            data-oid="lnii:at"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mt-2"
              data-oid="aq.9612"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Features Section */}
      <div
        className="relative py-32 bg-gradient-to-b from-transparent to-slate-900/50"
        data-oid="7-od.tf"
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="mp-b0xw"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
            data-oid="4of1qgj"
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              data-oid="pf2vyzu"
            >
              Powerful{" "}
              <span
                className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent"
                data-oid="5a1d8q1"
              >
                Features
              </span>
            </h2>
            <p
              className="text-xl text-slate-400 max-w-3xl mx-auto"
              data-oid="fg:a8pn"
            >
              Experience the future of AI-powered debates with our advanced
              features designed to enhance your critical thinking
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8" data-oid="ge8ccz9">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
                data-oid="62zicw4"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"
                  data-oid="4b0ko:0"
                />

                <div
                  className="relative bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 group-hover:border-slate-600/50 transition-all duration-300"
                  data-oid=".y_ihm3"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    data-oid="agtq5p."
                  >
                    <feature.icon
                      className="w-8 h-8 text-white"
                      data-oid="m23c7cc"
                    />
                  </div>
                  <h3
                    className="text-2xl font-bold text-white mb-4 text-center"
                    data-oid="dhmg6fj"
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-slate-400 leading-relaxed text-center"
                    data-oid=".zod6o4"
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div
        className="relative py-20 bg-gradient-to-r from-slate-900/50 to-slate-800/50"
        data-oid="v_:r9w9"
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="nayq23a"
        >
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            data-oid="dk:-1rd"
          >
            {[
              { number: "10K+", label: "Debates Conducted" },
              { number: "95%", label: "User Satisfaction" },
              { number: "24/7", label: "AI Availability" },
              { number: "8+", label: "Ethical Frameworks" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
                data-oid="rhv7gzz"
              >
                <div
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent mb-2"
                  data-oid="onv1g:v"
                >
                  {stat.number}
                </div>
                <div
                  className="text-slate-400 text-sm md:text-base"
                  data-oid="j3j5wwr"
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="relative border-t border-slate-800 py-12 bg-slate-950/50"
        data-oid="z5eb3nv"
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          data-oid="cya5:aj"
        >
          <p className="text-slate-400 mb-4" data-oid="tc7qvcf">
            © 2024 ArguMentor-AI. Built with Next.js and cutting-edge AI
            technology.
          </p>
          <div className="flex justify-center space-x-6" data-oid="hr8j5zk">
            <a
              href="#"
              className="text-slate-500 hover:text-cyan-400 transition-colors"
              data-oid="auxazk1"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-cyan-400 transition-colors"
              data-oid="0a1sjvh"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-cyan-400 transition-colors"
              data-oid="t.wi8de"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
