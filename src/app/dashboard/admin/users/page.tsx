'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Trash2, Shield, User as UserIcon } from 'lucide-react';
import { User } from '@/types'; // assuming types might be global or we can redefine here

interface UserType {
  _id: string;
  name: string;
  email: string;
  photoURL: string;
  role: 'user' | 'admin';
  isPro: boolean;
  createdAt: string;
}

export default function UsersPage() {
  const { user, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/api/users');
      setUsers(data);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const handleRoleChange = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!confirm(`Change this user's role to ${newRole}?`)) return;

    setActionLoading(userId);
    try {
      await api.patch(`/api/users/${userId}/role`, { role: newRole });
      toast.success('Role updated successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update role');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

    setActionLoading(userId);
    try {
      await api.delete(`/api/users/${userId}`);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
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
        <h1 className="text-3xl font-bold text-gradient">Manage Users</h1>
        <p className="text-gray-400 mt-2">View and manage all registered users.</p>
      </div>

      <div className="glass rounded-xl overflow-x-auto border border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 font-semibold text-gray-300">User</th>
              <th className="p-4 font-semibold text-gray-300">Email</th>
              <th className="p-4 font-semibold text-gray-300">Role</th>
              <th className="p-4 font-semibold text-gray-300">Status</th>
              <th className="p-4 font-semibold text-gray-300">Joined Date</th>
              <th className="p-4 font-semibold text-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={u.photoURL || `https://ui-avatars.com/api/?name=${u.name}&background=random`}
                      alt={u.name}
                      className="w-10 h-10 rounded-full border border-white/20"
                    />
                    <span className="font-medium text-white">{u.name}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-400">{u.email}</td>
                <td className="p-4">
                  <Badge variant={u.role === 'admin' ? 'default' : 'secondary'} className="capitalize">
                    {u.role === 'admin' && <Shield className="w-3 h-3 mr-1" />}
                    {u.role === 'user' && <UserIcon className="w-3 h-3 mr-1" />}
                    {u.role}
                  </Badge>
                </td>
                <td className="p-4">
                  {u.isPro ? (
                    <Badge className="bg-secondary/20 text-secondary hover:bg-secondary/30 border-secondary/50">PRO</Badge>
                  ) : (
                    <span className="text-gray-500 text-sm">Standard</span>
                  )}
                </td>
                <td className="p-4 text-gray-400">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRoleChange(u._id, u.role)}
                      disabled={actionLoading === u._id}
                    >
                      Make {u.role === 'admin' ? 'User' : 'Admin'}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(u._id)}
                      disabled={actionLoading === u._id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}