'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Target, Users, Zap, Globe, Heart } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-background">
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

        {/* CTA */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4 max-w-3xl space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ready to explore the future of AI?</h2>
            <p className="text-muted text-lg">Browse our curated directory of over 500+ tools or submit your own.</p>
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