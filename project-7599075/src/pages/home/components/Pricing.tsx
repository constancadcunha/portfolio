import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

export default function Pricing() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const plans = [
    {
      name: 'Starter',
      price: '49',
      description: 'Perfect for small teams getting started with human insights',
      features: [
        'Up to 10,000 interactions/month',
        'Basic behavioral analytics',
        'Email support',
        '7-day data retention',
        'Standard integrations'
      ],
      highlighted: false
    },
    {
      name: 'Professional',
      price: '149',
      description: 'Advanced insights for growing businesses',
      features: [
        'Up to 100,000 interactions/month',
        'Advanced sentiment analysis',
        'Priority support',
        '90-day data retention',
        'All integrations',
        'Custom dashboards',
        'API access'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Unlimited power for large organizations',
      features: [
        'Unlimited interactions',
        'Predictive analytics',
        'Dedicated support',
        'Unlimited data retention',
        'Custom integrations',
        'White-label options',
        'SLA guarantee',
        'On-premise deployment'
      ],
      highlighted: false
    }
  ];

  return (
    <section ref={ref} className="relative py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-gray-900 mb-4" style={{ letterSpacing: '0.02em' }}>
            Simple, transparent pricing
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white border rounded-2xl p-8 ${
                plan.highlighted 
                  ? 'border-gray-900 shadow-xl' 
                  : 'border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gray-900 text-white px-4 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                    Most popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-sm text-gray-600 mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-gray-900">${plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-gray-600 ml-2">/month</span>}
              </div>

              <a 
                href="#signup" 
                className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap mb-8 ${
                  plan.highlighted
                    ? 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200'
                }`}
              >
                {plan.price === 'Custom' ? 'Contact sales' : 'Start free trial'}
              </a>

              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <i className="ri-check-line text-gray-700 text-lg mt-0.5"></i>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
