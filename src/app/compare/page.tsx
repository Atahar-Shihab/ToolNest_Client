'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeftRight, 
  Star, 
  ExternalLink, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  Cpu, 
  DollarSign, 
  Share2, 
  Copy, 
  Check, 
  Sparkles,
  Search,
  ChevronDown
} from 'lucide-react';
import { Tool } from '@/types';
import api from '@/lib/api';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { toast } from 'react-hot-toast';

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [tool1, setTool1] = useState<Tool | null>(null);
  const [tool2, setTool2] = useState<Tool | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Popular preset comparisons
  const popularComparisons = [
    { name: "Cursor vs Copilot", t1: "Cursor", t2: "GitHub Copilot" },
    { name: "ChatGPT vs Claude", t1: "ChatGPT", t2: "Claude" },
    { name: "Midjourney vs DALL·E 3", t1: "Midjourney", t2: "DALL·E 3" },
    { name: "Suno AI vs ElevenLabs", t1: "Suno AI", t2: "ElevenLabs" },
    { name: "Bolt.new vs Lovable", t1: "Bolt.new", t2: "Lovable" },
    { name: "Perplexity vs Phind", t1: "Perplexity", t2: "Phind" },
  ];

  // Fetch all tools once
  useEffect(() => {
    const loadTools = async () => {
      try {
        setIsLoading(true);
        const res = await api.get('/tools?limit=100');
        const toolsList: Tool[] = res.data.tools || [];
        setAllTools(toolsList);

        const param1 = searchParams.get('tool1');
        const param2 = searchParams.get('tool2');

        // Select Tool 1
        if (param1) {
          const found1 = toolsList.find(t => t._id === param1 || t.title.toLowerCase() === param1.toLowerCase());
          if (found1) setTool1(found1);
        } else if (toolsList.length > 0) {
          const default1 = toolsList.find(t => t.title.toLowerCase() === 'chatgpt') || toolsList[0];
          setTool1(default1);
        }

        // Select Tool 2
        if (param2) {
          const found2 = toolsList.find(t => t._id === param2 || t.title.toLowerCase() === param2.toLowerCase());
          if (found2) setTool2(found2);
        } else if (toolsList.length > 1) {
          const default2 = toolsList.find(t => t.title.toLowerCase() === 'claude') || toolsList[1];
          setTool2(default2);
        }
      } catch (err) {
        toast.error("Failed to load tools for comparison");
      } finally {
        setIsLoading(false);
      }
    };

    loadTools();
  }, [searchParams]);

  const handleSelectTool1 = (id: string) => {
    const selected = allTools.find(t => t._id === id) || null;
    setTool1(selected);
    updateUrl(selected?._id, tool2?._id);
  };

  const handleSelectTool2 = (id: string) => {
    const selected = allTools.find(t => t._id === id) || null;
    setTool2(selected);
    updateUrl(tool1?._id, selected?._id);
  };

  const applyPreset = (name1: string, name2: string) => {
    const t1 = allTools.find(t => t.title.toLowerCase().includes(name1.toLowerCase()));
    const t2 = allTools.find(t => t.title.toLowerCase().includes(name2.toLowerCase()));
    if (t1) setTool1(t1);
    if (t2) setTool2(t2);
    updateUrl(t1?._id, t2?._id);
  };

  const updateUrl = (id1?: string, id2?: string) => {
    const params = new URLSearchParams();
    if (id1) params.set('tool1', id1);
    if (id2) params.set('tool2', id2);
    router.replace(`/compare?${params.toString()}`, { scroll: false });
  };

  const handleShareComparison = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      toast.success("Comparison link copied to clipboard! Share it with your team 🚀");
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <main className="min-h-screen pt-28 pb-20 bg-background">
      <div className="container mx-auto px-4 md:px-6 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-semibold text-primary">
            <ArrowLeftRight size={15} />
            <span>AI Side-by-Side Comparison</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Compare Top <span className="text-gradient">AI Tools</span>
          </h1>
          <p className="text-muted text-base md:text-lg">
            Make the right choice for your stack. Compare pricing, underlying AI models, features, and community feedback side-by-side.
          </p>

          {/* Quick Presets */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-muted uppercase font-semibold tracking-wider mr-1">Trending:</span>
            {popularComparisons.map((p) => (
              <button
                key={p.name}
                onClick={() => applyPreset(p.t1, p.t2)}
                className="px-3 py-1 rounded-full text-xs font-medium glass border border-border text-foreground hover:bg-surface-hover hover:border-primary/40 transition-all"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selectors Bar */}
        <div className="glass-card p-6 border border-border max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Tool 1 Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-wider block">
                First Tool
              </label>
              <div className="relative">
                <select
                  value={tool1?._id || ''}
                  onChange={(e) => handleSelectTool1(e.target.value)}
                  className="w-full bg-surface border border-border text-foreground rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-primary font-medium text-sm transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select first tool...</option>
                  {allTools.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.title} ({t.category} - {t.pricing})
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              </div>
            </div>

            {/* Tool 2 Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-wider block">
                Second Tool
              </label>
              <div className="relative">
                <select
                  value={tool2?._id || ''}
                  onChange={(e) => handleSelectTool2(e.target.value)}
                  className="w-full bg-surface border border-border text-foreground rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-primary font-medium text-sm transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select second tool...</option>
                  {allTools.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.title} ({t.category} - {t.pricing})
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Share Button for Comparison */}
          {tool1 && tool2 && (
            <div className="mt-5 pt-4 border-t border-border/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-muted font-medium">
                Comparing <strong className="text-foreground">{tool1.title}</strong> vs <strong className="text-foreground">{tool2.title}</strong>
              </span>
              <button
                onClick={handleShareComparison}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold transition-all ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20'
                }`}
              >
                {copied ? <Check size={14} /> : <Share2 size={14} />}
                <span>{copied ? "Comparison Link Copied!" : "Share This Comparison"}</span>
              </button>
            </div>
          )}
        </div>

        {/* Comparison Table / Cards */}
        {isLoading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : tool1 && tool2 ? (
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Cards Hero Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[tool1, tool2].map((tool, idx) => (
                <div key={tool._id} className="glass-card p-6 md:p-8 flex flex-col justify-between relative overflow-hidden border border-border">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-surface-hover border border-border p-2 flex items-center justify-center shadow-lg">
                        {tool.thumbnail ? (
                          <img src={tool.thumbnail} alt={tool.title} className="max-h-12 max-w-full object-contain filter drop-shadow" />
                        ) : (
                          <span className="text-2xl font-black text-primary">{tool.title.charAt(0)}</span>
                        )}
                      </div>
                      <span className="bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                        {tool.pricing}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{tool.title}</h3>
                      <span className="text-xs font-medium text-secondary">{tool.category}</span>
                    </div>

                    <p className="text-sm text-muted line-clamp-3">{tool.shortDescription}</p>

                    <div className="flex items-center gap-3 text-xs text-muted pt-1">
                      <div className="flex items-center gap-1 font-semibold text-foreground">
                        <Star className="text-warning fill-warning" size={15} />
                        <span>{tool.avgRating ? tool.avgRating.toFixed(1) : '5.0'}</span>
                        <span className="text-muted font-normal">({tool.totalReviews || 0} reviews)</span>
                      </div>
                      <span>•</span>
                      <span>{tool.bookmarkCount || 0} bookmarks</span>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border/80 flex items-center gap-3">
                    <Link
                      href={`/tools/${tool._id}`}
                      className="flex-1 py-2.5 px-4 rounded-xl text-center text-xs font-bold glass border border-border text-foreground hover:bg-surface-hover transition-colors"
                    >
                      View Details
                    </Link>
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-xl text-center text-xs font-bold bg-primary hover:bg-primary/90 text-white transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span>Visit Site</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Side-by-Side Breakdown Table */}
            <div className="glass-card border border-border overflow-hidden rounded-2xl">
              <div className="p-5 bg-surface/50 border-b border-border">
                <h3 className="text-lg font-bold text-foreground">Feature-by-Feature Breakdown</h3>
                <p className="text-xs text-muted">Direct technical and capability comparison</p>
              </div>

              <div className="divide-y divide-border/70 text-sm">
                
                {/* AI Model */}
                <div className="grid grid-cols-3 p-4 md:p-5 items-center">
                  <div className="font-semibold text-muted text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu size={15} className="text-primary" />
                    <span>AI Model / Tech</span>
                  </div>
                  <div className="text-foreground font-medium px-2">{tool1.aiModel || "Custom Neural Engine"}</div>
                  <div className="text-foreground font-medium px-2">{tool2.aiModel || "Custom Neural Engine"}</div>
                </div>

                {/* Pricing Type */}
                <div className="grid grid-cols-3 p-4 md:p-5 items-center">
                  <div className="font-semibold text-muted text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <DollarSign size={15} className="text-emerald-500" />
                    <span>Pricing Model</span>
                  </div>
                  <div className="px-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      {tool1.pricing}
                    </span>
                  </div>
                  <div className="px-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      {tool2.pricing}
                    </span>
                  </div>
                </div>

                {/* Company & Founded */}
                <div className="grid grid-cols-3 p-4 md:p-5 items-center">
                  <div className="font-semibold text-muted text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 size={15} className="text-secondary" />
                    <span>Company & Origin</span>
                  </div>
                  <div className="text-foreground px-2">
                    {tool1.company || "Independent"} {tool1.foundedYear ? `(${tool1.foundedYear})` : ''}
                  </div>
                  <div className="text-foreground px-2">
                    {tool2.company || "Independent"} {tool2.foundedYear ? `(${tool2.foundedYear})` : ''}
                  </div>
                </div>

                {/* Key Features List */}
                <div className="grid grid-cols-3 p-4 md:p-5 items-start">
                  <div className="font-semibold text-muted text-xs uppercase tracking-wider pt-1 flex items-center gap-1.5">
                    <Sparkles size={15} className="text-warning" />
                    <span>Core Features</span>
                  </div>
                  <div className="space-y-1.5 px-2">
                    {tool1.features && tool1.features.length > 0 ? (
                      tool1.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-foreground/90">
                          <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-muted">Feature highlights on site</span>
                    )}
                  </div>
                  <div className="space-y-1.5 px-2">
                    {tool2.features && tool2.features.length > 0 ? (
                      tool2.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-foreground/90">
                          <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-muted">Feature highlights on site</span>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="grid grid-cols-3 p-4 md:p-5 items-center">
                  <div className="font-semibold text-muted text-xs uppercase tracking-wider">Tags</div>
                  <div className="flex flex-wrap gap-1.5 px-2">
                    {tool1.tags?.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-surface text-muted text-[11px] border border-border">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 px-2">
                    {tool2.tags?.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-surface text-muted text-[11px] border border-border">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* History & Context */}
                <div className="grid grid-cols-3 p-4 md:p-5 items-start">
                  <div className="font-semibold text-muted text-xs uppercase tracking-wider pt-1 flex items-center gap-1.5">
                    <Calendar size={15} className="text-muted" />
                    <span>Background & Evolution</span>
                  </div>
                  <div className="text-xs text-muted leading-relaxed px-2">
                    {tool1.history || tool1.fullDescription}
                  </div>
                  <div className="text-xs text-muted leading-relaxed px-2">
                    {tool2.history || tool2.fullDescription}
                  </div>
                </div>

              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-16 glass rounded-2xl border border-border max-w-md mx-auto p-6 space-y-3">
            <p className="text-muted text-sm">Please select two tools to begin comparison.</p>
          </div>
        )}

      </div>
    </main>
  );
}

export default function ComparePage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen pt-32 flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      }>
        <CompareContent />
      </Suspense>
      <Footer />
    </>
  );
}
