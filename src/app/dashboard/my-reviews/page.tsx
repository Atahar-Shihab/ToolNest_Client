'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { motion } from 'framer-motion';
import { Review } from '@/types';
import toast from 'react-hot-toast';
import { Star, Trash2, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/reviews/my-reviews');
      setReviews(res.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load your reviews');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const openDeleteModal = (review: Review) => {
    setSelectedReview(review);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedReview) return;
    setIsDeleting(true);
    try {
      await api.delete(`/reviews/${selectedReview._id}`);
      toast.success('Review deleted successfully');
      setReviews((prev) => prev.filter((r) => r._id !== selectedReview._id));
      setDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    } finally {
      setIsDeleting(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1 text-warning">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            fill={i < rating ? "currentColor" : "none"} 
            className={i < rating ? "" : "text-muted"}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-2">My Reviews</h1>
        <p className="text-muted">Manage the reviews you've left for tools.</p>
      </div>

      <Card className="glass">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-lg" />)}
            </div>
          ) : reviews.length > 0 ? (
            <div className="overflow-x-auto p-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th className="py-4 px-6 font-medium">Tool</th>
                    <th className="py-4 px-6 font-medium min-w-[100px]">Rating</th>
                    <th className="py-4 px-6 font-medium min-w-[300px]">Comment</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Date</th>
                    <th className="py-4 px-6 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => {
                    // Handle case where toolId is populated or just a string
                    const toolName = typeof review.toolId === 'object' && review.toolId !== null 
                      ? review.toolId.title 
                      : 'Unknown Tool';
                    const toolIdStr = typeof review.toolId === 'object' && review.toolId !== null 
                      ? review.toolId._id 
                      : (review.toolId as string);

                    return (
                      <tr key={review._id} className="border-b border-border hover:bg-surface-hover transition-colors">
                        <td className="py-4 px-6">
                          <Link href={`/tools/${toolIdStr}`} className="font-medium text-primary hover:underline">
                            {toolName}
                          </Link>
                        </td>
                        <td className="py-4 px-6">{renderStars(review.rating)}</td>
                        <td className="py-4 px-6 text-sm text-muted">
                          <p className="line-clamp-2 max-w-md">{review.comment}</p>
                        </td>
                        <td className="py-4 px-6 text-sm text-muted whitespace-nowrap">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => openDeleteModal(review)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16 text-muted flex flex-col items-center">
              <MessageSquare className="mb-4 opacity-20" size={48} />
              <p>You haven't written any reviews yet.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Confirm Delete">
        <div className="mt-4">
          <p className="text-muted mb-6">
            Are you sure you want to delete this review? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}