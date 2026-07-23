"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Compass, Home, Search, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center pt-28 pb-20 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 text-center relative z-10 space-y-8 max-w-2xl">
          {/* Animated 404 Header */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative inline-block"
          >
            <span className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary tracking-tighter filter drop-shadow-[0_0_35px_rgba(0,212,255,0.3)]">
              404
            </span>
            <motion.div 
              className="absolute -top-3 -right-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 shadow-lg flex items-center gap-1"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Sparkles size={12} />
              <span>Lost in Cyberspace</span>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Page Not Found
            </h1>
            <p className="text-muted text-base md:text-lg max-w-md mx-auto">
              Oops! The AI tool or page you&apos;re looking for has shifted dimensions or doesn&apos;t exist.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-2"
          >
            <Link href="/">
              <Button size="lg" className="flex items-center gap-2">
                <Home size={18} />
                <span>Return Home</span>
              </Button>
            </Link>

            <Link href="/tools">
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Compass size={18} />
                <span>Browse AI Tools</span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}