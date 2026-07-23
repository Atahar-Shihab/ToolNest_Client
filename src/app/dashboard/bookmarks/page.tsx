'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Bookmark as BookmarkType } from '@/types';
import toast from 'react-hot-toast';
import { Star, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/bookmarks');
      setBookmarks(res.data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      toast.error('Failed to load bookmarks');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleRemoveBookmark = async (toolId: string) => {
    try {
      await api.post('/bookmarks/toggle', { toolId });
      setBookmarks((prev) => prev.filter((b) => b.toolId._id !== toolId));
      toast.success('Bookmark removed');
    } catch (error) {
      console.error('Error removing bookmark:', error);
      toast.error('Failed to remove bookmark');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-2">Saved Bookmarks</h1>
        <p className="text-muted">Your collection of favorite AI tools.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      ) : bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => {
            const tool = bookmark.toolId;
            return (
              <Card key={bookmark._id} className="glass overflow-hidden group flex flex-col">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={tool.thumbnail} 
                    alt={tool.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Badge variant="default" className="bg-black/50 backdrop-blur-md">
                      {tool.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-foreground line-clamp-1">{tool.title}</h3>
                    <div className="flex items-center gap-1 text-warning shrink-0">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm font-medium">{tool.avgRating.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted line-clamp-2 mb-4 flex-1">
                    {tool.shortDescription}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <Link href={`/tools/${tool._id}`} passHref>
                      <Button variant="outline" size="sm" className="gap-2">
                        View Details
                        <ExternalLink size={14} />
                      </Button>
                    </Link>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleRemoveBookmark(tool._id)}
                      title="Remove Bookmark"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="glass">
          <CardContent className="p-12 text-center text-muted flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center mb-4">
              <Star size={32} className="text-muted/50" />
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">No bookmarks yet</h3>
            <p>Explore tools and bookmark your favorites to see them here.</p>
            <Link href="/tools" className="mt-6">
              <Button>Explore Tools</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}