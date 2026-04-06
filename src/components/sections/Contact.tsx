'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Send, CheckCircle } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Section id="contact" dark={false} className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/5 to-transparent" />
      
      <SectionHeader
        title="Get In Touch"
        subtitle="Have a story tip, want to collaborate, or just want to say hello? We'd love to hear from you."
        dark={false}
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-0">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              className="text-center py-12 sm:py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-6 rounded-full bg-green-500/10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <CheckCircle size={32} className="sm:w-10 sm:h-10 text-green-500" />
              </motion.div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-text-dark mb-3 sm:mb-4">
                Message Sent!
              </h3>
              <p className="text-text-dark-secondary text-sm sm:text-base">
                Thank you for reaching out. We'll get back to you within 24-48 hours.
              </p>
              <motion.button
                onClick={() => setIsSubmitted(false)}
                className="mt-6 sm:mt-8 px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-text-dark text-text-dark font-semibold hover:bg-text-dark hover:text-bg-light transition-all text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Another Message
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-6 sm:space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <Input
                  label="Your Name"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  error={errors.name}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={errors.email}
                />
              </div>
              
              <Textarea
                label="Your Message"
                placeholder="Tell us what's on your mind..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                error={errors.message}
              />

              <motion.div
                className="pt-2 sm:pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        className="w-5 h-5 border-2 border-bg-primary/30 border-t-bg-primary rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message
                      <Send size={18} />
                    </span>
                  )}
                </Button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-10 md:pt-12 border-t border-glass-border"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center px-4 sm:px-0">
          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold text-text-dark mb-1 sm:mb-2">Email</h4>
            <p className="text-accent-copper text-sm sm:text-base">hello@thecarjournal.com</p>
          </div>
          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold text-text-dark mb-1 sm:mb-2">Location</h4>
            <p className="text-text-dark-secondary text-sm sm:text-base">Los Angeles, California</p>
          </div>
          <div>
            <h4 className="font-serif text-base sm:text-lg font-semibold text-text-dark mb-1 sm:mb-2">Response Time</h4>
            <p className="text-text-dark-secondary text-sm sm:text-base">Within 24-48 hours</p>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
