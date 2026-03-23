
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useEffect, useRef } from 'react';

export default function Testimonials() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (scrollContainer) {
        scrollPosition += scrollSpeed;
        
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const testimonials = [
    {
      quote: "Insight Flow has completely transformed how we operate. The AI automation saved us over 30 hours per week, allowing our team to focus on strategic initiatives that drive real growth.",
      author: "Sarah Johnson",
      role: "CEO, TechVentures Inc",
      avatar: "https://readdy.ai/api/search-image?query=professional%20business%20woman%20ceo%20portrait%20with%20confident%20smile%20in%20modern%20office%20setting%2C%20corporate%20headshot%20with%20neutral%20background&width=80&height=80&seq=test1&orientation=squarish",
      rating: 5
    },
    {
      quote: "The ROI was immediate. Within the first month, we saw a 45% reduction in operational costs and our customer satisfaction scores jumped by 28%. Absolutely game-changing.",
      author: "Michael Chen",
      role: "Operations Director, GlobalCorp",
      avatar: "https://readdy.ai/api/search-image?query=professional%20asian%20business%20man%20director%20portrait%20with%20friendly%20expression%20in%20corporate%20environment%2C%20executive%20headshot%20with%20clean%20background&width=80&height=80&seq=test2&orientation=squarish",
      rating: 5
    },
    {
      quote: "I was skeptical at first, but Insight Flow exceeded all expectations. The platform is intuitive, powerful, and the support team is exceptional. It's like having an extra team member who never sleeps.",
      author: "Emily Rodriguez",
      role: "Founder, StartupHub",
      avatar: "https://readdy.ai/api/search-image?query=professional%20latina%20business%20woman%20founder%20portrait%20with%20warm%20smile%20in%20startup%20office%2C%20entrepreneur%20headshot%20with%20modern%20background&width=80&height=80&seq=test3&orientation=squarish",
      rating: 5
    },
    {
      quote: "The automation capabilities are incredible. We've scaled our operations 3x without adding headcount. Insight Flow is an essential tool for any modern business looking to stay competitive.",
      author: "David Park",
      role: "CTO, InnovateLabs",
      avatar: "https://readdy.ai/api/search-image?query=professional%20business%20man%20cto%20portrait%20with%20confident%20look%20in%20tech%20company%20office%2C%20technology%20executive%20headshot%20with%20contemporary%20background&width=80&height=80&seq=test4&orientation=squarish",
      rating: 5
    },
    {
      quote: "The level of customization and flexibility is outstanding. We've been able to tailor the automation to our exact needs, resulting in unprecedented efficiency gains.",
      author: "Jennifer Martinez",
      role: "VP Operations, ScaleUp Co",
      avatar: "https://readdy.ai/api/search-image?query=professional%20business%20woman%20vp%20portrait%20with%20professional%20demeanor%20in%20corporate%20setting%2C%20executive%20headshot%20with%20clean%20background&width=80&height=80&seq=test5&orientation=squarish",
      rating: 5
    },
    {
      quote: "Implementation was seamless and the results were immediate. Our team productivity increased by 55% in just two months. Best investment we've made this year.",
      author: "Robert Kim",
      role: "Managing Director, FutureTech",
      avatar: "https://readdy.ai/api/search-image?query=professional%20business%20man%20managing%20director%20portrait%20with%20confident%20expression%20in%20modern%20office%2C%20leadership%20headshot%20with%20neutral%20background&width=80&height=80&seq=test6&orientation=squarish",
      rating: 5
    }
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-brand-beige/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-brand-green/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-caprasimo mb-6 text-brand-black">
            Loved by Teams Worldwide
          </h2>
          <p className="text-xl text-brand-grey max-w-3xl mx-auto">
            Don't just take our word for it—hear from our satisfied customers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-brand-beige-light rounded-2xl p-8 hover:shadow-2xl transition-all border border-brand-beige hover:border-brand-green group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-xl text-brand-green"></i>
                ))}
              </div>

              <p className="text-brand-grey leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover object-top"
                />
                <div>
                  <div className="font-semibold text-brand-black group-hover:text-brand-green transition-colors">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-brand-grey">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
