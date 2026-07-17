import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (path: string) => (e: React.MouseEvent) => void;
}

export const Navbar = ({ onNavigate }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home">
            <img
              src="/images/logo.png"
              alt="FarmGrid"
              className="h-14 w-auto"
              style={{ filter: isScrolled ? 'none' : 'brightness(0) invert(1)' }}
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login" onClick={(e)=>{e.preventDefault();window.history.pushState({},"","/login");window.dispatchEvent(new PopStateEvent("popstate"))}}
              className={`px-5 py-2 text-sm font-semibold rounded-xl transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
              }`}
            >
              Sign In
            </a>
            <a
              href="/register" onClick={(e)=>{e.preventDefault();window.history.pushState({},"","/register");window.dispatchEvent(new PopStateEvent("popstate"))}}
              className="px-5 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors"
            >
              Get Started →
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen
              ? <X className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
              : <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            }
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t space-y-2">
              <a href="/login" onClick={(e)=>{e.preventDefault();window.history.pushState({},"","/login");window.dispatchEvent(new PopStateEvent("popstate"))}} className="block px-4 py-2 text-center text-gray-700 font-semibold">Sign In</a>
              <a href="/register" onClick={(e)=>{e.preventDefault();window.history.pushState({},"","/register");window.dispatchEvent(new PopStateEvent("popstate"))}} className="block px-4 py-2 text-center bg-green-600 text-white rounded-lg font-semibold">Get Started</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

