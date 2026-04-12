import * as React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Wheat, Package, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StepCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  step: string;
  index: number;
  isLast: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ icon: Icon, title, description, step, index, isLast }) => {
  return (
    <div className="relative">
      {/* Connector Line */}
      {!isLast && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
          className="hidden lg:block absolute top-20 left-[60%] w-[80%] h-1 bg-gradient-to-r from-green-400 via-green-300 to-green-200 z-0 origin-left"
        >
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            <ArrowRight className="w-5 h-5 text-green-500" />
          </motion.div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        className="relative z-10"
      >
        {/* Step Number Badge */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.2, type: "spring", stiffness: 200 }}
          className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg z-20"
        >
          <span className="text-white font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {step}
          </span>
        </motion.div>

        {/* Card */}
        <motion.div
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-green-300 overflow-hidden"
        >
          {/* Background gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6 shadow-md group-hover:shadow-xl transition-all duration-300"
            >
              <Icon className="w-10 h-10 text-white" />
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
              className="text-gray-600 leading-relaxed mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {description}
            </p>

            {/* Check icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 + 0.5 }}
              className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm"
            >
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                <CheckCircle2 className="w-4 h-4 text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <span>Complete</span>
            </motion.div>
          </div>

          {/* Decorative corner */}
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-green-500/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Register Farmers',
      description: 'Create comprehensive farmer profiles with land details, contact information, and ownership records.',
      step: '01',
    },
    {
      icon: Wheat,
      title: 'Add Crop Data',
      description: 'Input crop types, planting dates, growth stages, and expected harvest schedules for tracking.',
      step: '02',
    },
    {
      icon: Package,
      title: 'Track Resources',
      description: 'Monitor seeds, fertilizers, equipment, and other farming resources in real-time inventory.',
      step: '03',
    },
    {
      icon: BarChart3,
      title: 'Analyze Productivity',
      description: 'Review comprehensive analytics, generate detailed reports, and optimize farm operations.',
      step: '04',
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-green-600/5 rounded-full blur-3xl" />
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
              How It Works
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Get started in
            <br />
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              four simple steps
            </span>
          </h2>
          <p
            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            From registration to optimization, our streamlined process makes farm management effortless
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              step={step.step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 md:mt-20"
        >
          <p
            className="text-gray-600 mb-6 text-lg"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Ready to streamline your farm management?
          </p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Get Started Now
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


