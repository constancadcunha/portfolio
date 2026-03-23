import { motion } from 'framer-motion';
import PageNavbar from '../../components/feature/PageNavbar';
import Footer from '../home/components/Footer';
import FeatureComparison from '../features/components/FeatureComparison';
import { useState } from 'react';
import CloudsBackground from './components/CloudsBackground';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small teams getting started',
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        'Up to 5 team members',
        '10,000 data points/month',
        'Basic analytics',
        'Email support',
        '7-day data retention',
        'Standard integrations'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional',
      description: 'For growing teams with advanced needs',
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        'Up to 25 team members',
        '100,000 data points/month',
        'Advanced analytics',
        'Priority support',
        '90-day data retention',
        'All integrations',
        'Custom dashboards',
        'API access'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For large organizations at scale',
      monthlyPrice: null,
      annualPrice: null,
      features: [
        'Unlimited team members',
        'Unlimited data points',
        'AI-powered insights',
        'Dedicated support',
        'Unlimited data retention',
        'Custom integrations',
        'White-label options',
        'SLA guarantee',
        'Advanced security',
        'Custom training'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

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

  return (
    <div className="min-h-screen bg-white">
      <PageNavbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        {/* Animated Clouds Background */}
        <CloudsBackground />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-caprasimo mb-6 text-brand-black">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-brand-grey max-w-3xl mx-auto">
              Choose the perfect plan for your business. All plans include our core features with flexible options to scale as you grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative bg-white rounded-2xl p-8 border-2 ${
                  plan.popular
                    ? 'border-brand-green shadow-2xl scale-105'
                    : 'border-brand-beige hover:border-brand-green hover:shadow-xl'
                } transition-all cursor-pointer`}
              >
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <div className="bg-brand-green text-white px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
                      Most Popular
                    </div>
                  </motion.div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-caprasimo text-brand-black mb-2">{plan.name}</h3>
                  <p className="text-brand-grey">{plan.description}</p>
                </div>

                <div className="mb-8">
                  {plan.monthlyPrice ? (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-brand-black">
                          ${billingCycle === 'monthly' ? plan.monthlyPrice : Math.floor(plan.annualPrice / 12)}
                        </span>
                        <span className="text-brand-grey">/month</span>
                      </div>
                      {billingCycle === 'annual' && (
                        <p className="text-sm text-brand-grey mt-2">
                          Billed annually (${plan.annualPrice}/year)
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="text-3xl font-caprasimo text-brand-black">Custom</div>
                  )}
                </div>

                <motion.a
                  href={plan.monthlyPrice ? '/' : '/contact'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`block w-full text-center py-4 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap mb-8 ${
                    plan.popular
                      ? 'bg-brand-green hover:bg-brand-green-light text-white shadow-lg'
                      : 'bg-brand-beige-light hover:bg-brand-green hover:text-white text-brand-black border border-brand-beige'
                  }`}
                >
                  {plan.cta}
                </motion.a>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div 
                      key={featureIndex} 
                      className="flex items-start gap-3 group/feature"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                    >
                      <motion.div 
                        className="w-5 h-5 flex items-center justify-center bg-brand-beige-light rounded-full flex-shrink-0 mt-0.5 group-hover/feature:bg-brand-green transition-all"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.i 
                          className="ri-check-line text-xs text-brand-green group-hover/feature:text-white transition-colors"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + featureIndex * 0.05 + 0.2, type: "spring", stiffness: 500 }}
                        ></motion.i>
                      </motion.div>
                      <span className="text-brand-grey group-hover/feature:text-brand-black transition-colors">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-brand-beige-light py-24">
        <div className="max-w-7xl mx-auto px-6">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all border border-brand-beige hover:border-brand-green"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-brand-beige-light rounded-xl mb-6 group-hover:bg-brand-green group-hover:scale-110 transition-all">
                  <i className={`${benefit.icon} text-2xl text-brand-green group-hover:text-white transition-colors`}></i>
                </div>
                <h3 className="text-xl font-caprasimo mb-3 text-brand-black group-hover:text-brand-green transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-brand-grey leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <FeatureComparison />

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-caprasimo mb-6 text-brand-black">Frequently asked questions</h2>
            <p className="text-xl text-brand-grey">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'Can I change plans later?',
                answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any differences.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and offer invoicing for annual Enterprise plans.'
              },
              {
                question: 'Is there a free trial?',
                answer: 'Yes! All plans come with a 14-day free trial. No credit card required to start.'
              },
              {
                question: 'What happens when I exceed my data limit?',
                answer: 'We\'ll notify you when you\'re approaching your limit. You can upgrade your plan or purchase additional data points as needed.'
              },
              {
                question: 'Do you offer discounts for nonprofits?',
                answer: 'Yes! We offer special pricing for nonprofits and educational institutions. Contact our sales team for details.'
              },
              {
                question: 'Can I cancel anytime?',
                answer: 'Absolutely. You can cancel your subscription at any time with no penalties. Your data will remain accessible for 30 days after cancellation.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-brand-beige-light rounded-xl p-8 border border-brand-beige"
              >
                <h3 className="text-xl font-semibold text-brand-black mb-3">{faq.question}</h3>
                <p className="text-brand-grey leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-beige-light">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div>
            <h2 className="text-5xl font-caprasimo text-brand-black mb-6">
              Still have questions?
            </h2>
            <p className="text-xl text-brand-grey mb-10 max-w-2xl mx-auto">
              Our team is here to help. Schedule a call to discuss your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="/contact" 
                className="bg-brand-green hover:bg-brand-green-light text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap shadow-lg"
              >
                Contact Sales
              </a>
              <a 
                href="/" 
                className="bg-white hover:bg-brand-beige text-brand-black px-10 py-4 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap border border-brand-beige"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
