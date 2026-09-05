'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Target, Users, Zap, Globe, Mail, Code2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 bg-background">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 tracking-tight"
            >
              About <span className="text-gradient">ToolNest</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted max-w-2xl mx-auto"
            >
              Empowering creators, developers, and businesses to discover the most innovative AI tools in the world, all in one place.
            </motion.p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-surface/30 border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                <p className="text-muted text-lg leading-relaxed">
                  We believe that the rapid evolution of artificial intelligence represents a paradigm shift in how humanity creates, works, and thinks. However, the sheer volume of new tools makes it difficult for users to find what actually works.
                </p>
                <p className="text-muted text-lg leading-relaxed">
                  Our mission is to curate the ultimate repository of AI applications, rigorously tested and reviewed by the community, so you can focus on building the future instead of searching for the right tools.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { icon: <Target className="w-8 h-8 text-primary" />, title: "Precision", desc: "Curated selections" },
                  { icon: <Users className="w-8 h-8 text-secondary" />, title: "Community", desc: "Driven by users" },
                  { icon: <Zap className="w-8 h-8 text-warning" />, title: "Speed", desc: "Find tools instantly" },
                  { icon: <Globe className="w-8 h-8 text-success" />, title: "Global", desc: "Worldwide access" }
                ].map((item, i) => (
                  <div key={i} className="glass-card p-6 border border-border">
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="font-bold text-foreground text-lg mb-1">{item.title}</h3>
                    <p className="text-muted text-sm">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Developer / Creator Card */}
        <section className="py-20 container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 border border-primary/30 max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-36 h-36 rounded-3xl bg-gradient-to-tr from-primary to-secondary p-1 shrink-0 shadow-2xl relative overflow-hidden">
                <img 
                  src="/atahar-shihab.png" 
                  alt="Atahar Shihab" 
                  className="w-full h-full object-cover object-top rounded-[22px]"
                />
              </div>
              
              <div className="space-y-4 text-center md:text-left flex-1">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                    <Code2 size={14} /> Lead Developer & Designer
                  </span>
                  <h3 className="text-3xl font-extrabold text-foreground">Atahar Shihab</h3>
                  <p className="text-muted text-sm font-medium">Full Stack Software Engineer & AI Advocate</p>
                </div>
                
                <p className="text-muted text-base leading-relaxed">
                  Passionate developer dedicated to engineering intuitive, high-performance web applications with modern technology stacks like Next.js, Express, TypeScript, and MongoDB.
                </p>

                {/* Pure Icon Type Social Badges */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                  <a 
                    href="mailto:shihabatahar@gmail.com" 
                    aria-label="Send Email"
                    title="Send Email"
                    className="p-3 rounded-2xl glass hover:bg-primary hover:text-white border border-border text-foreground transition-all shadow-md flex items-center gap-2"
                  >
                    <Mail size={18} />
                    <span className="text-sm font-semibold">Email</span>
                  </a>
                  <a 
                    href="https://github.com/Atahar-Shihab" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="GitHub Profile"
                    title="GitHub Profile"
                    className="p-3 rounded-2xl glass hover:bg-primary hover:text-white border border-border text-foreground transition-all shadow-md flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span className="text-sm font-semibold">GitHub</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/atahar-shihab" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="LinkedIn Profile"
                    title="LinkedIn Profile"
                    className="p-3 rounded-2xl glass hover:bg-primary hover:text-white border border-border text-foreground transition-all shadow-md flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className="text-sm font-semibold">LinkedIn</span>
                  </a>
                  <a 
                    href="https://www.facebook.com/atahar.shihab.740192/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Facebook Profile"
                    title="Facebook Profile"
                    className="p-3 rounded-2xl glass hover:bg-primary hover:text-white border border-border text-foreground transition-all shadow-md flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-sm font-semibold">Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="pb-16 text-center">
          <div className="container mx-auto px-4 max-w-3xl space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ready to explore the future of AI?</h2>
            <p className="text-muted text-lg">Browse our curated directory of over 50+ hand-curated tools or submit your own.</p>
            <div className="flex justify-center gap-4">
              <Link href="/tools">
                <Button size="lg">Explore Directory</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">Contact Us</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}