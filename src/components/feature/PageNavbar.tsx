
import { Link, useLocation } from 'react-router-dom';

export default function PageNavbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <i className="ri-line-chart-line text-2xl text-brand-black"></i>
            </div>
            <span className="text-xl font-caprasimo text-brand-black group-hover:text-brand-green-light transition-colors whitespace-nowrap">
              Insight Flow
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`text-base transition-all cursor-pointer whitespace-nowrap ${
                isActive('/') 
                  ? 'font-semibold text-brand-black' 
                  : 'font-normal text-neutral-600 hover:text-brand-black hover:font-semibold'
              }`}
            >
              Home
            </Link>
            <Link
              to="/features"
              className={`text-base transition-all cursor-pointer whitespace-nowrap ${
                isActive('/features') 
                  ? 'font-semibold text-brand-black' 
                  : 'font-normal text-neutral-600 hover:text-brand-black hover:font-semibold'
              }`}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className={`text-base transition-all cursor-pointer whitespace-nowrap ${
                isActive('/pricing') 
                  ? 'font-semibold text-brand-black' 
                  : 'font-normal text-neutral-600 hover:text-brand-black hover:font-semibold'
              }`}
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className={`text-base transition-all cursor-pointer whitespace-nowrap ${
                isActive('/about') 
                  ? 'font-semibold text-brand-black' 
                  : 'font-normal text-neutral-600 hover:text-brand-black hover:font-semibold'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-base transition-all cursor-pointer whitespace-nowrap ${
                isActive('/contact') 
                  ? 'font-semibold text-brand-black' 
                  : 'font-normal text-neutral-600 hover:text-brand-black hover:font-semibold'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <button className="px-5 py-2.5 text-sm font-medium text-neutral-700 hover:text-brand-black transition-colors cursor-pointer whitespace-nowrap">
              Sign in
            </button>
            <button className="px-5 py-2.5 text-sm font-medium text-white bg-brand-black hover:bg-brand-green-light rounded-lg transition-colors cursor-pointer whitespace-nowrap">
              Get started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
