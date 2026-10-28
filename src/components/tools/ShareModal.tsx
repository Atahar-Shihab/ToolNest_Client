"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Share2, MessageCircle, ExternalLink } from "lucide-react";
import { toast } from "react-hot-toast";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool: {
    title: string;
    shortDescription?: string;
    category?: string;
  };
  customUrl?: string;
  title?: string;
}

export function ShareModal({ isOpen, onClose, tool, customUrl, title = "Share this AI Tool" }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl =
    customUrl ||
    (typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}?ref=share`
      : "");

  const shareText = `Check out ${tool.title} on ToolNest — curated AI directory! 🚀`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = currentUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      toast.success("Link copied to clipboard! Share it with your team 🚀");
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${tool.title} on ToolNest`,
          text: tool.shortDescription || shareText,
          url: currentUrl,
        });
        toast.success("Shared successfully!");
      } catch (err) {
        // User cancelled or share failed
      }
    }
  };

  const socialLinks = [
    {
      name: "X (Twitter)",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      bg: "hover:bg-zinc-800 hover:text-white",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle size={20} />,
      bg: "hover:bg-emerald-600 hover:text-white",
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${currentUrl}`)}`,
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      bg: "hover:bg-blue-600 hover:text-white",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-surface border border-border rounded-2xl p-6 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Share2 size={18} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{title}</h3>
                <p className="text-xs text-muted">Spread the word with developers & creators</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Tool Snippet */}
          <div className="p-3.5 rounded-xl bg-surface-hover/60 border border-border/80 mb-5">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              {tool.category || "AI Tool"}
            </span>
            <h4 className="font-bold text-foreground text-base mt-0.5">{tool.title}</h4>
            {tool.shortDescription && (
              <p className="text-xs text-muted line-clamp-2 mt-1">{tool.shortDescription}</p>
            )}
          </div>

          {/* Social Share Buttons */}
          <div className="space-y-2 mb-5">
            <label className="text-xs font-semibold text-muted uppercase tracking-wider block">
              Share to Socials
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl border border-border text-foreground transition-all duration-200 ${s.bg}`}
                >
                  {s.icon}
                  <span className="text-xs font-medium">{s.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Direct Copy Link */}
          <div className="space-y-2 mb-4">
            <label className="text-xs font-semibold text-muted uppercase tracking-wider block">
              Or copy link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary select-all truncate"
              />
              <button
                onClick={handleCopy}
                className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all shrink-0 ${
                  copied
                    ? "bg-emerald-600 text-white"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Native Mobile Share fallback */}
          {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
            <button
              onClick={handleNativeShare}
              className="w-full py-2.5 px-4 rounded-xl border border-border text-xs font-medium text-muted hover:text-foreground hover:bg-surface-hover transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink size={14} />
              <span>More sharing options...</span>
            </button>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
