"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RotateCcw, Star, ExternalLink, Share2, Check, ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

interface GoalOption {
  id: string;
  label: string;
  category: string;
  description: string;
  icon: string;
  suggestedTools: Array<{
    name: string;
    description: string;
    category: string;
    pricing: string;
    model: string;
    link: string;
  }>;
}

const GOALS: GoalOption[] = [
  {
    id: "code",
    label: "Code & Build Apps",
    category: "Coding",
    description: "AI pair programmers, code editors, and full-stack builders",
    icon: "💻",
    suggestedTools: [
      {
        name: "Cursor",
        description: "AI-first code editor with codebase-aware chat and multi-file editing.",
        category: "Coding",
        pricing: "Free Trial",
        model: "Claude 3.5 Sonnet / GPT-4o",
        link: "https://cursor.com",
      },
      {
        name: "GitHub Copilot",
        description: "Your AI pair programmer suggesting code directly inside VS Code.",
        category: "Coding",
        pricing: "Paid",
        model: "OpenAI Codex / GPT-4",
        link: "https://github.com/features/copilot",
      },
      {
        name: "Bolt.new",
        description: "Prompt, run, and deploy full-stack web applications in your browser.",
        category: "Coding",
        pricing: "Free Plan",
        model: "Claude 3.5 Sonnet",
        link: "https://bolt.new",
      },
    ],
  },
  {
    id: "design",
    label: "Generate Art & UI",
    category: "Design",
    description: "Photorealistic art, graphics, UI prototypes, and typography",
    icon: "🎨",
    suggestedTools: [
      {
        name: "Midjourney",
        description: "State-of-the-art AI art generator creating photorealistic visuals from prompts.",
        category: "Design",
        pricing: "Paid",
        model: "Midjourney v6.1",
        link: "https://midjourney.com",
      },
      {
        name: "v0 by Vercel",
        description: "Generates production-ready React and Next.js UI components with shadcn/ui.",
        category: "Coding",
        pricing: "Free Plan",
        model: "Fine-tuned LLM",
        link: "https://v0.dev",
      },
      {
        name: "Canva AI",
        description: "Magic Studio design suite for presentations, social media, and graphics.",
        category: "Design",
        pricing: "Free Plan",
        model: "Magic AI Suite",
        link: "https://canva.com",
      },
    ],
  },
  {
    id: "productivity",
    label: "Supercharge Productivity",
    category: "Productivity",
    description: "Smart reasoning, notes, workflow automation, and meeting notes",
    icon: "⚡",
    suggestedTools: [
      {
        name: "Claude",
        description: "Superior reasoning, 200K context window, and deep document synthesis.",
        category: "Productivity",
        pricing: "Free Trial",
        model: "Claude 3.5 Sonnet",
        link: "https://claude.ai",
      },
      {
        name: "ChatGPT",
        description: "Advanced conversational AI by OpenAI for brainstorming, drafting, and problem-solving.",
        category: "Productivity",
        pricing: "Free Trial",
        model: "GPT-4o",
        link: "https://chat.openai.com",
      },
      {
        name: "Notion AI",
        description: "Connected AI assistant integrated directly into your docs and databases.",
        category: "Productivity",
        pricing: "Free Trial",
        model: "GPT-4 / Claude",
        link: "https://notion.so",
      },
    ],
  },
  {
    id: "research",
    label: "Research & Fact-Checking",
    category: "Research",
    description: "AI search engines with inline citations and academic paper analysis",
    icon: "🔍",
    suggestedTools: [
      {
        name: "Perplexity",
        description: "Conversational answer engine backed by live web citations.",
        category: "Research",
        pricing: "Free Trial",
        model: "Sonar / Claude 3.5",
        link: "https://perplexity.ai",
      },
      {
        name: "Consensus",
        description: "Searches 200M+ peer-reviewed scientific papers for evidence-based answers.",
        category: "Research",
        pricing: "Free Plan",
        model: "Scientific NLP",
        link: "https://consensus.app",
      },
      {
        name: "Phind",
        description: "AI search tuned specifically for developer questions and code snippets.",
        category: "Research",
        pricing: "Free Plan",
        model: "Phind-70B",
        link: "https://phind.com",
      },
    ],
  },
];

export function AIMatchmaker() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [copiedTool, setCopiedTool] = useState<string | null>(null);

  const activeGoal = GOALS.find((g) => g.id === selectedGoal);

  const handleShare = (toolName: string) => {
    const text = `I found ${toolName} using the AI Matchmaker on ToolNest! Check it out: https://tool-nest-client.vercel.app/tools`;
    navigator.clipboard.writeText(text);
    setCopiedTool(toolName);
    toast.success(`Share link copied for ${toolName}! Send it to a friend 🚀`);
    setTimeout(() => setCopiedTool(null), 2500);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
            <Sparkles size={14} />
            <span>Interactive Tool Matchmaker</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Not sure what AI tool you need?
          </h2>
          <p className="text-muted text-sm md:text-base">
            Click your current objective below and let our matchmaker recommend the right top-tier tool in 3 seconds.
          </p>
        </div>

        {/* Matchmaker Container */}
        <div className="max-w-4xl mx-auto glass-card p-6 md:p-10 border border-border rounded-3xl shadow-2xl">
          
          {/* Step 1: Goal Select Buttons */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted uppercase tracking-wider">
                Select your primary goal:
              </span>
              {selectedGoal && (
                <button
                  onClick={() => setSelectedGoal(null)}
                  className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
                >
                  <RotateCcw size={12} />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {GOALS.map((g) => {
                const isSelected = selectedGoal === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? "bg-primary/15 border-primary shadow-lg shadow-primary/10 text-foreground"
                        : "glass border-border text-foreground hover:bg-surface-hover hover:border-primary/30"
                    }`}
                  >
                    <div className="text-2xl mb-2">{g.icon}</div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{g.label}</h4>
                      <p className="text-xs text-muted mt-1 line-clamp-2">{g.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Display */}
          <AnimatePresence mode="wait">
            {activeGoal ? (
              <motion.div
                key={activeGoal.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="mt-8 pt-8 border-t border-border/80 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      Recommended Matches for {activeGoal.category}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mt-0.5">
                      Top 3 Handpicked AI Tools
                    </h3>
                  </div>
                  <Link
                    href={`/tools?category=${encodeURIComponent(activeGoal.category)}`}
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    <span>View all {activeGoal.category} tools</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeGoal.suggestedTools.map((tool, idx) => (
                    <div
                      key={tool.name}
                      className="glass rounded-2xl p-5 border border-border flex flex-col justify-between relative hover:border-primary/40 transition-all group"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            #{idx + 1} Match
                          </span>
                          <span className="text-[11px] font-semibold text-muted bg-surface px-2 py-0.5 rounded-full border border-border">
                            {tool.pricing}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {tool.name}
                        </h4>

                        <p className="text-xs text-muted leading-relaxed line-clamp-2">
                          {tool.description}
                        </p>

                        <div className="text-[11px] text-muted">
                          <span className="text-foreground font-semibold">Engine:</span> {tool.model}
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between gap-2">
                        <a
                          href={tool.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-all shadow"
                        >
                          <span>Try Tool</span>
                          <ExternalLink size={12} />
                        </a>
                        <button
                          onClick={() => handleShare(tool.name)}
                          className="p-2 rounded-xl glass border border-border text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
                          title="Share recommendation with a colleague"
                        >
                          {copiedTool === tool.name ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="mt-8 pt-8 border-t border-border/60 text-center py-6 text-muted text-xs">
                👆 Select any goal above to instantly unlock the best matched AI tools.
              </div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
