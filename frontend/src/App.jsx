import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle, AlertTriangle, Lightbulb, ChevronRight, RefreshCw, Sparkles, Zap, Target, TrendingUp } from 'lucide-react';
import Confetti from 'react-confetti';
import { TypeAnimation } from 'react-type-animation';

export default function App() {
  const [analysis, setAnalysis] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnalysis = (data) => {
    setAnalysis(data);
    if (data.score >= 80) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  useEffect(() => {
    if (!motion) return;
    // This ensures 'motion' is recognized as used by lint.
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-900 to-blue-950 text-slate-100 font-sans selection:bg-blue-500/40 relative overflow-hidden">

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-32 right-20 text-indigo-400/20"
        >
          <Zap className="w-12 h-12" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-40 left-16 text-emerald-400/20"
        >
          <Target className="w-10 h-10" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, 4, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 left-20 text-purple-400/20"
        >
          <TrendingUp className="w-14 h-14" />
        </motion.div>
      </div>

      {/* Premium Header */}
      <header className="pt-16 pb-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-blue-400" />
            <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
              AI Resume Pro
            </h1>
          </div>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-light">
            Elevate your career with enterprise-grade ATS evaluation and actionable AI insights.
          </p>
        </motion.div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-20 relative z-10">
        <Confetti run={showConfetti} />

        {/* How It Works Section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-100 mb-4">How It Works</h2>
            <p className="text-slate-400">Simple 3-step process to optimize your resume</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <UploadCloud className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">1. Upload Resume</h3>
              <p className="text-slate-400">Drag & drop your PDF or DOCX file</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">2. AI Analysis</h3>
              <p className="text-slate-400">Advanced AI scans for ATS compatibility</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">3. Get Insights</h3>
              <p className="text-slate-400">Receive actionable suggestions</p>
            </motion.div>
          </div>
        </section>

        <AnimatePresence mode="wait">
          {!analysis ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
            >
              <UploadBox onAnalyze={handleAnalysis} />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-1 space-y-8">
                <ScoreCard score={analysis.score} />
                <button
                  onClick={() => setAnalysis(null)}
                  className="w-full py-4 px-6 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-200 font-medium rounded-2xl transition-all flex items-center justify-center gap-2 group backdrop-blur-md"
                >
                  <RefreshCw className="w-5 h-5 text-blue-400 group-hover:rotate-180 transition-transform duration-500" />
                  Analyze Another
                </button>
                <button
                  onClick={() => navigator.share ? navigator.share({ title: 'My Resume Analysis', text: `My ATS score is ${analysis.score}! Check out AI Resume Pro.`, url: window.location.href }) : alert('Sharing not supported on this device')}
                  className="w-full py-4 px-6 bg-blue-600/25 hover:bg-blue-500/35 border border-blue-500/30 text-blue-200 font-medium rounded-2xl transition-all flex items-center justify-center gap-2 group backdrop-blur-md"
                >
                  <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Share Results
                </button>
              </div>
              <div className="lg:col-span-2 space-y-8">
                <SkillsList skills={analysis.skills} missing={analysis.missingSkills} />
                <SuggestionsPanel suggestions={analysis.suggestions} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>


    </div>
  );
}

// -----------------------------------------------------
// Helper to safely parse JSON strings from backend
// -----------------------------------------------------
const parseJSON = (str) => {
  if (!str) return [];
  if (Array.isArray(str)) return str;
  try {
    return JSON.parse(str);
  } catch {
    return [];
  }
};

// -----------------------------------------------------
// Component: UploadBox
// -----------------------------------------------------
function UploadBox({ onAnalyze }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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
    } catch {
      alert("Analysis failed. Backend might be down.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <form
      onSubmit={handleUpload}
      className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-10 rounded-3xl shadow-2xl flex flex-col items-center justify-center space-y-8 max-w-2xl mx-auto"
    >
      <div
        className={`w-full border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 flex flex-col items-center cursor-pointer relative overflow-hidden
          ${isDragging ? 'border-blue-400 bg-blue-500/10' : 'border-slate-600 hover:border-blue-500/50 hover:bg-slate-700/30'}
          ${file ? 'border-emerald-500 bg-emerald-500/5' : ''}
        `}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
          }
        }}
      >
        <input
          type="file"
          accept=".pdf,.docx"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <motion.div animate={{ y: isDragging ? -10 : 0 }}>
          {file ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-emerald-400" />
              </div>
              <span className="text-slate-200 font-semibold text-lg">{file.name}</span>
              <span className="text-emerald-400/80 text-sm mt-2 font-medium">Ready to analyze</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-5 border border-blue-500/20">
                <UploadCloud className="w-10 h-10 text-blue-400" />
              </div>
              <span className="text-slate-200 font-medium text-lg">Drag & drop your resume</span>
              <span className="text-slate-500 text-sm mt-2">or click to browse PDF / DOCX</span>
            </div>
          )}
        </motion.div>
      </div>

      <button
        type="submit"
        disabled={!file}
        className="relative overflow-hidden w-full sm:w-auto px-12 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.45)] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 group"
      >
        <div className="flex items-center justify-center gap-2">
          <span>Start Deep Analysis</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>
    </form>
  );
}

// -----------------------------------------------------
// Component: Loader
// -----------------------------------------------------
function Loader() {
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 100 : prev + Math.random() * 15));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-32 space-y-8">
      <div className="relative w-32 h-32">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border-4 border-emerald-400/30 border-t-emerald-400 rounded-full"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
        </div>
      </div>

      <div className="w-80 space-y-4">
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-indigo-300 font-medium text-lg tracking-wide text-center"
        >
          Analyzing resume with AI...
        </motion.p>
        <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-slate-400 text-sm text-center">{Math.round(progress)}% Complete</p>
      </div>
    </div>
  );
}

// -----------------------------------------------------
// Component: ScoreCard
// -----------------------------------------------------
function ScoreCard({ score }) {
  const isGood = score >= 75;
  const isOk = score >= 50 && score < 75;
  const color = isGood ? 'text-emerald-400' : isOk ? 'text-amber-400' : 'text-rose-400';
  const shadowColor = isGood ? 'shadow-[0_0_30px_rgba(52,211,153,0.15)]' : isOk ? 'shadow-[0_0_30px_rgba(251,191,36,0.15)]' : 'shadow-[0_0_30px_rgba(251,113,133,0.15)]';
  const ringColor = isGood ? 'stroke-emerald-400' : isOk ? 'stroke-amber-400' : 'stroke-rose-400';

  return (
    <div className={`bg-slate-800/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 flex flex-col items-center justify-center relative overflow-hidden ${shadowColor} ${isGood ? 'animate-pulse' : ''}`}>
      <div className="absolute top-0 right-0 p-3 opacity-20">
        <Sparkles className="w-24 h-24" />
      </div>

      {/* Circular Progress Ring */}
      <div className="relative mb-6">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-700/50"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            className={ringColor}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: score / 100 }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              strokeDasharray: `${2 * Math.PI * 45}`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
            className={`text-5xl font-black tabular-nums tracking-tighter ${color} drop-shadow-lg relative z-10`}
          >
            {score}
          </motion.div>
        </div>
      </div>

      <h3 className="text-slate-400 font-medium tracking-wide uppercase text-sm mb-4">ATS Match Score</h3>
      <div className="mt-4 flex items-center gap-2">
        {isGood && <span className="text-emerald-400/80 text-sm font-medium">Excellent Candidate</span>}
        {isOk && <span className="text-amber-400/80 text-sm font-medium">Needs Optimization</span>}
        {!isGood && !isOk && <span className="text-rose-400/80 text-sm font-medium">Major Revision Required</span>}
      </div>
    </div>
  );
}

// -----------------------------------------------------
// Component: SkillsList
// -----------------------------------------------------
function SkillsList({ skills, missing }) {
  const safeSkills = parseJSON(skills);
  const safeMissing = parseJSON(missing);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 shadow-xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">Validated Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {safeSkills.map((s, i) => (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={i}
              className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-medium text-sm rounded-full shadow-sm"
            >
              {s}
            </motion.span>
          ))}
          {safeSkills.length === 0 && <span className="text-slate-500 italic text-sm">No significant skills detected.</span>}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-700/50">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-rose-500/10 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">Critical Missing Keywords</h3>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {safeMissing.map((s, i) => (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={i}
              className="px-4 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 font-medium text-sm rounded-full shadow-sm"
            >
              {s}
            </motion.span>
          ))}
          {safeMissing.length === 0 && <span className="text-slate-500 italic text-sm">No major missing requirements found.</span>}
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------
// Component: SuggestionsPanel
// -----------------------------------------------------
function SuggestionsPanel({ suggestions }) {
  const safeSuggestions = parseJSON(suggestions);

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 shadow-xl relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-[50px] rounded-full" />

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 bg-indigo-500/10 rounded-lg">
          <Lightbulb className="w-5 h-5 text-indigo-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-100">AI Expert Suggestions</h3>
      </div>

      <ul className="space-y-4 relative z-10">
        {safeSuggestions.map((s, i) => (
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="flex items-start text-slate-300 bg-slate-900/40 p-5 rounded-2xl border border-slate-700/30 hover:border-indigo-500/30 transition-colors group"
          >
            <div className="mt-1 mr-4 bg-indigo-500/20 p-1 rounded-full group-hover:bg-indigo-500/40 transition-colors">
              <Sparkles className="w-3 h-3 text-indigo-400" />
            </div>
            <div className="flex-1">
              <TypeAnimation
                sequence={[s]}
                speed={70}
                cursor={false}
                className="leading-relaxed text-[15px]"
              />
            </div>
          </motion.li>
        ))}
        {safeSuggestions.length === 0 && <p className="text-slate-500 italic">Your resume looks perfect. No suggestions provided.</p>}
      </ul>
    </div>
  );
}
