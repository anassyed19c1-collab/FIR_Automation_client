"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function FIRPreview() {
  const { id } = useParams();
  const [fir, setFir] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFIR = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/fir/${id}`);
        const data = await response.json();
        if (data.success) setFir(data.fir);
      } catch (error) {
        console.error("Error fetching FIR:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFIR();
  }, [id]);

  const downloadPDF = () => {
    window.open(`http://localhost:5000/api/fir/${id}/pdf`, "_blank");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#faf7f2" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl"
            style={{ backgroundColor: "rgba(26,77,46,0.08)" }}>⏳</div>
          <p className="font-medium" style={{ color: "#1a1a1a" }}>Generating your FIR...</p>
          <p className="text-sm mt-1" style={{ color: "#888" }}>This may take a few seconds</p>
        </motion.div>
      </main>
    );
  }

  if (!fir) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#faf7f2" }}>
        <div className="text-center">
          <div className="text-5xl mb-4">❌</div>
          <p className="font-medium" style={{ color: "#1a1a1a" }}>FIR not found!</p>
          <a href="/" className="text-sm mt-4 inline-block" style={{ color: "#1a4d2e" }}>← Go back</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 md:px-8 py-8 md:py-12" style={{ backgroundColor: "#faf7f2" }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <a href="/" className="text-sm mb-4 inline-block" style={{ color: "#1a4d2e" }}>← Back to Home</a>

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: "rgba(26,77,46,0.08)", color: "#1a4d2e" }}>
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  FIR Generated Successfully
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: "#1a1a1a" }}>
                Your FIR is Ready
              </h1>
              <p className="mt-1 text-xs font-mono" style={{ color: "#888" }}>{fir.fir_number}</p>
            </div>

            <button
              onClick={downloadPDF}
              className="flex items-center justify-center gap-2 text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm w-full sm:w-auto"
              style={{ backgroundColor: "#1a4d2e", boxShadow: "0 4px 16px rgba(26,77,46,0.25)" }}
            >
              📄 Download PDF
            </button>
          </div>
        </motion.div>

        {/* Complainant Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-5 md:p-6 mb-4"
          style={{ backgroundColor: "white", border: "1px solid rgba(26,77,46,0.08)", boxShadow: "0 2px 16px rgba(26,77,46,0.04)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
              style={{ backgroundColor: "rgba(26,77,46,0.08)" }}>👤</div>
            <h2 className="font-bold text-base" style={{ color: "#1a1a1a" }}>Complainant Details</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Full Name", value: fir.complainant_name },
              { label: "CNIC", value: fir.cnic },
              { label: "Address", value: fir.address || "N/A" },
              { label: "FIR Number", value: fir.fir_number },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-xl" style={{ backgroundColor: "#faf7f2" }}>
                <p className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: "#aaa" }}>{item.label}</p>
                <p className="font-semibold text-sm" style={{ color: "#1a1a1a" }}>{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Incident Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl p-5 md:p-6 mb-4"
          style={{ backgroundColor: "white", border: "1px solid rgba(26,77,46,0.08)", boxShadow: "0 2px 16px rgba(26,77,46,0.04)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
              style={{ backgroundColor: "rgba(26,77,46,0.08)" }}>📍</div>
            <h2 className="font-bold text-base" style={{ color: "#1a1a1a" }}>Incident Details</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Date", value: fir.date || "N/A" },
              { label: "Time", value: fir.time || "N/A" },
              { label: "Location", value: fir.location || "N/A" },
              { label: "Nature of Incident", value: fir.incident_type || "N/A" },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-xl" style={{ backgroundColor: "#faf7f2" }}>
                <p className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: "#aaa" }}>{item.label}</p>
                <p className="font-semibold text-sm" style={{ color: "#1a1a1a" }}>{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stolen Items */}
        {fir.stolen_items && fir.stolen_items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-5 md:p-6 mb-4"
            style={{ backgroundColor: "white", border: "1px solid rgba(26,77,46,0.08)", boxShadow: "0 2px 16px rgba(26,77,46,0.04)" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                style={{ backgroundColor: "rgba(26,77,46,0.08)" }}>📦</div>
              <h2 className="font-bold text-base" style={{ color: "#1a1a1a" }}>Stolen / Lost Items</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {fir.stolen_items.map((item: string, index: number) => (
                <span key={index} className="px-3 py-1.5 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: "rgba(26,77,46,0.08)", color: "#1a4d2e" }}>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* FIR Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl p-5 md:p-6 mb-6"
          style={{ backgroundColor: "white", border: "1px solid rgba(26,77,46,0.08)", boxShadow: "0 2px 16px rgba(26,77,46,0.04)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
              style={{ backgroundColor: "rgba(26,77,46,0.08)" }}>📄</div>
            <h2 className="font-bold text-base" style={{ color: "#1a1a1a" }}>FIR Document Text</h2>
          </div>
          <div className="rounded-xl p-4" style={{ backgroundColor: "#faf7f2" }}>
            <pre className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#444", fontFamily: "inherit" }}>
              {fir.fir_text}
            </pre>
          </div>
        </motion.div>

        {/* Download Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={downloadPDF}
          className="w-full text-white font-bold py-4 rounded-2xl transition-all text-base"
          style={{ backgroundColor: "#1a4d2e", boxShadow: "0 8px 32px rgba(26,77,46,0.2)" }}
        >
          📄 Download PDF
        </motion.button>

      </div>
    </main>
  );
}