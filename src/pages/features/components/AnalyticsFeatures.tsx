import { motion } from 'framer-motion';

const features = [
  {
    icon: 'ri-line-chart-line',
    title: 'Real-time Analytics',
    description: 'Monitor your data in real-time with live dashboards and instant insights that help you make quick decisions.'
  },
  {
    icon: 'ri-brain-line',
    title: 'AI-Powered Insights',
    description: 'Leverage artificial intelligence to uncover hidden patterns and get predictive analytics automatically.'
  },
  {
    icon: 'ri-database-2-line',
    title: 'Data Integration',
    description: 'Connect to 100+ data sources seamlessly and consolidate all your data in one powerful platform.'
  },
  {
    icon: 'ri-pie-chart-line',
    title: 'Custom Dashboards',
    description: 'Create unlimited custom dashboards tailored to your specific needs with drag-and-drop simplicity.'
  },
  {
    icon: 'ri-team-line',
    title: 'Team Collaboration',
    description: 'Share insights, collaborate on reports, and work together seamlessly with your entire team.'
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Enterprise Security',
    description: 'Bank-level encryption and security protocols to keep your sensitive data safe and compliant.'
  }
];

export default function AnalyticsFeatures() {
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
            Advanced Analytics
          </h2>
          <p className="text-xl text-brand-grey max-w-3xl mx-auto">
            Dive deeper into your data with sophisticated analytical tools
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="https://readdy.ai/api/search-image?query=modern%20data%20analytics%20dashboard%20with%20interactive%20charts%20and%20graphs%20showing%20business%20intelligence%20metrics%20with%20clean%20professional%20interface%20on%20computer%20screen&width=600&height=450&seq=feat-analytics-1&orientation=landscape"
              alt="Analytics Dashboard"
              className="w-full h-96 object-cover object-top rounded-2xl shadow-2xl border border-brand-beige"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {features.slice(0, 3).map((feature, index) => (
              <div
                key={index}
                className="group bg-brand-beige-light rounded-xl p-6 hover:bg-white border border-brand-beige hover:border-brand-green transition-all"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg flex-shrink-0 group-hover:bg-brand-green transition-all">
                    <i className={`${feature.icon} text-xl text-brand-green group-hover:text-white transition-colors`}></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-caprasimo mb-2 text-brand-black group-hover:text-brand-green transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-brand-grey text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 lg:order-2"
          >
            {features.slice(3, 6).map((feature, index) => (
              <div
                key={index}
                className="group bg-brand-beige-light rounded-xl p-6 hover:bg-white border border-brand-beige hover:border-brand-green transition-all"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg flex-shrink-0 group-hover:bg-brand-green transition-all">
                    <i className={`${feature.icon} text-xl text-brand-green group-hover:text-white transition-colors`}></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-caprasimo mb-2 text-brand-black group-hover:text-brand-green transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-brand-grey text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:order-1"
          >
            <img
              src="https://readdy.ai/api/search-image?query=artificial%20intelligence%20machine%20learning%20algorithms%20processing%20data%20visualization%20with%20neural%20network%20patterns%20and%20predictive%20analytics%20charts%20on%20modern%20interface&width=600&height=450&seq=feat-analytics-2&orientation=landscape"
              alt="AI Analytics"
              className="w-full h-96 object-cover object-top rounded-2xl shadow-2xl border border-brand-beige"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}