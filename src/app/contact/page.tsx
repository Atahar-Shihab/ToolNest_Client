'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
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
      <main className="min-h-screen pt-24 pb-16 bg-background relative overflow-hidden">
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
              Have questions, feedback, or a tool you want featured? We would love to hear from you.
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
                <h3 className="text-2xl font-bold text-foreground">Contact Info</h3>
                <p className="text-muted text-sm">Fill out the form or reach out directly using the details below.</p>

                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted font-medium">Email Us</p>
                      <p className="text-foreground font-semibold text-sm">support@toolnest.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-secondary/10 text-secondary border border-secondary/20">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted font-medium">Call Us</p>
                      <p className="text-foreground font-semibold text-sm">+1 (555) 234-5678</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-success/10 text-success border border-success/20">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted font-medium">Location</p>
                      <p className="text-foreground font-semibold text-sm">San Francisco, CA</p>
                    </div>
                  </div>
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
                <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
                
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
                      placeholder="Tool Submission / Support Inquiry"
                      required
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted mb-2">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us how we can help..."
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