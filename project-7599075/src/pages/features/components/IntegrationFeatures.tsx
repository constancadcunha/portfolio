import { motion } from 'framer-motion';

export default function IntegrationFeatures() {
  const integrations = [
    { name: 'Salesforce', icon: 'ri-customer-service-2-line', category: 'CRM' },
    { name: 'Google Analytics', icon: 'ri-line-chart-line', category: 'Analytics' },
    { name: 'Slack', icon: 'ri-slack-line', category: 'Communication' },
    { name: 'PostgreSQL', icon: 'ri-database-2-line', category: 'Database' },
    { name: 'AWS', icon: 'ri-cloud-line', category: 'Cloud' },
    { name: 'Stripe', icon: 'ri-bank-card-line', category: 'Payment' },
    { name: 'HubSpot', icon: 'ri-mail-line', category: 'Marketing' },
    { name: 'Shopify', icon: 'ri-shopping-cart-line', category: 'E-commerce' },
    { name: 'MongoDB', icon: 'ri-database-line', category: 'Database' },
    { name: 'Zendesk', icon: 'ri-customer-service-line', category: 'Support' },
    { name: 'Mailchimp', icon: 'ri-mail-send-line', category: 'Email' },
    { name: 'Jira', icon: 'ri-task-line', category: 'Project Management' }
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
            Seamless Integrations
          </h2>
          <p className="text-xl text-brand-grey max-w-3xl mx-auto">
            Connect with your favorite tools and platforms effortlessly
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group bg-white rounded-xl p-6 hover:shadow-2xl transition-all cursor-pointer border border-brand-beige hover:border-brand-green"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-brand-beige-light rounded-lg mb-4 group-hover:bg-brand-green group-hover:scale-110 transition-all">
                <i className={`${integration.icon} text-xl text-brand-green group-hover:text-white transition-colors`}></i>
              </div>
              <h3 className="font-caprasimo text-brand-black group-hover:text-brand-green transition-colors">
                {integration.name}
              </h3>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-12 text-center border border-brand-beige"
        >
          <h3 className="text-3xl font-caprasimo mb-4 text-brand-black">
            Can't find your tool?
          </h3>
          <p className="text-brand-grey mb-8 max-w-2xl mx-auto">
            We're constantly adding new integrations. Let us know what you need and we'll make it happen.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-brand-green hover:bg-brand-green-light text-white px-10 py-4 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap shadow-lg"
          >
            Request Integration
          </a>
        </motion.div>
      </div>
    </section>
  );
}
