'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import { Mail, Send } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Your message has been sent successfully! We will get back to you soon.');
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 bg-background relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight"
            >
              Get in <span className="text-gradient">Touch</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted text-lg"
            >
              Have questions, feedback, or a tool you want featured? Reach out directly to the lead developer.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
            {/* Contact Details */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="glass-card p-8 border border-border space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Developer Contact</h3>
                <p className="text-muted text-sm">Reach out via email or connect across social channels.</p>

                <div className="space-y-4 pt-4 border-t border-border">
                  <a 
                    href="mailto:shihabatahar@gmail.com" 
                    className="flex items-center gap-4 p-3 rounded-2xl glass hover:bg-primary/10 border border-border transition-all group"
                  >
                    <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted font-medium">Direct Email</p>
                      <p className="text-foreground font-semibold text-sm group-hover:text-primary transition-colors">Email Developer</p>
                    </div>
                  </a>

                  <a 
                    href="https://github.com/Atahar-Shihab" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 p-3 rounded-2xl glass hover:bg-primary/10 border border-border transition-all group"
                  >
                    <div className="p-3 rounded-xl bg-secondary/10 text-secondary border border-secondary/20 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted font-medium">GitHub Repository</p>
                      <p className="text-foreground font-semibold text-sm group-hover:text-primary transition-colors">Atahar-Shihab</p>
                    </div>
                  </a>

                  <a 
                    href="https://www.linkedin.com/in/atahar-shihab" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 p-3 rounded-2xl glass hover:bg-primary/10 border border-border transition-all group"
                  >
                    <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted font-medium">LinkedIn Profile</p>
                      <p className="text-foreground font-semibold text-sm group-hover:text-primary transition-colors">atahar-shihab</p>
                    </div>
                  </a>

                  <a 
                    href="https://www.facebook.com/atahar.shihab.740192/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 p-3 rounded-2xl glass hover:bg-primary/10 border border-border transition-all group"
                  >
                    <div className="p-3 rounded-xl bg-secondary/10 text-secondary border border-secondary/20 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted font-medium">Facebook Profile</p>
                      <p className="text-foreground font-semibold text-sm group-hover:text-primary transition-colors">Atahar Shihab</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <div className="glass-card p-8 md:p-10 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send a Direct Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-muted mb-2">Your Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        required
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted mb-2">Your Email</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted mb-2">Subject</label>
                    <input
                      type="text"
                      placeholder="Tool Submission / General Inquiry"
                      required
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted mb-2">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Share your message or feedback..."
                      required
                      className="w-full bg-surface border border-border rounded-xl p-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                    />
                  </div>

                  <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto px-8">
                    {loading ? 'Sending...' : (
                      <>
                        Send Message <Send size={18} className="ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}