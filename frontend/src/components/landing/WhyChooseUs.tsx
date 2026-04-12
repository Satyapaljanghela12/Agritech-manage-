import * as React from 'react';
import { motion } from 'framer-motion';
import { Brain, Smartphone, Zap, Shield, Sparkles } from 'lucide-react';

interface ReasonCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}

const ReasonCard: React.FC<ReasonCardProps> = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ y: -12, scale: 1.05, transition: { duration: 0.3 } }}
      className="group relative bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* Sparkle effect on hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="absolute top-4 right-4"
      >
        <Sparkles className="w-5 h-5 text-white/60" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: [0, -15, 15, -15, 0], scale: 1.2 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-all duration-300 shadow-lg"
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Title */}
        <h3
          className="text-2xl font-bold text-white mb-4 group-hover:scale-105 transition-transform duration-300"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-green-100 leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {description}
        </p>
      </div>

      {/* Decorative corner */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Brain,
      title: 'Data-Driven Insights',
      description: 'Make informed decisions with AI-powered analytics and predictive models that optimize your farming operations.',
    },
    {
      icon: Smartphone,
      title: 'Easy to Use',
      description: 'Intuitive interface designed for farmers with minimal technical knowledge. Get started in minutes.',
    },
    {
      icon: Zap,
      title: 'Scalable Platform',
      description: 'Grows with your needs from small farms to large agricultural enterprises. No limits on growth.',
    },
    {
      icon: Shield,
      title: 'Real-Time Tracking',
      description: 'Monitor everything in real-time with instant updates, notifications, and comprehensive dashboards.',
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-green-600 via-green-700 to-green-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
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
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <span
              className="text-xs uppercase tracking-wider font-semibold text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Why Choose Us
            </span>
          </motion.div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            The smart choice for
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              modern agriculture management
            </motion.span>
          </h2>
          <p
            className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Discover why thousands of farmers trust our platform to transform their operations
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <ReasonCard
              key={index}
              icon={reason.icon}
              title={reason.title}
              description={reason.description}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '99.9%', label: 'Uptime' },
            { value: '24/7', label: 'Support' },
            { value: '50K+', label: 'Users' },
            { value: '4.9★', label: 'Rating' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
            >
              <div
                className="text-3xl md:text-4xl font-bold text-white mb-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {stat.value}
              </div>
              <div
                className="text-green-100 text-sm"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div
        className="absolute w-full h-px bottom-0 left-0 z-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
    </section>
  );
};


