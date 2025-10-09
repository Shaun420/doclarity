import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  UploadCloud,
  Sparkles,
  Search,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Lock,
  FileText,
  Clock,
} from 'lucide-react';
import QuickAnalyze from '../components/QuickAnalyze';

const features = [
  {
    title: 'At a Glance Summary',
    description:
      'Get a plain-language overview with key risks, important dates, and money terms so you can decide faster.',
    icon: Sparkles,
    bullets: [
      'Overall risk level',
      'Important dates & deadlines',
      'Fees, penalties, and amounts',
    ],
  },
  {
    title: 'Interactive Clause Explorer',
    description:
      'Drill into clauses, see plain-English explanations, and understand implications.',
    icon: Search,
    bullets: ['Search & filter clauses', 'Plain-English explanations', 'Actionable suggestions'],
  },
  {
    title: 'AI-Powered Q&A Chat',
    description:
      'Ask natural questions about the document and get answers with clause references.',
    icon: MessageSquare,
    bullets: ['Context-aware answers', 'Clause citations', 'Follow-up suggestions'],
  },
];

const steps = [
  {
    title: 'Upload your document',
    description: 'PDF or DOCX. We extract text and keep your data private.',
    icon: UploadCloud,
  },
  {
    title: 'AI analyzes it',
    description:
      'Identifies key terms, risky clauses, financials, and deadlines.',
    icon: FileText,
  },
  {
    title: 'Understand in minutes',
    description:
      'Read the summary, explore clauses, and chat with the AI for clarity.',
    icon: Clock,
  },
];

const Home = () => {
	const navigate = useNavigate();
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
            <div className="w-full lg:w-7/12">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
                <Shield className="w-4 h-4" />
                Private, safe, and supportive
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                Demystify legal documents with AI
              </h1>

              <p className="mt-4 text-gray-600 text-base sm:text-lg">
                Upload contracts, leases, or terms of service and get a clear summary,
                explore clauses interactively, and ask questions in plain English.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/upload"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  <UploadCloud className="w-5 h-5 mr-2" />
                  Upload a document
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-gray-800 font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  See features
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  No setup required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Clear, plain English
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Free to try
                </div>
              </div>
            </div>

            {/* Right visual card */}
            <div className="w-full lg:w-5/12">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Sparkles className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">At a Glance Summary</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Get key risks, obligations, dates, and costs in one place.
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="font-medium text-green-700 mb-1">Benefits</p>
                    <ul className="text-green-800 space-y-1">
                      <li>• Favorable terms identified</li>
                      <li>• Negotiation points</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="font-medium text-red-700 mb-1">Risks</p>
                    <ul className="text-red-800 space-y-1">
                      <li>• Penalties and fees</li>
                      <li>• Termination traps</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  Not legal advice. For informational purposes only.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Analyze */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Try quick analysis — paste text or scan an image
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              No file upload needed. Get a fast summary and risks in seconds.
            </p>
          </div>
          <QuickAnalyze
            navigateToAnalysis={(data) =>
              navigate('/analysis', {
                state: { analysisData: { ...data, documentName: 'Quick Analysis' } },
              })
            }
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-12 bg-white border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
            Built to help you understand, not overwhelm
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Three core tools to make any document clear and actionable.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <f.icon className="w-5 h-5 text-blue-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{f.title}</h3>
                </div>
                <p className="text-gray-600 mt-3 text-sm">{f.description}</p>
                <ul className="mt-4 space-y-1 text-sm text-gray-700">
                  {f.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
            How it works
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, idx) => (
              <div key={s.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-50 p-2 rounded-lg">
                    <s.icon className="w-5 h-5 text-indigo-700" />
                  </div>
                  <div className="text-sm text-indigo-700 font-semibold">Step {idx + 1}</div>
                </div>
                <h3 className="mt-3 font-semibold text-gray-900">{s.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{s.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/upload"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Get started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <p className="text-xs text-gray-500">
              By using this app, you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy & Safety */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="bg-gray-200 p-2 rounded-lg">
              <Lock className="w-5 h-5 text-gray-700" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Your privacy matters</h3>
              <p className="text-sm text-gray-600 mt-1">
                Documents are processed securely. You can delete uploads anytime. We only use your data to analyze your document.
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Disclaimer: This tool provides general information and is not a substitute for professional legal advice.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
