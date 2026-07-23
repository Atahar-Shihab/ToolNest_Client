'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Trash2, Star } from 'lucide-react';
import { Review } from '@/types';

export default function ReviewsPage() {
  const { user, loading: authLoading } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      // Assuming a generic endpoint to fetch all reviews for admins
      const { data } = await api.get('/api/reviews');
      setReviews(Array.isArray(data) ? data : data.reviews || []);
    } catch (error) {
      toast.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchReviews();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    setActionLoading(id);
    try {
      await api.delete(`/api/reviews/${id}`);
      toast.success('Review deleted successfully');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to delete review');
    } finally {
      setActionLoading(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gradient">Manage Reviews</h1>
        <p className="text-gray-400 mt-2">Monitor and manage all user reviews.</p>
      </div>

      <div className="glass rounded-xl overflow-x-auto border border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 font-semibold text-gray-300">User</th>
              <th className="p-4 font-semibold text-gray-300">Tool</th>
              <th className="p-4 font-semibold text-gray-300">Rating</th>
              <th className="p-4 font-semibold text-gray-300 min-w-[200px]">Comment</th>
              <th className="p-4 font-semibold text-gray-300">Date</th>
              <th className="p-4 font-semibold text-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.userPhoto || `https://ui-avatars.com/api/?name=${review.userName}&background=random`}
                      alt={review.userName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-white text-sm">{review.userName}</div>
                      <div className="text-xs text-gray-500">{review.userEmail}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-300 text-sm">
                  {typeof review.toolId === 'object' ? review.toolId.title : 'Unknown Tool'}
                </td>
                <td className="p-4">
                  <div className="flex items-center text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-600'}`} />
                    ))}
                  </div>
                </td>
                <td className="p-4 text-gray-400 text-sm truncate max-w-xs" title={review.comment}>
                  {review.comment}
                </td>
                <td className="p-4 text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(review._id)}
                    disabled={actionLoading === review._id}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}