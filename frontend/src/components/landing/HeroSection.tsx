import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRef } from 'react';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#002d1a]">
      {/* Background Image with Parallax & Overlay */}
      <motion.div 
        style={{ scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        <img
          src="/images/crop.jpg"
          alt="Smart Agriculture Management"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-48"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00a651]/20 backdrop-blur-md border border-[#00a651]/40 rounded-full shadow-lg">
                <span className="text-[#00a651] font-semibold text-sm tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Smart Farming Platform
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight tracking-tight"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="block text-white mb-2">Manage</span>
              <span className="block text-white mb-2">Agriculture</span>
              <span className="block">
                with{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#00a651]">
                    Data-Driven
                  </span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-[#00a651]/30 -z-10"></span>
                </span>
              </span>
              <span className="block text-white mt-2">Insights</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl font-light"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Transform your farming operations with real-time analytics, smart resource tracking, and AI-powered insights.
            </motion.p>

            {/* Feature Pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#00a651]" />
                <span className="text-sm text-gray-200" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Real-time Tracking
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#00a651]" />
                <span className="text-sm text-gray-200" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Smart Analytics
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="/register"
                className="group inline-flex items-center justify-center px-8 py-4 bg-[#00a651] text-white rounded-xl hover:bg-[#008f45] transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#00a651]/50 font-bold text-lg"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/login"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-md border-2 border-white/20 text-white rounded-xl hover:bg-white/10 transition-all hover:scale-105 font-bold text-lg"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                View Dashboard
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Simple Wave Divider (Restored for 'before' look) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-30">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          className="relative block w-full h-[80px]"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.3,126,221.33,110.15,269.89,99.8,311.5,78.29,321.39,56.44Z" 
            className="fill-white"
          ></path>
        </svg>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 opacity-50">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-white rounded-full"
          />
        </div>
      </div>
    </section>
  );
};


