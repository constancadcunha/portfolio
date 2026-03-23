import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="py-24 bg-brand-beige-light">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-caprasimo mb-6 text-brand-black">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-brand-grey mb-12 max-w-3xl mx-auto">
            Experience all these powerful features with our 14-day free trial
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="/" 
              className="bg-brand-green hover:bg-brand-green-light text-white px-10 py-5 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap shadow-lg"
            >
              Start Free Trial
            </a>
            <a 
              href="/contact" 
              className="bg-white hover:bg-brand-beige text-brand-black px-10 py-5 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap border border-brand-beige"
            >
              Contact Sales
            </a>
          </div>

          <p className="mt-8 text-brand-grey">
            No credit card required • Full access to all features • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
