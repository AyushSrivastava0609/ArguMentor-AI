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
    data-oid="3667h3s"
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
    <div className="absolute inset-0 overflow-hidden" data-oid="o313ua4">
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20" data-oid="qmj0vxu">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.15), transparent 40%)`,
          }}
          data-oid="h6:i305"
        />

        <svg className="absolute inset-0 w-full h-full" data-oid="24qn1g:">
          <defs data-oid="o0_nwn2">
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
              data-oid="zjkr-gy"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="rgba(6, 182, 212, 0.1)"
                strokeWidth="1"
                data-oid="ld9mom5"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#grid)"
            data-oid="fy31z54"
          />
        </svg>
      </div>

      {/* Floating Orbs */}
      <FloatingOrb
        delay={0}
        size="w-64 h-64"
        color="bg-gradient-to-r from-cyan-400/10 to-blue-500/10"
        data-oid="k4w7m12"
      />

      <FloatingOrb
        delay={5}
        size="w-48 h-48"
        color="bg-gradient-to-r from-violet-400/10 to-purple-500/10"
        data-oid="uwc:7d6"
      />

      <FloatingOrb
        delay={10}
        size="w-32 h-32"
        color="bg-gradient-to-r from-emerald-400/10 to-teal-500/10"
        data-oid="1:-o2jh"
      />

      <FloatingOrb
        delay={15}
        size="w-40 h-40"
        color="bg-gradient-to-r from-orange-400/10 to-pink-500/10"
        data-oid="dl:g4-5"
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
          data-oid="ac7rg72"
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
      data-oid="wly1:cd"
    >
      {/* Interactive Background */}
      <InteractiveGrid data-oid="zv6.e6t" />

      {/* Hero Section */}
      <div
        className="relative min-h-screen flex items-center justify-center"
        data-oid="d7.q0_q"
      >
        <motion.div
          style={{ y }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
          data-oid="yirf3bs"
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
            data-oid="lcqe-p4"
          >
            <div className="relative" data-oid="8s6xbz5">
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
                data-oid="u62pp7."
              >
                <SparklesIcon
                  className="w-12 h-12 text-white"
                  data-oid="rm6vhhd"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Title with Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            data-oid="0po3c.2"
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight px-4"
              data-oid="q5c2o_-"
            >
              <motion.span
                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
                data-oid="tu7guqe"
              >
                ArguMentor
              </motion.span>
              <span className="text-white" data-oid="ecua-:_">
                -AI
              </span>
            </h1>
          </motion.div>

          {/* Enhanced Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-3 sm:mb-4 max-w-4xl mx-auto px-4"
            data-oid="b0mks:s"
          >
            Your AI Voice & Text Debater
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-base sm:text-lg text-slate-400 mb-8 sm:mb-12 max-w-3xl mx-auto px-4"
            data-oid="nkbh7bk"
          >
            Engage in intelligent debates, explore ethical perspectives, and
            sharpen your argumentation skills with cutting-edge AI technology
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            data-oid="8oi074d"
          >
            <motion.button
              onClick={() => router.push("/chat")}
              className="group relative inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 w-full sm:w-auto justify-center"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -12px rgba(6, 182, 212, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              data-oid="vmiu8a0"
            >
              Start Debating
              <ArrowRightIcon
                className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform"
                data-oid="9sqz8k1"
              />
            </motion.button>

            <motion.button
              className="group inline-flex items-center gap-2 sm:gap-3 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg transition-all duration-300 border border-slate-600 hover:border-slate-500 w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-oid="r.u35v."
            >
              Watch Demo
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                data-oid="9zh.mjw"
              >
                <SparklesIcon
                  className="w-4 sm:w-5 h-4 sm:h-5"
                  data-oid="fsex3iq"
                />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-9"
          data-oid="z5d:bct"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-slate-400/80 rounded-full flex justify-center bg-slate-900/20 backdrop-blur-sm"
            data-oid="0:kg.zs"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-0.5 sm:w-1 h-2 sm:h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mt-1.5 sm:mt-2"
              data-oid="mg-n99f"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Features Section */}
      <div
        className="relative py-32 bg-gradient-to-b from-transparent to-slate-900/50"
        data-oid="z106bvm"
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="ae-db_l"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20 px-4"
            data-oid="c9bww3u"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6"
              data-oid="q5gtzr9"
            >
              Powerful{" "}
              <span
                className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent"
                data-oid="yskzety"
              >
                Features
              </span>
            </h2>
            <p
              className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto"
              data-oid="4pd3t1b"
            >
              Experience the future of AI-powered debates with our advanced
              features designed to enhance your critical thinking
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4"
            data-oid="m3zokof"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
                data-oid="ws2.v_f"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"
                  data-oid="v-bhgcy"
                />

                <div
                  className="relative bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 group-hover:border-slate-600/50 transition-all duration-300"
                  data-oid="f4f8z7w"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    data-oid="scd3dg5"
                  >
                    <feature.icon
                      className="w-8 h-8 text-white"
                      data-oid="o5fhfz8"
                    />
                  </div>
                  <h3
                    className="text-2xl font-bold text-white mb-4 text-center"
                    data-oid="8we29_f"
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-slate-400 leading-relaxed text-center"
                    data-oid="_52w:q-"
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
        data-oid="accj86g"
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="-r1cobe"
        >
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4"
            data-oid="ap4vhq4"
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
                data-oid="ui5q3::"
              >
                <div
                  className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent mb-2"
                  data-oid="fyroqwp"
                >
                  {stat.number}
                </div>
                <div
                  className="text-slate-400 text-xs sm:text-sm md:text-base"
                  data-oid="nb8dtva"
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
        data-oid="h4p05o3"
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          data-oid="llm5_xd"
        >
          <p className="text-slate-400 mb-4" data-oid="x..8iuf">
            © 2024 ArguMentor-AI. Built with ❤️ by Ayush Srivastava
          </p>
        </div>
      </div>
    </div>
  );
}
