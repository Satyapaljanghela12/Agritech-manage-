import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRef } from 'react';

export const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]);

  return (
    <section ref={sectionRef} className="relative py-48 overflow-hidden bg-[#001a0f]">
      {/* Background Image with Parallax & Deep Overlay */}
      <motion.div 
        style={{ scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80" 
          className="w-full h-full object-cover mix-blend-overlay"
          alt="Future of Agriculture"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#001a0f] via-[#001a0f]/80 to-black" />
      </motion.div>

      {/* Dynamic Glows */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#00a651]/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#00a651]/10 blur-[150px] rounded-full animate-pulse delay-700" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-12"
        >
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#00a651]/30 bg-[#00a651]/10 backdrop-blur-md text-[#00a651] font-bold uppercase text-xs tracking-[0.3em]">
              <Sparkles size={14} />
              Ready to transform your farm?
            </div>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black text-white leading-[1.1]" style={{ fontFamily: 'Inter, sans-serif' }}>
            The Future is <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a651] via-green-300 to-[#00a651]">
              Precision Agriculture
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
            Join thousands of forward-thinking farmers who are already optimizing their resources and maximizing their yields with FarmGrid.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <motion.a 
              href="/register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-12 py-6 bg-[#00a651] text-white rounded-2xl font-black text-xl transition-all shadow-2xl shadow-[#00a651]/40 hover:bg-[#008f45] flex items-center justify-center cursor-pointer"
            >
               Get Started Now
               <ArrowRight className="inline-block ml-3 group-hover:translate-x-2 transition-transform" />
            </motion.a>
            <a 
              href="#contact"
              className="px-12 py-6 bg-white/5 border-2 border-white/20 text-white rounded-2xl font-bold text-xl hover:bg-white/10 transition-all backdrop-blur-md cursor-pointer"
            >
               Book a Consultation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
