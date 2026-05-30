"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function FIRForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    complainant_name: "",
    cnic: "",
    address: "",
    incident_text: "",
  });

  const handleSubmit = async () => {
    if (!formData.complainant_name || !formData.cnic || !formData.incident_text) {
      alert("Name, CNIC and incident description are required!");
      return;
    }

    setLoading(true);

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

      const data = await response.json();

      if (data.success && data.result.status === "complete") {
        router.push(`/preview/${data.result.fir_id}`);
      } else if (data.result.status === "incomplete") {
        alert(`The following information is missing: ${data.result.missing_fields.join(", ")}`);
      }
    } catch (error) {
      alert("An error occurred — is the backend running?");
    } finally {
      setLoading(false);
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

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-5 md:p-6 space-y-5"
          style={{
            backgroundColor: "white",
            border: "1px solid rgba(26,77,46,0.1)",
            boxShadow: "0 4px 24px rgba(26,77,46,0.06)"
          }}
        >

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1a1a1a" }}>
              Full Name *
            </label>
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

          {/* CNIC */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1a1a1a" }}>
              CNIC *
            </label>
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

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1a1a1a" }}>
              Address
            </label>
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

          {/* Incident */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1a1a1a" }}>
              What happened? *
            </label>
            <p className="text-xs mb-2" style={{ color: "#aaa" }}>
              Describe in Urdu or English — date, time, location, what was stolen/happened
            </p>
            <textarea
              rows={5}
              placeholder="Last night at 11pm my laptop and mobile were stolen at Gulshan Block 10. I did not see the suspect's face..."
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
              style={{ border: "1px solid rgba(26,77,46,0.15)", backgroundColor: "#faf7f2", color: "#1a1a1a" }}
              value={formData.incident_text}
              onChange={(e) => setFormData({ ...formData, incident_text: e.target.value })}
              onFocus={e => (e.target as HTMLElement).style.border = "1px solid rgba(26,77,46,0.5)"}
              onBlur={e => (e.target as HTMLElement).style.border = "1px solid rgba(26,77,46,0.15)"}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full text-white font-bold py-4 rounded-xl transition-all text-base"
            style={{
              backgroundColor: loading ? "#aaa" : "#1a4d2e",
              boxShadow: loading ? "none" : "0 8px 24px rgba(26,77,46,0.2)"
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating FIR...
              </span>
            ) : "Generate FIR 🚀"}
          </button>

        </motion.div>

        {/* Info */}
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

      </div>
    </main>
  );
}