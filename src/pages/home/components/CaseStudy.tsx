import { motion } from 'framer-motion';

const caseStudies = [
  {
    company: 'TechCorp',
    industry: 'Technology',
    image: 'https://readdy.ai/api/search-image?query=professional%20diverse%20business%20team%20of%20technology%20professionals%20smiling%20together%20in%20modern%20tech%20office%2C%20happy%20collaborative%20work%20environment%20with%20natural%20warm%20lighting%2C%20contemporary%20corporate%20setting%20with%20beige%20and%20green%20natural%20tones%2C%20authentic%20candid%20group%20photo%20showing%20teamwork%20and%20success&width=600&height=400&seq=casestudy-techcorp-team-v1&orientation=landscape',
    metrics: [
      { value: '300%', label: 'Productivity increase' },
      { value: '85%', label: 'Cost reduction' },
      { value: '24/7', label: 'Automated support' },
      { value: '10x', label: 'Faster processing' }
    ],
    description: 'Discover how TechCorp automated their entire sales pipeline and customer support operations, resulting in unprecedented growth and efficiency gains across all departments.'
  },
  {
    company: 'Innovatech',
    industry: 'Finance',
    image: 'https://readdy.ai/api/search-image?query=professional%20finance%20team%20of%20business%20professionals%20smiling%20and%20celebrating%20success%20in%20modern%20corporate%20office%2C%20diverse%20group%20of%20colleagues%20working%20together%20with%20laptops%20and%20data%20displays%2C%20warm%20natural%20lighting%20with%20beige%20and%20green%20tones%2C%20authentic%20workplace%20photography%20showing%20achievement%20and%20collaboration&width=600&height=400&seq=casestudy-innovatech-team-v1&orientation=landscape',
    metrics: [
      { value: '400%', label: 'Revenue growth' },
      { value: '90%', label: 'Operational efficiency' },
      { value: '24/7', label: 'Risk management' },
      { value: '5x', label: 'Customer service' }
    ],
    description: 'Innovatech leveraged our AI-driven risk management platform to reduce their risk exposure and improve their customer service, leading to a 400% increase in revenue.'
  }
];

export default function CaseStudy() {
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
            Success Stories
          </h2>
          <p className="text-xl text-brand-grey max-w-3xl mx-auto">
            See how industry leaders are transforming their businesses with Insight Flow
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group bg-brand-beige-light rounded-3xl overflow-hidden hover:shadow-2xl transition-all border border-brand-beige hover:border-brand-green"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={study.image}
                  alt={study.company}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <div className="text-3xl font-caprasimo text-white mb-1">{study.company}</div>
                  <div className="text-brand-beige-light">{study.industry}</div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex gap-6 mb-6">
                  {study.metrics.map((metric, i) => (
                    <div key={i} className="flex-1">
                      <div className="text-3xl font-caprasimo text-brand-green mb-1">{metric.value}</div>
                      <div className="text-sm text-brand-grey">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <p className="text-brand-grey leading-relaxed mb-6">{study.description}</p>

                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-brand-green font-semibold hover:gap-4 transition-all cursor-pointer"
                >
                  Read Full Story
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
