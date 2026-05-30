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
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <a href="/" className="text-blue-600 text-sm mb-4 inline-block">← Back</a>
          <h1 className="text-3xl font-bold text-gray-800">File an FIR</h1>
          <p className="text-gray-500 mt-2">Fill in your details — AI will do the rest</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Muhammad Anas"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.complainant_name}
              onChange={(e) => setFormData({ ...formData, complainant_name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              CNIC *
            </label>
            <input
              type="text"
              placeholder="42101-1234567-1"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.cnic}
              onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              placeholder="Gulshan-e-Iqbal, Karachi"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              What happened? Describe in your own words *
            </label>
            <textarea
              rows={5}
              placeholder="Last night at 11pm my laptop and mobile were stolen at Gulshan Block 10..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={formData.incident_text}
              onChange={(e) => setFormData({ ...formData, incident_text: e.target.value })}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-4 rounded-xl transition-colors text-lg"
          >
            {loading ? "Generating FIR... ⏳" : "Generate FIR 🚀"}
          </button>

        </div>
      </div>
    </main>
  );
}