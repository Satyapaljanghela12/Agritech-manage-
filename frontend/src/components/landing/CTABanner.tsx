import { ArrowRight } from 'lucide-react';

export const CTABanner = () => {
  return (
    <section className="py-20 bg-green-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Transform Your Farm?
        </h2>
        <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
          Join thousands of farmers already using FarmGrid to manage their operations smarter and grow more efficiently.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="inline-flex items-center justify-center gap-2 bg-white text-green-700 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors"
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/login"
            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    </section>
  );
};
