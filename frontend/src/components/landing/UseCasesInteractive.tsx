import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const useCases = [
  {
    id: 'farmers',
    label: 'Farmers',
    title: 'Precision in every plot.',
    description: 'Empowering individual farmers with tools to monitor health, track inventory, and predict yields with enterprise-grade accuracy.',
    features: ['Soil Health Tracking', 'Inventory Management', 'Weather Alerts'],
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1200&q=80"
  },
  {
    id: 'businesses',
    label: 'Businesses',
    title: 'Scale your supply chain.',
    description: 'Providing agritech companies and distributors with a transparent view of production across multiple farm networks.',
    features: ['Supply Chain Visibility', 'Bulk Data Export', 'Multi-Farm Overview'],
    image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=1200&q=80"
  },
  {
    id: 'government',
    label: 'Government',
    title: 'National food security.',
    description: 'Assisting policy makers with aggregate data on crop production patterns to ensure sustainable agricultural growth.',
    features: ['Resource Distribution', 'Yield Forecasting', 'Environmental Impact'],
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80"
  }
];

export const UseCasesInteractive = () => {
  const [activeTab, setActiveTab] = useState(useCases[0].id);
  const activeData = useCases.find(uc => uc.id === activeTab)!;

  return (
    <section className="py-24 bg-[#fafafa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            Tailored for every <span className="text-[#00a651]">stakeholder</span>
          </h2>
          
          <div className="inline-flex p-1 bg-gray-100 rounded-2xl">
            {useCases.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-8 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#00a651] rounded-xl shadow-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl border border-gray-100 min-h-[500px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-2 gap-16 items-center w-full"
            >
              {/* Text Side */}
              <div className="space-y-8">
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {activeData.title}
                </h3>
                <p className="text-xl text-gray-500 leading-relaxed font-light">
                  {activeData.description}
                </p>
                <ul className="space-y-4">
                  {activeData.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-800 font-bold">
                      <div className="w-6 h-6 rounded-full bg-[#00a651]/10 text-[#00a651] flex items-center justify-center">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image Side */}
              <div className="relative group">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-50/50">
                  <motion.img
                    key={activeData.image}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    src={activeData.image}
                    alt={activeData.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#00a651] rounded-2xl -z-10 animate-pulse" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#00a651]/10 border border-[#00a651]/20 rounded-full -z-10 animate-float" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
