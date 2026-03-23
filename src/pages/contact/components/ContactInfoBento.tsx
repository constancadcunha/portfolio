import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactInfoBento() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const contactMethods = [
    { title: 'Email us', description: 'Our team is here to help', icon: 'ri-mail-line', action: 'hello@insightflow.ai' },
    { title: 'Call us', description: 'Mon-Fri from 8am to 5pm', icon: 'ri-phone-line', action: '+1 (234) 567-890' },
    { title: 'Visit us', description: 'Come say hello', icon: 'ri-map-pin-line', action: '100 Smith Street\nMelbourne VIC 3000' },
    { title: 'Follow us', description: 'Stay connected', icon: 'ri-share-line', action: 'Twitter, LinkedIn, GitHub' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert('Message sent!');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isSubmitting = false;
  const submitStatus = null;

  return (
    <section className="py-20 bg-brand-beige-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-white rounded-3xl p-10 shadow-lg border border-brand-beige"
          >
            <h2 className="text-3xl font-caprasimo mb-2 text-brand-black">Send us a message</h2>
            <p className="text-brand-grey mb-6">Fill out the form below and we'll get back to you shortly.</p>

            <form onSubmit={handleSubmit} className="space-y-6" id="contact-form" data-readdy-form>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-black mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-brand-beige focus:border-brand-green outline-none transition-colors text-sm bg-brand-beige-light/50"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-black mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-brand-beige focus:border-brand-green outline-none transition-colors text-sm bg-brand-beige-light/50"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-black mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-brand-beige focus:border-brand-green outline-none transition-colors text-sm bg-brand-beige-light/50"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-black mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-brand-beige focus:border-brand-green outline-none transition-colors text-sm bg-brand-beige-light/50"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-brand-beige focus:border-brand-green outline-none transition-colors text-sm bg-brand-beige-light/50"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={500}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border-2 border-brand-beige focus:border-brand-green outline-none transition-colors text-sm resize-none bg-brand-beige-light/50"
                  placeholder="Tell us more about your needs..."
                />
                <p className="text-xs text-brand-grey mt-1">
                  {formData.message.length}/500 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-green hover:bg-brand-green-light text-white py-4 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap shadow-lg"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-brand-green/10 text-brand-green px-4 py-3 rounded-lg text-sm border border-brand-green/20">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-200">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>

            {/* Office Hours - Moved below Send Message button */}
            <div className="border-t border-brand-beige pt-8 mt-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-brand-beige-light rounded-xl">
                  <i className="ri-time-line text-xl text-brand-green"></i>
                </div>
                <h3 className="text-lg font-caprasimo text-brand-black">Office Hours</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="font-semibold mb-1 text-brand-black">Monday - Friday</div>
                  <div className="text-brand-grey">9:00 AM - 6:00 PM</div>
                </div>
                <div>
                  <div className="font-semibold mb-1 text-brand-black">Saturday</div>
                  <div className="text-brand-grey">10:00 AM - 4:00 PM</div>
                </div>
                <div>
                  <div className="font-semibold mb-1 text-brand-black">Sunday</div>
                  <div className="text-brand-grey">Closed</div>
                </div>
              </div>
              <p className="text-xs text-brand-grey mt-6">
                All times are in Pacific Standard Time (PST)
              </p>
            </div>
          </motion.div>

          {/* Contact Info Cards - Takes 1 column */}
          <div className="space-y-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group block bg-white rounded-2xl p-8 hover:shadow-2xl transition-all cursor-pointer border border-brand-beige hover:border-brand-green"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-brand-beige-light rounded-xl mb-6 group-hover:bg-brand-green group-hover:scale-110 transition-all">
                  <i className={`${method.icon} text-2xl text-brand-green group-hover:text-white transition-colors`}></i>
                </div>
                <h3 className="text-xl font-caprasimo mb-2 text-brand-black group-hover:text-brand-green transition-colors">
                  {method.title}
                </h3>
                <p className="text-brand-grey mb-4">{method.description}</p>
                <div className="text-brand-green font-semibold flex items-center gap-2">
                  {method.action}
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
