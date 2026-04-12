import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, ChevronRight } from 'lucide-react';

const traditional = [
  "Paper-based records easily lost",
  "Guesswork on soil conditions",
  "Manual pest monitoring",
  "Unpredictable yield estimates",
  "Inefficient resource usage"
];

const agrimanage = [
  "Secure cloud-based data storage",
  "Precision IoT soil sensors",
  "AI-powered drone surveillance",
  "Accurate data-driven forecasts",
  "Optimized resource allocation"
];

export const ComparisonSplit = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            The Difference is Clear
          </motion.h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Traditional farming methods are reaching their limits. See how FarmGrid brings the future to your farm today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-gray-200 rounded-3xl overflow-hidden shadow-2xl">
          {/* Traditional Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 p-12 lg:p-16"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
                 <XCircle size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Traditional Methods</h3>
                <p className="text-gray-500">Inefficient and Unpredictable</p>
              </div>
            </div>

            <ul className="space-y-6">
              {traditional.map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-gray-700 text-lg"
                >
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  {item}
                </motion.li>
              ))}
            </ul>
            
            <div className="mt-12 p-6 bg-red-50/50 rounded-2xl border border-red-100">
              <p className="text-red-700 font-medium italic">
                "We were always reacting to problems, never preventing them."
              </p>
            </div>
          </motion.div>

          {/* AgriManage Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-green-900 p-12 lg:p-16 relative group"
          >
             {/* Decorative background glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 blur-[100px] rounded-full pointer-events-none" />
             
            <div className="flex items-center gap-4 mb-10 relative z-10">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/50">
                 <CheckCircle2 size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">FarmGrid Experience</h3>
                <p className="text-green-300">Precision and Growth</p>
              </div>
            </div>

            <ul className="space-y-6 relative z-10">
              {agrimanage.map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-green-50 text-lg"
                >
                  <ChevronRight className="text-green-400" size={24} />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="mt-12 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 relative z-10">
              <p className="text-green-50 font-medium italic">
                "With 24/7 monitoring, we stop issues before they even start."
              </p>
            </div>
            
            <a 
              href="/register"
              className="mt-12 w-full py-4 bg-white text-green-900 font-bold rounded-xl hover:bg-green-50 transition-colors relative z-10 flex items-center justify-center cursor-pointer"
            >
               Upgrade Your Farm
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
