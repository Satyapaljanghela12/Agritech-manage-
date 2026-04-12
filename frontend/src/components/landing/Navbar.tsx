import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Use Cases', href: '#use-cases' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-green-50/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center">
              <img 
                src="/images/logo.png" 
                alt="Logo" 
                className="h-32 w-auto duration-500 hover:scale-110 transition-all drop-shadow-2xl"
                style={{ 
                  filter: isScrolled 
                    ? 'saturate(1.8) brightness(1.1) drop-shadow(0 2px 4px rgba(0,166,81,0.2))' 
                    : 'saturate(2.5) brightness(1.2) drop-shadow(0 0 20px rgba(0,166,81,0.4))' 
                }}
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  isScrolled
                    ? 'text-gray-900 hover:text-green-600'
                    : 'text-white hover:text-green-300'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="/login"
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105 ${
                isScrolled
                  ? 'text-gray-900 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Sign In
            </a>
            <a
              href="/register"
              className="px-6 py-2.5 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all hover:scale-105 font-semibold shadow-lg hover:shadow-xl text-sm"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? 'hover:bg-gray-100'
                : 'hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 space-y-2">
              <a
                href="/login"
                className="block px-4 py-3 text-center text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Sign In
              </a>
              <a
                href="/register"
                className="block px-4 py-3 text-center bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};


