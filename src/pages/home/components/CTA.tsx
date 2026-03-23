import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-brand-green/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-brand-beige/40 to-transparent rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-brand-brown/10 to-transparent rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-caprasimo mb-6 text-brand-black leading-tight">
            Ready to Transform Your Data?
          </h2>
          <p className="text-xl text-brand-grey mb-12 max-w-3xl mx-auto">
            Join thousands of companies already using Insight Flow to make smarter decisions faster
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#" 
              className="bg-brand-green hover:bg-brand-green-light text-white px-10 py-5 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap shadow-lg"
            >
              Start Free Trial
            </a>
            <a 
              href="/contact" 
              className="bg-brand-beige-light hover:bg-brand-beige text-brand-black px-10 py-5 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap border border-brand-beige"
            >
              Contact Sales
            </a>
          </div>

          <p className="mt-8 text-brand-grey">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
