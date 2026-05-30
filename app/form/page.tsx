"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <main className="min-h-screen p-8" style={{ backgroundColor: "#faf7f2" }}>
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <a href="/" className="text-sm mb-4 inline-block" style={{ color: "#1a4d2e" }}>← Back</a>
          <h1 className="text-3xl font-bold" style={{ color: "#1a1a1a" }}>File an FIR</h1>
          <p className="mt-2 text-sm" style={{ color: "#888" }}>Fill in your details — AI will do the rest</p>
        </div>

        <div className="rounded-2xl p-6 space-y-5"
          style={{ backgroundColor: "white", border: "1px solid rgba(26,77,46,0.1)", boxShadow: "0 4px 24px rgba(26,77,46,0.06)" }}>

          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: "#1a1a1a" }}>Full Name *</label>
            <input
              type="text"
              placeholder="Muhammad Anas"
              className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all"
              style={{ border: "1px solid rgba(26,77,46,0.15)", backgroundColor: "#faf7f2" }}
              value={formData.complainant_name}
              onChange={(e) => setFormData({ ...formData, complainant_name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: "#1a1a1a" }}>CNIC *</label>
            <input
              type="text"
              placeholder="42101-1234567-1"
              className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all"
              style={{ border: "1px solid rgba(26,77,46,0.15)", backgroundColor: "#faf7f2" }}
              value={formData.cnic}
              onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: "#1a1a1a" }}>Address</label>
            <input
              type="text"
              placeholder="Gulshan-e-Iqbal, Karachi"
              className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all"
              style={{ border: "1px solid rgba(26,77,46,0.15)", backgroundColor: "#faf7f2" }}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: "#1a1a1a" }}>What happened? *</label>
            <textarea
              rows={5}
              placeholder="Last night at 11pm my laptop and mobile were stolen at Gulshan Block 10..."
              className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all resize-none"
              style={{ border: "1px solid rgba(26,77,46,0.15)", backgroundColor: "#faf7f2" }}
              value={formData.incident_text}
              onChange={(e) => setFormData({ ...formData, incident_text: e.target.value })}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full text-white font-semibold py-4 rounded-xl transition-all text-lg"
            style={{
              backgroundColor: loading ? "#888" : "#1a4d2e",
              boxShadow: loading ? "none" : "0 8px 24px rgba(26,77,46,0.2)"
            }}
          >
            {loading ? "Generating FIR... ⏳" : "Generate FIR 🚀"}
          </button>

        </div>
      </div>
    </main>
  );
}