import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Robert Mitchell",
    role: "Large Scale Grain Farmer",
    content: "AgriManage transformed our operations. We've seen a 22% increase in yield and a significant reduction in water waste. The ROI was clear within the first season.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80"
  },
  {
    name: "Sarah Jenkins",
    role: "Vineyard Owner",
    content: "The precision alerts for moisture levels allowed us to save our crop during a critical heatwave. It's like having a team of experts watching my fields 24/7.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80"
  },
  {
    name: "David Chen",
    role: "Sustainable Ag Consultant",
    content: "I recommend AgriManage to all my clients. The data visualization is world-class and the mobile app makes field management actually enjoyable.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80"
  }
];

export const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-green-900 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-green-400 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <Quote className="mx-auto text-green-400 mb-6" size={48} />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Trusted by Growers Worldwide</h2>
          <p className="text-green-300 text-lg">Real stories from the people on the ground.</p>
        </div>

        <div className="max-w-4xl mx-auto relative px-12">
          <div className="relative h-[300px] md:h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center"
              >
                <p className="text-xl md:text-2xl lg:text-3xl text-white font-medium italic leading-relaxed mb-10">
                  "{testimonials[currentIndex].content}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <img 
                    src={testimonials[currentIndex].avatar} 
                    alt={testimonials[currentIndex].name}
                    className="w-14 h-14 rounded-full border-2 border-green-500 p-0.5"
                  />
                  <div className="text-left">
                    <h4 className="text-white font-bold text-lg">{testimonials[currentIndex].name}</h4>
                    <p className="text-green-400 text-sm font-medium">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8">
            <button 
              onClick={prev}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/10"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8">
            <button 
              onClick={next}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/10"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-12 bg-green-400' : 'w-3 bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
