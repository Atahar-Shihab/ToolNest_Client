'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Filter, Star, ChevronLeft, ChevronRight, Bookmark, ArrowLeftRight } from 'lucide-react';
import { Tool, ToolsResponse } from '@/types';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ShareToolNestBanner } from '@/components/common/ShareToolNestBanner';

const CATEGORIES = ['All', 'Writing', 'Coding', 'Design', 'Marketing', 'Productivity', 'Research', 'Video', 'Music'];
const PRICING = ['All', 'Free Plan', 'Free Trial', 'Paid'];
const SORT_OPTIONS = [
  { label: 'Newest', value: '-createdAt' },
  { label: 'Highest Rated', value: '-avgRating' },
  { label: 'Most Bookmarked', value: '-bookmarkCount' },
  { label: 'A-Z', value: 'title' }
];

export default function ToolsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [tools, setTools] = useState<Tool[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || 'All';
  const currentPricing = searchParams.get('pricing') || 'All';
  const currentSort = searchParams.get('sort') || '-createdAt';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const [searchInput, setSearchInput] = useState(currentSearch);

  const fetchTools = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (currentSearch) params.append('search', currentSearch);
      if (currentCategory && currentCategory !== 'All') params.append('category', currentCategory);
      if (currentPricing && currentPricing !== 'All') params.append('pricing', currentPricing);
      if (currentSort) params.append('sort', currentSort);
      params.append('page', currentPage.toString());
      params.append('limit', '12');

      const { data } = await api.get<ToolsResponse>(`/tools?${params.toString()}`);
      setTools(data.tools);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error('Failed to fetch tools');
    } finally {
      setIsLoading(false);
    }
  }, [currentSearch, currentCategory, currentPricing, currentSort, currentPage]);

  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'All') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    router.push(`/tools?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters('search', searchInput);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/tools?${params.toString()}`);
  };

  const handleImageError = (id: string) => {
    setFailedImages(prev => ({ ...prev, [id]: true }));
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 space-y-10">
          {/* Header */}
          <div className="text-center space-y-3 pt-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
              Explore <span className="text-gradient">AI Tools</span>
            </h1>
            <p className="text-muted max-w-2xl mx-auto text-base md:text-lg">
              Discover and filter through our comprehensive directory of AI tools to find exactly what you need.
            </p>
            <div className="pt-2 flex justify-center">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold glass border border-border text-foreground hover:bg-surface-hover hover:border-primary/40 transition-all shadow-sm"
              >
                <ArrowLeftRight size={14} className="text-primary" />
                <span>Need to decide? Compare AI Tools Side-by-Side</span>
              </Link>
            </div>
          </div>

          {/* Search & Filters Bar */}
          <div className="glass rounded-2xl p-6 space-y-6 shadow-xl border border-border">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search tools by name, description, or tags..."
                className="w-full bg-surface/80 border border-border rounded-xl py-3.5 pl-12 pr-28 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all text-base"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-md">
                Search
              </button>
            </form>

            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex items-center gap-2 text-muted">
                <Filter size={18} />
                <span className="font-semibold text-sm">Filters:</span>
              </div>
              
              <div className="flex flex-wrap gap-4 flex-1 justify-end w-full">
                <select
                  value={currentCategory}
                  onChange={(e) => updateFilters('category', e.target.value)}
                  className="bg-surface border border-border rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat} className="bg-surface text-foreground">{cat}</option>)}
                </select>

                <select
                  value={currentPricing}
                  onChange={(e) => updateFilters('pricing', e.target.value)}
                  className="bg-surface border border-border rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                >
                  {PRICING.map(price => <option key={price} value={price} className="bg-surface text-foreground">{price}</option>)}
                </select>

                <select
                  value={currentSort}
                  onChange={(e) => updateFilters('sort', e.target.value)}
                  className="bg-surface border border-border rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                >
                  {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value} className="bg-surface text-foreground">{opt.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          {isLoading ? (
            <LoadingSpinner label="Fetching AI Tools directory..." size="lg" />
          ) : tools.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {tools.map(tool => (
                <motion.div key={tool._id} variants={item} className="h-full">
                  <Link href={`/tools/${tool._id}`} className="block h-full">
                    <div className="glass-card p-5 h-full flex flex-col group cursor-pointer relative overflow-hidden">
                      {/* Image Banner Container */}
                      <div className="w-full h-44 relative rounded-xl overflow-hidden mb-4 bg-surface border border-border shadow-inner">
                        {!failedImages[tool._id] && tool.thumbnail ? (
                          <img
                            src={tool.thumbnail}
                            alt={tool.title}
                            onError={() => handleImageError(tool._id)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                            {tool.title.charAt(0)}
                          </div>
                        )}
                        <div className="absolute top-2.5 right-2.5">
                          <span className="bg-black/70 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-md border border-white/20 font-bold uppercase tracking-wider shadow-md">
                            {tool.pricing}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{tool.title}</h3>
                          <div className="flex items-center gap-1 text-xs font-semibold bg-warning/10 text-warning px-2.5 py-1 rounded-full border border-warning/20">
                            <Star className="fill-warning" size={13} />
                            <span>{tool.avgRating ? tool.avgRating.toFixed(1) : '5.0'}</span>
                          </div>
                        </div>
                        
                        <p className="text-muted text-sm line-clamp-2 mb-4 flex-1">
                          {tool.shortDescription}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                          <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">
                            {tool.category}
                          </span>
                          <div className="flex items-center gap-1 text-muted text-xs font-medium">
                            <Bookmark size={14} />
                            <span>{tool.bookmarkCount || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center border border-border space-y-3">
              <h3 className="text-xl font-bold text-foreground">No tools found</h3>
              <p className="text-muted">Try adjusting your search or filters.</p>
              <button
                onClick={() => router.push('/tools')}
                className="mt-2 text-primary hover:underline font-semibold"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2.5 glass rounded-xl border border-border text-foreground hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              
              <span className="px-4 py-2 text-sm text-muted font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2.5 glass rounded-xl border border-border text-foreground hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* Referral Share Banner */}
          <ShareToolNestBanner />
        </div>
      </main>
      <Footer />
    </>
  );
}