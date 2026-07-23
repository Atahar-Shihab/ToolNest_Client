'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Mail, Lock, User, Image as ImageIcon, ArrowRight, UserPlus, Sparkles } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await api.post('/auth/register', { name, email, password, photoURL });
      login(data.token, data.user);
      toast.success('Account created successfully!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setIsLoading(true);
      const { data } = await api.post('/auth/google', { 
        credential: credentialResponse.credential 
      });
      login(data.token, data.user);
      toast.success('Signed up with Google!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Google signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'dummy'}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass rounded-3xl p-8 shadow-[0_0_50px_rgba(139,92,246,0.12)] border border-white/10 relative overflow-hidden backdrop-blur-2xl"
      >
        {/* Top Feature Pill */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-semibold text-secondary">
            <Sparkles size={13} />
            <span>Join 10,000+ AI Enthusiasts</span>
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-8 space-y-1">
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Create an Account</h1>
          <p className="text-muted text-sm">Start discovering, reviewing, & bookmarking AI tools</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                <User size={18} />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface/60 border border-border rounded-xl py-2.5 pl-11 pr-4 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-sm"
                placeholder="Jane Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface/60 border border-border rounded-xl py-2.5 pl-11 pr-4 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-sm"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface/60 border border-border rounded-xl py-2.5 pl-11 pr-4 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">Profile Photo URL (Optional)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                <ImageIcon size={18} />
              </div>
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full bg-surface/60 border border-border rounded-xl py-2.5 pl-11 pr-4 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-sm"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-secondary to-primary hover:opacity-95 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-secondary/20 flex justify-center items-center gap-2 disabled:opacity-50 text-base mt-2"
          >
            {isLoading ? 'Creating Account...' : (
              <>
                Create Account <UserPlus size={18} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-border" />
          <span className="px-3 text-xs font-semibold text-muted uppercase tracking-wider">Or register with</span>
          <div className="flex-1 border-t border-border" />
        </div>

        {/* Google OAuth Login */}
        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error('Google signup failed')}
            useOneTap={false}
            theme="filled_black"
            shape="pill"
          />
        </div>

        {/* Footer Link */}
        <p className="text-center text-muted text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-secondary hover:underline font-semibold inline-flex items-center ml-1">
            Sign in <ArrowRight size={14} className="ml-1" />
          </Link>
        </p>
      </motion.div>
    </GoogleOAuthProvider>
  );
}