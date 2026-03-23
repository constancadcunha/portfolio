import { motion } from 'framer-motion';

export default function Solutions() {
  const solutions = [
    { icon: 'fa fa-chart-line', title: 'Consultants', description: 'Make informed decisions with real-time, actionable data.' },
    { icon: 'fa fa-users', title: 'Education', description: 'Boost morale and productivity with a focus on people.' },
    { icon: 'fa fa-cogs', title: 'Engineers', description: 'Optimize processes and reduce costs with technology and analytics.' },
    { icon: 'fa fa-globe', title: 'Global retails', description: 'Expand your business with a global perspective and local expertise.' },
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
            Solutions for Every Industry
          </h2>
          <p className="text-xl text-brand-grey max-w-3xl mx-auto">
            Tailored analytics solutions designed for your specific business needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl p-6 hover:shadow-2xl transition-all cursor-pointer border border-brand-beige hover:border-brand-green overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 flex items-center justify-center bg-brand-beige-light rounded-lg mb-4 group-hover:bg-brand-green group-hover:scale-110 transition-all">
                  <i className={`${solution.icon} text-xl text-brand-green group-hover:text-white transition-colors`}></i>
                </div>
                <h3 className="text-xl font-caprasimo mb-3 text-brand-black group-hover:text-brand-green transition-colors">
                  {solution.title}
                </h3>
                <p className="text-sm text-brand-grey leading-relaxed">{solution.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
