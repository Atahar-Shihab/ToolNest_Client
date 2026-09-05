'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Tool, Review } from '@/types';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { Star, Bookmark, ExternalLink, CheckCircle2, User, Clock, ChevronRight, Building2, Calendar, Share2, ArrowLeftRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ShareModal } from '@/components/tools/ShareModal';

export default function ToolDetailsPage() {
  const params = useParams();
  const toolId = params.id as string;
  const { user } = useAuth();
  
  const [tool, setTool] = useState<Tool | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageFailed, setImageFailed] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'reviews'>('overview');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  // Review form
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchToolData = async () => {
      try {
        setIsLoading(true);
        const [toolRes, reviewsRes] = await Promise.all([
          api.get(`/tools/${toolId}`),
          api.get(`/reviews/${toolId}`)
        ]);
        
        setTool(toolRes.data);
        setReviews(reviewsRes.data);
        
        // Fetch related tools
        if (toolRes.data.category) {
          const relatedRes = await api.get(`/tools?category=${toolRes.data.category}&limit=4`);
          setRelatedTools(relatedRes.data.tools.filter((t: Tool) => t._id !== toolId));
        }

        // Check bookmark status if logged in
        if (user) {
          try {
            const bkRes = await api.get(`/bookmarks/check/${toolId}`);
            setIsBookmarked(bkRes.data.isBookmarked);
          } catch (e) {
            console.error('Failed to check bookmark status', e);
          }
        }
      } catch (error) {
        toast.error('Failed to load tool details');
      } finally {
        setIsLoading(false);
      }
    };

    if (toolId) {
      fetchToolData();
    }
  }, [toolId, user]);

  const handleToggleBookmark = async () => {
    if (!user) {
      toast.error('Please login to bookmark tools');
      return;
    }

    try {
      await api.post('/bookmarks/toggle', { toolId });
      setIsBookmarked(!isBookmarked);
      if (tool) {
        setTool({
          ...tool,
          bookmarkCount: isBookmarked ? tool.bookmarkCount - 1 : tool.bookmarkCount + 1
        });
      }
      toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
    } catch (error) {
      toast.error('Failed to update bookmark');
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to leave a review');
      return;
    }
    if (!comment.trim()) {
      toast.error('Please enter a review comment');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.post('/reviews', {
        toolId,
        rating,
        comment,
        userName: user.name,
        userEmail: user.email,
        userPhoto: user.photoURL
      });

      setReviews([res.data, ...reviews]);
      setComment('');
      setRating(5);
      
      // Update tool avg rating locally
      if (tool) {
        const newTotalReviews = tool.totalReviews + 1;
        const newAvg = ((tool.avgRating * tool.totalReviews) + rating) / newTotalReviews;
        setTool({
          ...tool,
          avgRating: newAvg,
          totalReviews: newTotalReviews
        });
      }

      toast.success('Review submitted successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-28 pb-16 container mx-auto px-4 md:px-6">
          <div className="glass rounded-2xl h-96 animate-pulse bg-surface/40 border border-border" />
        </div>
        <Footer />
      </>
    );
  }

  if (!tool) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-28 pb-16 container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Tool Not Found</h1>
          <p className="text-muted mb-6">The tool you are looking for does not exist or has been removed.</p>
          <Link href="/tools" className="text-primary font-medium hover:underline">
            Back to Tools Directory
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted">
            <Link href="/tools" className="hover:text-foreground transition-colors">Tools</Link>
            <ChevronRight size={14} />
            <Link href={`/tools?category=${tool.category}`} className="hover:text-foreground transition-colors">{tool.category}</Link>
            <ChevronRight size={14} />
            <span className="text-foreground font-medium">{tool.title}</span>
          </div>

          {/* Hero Details Card */}
          <div className="glass-card p-6 md:p-10 relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-surface to-surface-hover border border-border flex items-center justify-center p-3 shadow-xl">
                  {!imageFailed && tool.thumbnail ? (
                    <img
                      src={tool.thumbnail}
                      alt={tool.title}
                      onError={() => setImageFailed(true)}
                      className="max-h-20 max-w-full object-contain filter drop-shadow-md"
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                      {tool.title.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">{tool.title}</h1>
                    <span className="bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                      {tool.pricing}
                    </span>
                    <span className="bg-secondary/10 text-secondary border border-secondary/20 text-xs px-3 py-1 rounded-full font-bold">
                      {tool.category}
                    </span>
                  </div>

                  <p className="text-muted text-base md:text-lg max-w-2xl">{tool.shortDescription}</p>

                  <div className="flex items-center gap-6 pt-2 text-sm text-muted">
                    <div className="flex items-center gap-1.5 font-semibold text-foreground">
                      <Star className="text-warning fill-warning" size={18} />
                      <span className="text-lg">{tool.avgRating ? tool.avgRating.toFixed(1) : '5.0'}</span>
                      <span className="text-muted text-xs font-normal">({tool.totalReviews} reviews)</span>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">{tool.bookmarkCount || 0}</span> bookmarks
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap gap-2.5 w-full md:w-auto">
                <button
                  onClick={handleToggleBookmark}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all shadow-md border text-sm ${
                    isBookmarked
                      ? 'bg-secondary text-white border-secondary hover:bg-secondary/90'
                      : 'glass border-border text-foreground hover:bg-surface-hover'
                  }`}
                >
                  <Bookmark size={16} className={isBookmarked ? 'fill-white' : ''} />
                  <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>

                <Link
                  href={`/compare?tool1=${tool._id}`}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold glass border-border text-foreground hover:bg-surface-hover transition-all shadow-md text-sm"
                  title="Compare with another AI tool"
                >
                  <ArrowLeftRight size={16} className="text-primary" />
                  <span>Compare</span>
                </Link>

                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold glass border-border text-foreground hover:bg-surface-hover transition-all shadow-md text-sm"
                  title="Share this tool with friends or colleagues"
                >
                  <Share2 size={16} className="text-secondary" />
                  <span>Share</span>
                </button>

                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-white transition-all shadow-lg text-sm"
                >
                  <span>Visit Website</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-border space-x-8">
            {(['overview', 'features', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-base font-semibold capitalize transition-colors relative ${
                  activeTab === tab ? 'text-primary' : 'text-muted hover:text-foreground'
                }`}
              >
                {tab} {tab === 'reviews' && `(${reviews.length})`}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="glass rounded-2xl p-8 space-y-6 border border-border">
                  <h2 className="text-2xl font-bold text-foreground">About {tool.title}</h2>
                  <p className="text-muted leading-relaxed whitespace-pre-line text-lg">
                    {tool.fullDescription}
                  </p>

                  {tool.tags && tool.tags.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Tags & Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {tool.tags.map(tag => (
                          <span key={tag} className="glass px-3 py-1 rounded-lg text-sm font-medium text-foreground">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {/* Tool Metadata Card */}
                {(tool.aiModel || tool.company || tool.foundedYear || tool.history) && (
                  <div className="glass rounded-2xl p-8 space-y-6 border border-border">
                    <h2 className="text-2xl font-bold text-foreground">Tool Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {tool.aiModel && (
                        <div className="p-4 rounded-xl bg-surface/50 border border-border space-y-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-muted">AI Model</span>
                          <p className="text-foreground font-semibold text-lg flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            {tool.aiModel}
                          </p>
                        </div>
                      )}
                      {tool.company && (
                        <div className="p-4 rounded-xl bg-surface/50 border border-border space-y-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-muted">Company</span>
                          <p className="text-foreground font-semibold text-lg">{tool.company}</p>
                        </div>
                      )}
                      {tool.foundedYear && (
                        <div className="p-4 rounded-xl bg-surface/50 border border-border space-y-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-muted">Launched</span>
                          <p className="text-foreground font-semibold text-lg">{tool.foundedYear}</p>
                        </div>
                      )}
                    </div>
                    {tool.history && (
                      <div className="pt-4 border-t border-border">
                        <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">History & Background</h3>
                        <p className="text-muted leading-relaxed">{tool.history}</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'features' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="glass rounded-2xl p-8 border border-border space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Key Features</h2>
                  {tool.features && tool.features.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tool.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-surface/50 border border-border">
                          <CheckCircle2 className="text-success shrink-0 mt-0.5" size={20} />
                          <span className="text-foreground font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No specific features listed for this tool.</p>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                {/* Write Review Form */}
                <div className="glass rounded-2xl p-8 border border-border space-y-6">
                  <h3 className="text-xl font-bold text-foreground">Leave a Review</h3>
                  {user ? (
                    <form onSubmit={handleAddReview} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-muted mb-2">Rating</label>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="p-1 text-warning hover:scale-110 transition-transform"
                            >
                              <Star className={star <= rating ? 'fill-warning text-warning' : 'text-muted'} size={24} />
                            </button>
                          ))}
                          <span className="text-foreground font-bold text-lg ml-2">{rating}.0 Stars</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-muted mb-2">Your Review</label>
                        <textarea
                          rows={4}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Share your experience using this AI tool..."
                          className="w-full bg-surface border border-border rounded-xl p-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md disabled:opacity-50"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </form>
                  ) : (
                    <p className="text-muted">
                      Please <Link href="/login" className="text-primary underline font-medium">login</Link> to write a review.
                    </p>
                  )}
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground">User Reviews</h3>
                  {reviews.length > 0 ? (
                    <div className="grid gap-4">
                      {reviews.map(review => (
                        <div key={review._id} className="glass rounded-xl p-6 border border-border space-y-3">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={review.userPhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.userName}`}
                                alt={review.userName}
                                className="w-10 h-10 rounded-full border border-border bg-surface"
                              />
                              <div>
                                <p className="font-semibold text-foreground">{review.userName}</p>
                                <p className="text-xs text-muted">{new Date(review.createdAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 bg-warning/10 text-warning px-2.5 py-1 rounded-full border border-warning/20 text-xs font-bold">
                              <Star className="fill-warning" size={13} />
                              <span>{review.rating}.0</span>
                            </div>
                          </div>
                          <p className="text-muted text-base leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted glass rounded-xl border border-border">
                      No reviews yet. Be the first to review!
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <div className="pt-12 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Similar Tools in {tool.category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedTools.map(rt => (
                  <Link href={`/tools/${rt._id}`} key={rt._id} className="block group">
                    <div className="glass-card p-4 flex flex-col h-full">
                      <div className="w-full h-32 rounded-xl bg-gradient-to-br from-surface to-surface-hover border border-border flex items-center justify-center p-3 mb-4">
                        <img src={rt.thumbnail} alt={rt.title} className="max-h-20 max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform" />
                      </div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors truncate">{rt.title}</h3>
                      <div className="flex items-center justify-between gap-1 text-xs text-muted mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="text-warning fill-warning" size={14} />
                          <span>{rt.avgRating ? rt.avgRating.toFixed(1) : '5.0'}</span>
                        </div>
                        <span className="text-[11px] text-primary group-hover:underline flex items-center gap-1 font-medium">
                          <ArrowLeftRight size={11} /> Compare
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Share Modal */}
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          tool={{
            title: tool.title,
            shortDescription: tool.shortDescription,
            category: tool.category,
          }}
        />
      </main>
      <Footer />
    </>
  );
}