import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      question: 'What is FarmGrid?',
      answer: 'FarmGrid is a comprehensive digital platform for managing agricultural operations. It helps farmers and agri-businesses track crops, resources, and productivity with data-driven insights.',
    },
    {
      question: 'Who can use this system?',
      answer: 'FarmGrid is designed for farmers, agricultural businesses, government organizations, NGOs, and researchers. Anyone involved in agriculture can benefit from our platform.',
    },
    {
      question: 'Is the data updated in real-time?',
      answer: 'Yes! All data is synchronized in real-time across devices. You can track changes, updates, and analytics instantly from anywhere.',
    },
    {
      question: 'What technology is used?',
      answer: 'AgriManage is built with modern technologies including React, Node.js, MongoDB, and cloud infrastructure for reliability and scalability.',
    },
    {
      question: 'Is the platform scalable?',
      answer: 'Absolutely! AgriManage scales from small individual farms to large agricultural enterprises managing thousands of acres and multiple locations.',
    },
  ];

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-gray-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-green-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-4xl mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-block mb-4">
            <span
              className="text-xs uppercase tracking-wider font-semibold text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-200"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              FAQ
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p
            className="text-gray-600 text-lg md:text-xl leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Everything you need to know about FarmGrid
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-green-300 hover:shadow-xl transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <HelpCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span
                    className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-6 h-6 text-green-600" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 pl-20">
                      <div className="border-l-4 border-green-200 pl-6">
                        <p
                          className="text-gray-600 leading-relaxed"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl border-2 border-green-100"
        >
          <h3
            className="text-2xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Still have questions?
          </h3>
          <p
            className="text-gray-600 mb-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Our support team is here to help you 24/7
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Contact Support
            <HelpCircle className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div
        className="absolute w-full h-px bottom-0 left-0 z-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(34,197,94,0.24) 0%, rgba(34,197,94,0) 100%)",
        }}
      />
    </section>
  );
};


