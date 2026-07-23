'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AddToolPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    category: 'Writing',
    pricing: 'Free',
    website: '',
    thumbnail: '',
    tags: '',
    features: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
        features: formData.features.split(',').map((f) => f.trim()).filter(Boolean)
      };
      
      await api.post('/tools', payload);
      toast.success('Tool submitted successfully!');
      router.push('/dashboard/my-tools');
    } catch (error) {
      console.error('Error submitting tool:', error);
      toast.error('Failed to submit tool');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = [
    { value: 'Writing', label: 'Writing' },
    { value: 'Coding', label: 'Coding' },
    { value: 'Design', label: 'Design' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Productivity', label: 'Productivity' },
    { value: 'Research', label: 'Research' },
    { value: 'Video', label: 'Video' },
    { value: 'Music', label: 'Music' }
  ];

  const pricingOptions = [
    { value: 'Free', label: 'Free' },
    { value: 'Freemium', label: 'Freemium' },
    { value: 'Paid', label: 'Paid' },
    { value: 'Enterprise', label: 'Enterprise' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-2">Submit a New Tool</h1>
        <p className="text-muted">Share an AI tool with the community. It will be reviewed before appearing public.</p>
      </div>

      <Card className="glass">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="Tool Name" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Website URL</label>
                <Input 
                  name="website" 
                  type="url"
                  value={formData.website} 
                  onChange={handleChange} 
                  placeholder="https://example.com" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Short Description</label>
              <Input 
                name="shortDescription" 
                value={formData.shortDescription} 
                onChange={handleChange} 
                placeholder="A brief summary of what the tool does" 
                required 
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Full Description</label>
              <textarea 
                name="fullDescription" 
                value={formData.fullDescription} 
                onChange={handleChange} 
                placeholder="Detailed description of features and benefits" 
                required 
                rows={4}
                className="flex w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm ring-offset-background placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  options={categoryOptions}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Pricing</label>
                <Select 
                  name="pricing" 
                  value={formData.pricing} 
                  onChange={handleChange} 
                  options={pricingOptions}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Thumbnail URL</label>
              <Input 
                name="thumbnail" 
                type="url"
                value={formData.thumbnail} 
                onChange={handleChange} 
                placeholder="https://example.com/image.jpg" 
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tags (comma-separated)</label>
              <Input 
                name="tags" 
                value={formData.tags} 
                onChange={handleChange} 
                placeholder="AI, Writing, Assistant" 
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.split(',').map((tag, i) => tag.trim() && (
                  <span key={i} className="text-xs px-2 py-1 bg-surface-hover rounded-full text-muted">{tag.trim()}</span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Features (comma-separated)</label>
              <Input 
                name="features" 
                value={formData.features} 
                onChange={handleChange} 
                placeholder="Content generation, SEO optimization" 
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.features.split(',').map((feature, i) => feature.trim() && (
                  <span key={i} className="text-xs px-2 py-1 bg-surface-hover rounded-full text-muted">{feature.trim()}</span>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Tool'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}