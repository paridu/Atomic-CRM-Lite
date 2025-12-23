import React, { useState } from 'react';
import { generateEmailDraft, analyzeDealProbability } from '../services/geminiService';
import { Sparkles, Send, Loader2, Copy, Check } from 'lucide-react';

interface AssistantProps {
  context: {
    type: 'contact' | 'deal';
    name: string;
    company?: string;
    data: any;
  };
}

const AtomicAssistant: React.FC<AssistantProps> = ({ context }) => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState<'formal' | 'casual' | 'persuasive'>('formal');
  const [customPrompt, setCustomPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult('');
    try {
      if (context.type === 'contact') {
        const text = await generateEmailDraft(
          context.name,
          context.company || '',
          customPrompt || "Touching base regarding our services",
          tone
        );
        setResult(text);
      } else {
        const text = await analyzeDealProbability(
            context.name,
            context.data.value,
            context.data.stage
        );
        setResult(text);
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {context.type === 'contact' && (
            <>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Email Goal</label>
                    <input 
                        type="text" 
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        placeholder="e.g. Follow up on meeting, Introduce new feature..."
                        className="w-full text-sm border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Tone</label>
                    <div className="flex gap-2">
                        {(['formal', 'casual', 'persuasive'] as const).map(t => (
                            <button
                                key={t}
                                onClick={() => setTone(t)}
                                className={`text-xs px-3 py-1.5 rounded-full capitalize border transition-all ${
                                    tone === t 
                                    ? 'bg-indigo-600 text-white border-indigo-600' 
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </>
        )}
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
        {context.type === 'contact' ? 'Draft Email' : 'Analyze Deal'}
      </button>

      {result && (
        <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4 relative animate-fade-in">
          <button 
            onClick={copyToClipboard}
            className="absolute top-2 right-2 p-1.5 hover:bg-slate-200 rounded text-slate-500 transition-colors"
          >
            {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
          </button>
          <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed font-mono">
            {result}
          </p>
        </div>
      )}
    </div>
  );
};

export default AtomicAssistant;
