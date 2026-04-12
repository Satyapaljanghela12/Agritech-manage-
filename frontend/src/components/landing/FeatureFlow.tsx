import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    title: "Real-time Field Analytics",
    description: "Monitor soil moisture, nutrient levels, and crop health in real-time. Our sensors provide live data feeds directly to your dashboard.",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
    color: "bg-green-500",
  },
  {
    title: "AI-Powered Yield Predictions",
    description: "Predict harvests with up to 95% accuracy. Our machine learning models analyze historical data and weather patterns to forecast your production.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    color: "bg-emerald-500",
  },
  {
    title: "Smart Resource Allocation",
    description: "Optimize your use of water, fertilizers, and energy. Save costs while maximizing every square inch of your land.",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80",
    color: "bg-teal-500",
  }
];

const FeatureItem = ({ feature, index }: { feature: any, index: number }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <div ref={containerRef} className="min-h-[80vh] flex items-center justify-center py-20">
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-20 max-w-7xl mx-auto px-4 w-full`}>
        {/* Text Content */}
        <motion.div 
          className="flex-1 space-y-8"
          style={{ opacity }}
        >
          <div className="flex items-center gap-4">
            <span className={`w-12 h-1 ${feature.color} rounded-full`} />
            <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Feature 0{index + 1}</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            {feature.title}
          </h2>
          <p className="text-xl text-gray-500 max-w-lg leading-relaxed font-light">
            {feature.description}
          </p>
          <div className="pt-8">
            <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-black transition-colors">
              Explore Dynamic Flow
            </button>
          </div>
        </motion.div>

        {/* Visual Content */}
        <div className="flex-1 relative">
          <motion.div 
            style={{ y }}
            className="relative z-10 rounded-[2rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] aspect-[4/5] lg:aspect-square"
          >
            <img 
              src={feature.image} 
              alt={feature.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
          </motion.div>
          
          {/* Background Graphic elements */}
          <div className={`absolute -inset-10 ${isEven ? 'translate-x-10' : '-translate-x-10'} border-2 border-gray-100 rounded-[3rem] -z-10`} />
          <div className={`absolute -bottom-10 ${isEven ? '-right-10' : '-left-10'} w-40 h-40 ${feature.color}/20 blur-3xl rounded-full -z-20`} />
        </div>
      </div>
    </div>
  );
};

export const FeatureFlow = () => {
  return (
    <section className="bg-[#fafafa]">
      {features.map((feature, index) => (
        <FeatureItem key={index} feature={feature} index={index} />
      ))}
    </section>
  );
};
