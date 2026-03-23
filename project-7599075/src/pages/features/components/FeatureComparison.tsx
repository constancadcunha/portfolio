import { motion } from 'framer-motion';

const plans = [
  { name: 'Insight Flow', price: 49, popular: true },
  { name: 'Competitor A', price: 79, popular: false },
  { name: 'Competitor B', price: 99, popular: false }
];

const featuresList = [
  { name: 'AI-Powered Insights', availability: [true, false, 'Limited'] },
  { name: 'Real-time Analytics', availability: [true, true, false] },
  { name: 'Natural Language Queries', availability: [true, false, false] },
  { name: 'Predictive Analytics', availability: [true, 'Limited', true] },
  { name: 'Custom Dashboards', availability: ['Unlimited', '10', '5'] },
  { name: 'Data Sources', availability: ['100+', '50+', '25+'] },
  { name: 'Team Collaboration', availability: [true, true, 'Limited'] },
  { name: 'Mobile App', availability: [true, true, false] },
  { name: 'API Access', availability: [true, 'Enterprise only', true] },
  { name: 'White-label Options', availability: [true, false, 'Enterprise only'] },
  { name: 'Setup Time', availability: ['5 minutes', '2 hours', '1 day'] },
  { name: 'Support Response', availability: ['< 1 hour', '24 hours', '48 hours'] }
];

export default function FeatureComparison() {
  const features = [
    { name: 'AI-Powered Insights', us: 'yes', competitorA: 'no', competitorB: 'Limited' },
    { name: 'Real-time Analytics', us: 'yes', competitorA: 'yes', competitorB: 'no' },
    { name: 'Natural Language Queries', us: 'yes', competitorA: 'no', competitorB: 'no' },
    { name: 'Predictive Analytics', us: 'yes', competitorA: 'Limited', competitorB: 'yes' },
    { name: 'Custom Dashboards', us: 'Unlimited', competitorA: '10', competitorB: '5' },
    { name: 'Data Sources', us: '100+', competitorA: '50+', competitorB: '25+' },
    { name: 'Team Collaboration', us: 'yes', competitorA: 'yes', competitorB: 'Limited' },
    { name: 'Mobile App', us: 'yes', competitorA: 'yes', competitorB: 'no' },
    { name: 'API Access', us: 'yes', competitorA: 'Enterprise only', competitorB: 'yes' },
    { name: 'White-label Options', us: 'yes', competitorA: 'no', competitorB: 'Enterprise only' },
    { name: 'Setup Time', us: '5 minutes', competitorA: '2 hours', competitorB: '1 day' },
    { name: 'Support Response', us: '&lt; 1 hour', competitorA: '24 hours', competitorB: '48 hours' }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-caprasimo mb-6 text-brand-black">
            Feature Comparison
          </h2>
          <p className="text-xl text-brand-grey max-w-3xl mx-auto">
            Choose the plan that's right for your needs
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-brand-beige-light">
                <th className="text-left p-6 text-brand-black font-caprasimo text-lg border border-brand-beige">
                  Feature
                </th>
                {plans.map((plan, index) => (
                  <th
                    key={index}
                    className={`p-6 text-center border border-brand-beige ${
                      plan.popular ? 'bg-brand-green text-white' : 'text-brand-black'
                    }`}
                  >
                    <div className="font-caprasimo text-xl mb-1">{plan.name}</div>
                    <div className={`text-sm ${plan.popular ? 'text-white/80' : 'text-brand-grey'}`}>
                      ${plan.price}/mo
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featuresList.map((feature, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="border-b border-brand-beige hover:bg-brand-beige-light/50 transition-colors"
                >
                  <td className="p-6 text-brand-grey border-r border-brand-beige">
                    {feature.name}
                  </td>
                  {feature.availability.map((available, planIndex) => (
                    <td
                      key={planIndex}
                      className="p-6 text-center border-r border-brand-beige"
                    >
                      {available === true ? (
                        <i className="ri-check-line text-2xl text-brand-green"></i>
                      ) : available === false ? (
                        <i className="ri-close-line text-2xl text-brand-grey/30"></i>
                      ) : (
                        <span className="text-brand-grey text-sm">{available}</span>
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a 
            href="/pricing" 
            className="inline-block bg-brand-green hover:bg-brand-green-light text-white px-10 py-4 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap shadow-lg"
          >
            View Full Pricing
          </a>
        </motion.div>
      </div>
    </section>
  );
}