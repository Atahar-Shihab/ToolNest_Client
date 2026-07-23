"use client";
import { Button } from "@/components/ui/Button";

export function NewsletterSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90 z-0" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Stay Ahead of the AI Curve</h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
          Get weekly updates on the newest AI tools, exclusive reviews, and industry insights directly to your inbox.
        </p>
        <form className="max-w-md mx-auto flex gap-2" onSubmit={e => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <Button className="bg-white text-primary hover:bg-white/90">
            Subscribe
          </Button>
        </form>
        <p className="text-white/60 text-xs mt-4">No spam. Unsubscribe at any time.</p>
      </div>
    </section>
  );
}