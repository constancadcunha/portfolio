
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How does AI automation work?',
      answer: 'Our AI automation platform uses advanced machine learning algorithms to analyze your business processes, identify repetitive tasks, and create intelligent workflows that execute automatically. The system learns from your operations and continuously optimizes performance over time.'
    },
    {
      question: 'Is my data secure with Insight Flow?',
      answer: 'Absolutely. We employ enterprise-grade security measures including end-to-end encryption, SOC 2 Type II compliance, and regular security audits. Your data is stored in secure, redundant data centers and we never share your information with third parties.'
    },
    {
      question: 'How long does implementation take?',
      answer: 'Most businesses are up and running within 24-48 hours. Our onboarding process is streamlined and our team provides hands-on support to ensure a smooth transition. Complex enterprise implementations typically take 1-2 weeks.'
    },
    {
      question: 'Can I integrate Insight Flow with my existing tools?',
      answer: 'Yes! Insight Flow integrates seamlessly with over 500+ popular business tools including Salesforce, HubSpot, Slack, Microsoft 365, Google Workspace, and many more. We also offer custom API integrations for enterprise clients.'
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'We provide comprehensive support including 24/7 email support for all plans, priority support for Professional plans, and dedicated account managers for Enterprise clients. We also offer extensive documentation, video tutorials, and regular training webinars.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time with no penalties or hidden fees. If you cancel, you\'ll continue to have access to your account until the end of your current billing period.'
    }
  ];

  return (
    <section className="py-24 bg-brand-beige-light">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-caprasimo mb-6 text-brand-black">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-brand-grey">
            Everything you need to know about Insight Flow
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`bg-white rounded-xl overflow-hidden transition-all border-2 ${
                openIndex === index ? 'border-brand-green shadow-lg' : 'border-brand-beige'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-brand-beige-light/50 transition-colors cursor-pointer"
              >
                <span className={`text-lg font-semibold pr-8 transition-colors ${
                  openIndex === index ? 'text-brand-green' : 'text-brand-black'
                }`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 transition-all ${
                  openIndex === index ? 'bg-brand-green rotate-180' : 'bg-brand-beige-light'
                }`}>
                  <i className={`ri-arrow-down-s-line text-xl ${
                    openIndex === index ? 'text-white' : 'text-brand-green'
                  }`}></i>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 text-brand-grey leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
