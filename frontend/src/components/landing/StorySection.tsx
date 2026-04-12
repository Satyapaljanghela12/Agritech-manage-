import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const stories = [
  {
    title: "Precision Tools for Better Yields",
    subtitle: "About FarmGrid",
    content: "We provide high-tech solutions for small to medium-scale farms, designed to simplify management while maximizing results. Our tools are built with sustainability at the core.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    features: ["Soil health analysis", "Moisture monitoring", "Yield forecasting", "Automated alerts"],
    reverse: false
  }
];

export const StorySection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {stories.map((story, index) => (
          <div 
            key={index}
            className={`flex flex-col ${story.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-20`}
          >
            {/* Arched Image Container */}
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[4/5] max-w-md mx-auto">
                {/* Large Arched Image */}
                <div className="absolute inset-0 rounded-t-[15rem] rounded-b-[2rem] overflow-hidden shadow-2xl border-8 border-gray-50">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                {/* Decorative floating badge */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#00a651] rounded-full flex items-center justify-center text-white shadow-2xl border-8 border-white z-20"
                >
                   <div className="text-center">
                     <span className="block text-xs font-bold uppercase tracking-widest">Since</span>
                     <span className="block text-2xl font-black">2024</span>
                   </div>
                </motion.div>
                {/* Background glow */}
                <div className="absolute inset-0 bg-[#00a651]/5 blur-3xl -z-10 rounded-full" />
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div 
              className="flex-1 space-y-10"
              initial={{ opacity: 0, x: story.reverse ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 text-emerald-600 font-black uppercase text-xs tracking-[0.3em]">
                   <div className="w-8 h-[1px] bg-emerald-600" />
                   {story.subtitle}
                </span>
                <h3 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
                   {story.title}
                </h3>
              </div>
              
              <p className="text-xl text-gray-500 leading-relaxed font-light">
                {story.content}
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {story.features?.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                       <CheckCircle2 size={14} className="text-emerald-600" />
                    </div>
                    <span className="text-gray-700 font-bold text-sm tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                 <a 
                   href="/register"
                   className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-xl hover:bg-emerald-700 hover:shadow-emerald-200 transition-all flex items-center justify-center gap-2 group cursor-pointer w-fit"
                 >
                   Learn More
                   <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                 </a>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};
