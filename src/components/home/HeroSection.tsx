"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const categories = ["Writing", "Coding", "Design", "Marketing", "Productivity", "Research"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/tools');
    }
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/tools?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background ambient blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-semibold text-primary mb-6"
          >
            <Sparkles size={15} />
            <span>Discover & Compare 500+ Top AI Tools</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover the Best <span className="text-gradient">AI Tools</span> for Every Task
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-muted mb-8 sm:mb-10 max-w-2xl mx-auto px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore, compare, and review top AI tools across writing, coding, design, marketing, and productivity. Join a community of innovators.
          </motion.p>

          {/* Mobile-optimized, responsive non-overlapping Search Bar */}
          <motion.div 
            className="relative max-w-2xl mx-auto mb-8 px-1 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center glass rounded-2xl sm:rounded-full p-2 pl-4 sm:pl-6 gap-2 border border-white/10 shadow-2xl">
              <div className="flex items-center flex-1 min-w-0 py-1.5 sm:py-0">
                <Search className="h-5 w-5 text-muted mr-3 shrink-0" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AI tools by name or category..."
                  className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted/70 text-sm sm:text-base truncate"
                />
              </div>
              <Button type="submit" className="rounded-xl sm:rounded-full px-7 py-3 sm:py-2.5 font-bold shrink-0 shadow-lg bg-gradient-to-r from-primary to-secondary text-white">
                Search
              </Button>
            </form>
          </motion.div>

          {/* Categories */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="px-3.5 py-1.5 glass rounded-full text-xs sm:text-sm font-medium hover:bg-surface-hover cursor-pointer transition-colors text-foreground"
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div 
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" onClick={() => router.push('/tools')} className="w-full sm:w-auto">
              Explore All Tools
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push('/dashboard/add-tool')} className="w-full sm:w-auto">
              Submit a Tool
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}