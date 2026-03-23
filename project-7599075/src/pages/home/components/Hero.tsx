import { motion } from 'framer-motion';
import OrbAnimation from './OrbAnimation';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <OrbAnimation />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8"
          >
            <i className="ri-sparkling-line text-white"></i>
            <span className="text-sm text-white font-medium">AI-Powered Business Intelligence</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6" style={{ letterSpacing: '0.02em' }}>
            Transform data into
            <br />
            <span className="text-white/90">human insights</span>
          </h1>

          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
            Discover the human story behind your business data. Our AI-powered platform reveals deep insights into customer behavior, sentiment, and engagement patterns.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a href="#signup" className="bg-white hover:bg-white/90 text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap shadow-lg">
              Start free trial
            </a>
            <a href="#demo" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap border-2 border-white/30">
              Watch demo
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <i className="ri-check-line text-white"></i>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-check-line text-white"></i>
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-check-line text-white"></i>
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
