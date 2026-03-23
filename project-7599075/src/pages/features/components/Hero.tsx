import { motion } from 'framer-motion';
import { useEffect } from 'react';
import './Hero.css';

export default function Hero() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      const one = document.querySelector('.one') as HTMLElement;
      const two = document.querySelector('.two') as HTMLElement;
      const three = document.querySelector('.three') as HTMLElement;
      const four = document.querySelector('.four') as HTMLElement;
      const five = document.querySelector('.five') as HTMLElement;

      if (one) one.style.bottom = `${-(scrollTop * 0.3)}px`;
      if (two) two.style.bottom = `${-(scrollTop * 0.4)}px`;
      if (three) three.style.bottom = `${-(scrollTop * 0.5)}px`;
      if (four) four.style.bottom = `${-(scrollTop * 0.6)}px`;
      if (five) five.style.bottom = `${-(scrollTop * 0.7)}px`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const header = document.querySelector('section') as HTMLElement;
      if (!header) return;

      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const x = ((cx - e.pageX) / cx) * 2;
      const y = ((cy - e.pageY) / cy) * 2;

      const two = document.querySelector('.two') as HTMLElement;
      const four = document.querySelector('.four') as HTMLElement;
      const five = document.querySelector('.five') as HTMLElement;

      if (two) two.style.transform = `translate(${x}px, ${y}px)`;
      if (four) four.style.transform = `translate(-${x}px, ${y}px)`;
      if (five) five.style.transform = `translate(${x}px, -${y}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    const section = document.querySelector('section');
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section className="relative pt-40 pb-20 overflow-hidden bg-brand-color">
      {/* Parallax forest background */}
      <div className="parallax">
        <div className="one"></div>
        <div className="two"></div>
        <div className="three"></div>
        <div className="four"></div>
        <div className="five"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-7xl font-caprasimo mb-6 text-white">
            Powerful Features for
            <br />
            Modern Analytics
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto mb-12">
            Discover the complete suite of tools designed to transform your data into actionable insights
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#" 
              className="bg-brand-green hover:bg-brand-green-light text-white px-10 py-5 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap shadow-lg"
            >
              Start Free Trial
            </a>
            <a 
              href="/contact" 
              className="bg-white/20 hover:bg-white/30 text-white px-10 py-5 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap border border-white/30 backdrop-blur-sm"
            >
              Schedule Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
