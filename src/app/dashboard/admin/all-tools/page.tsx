'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Check, X, Trash2, Star, Link as LinkIcon } from 'lucide-react';
import { Tool } from '@/types';

type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected';

export default function AllToolsPage() {
  const { user, loading: authLoading } = useAuth();
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectingId, setRejectingId] = useState('');
  const [rejectionFeedback, setRejectionFeedback] = useState('');

  const fetchTools = async () => {
    setLoading(true);
    try {
      const statusQuery = statusFilter !== 'all' ? `&status=${statusFilter}` : '';
      const { data } = await api.get(`/api/tools?limit=100${statusQuery}`);
      setTools(data.tools || []);
    } catch (error) {
      toast.error('Failed to fetch tools');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchTools();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading, statusFilter]);

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected', feedback?: string) => {
    setActionLoading(id);
    try {
      await api.patch(`/api/tools/${id}/status`, { status, rejectionFeedback: feedback });
      toast.success(`Tool ${status} successfully`);
      fetchTools();
      setRejectModalOpen(false);
      setRejectionFeedback('');
    } catch (error) {
      toast.error(`Failed to update tool status`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleFeature = async (id: string) => {
    setActionLoading(id);
    try {
      await api.patch(`/api/tools/${id}/feature`, {});
      toast.success('Tool feature status updated');
      fetchTools();
    } catch (error) {
      toast.error('Failed to update feature status');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tool?')) return;
    setActionLoading(id);
    try {
      await api.delete(`/api/tools/${id}`);
      toast.success('Tool deleted successfully');
      fetchTools();
    } catch (error) {
      toast.error('Failed to delete tool');
    } finally {
      setActionLoading(null);
    }
  };

  const openRejectModal = (id: string) => {
    setRejectingId(id);
    setRejectModalOpen(true);
  };

  if (authLoading || (loading && tools.length === 0)) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Manage Tools</h1>
          <p className="text-gray-400 mt-2">Approve, reject, or feature submitted tools.</p>
        </div>
        
        <div className="flex space-x-2 bg-white/5 p-1 rounded-lg border border-white/10">
          {(['all', 'pending', 'approved', 'rejected'] as StatusFilter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                statusFilter === filter
                  ? 'bg-primary text-black'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="glass rounded-xl overflow-x-auto border border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 font-semibold text-gray-300">Tool</th>
              <th className="p-4 font-semibold text-gray-300">Category</th>
              <th className="p-4 font-semibold text-gray-300">Status</th>
              <th className="p-4 font-semibold text-gray-300">Featured</th>
              <th className="p-4 font-semibold text-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="relative">
            {loading && tools.length > 0 && (
              <tr className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center backdrop-blur-sm">
                <td><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></td>
              </tr>
            )}
            {tools.map((tool) => (
              <tr key={tool._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={tool.thumbnail || 'https://via.placeholder.com/40'}
                      alt={tool.title}
                      className="w-10 h-10 rounded-md border border-white/20 object-cover"
                    />
                    <div>
                      <div className="font-medium text-white flex items-center gap-2">
                        {tool.title}
                        <a href={tool.website} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary">
                          <LinkIcon className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="text-xs text-gray-500">
                        by {typeof tool.submittedBy === 'object' ? tool.submittedBy?.name : 'Unknown'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-400">{tool.category}</td>
                <td className="p-4">
                  <Badge
                    variant={
                      tool.status === 'approved' ? 'default' :
                      tool.status === 'rejected' ? 'destructive' : 'secondary'
                    }
                    className={
                      tool.status === 'approved' ? 'bg-success/20 text-success border-success/50' :
                      tool.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' : ''
                    }
                  >
                    {tool.status}
                  </Badge>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleToggleFeature(tool._id)}
                    disabled={actionLoading === tool._id}
                    className={`p-2 rounded-full transition-colors ${
                      tool.isFeatured ? 'text-yellow-400 bg-yellow-400/20' : 'text-gray-500 hover:bg-white/10'
                    }`}
                  >
                    <Star className={`w-5 h-5 ${tool.isFeatured ? 'fill-yellow-400' : ''}`} />
                  </button>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {tool.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(tool._id, 'approved')}
                          disabled={actionLoading === tool._id}
                          className="bg-success hover:bg-success/80 text-white"
                        >
                          <Check className="w-4 h-4 mr-1" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => openRejectModal(tool._id)}
                          disabled={actionLoading === tool._id}
                        >
                          <X className="w-4 h-4 mr-1" /> Reject
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                      onClick={() => handleDelete(tool._id)}
                      disabled={actionLoading === tool._id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {tools.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No tools found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={rejectModalOpen} onClose={() => setRejectModalOpen(false)} title="Reject Tool">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Rejection Feedback</label>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors min-h-[100px]"
              placeholder="Explain why this tool is being rejected..."
              value={rejectionFeedback}
              onChange={(e) => setRejectionFeedback(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setRejectModalOpen(false)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => handleStatusUpdate(rejectingId, 'rejected', rejectionFeedback)}
              disabled={!rejectionFeedback.trim()}
            >
              Confirm Reject
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}