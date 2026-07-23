'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';
import { Tool, Review } from '@/types';
import toast from 'react-hot-toast';
import { Layers, CheckCircle, Clock, MessageSquare, Star } from 'lucide-react';

export default function DashboardHome() {
  const { user } = useAuth();
  const [tools, setTools] = useState<Tool[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [toolsRes, reviewsRes] = await Promise.all([
          api.get('/tools/my-tools'),
          api.get('/reviews/my-reviews'),
        ]);
        setTools(toolsRes.data);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const approvedToolsCount = tools.filter(t => t.status === 'approved').length;
  const pendingToolsCount = tools.filter(t => t.status === 'pending').length;
  const recentTools = [...tools].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  const statCards = [
    { title: 'Total Tools', value: tools.length, icon: Layers, color: 'text-primary' },
    { title: 'Approved', value: approvedToolsCount, icon: CheckCircle, color: 'text-success' },
    { title: 'Pending', value: pendingToolsCount, icon: Clock, color: 'text-warning' },
    { title: 'Total Reviews', value: reviews.length, icon: MessageSquare, color: 'text-secondary' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-muted">Here's an overview of your tools and activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)
          : statCards.map((stat, i) => (
              <Card key={i} className="glass">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-muted text-sm font-medium mb-1">{stat.title}</p>
                    <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                  </div>
                  <div className={`p-4 rounded-full bg-surface ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Recent Tools</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)}
            </div>
          ) : recentTools.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th className="py-3 px-4 font-medium">Tool Name</th>
                    <th className="py-3 px-4 font-medium">Category</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTools.map((tool) => (
                    <tr key={tool._id} className="border-b border-border hover:bg-surface-hover transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">{tool.title}</td>
                      <td className="py-3 px-4 text-muted">{tool.category}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={tool.status === 'approved' ? 'success' : tool.status === 'pending' ? 'warning' : 'error'}
                        >
                          {tool.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 text-warning">
                          <Star size={14} fill="currentColor" />
                          <span className="text-sm font-medium">{tool.avgRating.toFixed(1)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted">
              <Layers className="mx-auto mb-3 opacity-20" size={48} />
              <p>No tools submitted yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}