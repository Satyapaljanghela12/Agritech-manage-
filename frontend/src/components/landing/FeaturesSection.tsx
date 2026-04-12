import * as React from 'react';
import { motion } from 'framer-motion';
import { Wheat, Users, Package, Cloud, BarChart3, Shield, TrendingUp, FileText } from 'lucide-react';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group flex items-start gap-4 py-6 border-b border-gray-200 hover:border-green-500/30 transition-colors duration-300"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <div className="flex-1">
        <h3 
          className="text-lg font-semibold text-gray-900 mb-1.5 group-hover:text-green-600 transition-colors"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {title}
        </h3>
        <p 
          className="text-gray-600 text-sm leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Wheat className="w-6 h-6" />,
      title: 'Crop Management',
      description: 'Track planting, growth stages, and harvest schedules with precision.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Farmer Profiles',
      description: 'Maintain detailed records of farmers, land ownership, and activities.',
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Resource Tracking',
      description: 'Monitor seeds, fertilizers, equipment, and supplies in real-time.',
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: 'Weather Insights',
      description: 'Get weather forecasts and alerts to plan farming activities better.',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Analytics Dashboard',
      description: 'Visualize trends, yields, and performance with interactive charts.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Authentication',
      description: 'Enterprise-grade security with role-based access control.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Yield Prediction',
      description: 'AI-powered forecasts to estimate crop yields and plan ahead.',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Reports',
      description: 'Generate comprehensive reports for analysis and compliance.',
    },
  ];

  return (
    <section id="features" className="relative py-24 md:py-32 bg-gray-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-block mb-4">
            <span 
              className="text-xs uppercase tracking-wider font-semibold text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-200"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Powerful Features
            </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Everything you need to manage
            <br />
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              modern agriculture operations
            </span>
          </h2>
          <p 
            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Efficiently manage your agricultural operations with our comprehensive suite of tools designed for modern farming
          </p>
        </motion.div>

        {/* Features List */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            <div className="space-y-0">
              {features.slice(0, 4).map((feature, index) => (
                <FeatureItem
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
            <div className="space-y-0">
              {features.slice(4, 8).map((feature, index) => (
                <FeatureItem
                  key={index + 4}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index + 4}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 md:mt-20"
        >
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Get Started Today
            <TrendingUp className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div
        className="absolute w-full h-px bottom-0 left-0 z-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(34,197,94,0.24) 0%, rgba(34,197,94,0) 100%)",
        }}
      />
    </section>
  );
};


