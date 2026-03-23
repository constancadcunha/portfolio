import { motion } from 'framer-motion';

export default function CoreFeatures() {
  const features = [
    {
      icon: 'ri-brain-line',
      title: 'AI-Powered Insights',
      description: 'Advanced machine learning algorithms analyze your data in real-time, uncovering patterns and trends that would take humans weeks to discover.',
      stats: '10x faster analysis'
    },
    {
      icon: 'ri-dashboard-line',
      title: 'Intuitive Dashboards',
      description: 'Beautiful, customizable dashboards that make complex data easy to understand. Drag-and-drop widgets, real-time updates, and responsive design.',
      stats: '50+ widget types'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Predictive Analytics',
      description: 'Forecast future trends with confidence using our state-of-the-art predictive models. Make data-driven decisions before your competition.',
      stats: '95% accuracy rate'
    },
    {
      icon: 'ri-team-line',
      title: 'Team Collaboration',
      description: 'Share insights, create reports, and collaborate seamlessly with your team. Real-time commenting, version control, and role-based access.',
      stats: 'Unlimited team members'
    },
    {
      icon: 'ri-notification-line',
      title: 'Smart Alerts',
      description: 'Never miss important changes in your data. Set up custom alerts and get notified instantly via email, Slack, or mobile push notifications.',
      stats: 'Real-time notifications'
    },
    {
      icon: 'ri-database-2-line',
      title: 'Data Integration',
      description: 'Connect to 100+ data sources including databases, APIs, spreadsheets, and cloud services. Automated syncing keeps your data fresh.',
      stats: '100+ integrations'
    }
  ];

  return (
    <section className="py-24 bg-brand-beige-light">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-caprasimo mb-6 text-brand-black">
            Core Features
          </h2>
          <p className="text-xl text-brand-grey max-w-3xl mx-auto">
            Essential tools to power your data analytics workflow
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all border border-brand-beige hover:border-brand-green"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-brand-beige-light rounded-xl mb-6 group-hover:bg-brand-green group-hover:scale-110 transition-all">
                <i className={`${feature.icon} text-2xl text-brand-green group-hover:text-white transition-colors`}></i>
              </div>
              <h3 className="text-xl font-caprasimo mb-3 text-brand-black group-hover:text-brand-green transition-colors">
                {feature.title}
              </h3>
              <p className="text-brand-grey leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
