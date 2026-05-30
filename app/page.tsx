export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">

        <div className="text-6xl mb-6">🚔</div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          FIR Automation
        </h1>

        <p className="text-xl text-gray-600 mb-4">
          Filing an FIR in Karachi made easy
        </p>

        <p className="text-gray-500 mb-8">
          Tell us what happened in your own words — we will generate a proper legal FIR using AI
        </p>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-3xl mb-2">🗣️</div>
            <p className="text-sm font-medium text-gray-700">Describe in Urdu or English</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-3xl mb-2">🤖</div>
            <p className="text-sm font-medium text-gray-700">AI generates your FIR</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-3xl mb-2">📄</div>
            <p className="text-sm font-medium text-gray-700">Download as PDF</p>
          </div>
        </div>

        
        <a
          href="/form"
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-10 py-4 rounded-xl inline-block transition-colors"
        >
          File an FIR →
        </a>

      </div>
    </main>
  );
}