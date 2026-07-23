'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { User, Shield, Crown, Calendar, Layers } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalTools: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/tools/my-tools');
        setStats({ totalTools: res.data.length });
      } catch (error) {
        console.error('Error fetching profile stats:', error);
      }
    };
    if (user) fetchStats();
  }, [user]);

  if (!user) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-2">My Profile</h1>
        <p className="text-muted">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Identity Card */}
        <Card className="glass md:col-span-1">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <div className="relative mb-6">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.name} 
                  className="w-32 h-32 rounded-full object-cover border-4 border-surface" 
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-surface-hover flex items-center justify-center border-4 border-surface">
                  <User size={48} className="text-muted" />
                </div>
              )}
              {user.isPro && (
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 p-2 rounded-full border-4 border-background">
                  <Crown size={20} className="text-black" />
                </div>
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-1">{user.name}</h2>
            <p className="text-muted mb-4">{user.email}</p>
            
            <div className="flex gap-2 justify-center mb-6">
              <Badge variant={user.role === 'admin' ? 'warning' : 'default'} className="gap-1 px-3 py-1 text-sm">
                <Shield size={14} />
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
              <Badge variant={user.isPro ? 'success' : 'outline'} className="gap-1 px-3 py-1 text-sm border-border">
                {user.isPro ? 'Pro Member' : 'Free Plan'}
              </Badge>
            </div>
            
            {!user.isPro && (
              <Link href="/payment" className="w-full">
                <Button className="w-full gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black border-none">
                  <Crown size={16} />
                  Upgrade to Pro
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="md:col-span-2 space-y-6">
          <Card className="glass h-full">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6 pb-4 border-b border-border">Account Details</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted font-medium">Full Name</p>
                    <p className="text-lg font-medium text-foreground">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                    <Layers size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted font-medium">Tools Submitted</p>
                    <p className="text-lg font-medium text-foreground">{stats.totalTools} tools</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-success/10 text-success">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted font-medium">Member Since</p>
                    <p className="text-lg font-medium text-foreground">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-warning/10 text-warning">
                    <Shield size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted font-medium">Login Method</p>
                    <p className="text-lg font-medium text-foreground capitalize">
                      {user.authProvider} Account
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}