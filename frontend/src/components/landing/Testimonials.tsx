import * as React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Farmer, Punjab',
      image: 'RK',
      content: 'AgriManage transformed how I manage my 50-acre farm. The crop tracking and resource management features have increased my productivity by 25%. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: 'Agri Manager, GreenFields Co.',
      image: 'PS',
      content: 'Managing multiple farms was a nightmare before AgriManage. Now we have real-time visibility into all operations. The analytics dashboard is incredibly powerful.',
      rating: 5,
    },
    {
      name: 'Dr. Amit Patel',
      role: 'Agricultural Researcher',
      image: 'AP',
      content: 'The data collection and analysis capabilities are exceptional. AgriManage has become an essential tool for our research on sustainable farming practices.',
      rating: 5,
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-6 md:px-10 relative z-10">
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
              Testimonials
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            What our{' '}
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              users say
            </span>
          </h2>
          <p
            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Trusted by farmers and agricultural professionals worldwide
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-green-300 hover:shadow-2xl transition-all duration-500"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              {/* Content */}
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-green-500 fill-green-500" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p
                  className="text-gray-700 mb-6 leading-relaxed italic"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center pt-6 border-t border-gray-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4 shadow-md">
                    <span className="text-white font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {testimonial.image}
                    </span>
                  </div>
                  <div>
                    <div
                      className="font-bold text-gray-900"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {testimonial.name}
                    </div>
                    <div
                      className="text-sm text-gray-600"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-green-500/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
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


