"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">⏳</div>
          <p className="text-gray-600 text-lg">Loading FIR...</p>
        </div>
      </main>
    );
  }

  if (!fir) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">❌</div>
          <p className="text-gray-600 text-lg">FIR not found!</p>
          <a href="/" className="text-blue-600 mt-4 inline-block">Go back</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">

        <div className="mb-6">
          <a href="/" className="text-blue-600 text-sm mb-4 inline-block">← Back to Home</a>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">FIR Generated! ✅</h1>
              <p className="text-gray-500 mt-1">FIR No: {fir.fir_number}</p>
            </div>
            <button
              onClick={downloadPDF}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              📄 Download PDF
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-3 mb-4">
            Complainant Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="font-medium text-gray-800">{fir.complainant_name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">CNIC</p>
              <p className="font-medium text-gray-800">{fir.cnic}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Address</p>
              <p className="font-medium text-gray-800">{fir.address || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">FIR Number</p>
              <p className="font-medium text-gray-800">{fir.fir_number}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-3 mb-4">
            Incident Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="font-medium text-gray-800">{fir.date || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Time</p>
              <p className="font-medium text-gray-800">{fir.time || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="font-medium text-gray-800">{fir.location || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Nature of Incident</p>
              <p className="font-medium text-gray-800">{fir.incident_type || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-3 mb-4">
            FIR Text
          </h2>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            {fir.fir_text}
          </pre>
        </div>

        {fir.stolen_items && fir.stolen_items.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-3 mb-4">
              Stolen / Lost Items
            </h2>
            <div className="flex flex-wrap gap-2">
              {fir.stolen_items.map((item: string, index: number) => (
                <span
                  key={index}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={downloadPDF}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-colors text-lg"
        >
          📄 Download PDF
        </button>

      </div>
    </main>
  );
}