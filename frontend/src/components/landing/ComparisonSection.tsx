import * as React from 'react';
import { motion } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';

export const ComparisonSection = () => {
  const comparisons = [
    {
      feature: 'Record Keeping',
      traditional: 'Manual paper records',
      digital: 'Automated digital system',
    },
    {
      feature: 'Data Analysis',
      traditional: 'No analytics available',
      digital: 'Real-time insights & trends',
    },
    {
      feature: 'Accessibility',
      traditional: 'Physical location only',
      digital: 'Access from anywhere',
    },
    {
      feature: 'Resource Tracking',
      traditional: 'Manual inventory counts',
      digital: 'Automated tracking',
    },
    {
      feature: 'Reporting',
      traditional: 'Time-consuming manual reports',
      digital: 'Instant automated reports',
    },
    {
      feature: 'Collaboration',
      traditional: 'Limited communication',
      digital: 'Team collaboration tools',
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-gray-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-block mb-4">
            <span
              className="text-xs uppercase tracking-wider font-semibold text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-200"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Comparison
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Traditional vs{' '}
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              Digital
            </span>
          </h2>
          <p
            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            See how digital transformation revolutionizes farm management
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100"
        >
          <div className="grid md:grid-cols-3 gap-px bg-gray-200">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8"
            >
              <h3
                className="text-xl font-bold text-gray-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Feature
              </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-red-50 to-gray-50 p-6 md:p-8"
            >
              <h3
                className="text-xl font-bold text-gray-900 flex items-center gap-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                Traditional
              </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-green-50 to-white p-6 md:p-8"
            >
              <h3
                className="text-xl font-bold text-gray-900 flex items-center gap-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                AgriManage
              </h3>
            </motion.div>

            {/* Rows */}
            {comparisons.map((comparison, index) => (
              <React.Fragment key={index}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white p-6 md:p-8 hover:bg-gray-50 transition-colors duration-300"
                >
                  <p
                    className="font-semibold text-gray-900"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {comparison.feature}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.1 }}
                  className="bg-gray-50 p-6 md:p-8 hover:bg-red-50/50 transition-colors duration-300"
                >
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                    <p
                      className="text-gray-600"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {comparison.traditional}
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  className="bg-green-50 p-6 md:p-8 hover:bg-green-100/50 transition-colors duration-300"
                >
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                    <p
                      className="text-gray-900 font-medium"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {comparison.digital}
                    </p>
                  </div>
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 md:mt-20"
        >
          <p
            className="text-gray-600 mb-6 text-lg"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Ready to make the switch to digital?
          </p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Start Your Digital Journey
            <ArrowRight className="w-5 h-5" />
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


