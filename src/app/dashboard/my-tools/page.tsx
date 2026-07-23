'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { motion } from 'framer-motion';
import { Tool } from '@/types';
import toast from 'react-hot-toast';
import { Star, Edit2, Trash2, HelpCircle } from 'lucide-react';

export default function MyToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Edit Form State
  const [formData, setFormData] = useState({
    title: '', shortDescription: '', fullDescription: '',
    category: '', pricing: '', website: '', thumbnail: '', tags: '', features: ''
  });

  const fetchTools = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/tools/my-tools');
      setTools(res.data);
    } catch (error) {
      console.error('Error fetching tools:', error);
      toast.error('Failed to load your tools');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const openEditModal = (tool: Tool) => {
    setSelectedTool(tool);
    setFormData({
      title: tool.title, shortDescription: tool.shortDescription, fullDescription: tool.fullDescription,
      category: tool.category, pricing: tool.pricing, website: tool.website, thumbnail: tool.thumbnail,
      tags: tool.tags.join(', '), features: tool.features.join(', ')
    });
    setEditModalOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTool) return;
    setIsUpdating(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
        features: formData.features.split(',').map((f) => f.trim()).filter(Boolean)
      };
      await api.put(`/tools/${selectedTool._id}`, payload);
      toast.success('Tool updated successfully');
      setEditModalOpen(false);
      fetchTools();
    } catch (error) {
      console.error('Error updating tool:', error);
      toast.error('Failed to update tool');
    } finally {
      setIsUpdating(false);
    }
  };

  const openDeleteModal = (tool: Tool) => {
    setSelectedTool(tool);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedTool) return;
    setIsUpdating(true);
    try {
      await api.delete(`/tools/${selectedTool._id}`);
      toast.success('Tool deleted successfully');
      setDeleteModalOpen(false);
      fetchTools();
    } catch (error) {
      console.error('Error deleting tool:', error);
      toast.error('Failed to delete tool');
    } finally {
      setIsUpdating(false);
    }
  };

  const categoryOptions = [
    { value: 'Writing', label: 'Writing' }, { value: 'Coding', label: 'Coding' },
    { value: 'Design', label: 'Design' }, { value: 'Marketing', label: 'Marketing' },
    { value: 'Productivity', label: 'Productivity' }, { value: 'Research', label: 'Research' },
    { value: 'Video', label: 'Video' }, { value: 'Music', label: 'Music' }
  ];

  const pricingOptions = [
    { value: 'Free', label: 'Free' }, { value: 'Freemium', label: 'Freemium' },
    { value: 'Paid', label: 'Paid' }, { value: 'Enterprise', label: 'Enterprise' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-2">My Tools</h1>
        <p className="text-muted">Manage the AI tools you've submitted to the platform.</p>
      </div>

      <Card className="glass">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)}
            </div>
          ) : tools.length > 0 ? (
            <div className="overflow-x-auto p-2">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th className="py-4 px-6 font-medium">Tool Name</th>
                    <th className="py-4 px-6 font-medium">Category</th>
                    <th className="py-4 px-6 font-medium">Status</th>
                    <th className="py-4 px-6 font-medium">Rating</th>
                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tools.map((tool) => (
                    <tr key={tool._id} className="border-b border-border hover:bg-surface-hover transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img src={tool.thumbnail} alt={tool.title} className="w-10 h-10 rounded-md object-cover bg-surface" />
                          <span className="font-medium text-foreground">{tool.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-muted">{tool.category}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={tool.status === 'approved' ? 'success' : tool.status === 'pending' ? 'warning' : 'error'}
                          >
                            {tool.status}
                          </Badge>
                          {tool.status === 'rejected' && tool.rejectionFeedback && (
                            <div className="group relative">
                              <HelpCircle size={16} className="text-muted hover:text-foreground cursor-help" />
                              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-surface border border-border rounded text-xs text-foreground z-10 whitespace-normal">
                                {tool.rejectionFeedback}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-warning">
                          <Star size={14} fill="currentColor" />
                          <span className="text-sm font-medium">{tool.avgRating.toFixed(1)}</span>
                          <span className="text-xs text-muted">({tool.totalReviews})</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => openEditModal(tool)}>
                            <Edit2 size={16} />
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => openDeleteModal(tool)}>
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16 text-muted">
              <p>You haven't submitted any tools yet.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Tool">
        <form onSubmit={handleUpdate} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input name="title" value={formData.title} onChange={handleEditChange} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Short Description</label>
            <Input name="shortDescription" value={formData.shortDescription} onChange={handleEditChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select name="category" value={formData.category} onChange={handleEditChange} options={categoryOptions} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Pricing</label>
              <Select name="pricing" value={formData.pricing} onChange={handleEditChange} options={pricingOptions} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <Input name="tags" value={formData.tags} onChange={handleEditChange} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Features</label>
            <Input name="features" value={formData.features} onChange={handleEditChange} />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setEditModalOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isUpdating}>{isUpdating ? 'Saving...' : 'Save Changes'}</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Confirm Delete">
        <div className="mt-4">
          <p className="text-muted mb-6">
            Are you sure you want to delete <span className="font-semibold text-foreground">{selectedTool?.title}</span>? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete} disabled={isUpdating}>
              {isUpdating ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}