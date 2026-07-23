"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
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
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover the Best <span className="text-gradient">AI Tools</span> for Every Task
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore, compare, and review 500+ AI tools across writing, coding, design, marketing, and more. Join a community of innovators shaping the future.
          </motion.p>

          <motion.div 
            className="relative max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSearch} className="flex items-center glass rounded-full p-2 pl-6">
              <Search className="h-5 w-5 text-muted mr-3 shrink-0" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI tools by name, category, or feature..."
                className="flex-1 bg-transparent border-none outline-none text-foreground"
              />
              <Button type="submit" className="rounded-full px-6">Search</Button>
            </form>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="px-4 py-1.5 glass rounded-full text-sm font-medium hover:bg-surface-hover cursor-pointer transition-colors"
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <motion.div 
            className="mt-12 flex items-center justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" onClick={() => router.push('/tools')}>Explore Tools</Button>
            <Button variant="outline" size="lg" onClick={() => router.push('/dashboard/add-tool')}>Submit a Tool</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}