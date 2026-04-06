'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';

const socials = [
  {
    name: 'Instagram',
    handle: '@thecarjournal',
    followers: '125K',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    color: 'hover:text-pink-500',
  },
  {
    name: 'YouTube',
    handle: '/thecarjournal',
    followers: '89K',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
    color: 'hover:text-red-500',
  },
  {
    name: 'Twitter',
    handle: '@thecarjournal',
    followers: '45K',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: 'hover:text-blue-400',
  },
  {
    name: 'Facebook',
    handle: '/thecarjournal',
    followers: '67K',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    color: 'hover:text-blue-600',
  },
];

export function Socials() {
  return (
    <Section id="socials" dark={true} className="py-16 sm:py-20 md:py-24">
      <motion.div
        className="text-center mb-10 sm:mb-12 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-text-primary mb-3 sm:mb-4">
          Join Our Community
        </h2>
        <p className="text-text-secondary max-w-xl mx-auto px-2 text-sm sm:text-base">
          Follow us across all platforms for daily automotive content, behind-the-scenes 
          access, and community discussions.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto px-2">
        {socials.map((social, index) => (
          <motion.a
            key={social.name}
            href="#"
            className="group p-4 sm:p-6 md:p-8 glass-effect rounded-sm text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <motion.div
              className={`inline-flex items-center justify-center mb-3 sm:mb-4 text-text-secondary transition-colors ${social.color}`}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            >
              {social.icon}
            </motion.div>
            <h3 className="font-serif text-sm sm:text-base md:text-lg font-semibold text-text-primary mb-0.5 sm:mb-1 group-hover:text-accent-gold transition-colors">
              {social.name}
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary mb-1 sm:mb-2">{social.handle}</p>
            <p className="text-[10px] sm:text-xs text-accent-gold font-mono">{social.followers} followers</p>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
