import * as React from 'react';
import { motion } from 'framer-motion';
import { Tractor, Building2, Landmark, FlaskConical, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface UseCaseCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  benefits: string[];
  index: number;
  color: string;
  iconBg: string;
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({
  icon: Icon,
  title,
  description,
  benefits,
  index,
  color,
  iconBg,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-green-300 overflow-hidden"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon with animated background */}
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-xl transition-all duration-300",
            iconBg
          )}
        >
          <Icon className={cn("w-10 h-10", color)} />
        </motion.div>

        {/* Title */}
        <h3
          className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-gray-600 mb-6 leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {description}
        </p>

        {/* Benefits list */}
        <div className="space-y-3">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 + idx * 0.1 }}
              className="flex items-center gap-3 text-gray-700"
            >
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                <CheckCircle2 className="w-3 h-3 text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <span
                className="text-sm font-medium"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {benefit}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Learn more link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
          className="mt-6 pt-6 border-t border-gray-100 group-hover:border-green-200 transition-colors duration-300"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors group/link"
          >
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>

      {/* Decorative corner element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export const UseCasesSection = () => {
  const useCases = [
    {
      icon: Tractor,
      title: 'Farmers',
      description: 'Individual farmers managing their own land, crops, and resources efficiently with modern digital tools.',
      benefits: ['Track crop cycles & growth stages', 'Monitor resources in real-time', 'Increase yields by 40%', 'Reduce operational costs'],
      color: 'text-green-600',
      iconBg: 'bg-gradient-to-br from-green-100 to-green-50',
    },
    {
      icon: Building2,
      title: 'Agri Businesses',
      description: 'Agricultural companies managing multiple farms and coordinating operations across different locations.',
      benefits: ['Multi-farm management dashboard', 'Supply chain tracking & optimization', 'Performance analytics & insights', 'Team collaboration tools'],
      color: 'text-green-600',
      iconBg: 'bg-gradient-to-br from-green-100 to-green-50',
    },
    {
      icon: Landmark,
      title: 'Government / NGOs',
      description: 'Organizations supporting farmers with data-driven programs, policies, and sustainable development initiatives.',
      benefits: ['Policy insights & recommendations', 'Farmer support programs', 'Impact measurement & reporting', 'Resource allocation optimization'],
      color: 'text-green-600',
      iconBg: 'bg-gradient-to-br from-green-100 to-green-50',
    },
    {
      icon: FlaskConical,
      title: 'Researchers',
      description: 'Agricultural researchers analyzing farming data for innovation, improvement, and sustainable practices.',
      benefits: ['Comprehensive data collection', 'Trend analysis & forecasting', 'Research insights & patterns', 'Collaborative research tools'],
      color: 'text-green-600',
      iconBg: 'bg-gradient-to-br from-green-100 to-green-50',
    },
  ];

  return (
    <section id="use-cases" className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-green-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/3 rounded-full blur-3xl" />
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
              Who Benefits
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Built for everyone in the
            <br />
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              agricultural ecosystem
            </span>
          </h2>
          <p
            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            From individual farmers to large organizations, our platform empowers everyone to make smarter, data-driven decisions
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {useCases.map((useCase, index) => (
            <UseCaseCard
              key={index}
              icon={useCase.icon}
              title={useCase.title}
              description={useCase.description}
              benefits={useCase.benefits}
              index={index}
              color={useCase.color}
              iconBg={useCase.iconBg}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16 md:mt-20"
        >
          <p
            className="text-gray-600 mb-6 text-lg"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Ready to transform your agricultural operations?
          </p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Start Your Free Trial
            <ArrowRight className="w-5 h-5" />
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


