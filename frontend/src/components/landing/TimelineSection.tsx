import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { UserPlus, LayoutDashboard, BarChart3, TrendingUp } from 'lucide-react';

const steps = [
  {
    title: "Join the Network",
    description: "Create your farm profile in minutes. Add your fields, crops, and equipment to build your digital twin.",
    icon: UserPlus,
    color: "bg-blue-500",
  },
  {
    title: "Connect Your Data",
    description: "Integrate IoT sensors, weather stations, and manual logs. Our platform aggregates everything into one view.",
    icon: LayoutDashboard,
    color: "bg-emerald-500",
  },
  {
    title: "Analyze & Optimize",
    description: "Receive real-time insights on soil health, moisture levels, and growth patterns powered by AI.",
    icon: BarChart3,
    color: "bg-amber-500",
  },
  {
    title: "Scale Your Success",
    description: "Improve yields up to 30% and reduce resource waste. Watch your farm grow sustainably year after year.",
    icon: TrendingUp,
    color: "bg-purple-500",
  }
];

export const TimelineSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-green-600 font-bold tracking-widest uppercase text-sm mb-4 block"
        >
          How It Works
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-gray-900"
        >
          Your Journey to Precision Farming
        </motion.h2>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative">
        {/* The Animated Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2" />
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-green-500 -translate-x-1/2 z-10"
        />

        <div className="space-y-24">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className="relative flex items-center md:justify-between group">
                {/* Timeline Point */}
                <div className="absolute left-4 md:left-1/2 w-10 h-10 -translate-x-1/2 flex items-center justify-center z-20">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className={`w-4 h-4 rounded-full ring-4 ring-white shadow-lg ${step.color}`}
                  />
                </div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[42%] ${isEven ? 'md:text-right' : 'md:text-left order-last'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden"
                  >
                    <div className={`inline-flex p-3 rounded-xl ${step.color} text-white mb-6 shadow-lg`}>
                      <step.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    
                    {/* Background number decorative */}
                    <span className="absolute -bottom-4 -right-2 text-8xl font-black text-gray-50 pointer-events-none select-none">
                       0{index + 1}
                    </span>
                  </motion.div>
                </div>

                {/* Spacer for desktop */}
                <div className="hidden md:block md:w-[42%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
