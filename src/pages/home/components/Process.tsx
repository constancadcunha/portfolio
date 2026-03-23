import { motion } from 'framer-motion';

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Data Analysis',
      description: 'Our AI analyzes your business processes to identify automation opportunities and optimization potential.',
      icon: 'ri-bar-chart-box-line'
    },
    {
      number: '02',
      title: 'AI Integration',
      description: 'Seamlessly integrate intelligent automation into your existing workflows without disrupting operations.',
      icon: 'ri-cpu-line'
    },
    {
      number: '03',
      title: 'Continuous Optimization',
      description: 'Machine learning algorithms continuously improve performance and adapt to changing business needs.',
      icon: 'ri-refresh-line'
    },
    {
      number: '04',
      title: 'Scalable Growth',
      description: 'Scale your automation infrastructure effortlessly as your business grows and evolves.',
      icon: 'ri-rocket-line'
    }
  ];

  return (
    <section className="py-24 bg-brand-beige-light relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-brand-green/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-brand-brown/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-caprasimo mb-6 text-brand-black">
            How It Works
          </h2>
          <p className="text-xl text-brand-grey max-w-3xl mx-auto">
            Get started in minutes with our simple, intuitive process
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-beige via-brand-green to-brand-beige"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all border border-brand-beige hover:border-brand-green group">
                  <div className="relative w-16 h-16 flex items-center justify-center bg-brand-green rounded-xl mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                    <i className={`${step.icon} text-2xl text-white`}></i>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-brown rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-xl font-caprasimo mb-3 text-center text-brand-black group-hover:text-brand-green transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-brand-grey text-center leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a 
            href="#" 
            className="inline-block bg-brand-green hover:bg-brand-green-light text-white px-10 py-5 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap shadow-lg"
          >
            Get Started Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
