import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const StatCounter = ({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, { 
        duration: duration, 
        ease: "easeOut",
        onUpdate: (latest) => setDisplayValue(Math.round(latest))
      });
      return controls.stop;
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-white">
      {displayValue}
      {suffix}
    </span>
  );
};

export const StatsStrip = () => {
  const stats = [
    { label: "Farmers Empowered", value: 1200, suffix: "+" },
    { label: "Crop Varieties", value: 45, suffix: "+" },
    { label: "Yield Growth", value: 20, suffix: "%" },
    { label: "Resource Savings", value: 35, suffix: "%" },
  ];

  return (
    <section className="relative w-full py-12 overflow-hidden">
      {/* Background with Blur and Gradient */}
      <div className="absolute inset-0 bg-green-900 border-y border-green-800/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.15),transparent)]" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-center">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center space-y-2"
            >
              <div className="flex justify-center items-center">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm md:text-base text-green-200/80 font-medium tracking-wide uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
