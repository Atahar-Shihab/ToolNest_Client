'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await api.post('/auth/login', { email, password });
      login(data.token, data.user);
      toast.success('Logged in successfully!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.post('/auth/login', { 
        email: 'user@toolnest.com', 
        password: 'User123!' 
      });
      login(data.token, data.user);
      toast.success('Logged in as Demo User!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Demo login failed');
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
      toast.success('Logged in with Google!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Google login failed');
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
        className="glass rounded-3xl p-8 shadow-[0_0_50px_rgba(0,212,255,0.12)] border border-white/10 relative overflow-hidden backdrop-blur-2xl"
      >
        {/* Top Feature Pill */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
            <Sparkles size={13} />
            <span>AI Tool Discovery Hub</span>
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-8 space-y-1">
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Welcome Back</h1>
          <p className="text-muted text-sm">Sign in to manage, review & bookmark AI tools</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface/60 border border-border rounded-xl py-3 pl-11 pr-4 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted">Password</label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface/60 border border-border rounded-xl py-3 pl-11 pr-4 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 flex justify-center items-center gap-2 disabled:opacity-50 text-base"
          >
            {isLoading ? 'Signing in...' : (
              <>
                Sign In <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        {/* Demo Admin Quick Login Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full glass hover:bg-surface-hover text-foreground font-semibold py-3 rounded-xl border border-border transition-all flex items-center justify-center gap-2 text-sm"
          >
            <UserCheck size={18} className="text-primary" />
            <span>Try Demo Account</span>
          </button>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-border" />
          <span className="px-3 text-xs font-semibold text-muted uppercase tracking-wider">Or continue with</span>
          <div className="flex-1 border-t border-border" />
        </div>

        {/* Google OAuth Login */}
        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error('Google login failed')}
            useOneTap={false}
            theme="filled_black"
            shape="pill"
          />
        </div>

        {/* Footer Link */}
        <p className="text-center text-muted text-sm">
          Don't have an account?{' '}
          <Link href="/register" className="text-primary hover:underline font-semibold inline-flex items-center ml-1">
            Sign up <ArrowRight size={14} className="ml-1" />
          </Link>
        </p>
      </motion.div>
    </GoogleOAuthProvider>
  );
}