
import { motion } from 'framer-motion';

export default function SecurityFeatures() {
  const features = [
    {
      icon: 'ri-shield-check-line',
      title: 'Enterprise-Grade Security',
      description: 'Bank-level encryption, SOC 2 Type II certified, and GDPR compliant. Your data is protected with the highest security standards.'
    },
    {
      icon: 'ri-lock-line',
      title: 'Role-Based Access Control',
      description: 'Granular permissions system lets you control exactly who can see and do what. Create custom roles and manage access at scale.'
    },
    {
      icon: 'ri-eye-off-line',
      title: 'Data Privacy',
      description: 'Your data stays yours. We never sell or share your information. Full data portability and deletion options available.'
    },
    {
      icon: 'ri-history-line',
      title: 'Audit Logs',
      description: 'Complete audit trail of all actions taken in your account. Track changes, monitor access, and maintain compliance.'
    },
    {
      icon: 'ri-cloud-line',
      title: 'Secure Cloud Infrastructure',
      description: 'Hosted on AWS with automatic backups, disaster recovery, and 99.9% uptime SLA. Your data is always available and protected.'
    },
    {
      icon: 'ri-shield-star-line',
      title: 'Compliance Ready',
      description: 'Meet regulatory requirements with ease. HIPAA, SOC 2, GDPR, and CCPA compliant infrastructure and processes.'
    }
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
            Enterprise-Grade Security
          </h2>
          <p className="text-xl text-brand-grey max-w-3xl mx-auto">
            Your data protection is our top priority
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-brand-beige-light rounded-2xl p-8 hover:bg-white border border-brand-beige hover:border-brand-green transition-all"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-white rounded-xl mb-6 group-hover:bg-brand-green group-hover:scale-110 transition-all shadow-md">
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
