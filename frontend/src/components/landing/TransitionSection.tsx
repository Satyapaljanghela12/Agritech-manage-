import { motion } from 'framer-motion';

export const TransitionSection = () => {
  return (
    <section className="relative bg-white pt-32 pb-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-emerald-500 mx-auto mb-10 rounded-full"
          />
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1]"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Agriculture is <span className="text-emerald-600">evolving</span>.<br />
            Your tools should too.
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-8 text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Managing acres of possibility with a single platform designed for the modern grower.
          </motion.p>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-60" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-40" />
    </section>
  );
};
