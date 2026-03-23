const socialLinks = [
  { icon: 'ri-twitter-x-line', url: 'https://twitter.com', label: 'Twitter' },
  { icon: 'ri-linkedin-line', url: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: 'ri-github-line', url: 'https://github.com', label: 'GitHub' },
  { icon: 'ri-youtube-line', url: 'https://youtube.com', label: 'YouTube' }
];

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Features', url: '/features' },
      { label: 'Pricing', url: '/pricing' },
      { label: 'Integrations', url: '/integrations' },
      { label: 'API', url: '/api' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', url: '/about' },
      { label: 'Blog', url: '/blog' },
      { label: 'Careers', url: '/careers' },
      { label: 'Contact', url: '/contact' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', url: '/docs' },
      { label: 'Help Center', url: '/help' },
      { label: 'Community', url: '/community' },
      { label: 'Status', url: '/status' }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="bg-brand-brown text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-brand-green rounded-lg">
                <i className="ri-bar-chart-box-line text-xl text-white"></i>
              </div>
              <span className="text-2xl font-caprasimo">Insight Flow</span>
            </div>
            <p className="text-brand-beige-light mb-6 leading-relaxed">
              Transform your data into actionable insights with AI-powered analytics. Make smarter decisions faster.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-brand-green rounded-lg transition-all cursor-pointer"
                  aria-label={social.label}
                >
                  <i className={`${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-6">{column.title}</h3>
              <ul className="space-y-4">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.url}
                      className="text-brand-beige-light hover:text-brand-green transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-beige-light text-sm">
            © 2024 Insight Flow. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm">
            <a href="/privacy" className="text-brand-beige-light hover:text-brand-green transition-colors cursor-pointer">
              Privacy Policy
            </a>
            <a href="/terms" className="text-brand-beige-light hover:text-brand-green transition-colors cursor-pointer">
              Terms of Service
            </a>
            <a href="https://readdy.ai/?ref=logo" className="text-brand-beige-light hover:text-brand-green transition-colors cursor-pointer">
              Web Design
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
