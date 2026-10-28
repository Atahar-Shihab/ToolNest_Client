"use client";

import React, { useState } from "react";
import { Share2, Copy, Check, MessageCircle, Heart, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";

export function ShareToolNestBanner() {
  const [copied, setCopied] = useState(false);

  const siteUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}?ref=referral`
      : "https://tool-nest-client.vercel.app";

  const shareText =
    "Found this awesome curated AI tool directory called ToolNest 🚀 Compare AI models, find free tools, and supercharge your workflow: ";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      toast.success("ToolNest link copied to clipboard! Share it with your squad 🚀");
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      toast.error("Failed to copy link");
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${siteUrl}`)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`;

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 md:p-12 relative overflow-hidden bg-gradient-to-r from-primary/15 via-secondary/15 to-primary/10 border border-primary/20 shadow-2xl">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold">
                <Heart size={13} className="fill-primary" />
                <span>Spread The Innovation</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-foreground">
                Help a friend discover their next favorite AI tool
              </h3>
              <p className="text-muted text-sm md:text-base max-w-xl">
                Found ToolNest helpful? Share it with your team, fellow developers, or squad on WhatsApp, Twitter, or Slack.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              {/* Copy Link */}
              <button
                onClick={handleCopy}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all shadow-md ${
                  copied
                    ? "bg-emerald-600 text-white"
                    : "bg-primary hover:bg-primary/90 text-white"
                }`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? "Link Copied!" : "Copy Site Link"}</span>
              </button>

              {/* Twitter */}
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto p-3 rounded-xl glass border border-border text-foreground hover:bg-surface-hover flex items-center justify-center transition-colors"
                title="Share on X / Twitter"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto p-3 rounded-xl glass border border-border text-foreground hover:text-emerald-500 hover:bg-surface-hover flex items-center justify-center transition-colors"
                title="Share on WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
