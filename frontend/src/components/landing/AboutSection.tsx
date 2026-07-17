import { CheckCircle, ArrowRight } from 'lucide-react';

const highlights = [
  'Real-time crop health monitoring',
  'Automated low-stock alerts',
  'Weather-based farming advice',
  'Complete financial overview',
  'Multi-parcel land management',
  'Equipment maintenance tracking',
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80"
                alt="Farm field"
                className="rounded-2xl w-full h-56 object-cover shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&q=80"
                alt="Farmer working"
                className="rounded-2xl w-full h-56 object-cover shadow-lg mt-8"
              />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-4 left-6 bg-green-600 text-white rounded-2xl px-6 py-4 shadow-xl">
              <p className="text-3xl font-bold">12+</p>
              <p className="text-sm text-green-100">Years of Experience</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-5 leading-tight">
              Grow Your Farm <br /> With Smart Technology
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              FarmGrid is built for modern farmers who want to take control of their operations. From tracking crops and managing land parcels to monitoring finances and equipment — everything is in one simple dashboard.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Whether you manage a small family farm or a large agricultural operation, our platform scales with your needs and helps you make better decisions every day.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="/register" onClick={(e)=>{e.preventDefault();window.history.pushState({},"","/register");window.dispatchEvent(new PopStateEvent("popstate"))}}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              Start For Free <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

