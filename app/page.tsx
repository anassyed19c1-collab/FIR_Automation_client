"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const ref = useRef(null);

  return (
    <main ref={ref} className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#faf7f2" }}>

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: "linear-gradient(#1a4d2e18 1px, transparent 1px), linear-gradient(90deg, #1a4d2e18 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-10 blur-[100px] rounded-full"
          style={{ backgroundColor: "#1a4d2e" }}
        />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between backdrop-blur-xl rounded-2xl px-5 py-3"
            style={{
              backgroundColor: "rgba(250,247,242,0.8)",
              border: "1px solid rgba(26,77,46,0.12)",
              boxShadow: "0 4px 24px rgba(26,77,46,0.06)"
            }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg text-sm"
                  style={{ backgroundColor: "#1a4d2e", boxShadow: "0 4px 12px rgba(26,77,46,0.3)" }}
                >
                  ⚖️
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2"
                  style={{ borderColor: "#faf7f2" }}
                />
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight" style={{ color: "#1a1a1a" }}>FIR Automation</span>
                <span className="hidden md:inline text-[10px] ml-2" style={{ color: "#888" }}>by Team Karachi</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {["Features", "Process", "About"].map((item) => (
                <button key={item} className="text-sm px-4 py-1.5 rounded-lg transition-all"
                  style={{ color: "#555" }}
                  onMouseEnter={e => {
                    (e.target as HTMLElement).style.color = "#1a4d2e";
                    (e.target as HTMLElement).style.backgroundColor = "rgba(26,77,46,0.06)";
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLElement).style.color = "#555";
                    (e.target as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <Link
              href="/form"
              className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
              style={{ backgroundColor: "#1a4d2e", boxShadow: "0 4px 12px rgba(26,77,46,0.25)" }}
            >
              <span>File an FIR</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex items-center gap-2 rounded-full px-4 py-2 mb-10"
          style={{
            backgroundColor: "rgba(26,77,46,0.06)",
            border: "1px solid rgba(26,77,46,0.15)"
          }}
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600" />
          </span>
          <span className="text-xs font-medium" style={{ color: "#1a4d2e" }}>
            BWAI 2026 Hackathon · Folio3 Karachi · June 6
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-7xl md:text-8xl font-black tracking-[-0.04em] leading-[0.95] mb-6"
            style={{ color: "#1a1a1a" }}
          >
            <span className="block">Your FIR.</span>
            <span className="block relative">
              <span style={{
                background: "linear-gradient(135deg, #1a4d2e, #2d7a4f, #1a4d2e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                In 3 Minutes.
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-2 left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(to right, transparent, #1a4d2e, transparent)" }}
              />
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl leading-relaxed max-w-lg mt-8 mb-12 font-light"
          style={{ color: "#555" }}
        >
          Just describe what happened — in Urdu or English.
          Our AI handles the legal formatting.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/form"
            className="group flex items-center gap-3 text-white font-bold px-8 py-4 rounded-2xl transition-all text-base"
            style={{
              backgroundColor: "#1a4d2e",
              boxShadow: "0 8px 32px rgba(26,77,46,0.25)"
            }}
          >
            <span>File Your FIR Now</span>
            <span className="w-6 h-6 rounded-lg flex items-center justify-center text-sm"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >→</span>
          </Link>
          <div className="flex items-center gap-2 text-sm" style={{ color: "#888" }}>
            <span className="text-green-600">✓</span> Free · No account · PDF ready
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-4 gap-12 mt-24 pt-12"
          style={{ borderTop: "1px solid rgba(26,77,46,0.1)" }}
        >
          {[
            { value: "< 3 min", label: "Average generation time" },
            { value: "3 AI Agents", label: "Working in parallel" },
            { value: "Urdu + EN", label: "Language support" },
            { value: "100%", label: "Legal format compliance" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-bold tracking-tight" style={{ color: "#1a4d2e" }}>{stat.value}</p>
              <p className="text-xs mt-1" style={{ color: "#888" }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs" style={{ color: "#aaa" }}>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: "1px solid rgba(26,77,46,0.2)" }}
          >
            <div className="w-1 h-2 rounded-full" style={{ backgroundColor: "rgba(26,77,46,0.3)" }} />
          </motion.div>
        </motion.div>
      </section>

      {/* Problem vs Solution */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8"
            style={{
              backgroundColor: "rgba(239,68,68,0.03)",
              border: "1px solid rgba(239,68,68,0.12)"
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 text-xl"
              style={{ backgroundColor: "rgba(239,68,68,0.08)" }}>❌</div>
            <h3 className="text-xl font-bold mb-4" style={{ color: "#1a1a1a" }}>The Old Way</h3>
            <ul className="space-y-3">
              {[
                "Visit police station physically",
                "Wait hours in long queues",
                "Struggle with legal terminology",
                "Risk of errors in documentation",
                "No guarantee of proper format",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm" style={{ color: "#888" }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "rgba(239,68,68,0.5)" }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl p-8"
            style={{
              backgroundColor: "rgba(26,77,46,0.03)",
              border: "1px solid rgba(26,77,46,0.12)"
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 text-xl"
              style={{ backgroundColor: "rgba(26,77,46,0.08)" }}>✅</div>
            <h3 className="text-xl font-bold mb-4" style={{ color: "#1a1a1a" }}>With FIR Automation</h3>
            <ul className="space-y-3">
              {[
                "File from anywhere, anytime",
                "Done in under 3 minutes",
                "AI handles all legal language",
                "Validated for completeness",
                "Official PDF ready to download",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm" style={{ color: "#444" }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#1a4d2e" }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20"
        style={{ borderTop: "1px solid rgba(26,77,46,0.08)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#1a4d2e" }}>
            How It Works
          </p>
          <h2 className="text-4xl font-black tracking-tight" style={{ color: "#1a1a1a" }}>
            Three steps. That's it.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { num: "1", emoji: "📝", title: "Fill the Form", desc: "Enter your name, CNIC, and describe what happened in plain Urdu or English." },
            { num: "2", emoji: "🤖", title: "AI Generates FIR", desc: "3 AI agents extract data, validate completeness, and write a legal FIR in seconds." },
            { num: "3", emoji: "📄", title: "Download PDF", desc: "Review your FIR and download a print-ready official document instantly." },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group rounded-3xl p-7 transition-all duration-300 cursor-default"
              style={{
                backgroundColor: "rgba(26,77,46,0.02)",
                border: "1px solid rgba(26,77,46,0.08)"
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(26,77,46,0.05)";
                (e.currentTarget as HTMLElement).style.border = "1px solid rgba(26,77,46,0.15)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(26,77,46,0.02)";
                (e.currentTarget as HTMLElement).style.border = "1px solid rgba(26,77,46,0.08)";
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl">{step.emoji}</span>
                <span className="text-5xl font-black" style={{ color: "rgba(26,77,46,0.08)" }}>{step.num}</span>
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: "#1a1a1a" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#777" }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2rem] overflow-hidden text-center py-20 px-8"
          style={{
            background: "linear-gradient(135deg, #1a4d2e 0%, #2d7a4f 50%, #1a4d2e 100%)",
            boxShadow: "0 32px 80px rgba(26,77,46,0.25)"
          }}
        >
          <div className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)" }}
          />

          <div className="relative z-10">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl mb-6"
            >🚔</motion.div>
            <h2 className="text-5xl font-black tracking-tight mb-4 text-white">
              Justice Starts Here
            </h2>
            <p className="text-lg mb-10 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
              Don't let bureaucracy stop you. File your FIR in minutes.
            </p>
            <Link
              href="/form"
              className="inline-flex items-center gap-3 font-bold px-10 py-4 rounded-2xl transition-all text-base"
              style={{
                backgroundColor: "#faf7f2",
                color: "#1a4d2e",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
              }}
            >
              File Your FIR Now →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8"
        style={{ borderTop: "1px solid rgba(26,77,46,0.08)" }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded flex items-center justify-center text-[10px] text-white"
              style={{ backgroundColor: "#1a4d2e" }}>⚖️</div>
            <span className="text-xs font-medium" style={{ color: "#888" }}>FIR Automation</span>
          </div>
          <p className="text-xs" style={{ color: "#aaa" }}>Built for BWAI 2026 · Folio3 Karachi · June 6</p>
          <p className="text-xs" style={{ color: "#aaa" }}>Made with ❤️ in Karachi</p>
        </div>
      </footer>

    </main>
  );
}