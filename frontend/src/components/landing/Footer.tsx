import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Analytics', href: '#analytics' },
      { name: 'Use Cases', href: '#use-cases' },
      { name: 'FAQ', href: '#faq' },
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Support', href: '#contact' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Contact', href: '#contact' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' },
    ],
  };

  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/images/logo.png" 
                alt="FarmGrid Logo" 
                className="h-24 w-auto"
                style={{ filter: 'saturate(1.5) brightness(1.1) drop-shadow(0 0 10px rgba(0, 166, 81, 0.4))' }}
              />
            </div>
            <p
              className="text-gray-400 mb-6 leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Modern agriculture management platform helping farmers make data-driven decisions and improve productivity.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@farmgrid.com"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3
              className="text-white font-semibold mb-4"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-green-400 transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3
              className="text-white font-semibold mb-4"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-green-400 transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3
              className="text-white font-semibold mb-4"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-green-400 transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p
            className="text-gray-400 text-sm"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            © 2024 FarmGrid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};


