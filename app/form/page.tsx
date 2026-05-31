"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function FIRForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    complainant_name: "",
    cnic: "",
    address: "",
    incident_text: "",
  });

  const steps = [
    { icon: "🔍", text: "Extracting information from your description..." },
    { icon: "✅", text: "Validating FIR completeness..." },
    { icon: "📝", text: "Writing legal FIR document..." },
    { icon: "💾", text: "Saving to database..." },
  ];

  const handleSubmit = async () => {
    if (!formData.complainant_name || !formData.cnic || !formData.incident_text) {
      alert("Name, CNIC and incident description are required!");
      return;
    }

    setLoading(true);
    setCurrentStep(0);
    setError("");

    const stepTimer1 = setTimeout(() => setCurrentStep(1), 2000);
    const stepTimer2 = setTimeout(() => setCurrentStep(2), 4000);
    const stepTimer3 = setTimeout(() => setCurrentStep(3), 6000);

    const fullText = `
    My name is ${formData.complainant_name}.
    My CNIC is ${formData.cnic}.
    My address is ${formData.address}.
    ${formData.incident_text}
  `;

    try {
      const response = await fetch("http://localhost:5000/api/fir/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: fullText }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);

      if (data.success && data.result.status === "complete") {
        setCurrentStep(4);
        setTimeout(() => router.push(`/preview/${data.result.fir_id}`), 800);
      } else if (data.result.status === "incomplete") {
        setLoading(false);
        setError(`Please provide the following information: ${data.result.missing_fields.join(", ")}`);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error: any) {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      setLoading(false);

      if (error.message.includes("Failed to fetch")) {
        setError("Cannot connect to server. Please make sure the backend is running on port 5000.");
      } else if (error.message.includes("Server error: 500")) {
        setError("Server error occurred. Please try again.");
      } else {
        setError(error.message || "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <main className="min-h-screen px-4 md:px-8 py-8 md:py-12" style={{ backgroundColor: "#faf7f2" }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <a href="/" className="text-sm mb-4 inline-block" style={{ color: "#1a4d2e" }}>← Back</a>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{ backgroundColor: "#1a4d2e" }}>⚖️</div>
            <span className="font-bold text-sm" style={{ color: "#1a4d2e" }}>FIR Automation</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: "#1a1a1a" }}>
            File an FIR
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#888" }}>
            Fill in your details — AI will do the rest
          </p>
        </motion.div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-2xl p-6 md:p-8 mb-6"
              style={{
                backgroundColor: "white",
                border: "1px solid rgba(26,77,46,0.12)",
                boxShadow: "0 8px 32px rgba(26,77,46,0.1)"
              }}
            >
              <div className="text-center mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 rounded-full border-4 border-t-transparent mx-auto mb-4"
                  style={{ borderColor: "rgba(26,77,46,0.15)", borderTopColor: "#1a4d2e" }}
                />
                <h3 className="font-bold text-lg" style={{ color: "#1a1a1a" }}>
                  {currentStep === 4 ? "FIR Generated! ✅" : "Generating your FIR..."}
                </h3>
                <p className="text-sm mt-1" style={{ color: "#888" }}>
                  {currentStep === 4 ? "Redirecting to preview..." : "Please wait, AI is working"}
                </p>
              </div>

              {/* Progress Steps */}
              <div className="space-y-3">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.3 }}
                    animate={{
                      opacity: currentStep >= i ? 1 : 0.3,
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all"
                    style={{
                      backgroundColor: currentStep >= i ? "rgba(26,77,46,0.06)" : "transparent",
                      border: currentStep >= i ? "1px solid rgba(26,77,46,0.1)" : "1px solid transparent"
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                      style={{
                        backgroundColor: currentStep > i ? "#1a4d2e" : currentStep === i ? "rgba(26,77,46,0.1)" : "rgba(0,0,0,0.04)"
                      }}
                    >
                      {currentStep > i ? (
                        <span className="text-white text-xs">✓</span>
                      ) : currentStep === i ? (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="block w-3 h-3 border-2 border-t-transparent rounded-full"
                          style={{ borderColor: "rgba(26,77,46,0.3)", borderTopColor: "#1a4d2e" }}
                        />
                      ) : (
                        <span>{step.icon}</span>
                      )}
                    </div>
                    <span className="text-sm" style={{
                      color: currentStep >= i ? "#1a1a1a" : "#bbb",
                      fontWeight: currentStep === i ? 600 : 400
                    }}>
                      {step.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Card */}
        <AnimatePresence>
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-4 mb-5 flex items-start gap-3"
              style={{ backgroundColor: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}
            >
              <span className="text-lg flex-shrink-0">❌</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#dc2626" }}>Error</p>
                <p className="text-sm mt-0.5" style={{ color: "#666" }}>{error}</p>
              </div>
            </motion.div>
          )}
          {!loading && (

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl p-5 md:p-6 space-y-5"
              style={{
                backgroundColor: "white",
                border: "1px solid rgba(26,77,46,0.1)",
                boxShadow: "0 4px 24px rgba(26,77,46,0.06)"
              }}
            >
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1a1a1a" }}>Full Name *</label>
                <input
                  type="text"
                  placeholder="Muhammad Anas"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{ border: "1px solid rgba(26,77,46,0.15)", backgroundColor: "#faf7f2", color: "#1a1a1a" }}
                  value={formData.complainant_name}
                  onChange={(e) => setFormData({ ...formData, complainant_name: e.target.value })}
                  onFocus={e => (e.target as HTMLElement).style.border = "1px solid rgba(26,77,46,0.5)"}
                  onBlur={e => (e.target as HTMLElement).style.border = "1px solid rgba(26,77,46,0.15)"}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1a1a1a" }}>CNIC *</label>
                <input
                  type="text"
                  placeholder="42101-1234567-1"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{ border: "1px solid rgba(26,77,46,0.15)", backgroundColor: "#faf7f2", color: "#1a1a1a" }}
                  value={formData.cnic}
                  onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                  onFocus={e => (e.target as HTMLElement).style.border = "1px solid rgba(26,77,46,0.5)"}
                  onBlur={e => (e.target as HTMLElement).style.border = "1px solid rgba(26,77,46,0.15)"}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1a1a1a" }}>Address</label>
                <input
                  type="text"
                  placeholder="Gulshan-e-Iqbal, Karachi"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{ border: "1px solid rgba(26,77,46,0.15)", backgroundColor: "#faf7f2", color: "#1a1a1a" }}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  onFocus={e => (e.target as HTMLElement).style.border = "1px solid rgba(26,77,46,0.5)"}
                  onBlur={e => (e.target as HTMLElement).style.border = "1px solid rgba(26,77,46,0.15)"}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1a1a1a" }}>What happened? *</label>
                <p className="text-xs mb-2" style={{ color: "#aaa" }}>
                  Describe in Urdu or English — date, time, location, what was stolen/happened
                </p>
                <textarea
                  rows={5}
                  placeholder="Last night at 11pm my laptop and mobile were stolen at Gulshan Block 10..."
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                  style={{ border: "1px solid rgba(26,77,46,0.15)", backgroundColor: "#faf7f2", color: "#1a1a1a" }}
                  value={formData.incident_text}
                  onChange={(e) => setFormData({ ...formData, incident_text: e.target.value })}
                  onFocus={e => (e.target as HTMLElement).style.border = "1px solid rgba(26,77,46,0.5)"}
                  onBlur={e => (e.target as HTMLElement).style.border = "1px solid rgba(26,77,46,0.15)"}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full text-white font-bold py-4 rounded-xl transition-all text-base"
                style={{ backgroundColor: "#1a4d2e", boxShadow: "0 8px 24px rgba(26,77,46,0.2)" }}
              >
                Generate FIR 🚀
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 text-xs"
            style={{ color: "#aaa" }}
          >
            <span>✓ Free to use</span>
            <span className="hidden sm:block">·</span>
            <span>✓ No account required</span>
            <span className="hidden sm:block">·</span>
            <span>✓ PDF ready instantly</span>
          </motion.div>
        )}

      </div>
    </main>
  );
}