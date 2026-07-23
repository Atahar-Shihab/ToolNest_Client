'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Shield, Zap, Sparkles, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function CheckoutForm({ clientSecret, onSuccess }: { clientSecret: string, onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        }
      });

      if (error) {
        toast.error(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        await api.post('/payments/confirm', { transactionId: paymentIntent.id });
        toast.success('Payment successful! You are now a Pro member.');
        onSuccess();
      }
    } catch (err) {
      toast.error('An error occurred during payment processing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-8">
      <div className="p-4 bg-surface border border-border rounded-xl shadow-inner">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#fff',
                '::placeholder': { color: '#9ca3af' },
                iconColor: '#00D4FF',
              },
              invalid: { color: '#ef4444', iconColor: '#ef4444' }
            }
          }}
        />
      </div>
      <Button type="submit" disabled={!stripe || loading} className="w-full h-12 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 font-bold shadow-lg">
        {loading ? 'Processing...' : 'Pay $5.00 — Upgrade Now'}
      </Button>
      <p className="text-xs text-center text-muted mt-4 flex items-center justify-center gap-1">
        <Shield className="w-3.5 h-3.5 text-success" /> Encrypted 256-bit payment powered by Stripe
      </p>
    </form>
  );
}

export default function PaymentPage() {
  const { user, loading: authLoading, checkAuth } = useAuth();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState('');
  const [loadingSecret, setLoadingSecret] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchIntent = async () => {
      if (!user || user.isPro) return;
      
      try {
        const { data } = await api.post('/payments/create-intent');
        setClientSecret(data.clientSecret);
      } catch (error) {
        toast.error('Failed to initialize payment.');
      } finally {
        setLoadingSecret(false);
      }
    };

    if (user && !user.isPro) {
      fetchIntent();
    }
  }, [user]);

  const handleSuccess = async () => {
    await checkAuth();
    router.push('/dashboard');
  };

  if (authLoading || (loadingSecret && user && !user.isPro)) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-background">
          <LoadingSpinner label="Initializing secure Stripe checkout..." size="lg" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
          {user?.isPro ? (
            <div className="flex items-center justify-center py-12">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass p-10 rounded-3xl text-center max-w-md w-full border border-primary/30 shadow-2xl relative overflow-hidden space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mx-auto">
                  <Sparkles size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-foreground mb-2">You are a Pro Member!</h2>
                  <p className="text-muted text-sm">Your account already has unlimited Pro privileges, priority features, and a Pro profile badge.</p>
                </div>
                <Button onClick={() => router.push('/dashboard')} className="w-full">
                  Go to Dashboard
                </Button>
              </motion.div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Features Left Column */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
                  <Zap size={14} /> Upgrade Account
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
                  Unlock Full Potential with <span className="text-gradient">ToolNest Pro</span>
                </h1>
                <p className="text-muted text-lg">
                  Get exclusive features, priority tool listings, and a distinctive Pro badge for a one-time lifetime payment.
                </p>

                <div className="space-y-4 pt-2">
                  {[
                    "Access to all premium features and analytics",
                    "Priority listing for your submitted tools",
                    "Exclusive 'Pro' badge on your profile",
                    "Early access to beta features and tools"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="p-1 rounded-full bg-success/10 text-success border border-success/20">
                        <CheckCircle2 size={18} />
                      </div>
                      <span className="text-foreground font-medium text-base">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Stripe Payment Right Column */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8 md:p-10 border border-border shadow-2xl relative"
              >
                <div className="absolute -top-4 -right-4 bg-gradient-to-tr from-primary to-secondary p-3 rounded-2xl shadow-lg text-white">
                  <Zap size={24} />
                </div>

                <div className="text-center pb-6 border-b border-border space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">Lifetime Access</span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-black text-foreground">$5</span>
                    <span className="text-muted font-medium text-sm">/ one-time</span>
                  </div>
                </div>

                {clientSecret && stripePromise ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm clientSecret={clientSecret} onSuccess={handleSuccess} />
                  </Elements>
                ) : (
                  <div className="py-12 text-center text-muted">
                    <LoadingSpinner label="Preparing checkout..." size="sm" />
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}