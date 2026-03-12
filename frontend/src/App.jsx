import { useState } from 'react';

export default function App() {
  const [analysis, setAnalysis] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8 font-sans">
      <header className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">AI Resume Analyzer</h1>
        <p className="text-gray-500 mt-2">Enterprise-grade ATS evaluating tool</p>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        {!analysis ? (
          <UploadBox onAnalyze={(data) => setAnalysis(data)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
            <div className="md:col-span-1">
              <ScoreCard score={analysis.score} />
            </div>
            <div className="md:col-span-2 space-y-6">
              <SkillsList skills={analysis.skills} missing={analysis.missingSkills} />
              <SuggestionsPanel suggestions={analysis.suggestions} />
              <button 
                onClick={() => setAnalysis(null)}
                className="w-full py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition"
              >
                Analyze Another Resume
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// -----------------------------------------------------
// Component: UploadBox.jsx
// -----------------------------------------------------
function UploadBox({ onAnalyze }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8080/api/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      onAnalyze(data);
    } catch (err) {
      alert("Analysis failed. Backend might be down.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <form onSubmit={handleUpload} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-6">
      <div className="w-full max-w-md border-2 border-dashed border-blue-200 rounded-xl p-8 text-center hover:bg-blue-50 transition cursor-pointer">
        <input 
          type="file" 
          accept=".pdf,.docx" 
          className="hidden" 
          id="file-upload"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
          <svg className="w-12 h-12 text-blue-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
          <span className="text-gray-600 font-medium">Click to select resume</span>
          <span className="text-gray-400 text-sm mt-1">{file ? file.name : 'PDF or DOCX max 10MB'}</span>
        </label>
      </div>
      <button type="submit" disabled={!file} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 transition">
        Analyze Now
      </button>
    </form>
  );
}

// -----------------------------------------------------
// Component: Loader.jsx
// -----------------------------------------------------
function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      <p className="text-gray-500 font-medium animate-pulse">Running AI Analysis...</p>
    </div>
  );
}

// -----------------------------------------------------
// Component: ScoreCard.jsx
// -----------------------------------------------------
function ScoreCard({ score }) {
  const isGood = score >= 75;
  const colorClass = isGood ? 'text-green-500' : 'text-orange-500';

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center h-full">
      <h3 className="text-gray-500 font-semibold mb-2">ATS Match Score</h3>
      <div className={`text-7xl font-black ${colorClass}`}>
        {score}
      </div>
      <p className="text-gray-400 text-sm mt-2">/ 100</p>
    </div>
  );
}

// -----------------------------------------------------
// Component: SkillsList.jsx
// -----------------------------------------------------
function SkillsList({ skills, missing }) {
  const safeSkills = Array.isArray(skills) ? skills : [];
  const safeMissing = Array.isArray(missing) ? missing : [];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Detected Skills</h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {safeSkills.map((s, i) => (
          <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 font-medium text-sm rounded-full">{s}</span>
        ))}
        {safeSkills.length === 0 && <span className="text-gray-400 text-sm">No skills detected.</span>}
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-4">Missing Keywords</h3>
      <div className="flex flex-wrap gap-2">
        {safeMissing.map((s, i) => (
          <span key={i} className="px-3 py-1 bg-red-50 text-red-700 font-medium text-sm rounded-full">{s}</span>
        ))}
        {safeMissing.length === 0 && <span className="text-gray-400 text-sm">No major missing skills.</span>}
      </div>
    </div>
  );
}

// -----------------------------------------------------
// Component: SuggestionsPanel.jsx
// -----------------------------------------------------
function SuggestionsPanel({ suggestions }) {
  const safeSuggestions = Array.isArray(suggestions) ? suggestions : [];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Actionable Improvements</h3>
      <ul className="space-y-3">
        {safeSuggestions.map((s, i) => (
          <li key={i} className="flex items-start text-gray-600 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
            <span className="text-blue-500 mr-3 font-bold">•</span>
            {s}
          </li>
        ))}
        {safeSuggestions.length === 0 && <p className="text-gray-400 text-sm">No suggestions provided.</p>}
      </ul>
    </div>
  );
}
