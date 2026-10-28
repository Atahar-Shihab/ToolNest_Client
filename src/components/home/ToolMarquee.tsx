"use client";

import { useState } from "react";
import { Star, Flame } from "lucide-react";
import Link from "next/link";

interface MarqueeItem {
  id: string;
  title: string;
  category: string;
  rating: number;
  image: string;
  tag: string;
}

const row1Items: MarqueeItem[] = [
  { id: "1", title: "ChatGPT", category: "Productivity", rating: 5.0, image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80", tag: "HOT" },
  { id: "2", title: "Claude", category: "Productivity", rating: 5.0, image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&auto=format&fit=crop&q=80", tag: "POPULAR" },
  { id: "3", title: "Midjourney", category: "Design", rating: 5.0, image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=400&auto=format&fit=crop&q=80", tag: "CREATIVE" },
  { id: "4", title: "Cursor", category: "Coding", rating: 4.9, image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80", tag: "NEW" },
  { id: "5", title: "GitHub Copilot", category: "Coding", rating: 4.8, image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&auto=format&fit=crop&q=80", tag: "PRO" },
  { id: "6", title: "Perplexity", category: "Research", rating: 4.9, image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&auto=format&fit=crop&q=80", tag: "FAST" },
];

const row2Items: MarqueeItem[] = [
  { id: "7", title: "Suno AI", category: "Music", rating: 5.0, image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80", tag: "AUDIO" },
  { id: "8", title: "ElevenLabs", category: "Music", rating: 4.9, image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&auto=format&fit=crop&q=80", tag: "VOICE" },
  { id: "9", title: "Synthesia", category: "Video", rating: 4.8, image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&auto=format&fit=crop&q=80", tag: "AVATAR" },
  { id: "10", title: "Runway Gen-2", category: "Video", rating: 4.9, image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&auto=format&fit=crop&q=80", tag: "VFX" },
  { id: "11", title: "Notion AI", category: "Productivity", rating: 4.8, image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&auto=format&fit=crop&q=80", tag: "DOCS" },
  { id: "12", title: "Grammarly", category: "Writing", rating: 4.7, image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&auto=format&fit=crop&q=80", tag: "TEXT" },
];

export function ToolMarquee() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const duplicatedRow1 = [...row1Items, ...row1Items, ...row1Items];
  const duplicatedRow2 = [...row2Items, ...row2Items, ...row2Items];

  return (
    <section className="py-20 overflow-hidden relative bg-gradient-to-b from-background via-surface/40 to-background">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="container mx-auto px-4 text-center mb-12 relative z-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-bold text-secondary">
          <Flame size={14} className="text-secondary animate-pulse" />
          <span>LIVE TRENDING SWIPER</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
          Trending <span className="text-gradient">AI Ecosystem</span>
        </h2>
        <p className="text-muted max-w-xl mx-auto text-base">
          Hover over any tool to pause. Click to instantly discover and compare in the directory.
        </p>
      </div>

      {/* Row 1: Left to Right Marquee */}
      <div className="mb-6 relative flex overflow-hidden select-none">
        <div className="animate-marquee-left gap-6 select-none">
          {duplicatedRow1.map((tool, index) => (
            <Link
              key={`r1-${tool.id}-${index}`}
              href={`/tools?search=${encodeURIComponent(tool.title)}`}
              className="group"
            >
              <div className="w-72 glass-card p-3 rounded-2xl flex items-center gap-4 hover:border-primary/50 transition-all border border-border bg-surface/70 backdrop-blur-xl shadow-lg">
                {!failedImages[`r1-${tool.id}`] ? (
                  <img
                    src={tool.image}
                    alt={tool.title}
                    onError={() => handleImageError(`r1-${tool.id}`)}
                    className="w-16 h-16 rounded-xl object-cover border border-border group-hover:scale-105 transition-transform shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shrink-0 border border-border">
                    {tool.title.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h4 className="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                      {tool.title}
                    </h4>
                    <span className="text-[10px] font-extrabold bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20 shrink-0">
                      {tool.tag}
                    </span>
                  </div>
                  <p className="text-xs text-muted font-medium mb-1.5">{tool.category}</p>
                  <div className="flex items-center gap-1 text-xs text-warning font-bold">
                    <Star size={12} className="fill-warning text-warning" />
                    <span>{tool.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Row 2: Right to Left Marquee */}
      <div className="relative flex overflow-hidden select-none">
        <div className="animate-marquee-right gap-6 select-none">
          {duplicatedRow2.map((tool, index) => (
            <Link
              key={`r2-${tool.id}-${index}`}
              href={`/tools?search=${encodeURIComponent(tool.title)}`}
              className="group"
            >
              <div className="w-72 glass-card p-3 rounded-2xl flex items-center gap-4 hover:border-secondary/50 transition-all border border-border bg-surface/70 backdrop-blur-xl shadow-lg">
                {!failedImages[`r2-${tool.id}`] ? (
                  <img
                    src={tool.image}
                    alt={tool.title}
                    onError={() => handleImageError(`r2-${tool.id}`)}
                    className="w-16 h-16 rounded-xl object-cover border border-border group-hover:scale-105 transition-transform shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shrink-0 border border-border">
                    {tool.title.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h4 className="font-bold text-sm text-foreground truncate group-hover:text-secondary transition-colors">
                      {tool.title}
                    </h4>
                    <span className="text-[10px] font-extrabold bg-secondary/10 text-secondary px-1.5 py-0.5 rounded border border-secondary/20 shrink-0">
                      {tool.tag}
                    </span>
                  </div>
                  <p className="text-xs text-muted font-medium mb-1.5">{tool.category}</p>
                  <div className="flex items-center gap-1 text-xs text-warning font-bold">
                    <Star size={12} className="fill-warning text-warning" />
                    <span>{tool.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
