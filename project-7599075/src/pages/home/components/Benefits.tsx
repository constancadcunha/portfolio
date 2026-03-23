import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const benefits = [
  {
    icon: 'ri-flashlight-line',
    title: 'Lightning Fast',
    description: 'Process millions of data points in seconds with our optimized analytics engine built for speed and efficiency.'
  },
  {
    icon: 'ri-brain-line',
    title: 'AI-Powered',
    description: 'Leverage cutting-edge artificial intelligence to automatically discover insights and predict trends in your data.'
  },
  {
    icon: 'ri-lock-2-line',
    title: 'Secure & Compliant',
    description: 'Enterprise-grade security with SOC 2 Type II certification and GDPR compliance to protect your sensitive data.'
  },
  {
    icon: 'ri-gallery-view-2',
    title: 'Intuitive Interface',
    description: 'Beautiful, user-friendly design that makes complex data analysis accessible to everyone on your team.'
  },
  {
    icon: 'ri-team-line',
    title: 'Seamless Collaboration',
    description: 'Work together seamlessly with real-time sharing, comments, and collaborative analytics features.'
  },
  {
    icon: 'ri-customer-service-2-line',
    title: '24/7 Support',
    description: 'Get expert help whenever you need it with our dedicated support team available around the clock.'
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Data Safety',
    description: 'Your data is protected with bank-level encryption, automatic backups, and complete privacy controls.'
  }
];

export default function Benefits() {
  return (
    <section className="relative bg-brand-beige-light overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-caprasimo mb-6 text-brand-black">
            Why Choose Insight Flow
          </h2>
          <p className="text-xl text-brand-grey max-w-3xl mx-auto">
            Experience the next generation of data analytics with our cutting-edge platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Lightning Fast Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative bg-white rounded-2xl p-8 overflow-hidden group hover:shadow-2xl transition-shadow"
          >
            <div className="w-14 h-14 flex items-center justify-center bg-brand-beige-light rounded-xl mb-6 group-hover:bg-brand-green group-hover:scale-110 transition-all">
              <i className={`${benefits[0].icon} text-2xl text-brand-green group-hover:text-white transition-colors`}></i>
            </div>
            <h3 className="text-2xl font-caprasimo mb-4 text-brand-black group-hover:text-brand-green transition-colors">
              {benefits[0].title}
            </h3>
            <p className="text-brand-grey leading-relaxed">{benefits[0].description}</p>
          </motion.div>

          {/* AI-Powered Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative bg-white rounded-2xl p-8 overflow-hidden group hover:shadow-2xl transition-shadow"
          >
            <div className="w-14 h-14 flex items-center justify-center bg-brand-beige-light rounded-xl mb-6 group-hover:bg-brand-green group-hover:scale-110 transition-all">
              <i className={`${benefits[1].icon} text-2xl text-brand-green group-hover:text-white transition-colors`}></i>
            </div>
            <h3 className="text-2xl font-caprasimo mb-4 text-brand-black group-hover:text-brand-green transition-colors">
              {benefits[1].title}
            </h3>
            <p className="text-brand-grey leading-relaxed">{benefits[1].description}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
