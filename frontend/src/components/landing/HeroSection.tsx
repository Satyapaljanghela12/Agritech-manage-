import { ArrowRight, CheckCircle } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-green-800 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/crop.jpg"
          alt="Farm"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-900/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20 w-full">
        <div className="max-w-2xl">

          {/* Text */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block mb-4">Smart Agriculture</span>
              <span className="block mb-4 text-green-400">Management</span>
              <span className="block">Platform</span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
              Manage your crops, land, inventory, and finances all in one place. Make data-driven decisions and grow your farm smarter.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="/register" onClick={(e)=>{e.preventDefault();window.history.pushState({},"","/register");window.dispatchEvent(new PopStateEvent("popstate"))}}
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-7 py-3.5 rounded-xl transition-colors"
              >
                Learn More
              </a>
            </div>

            <div className="flex flex-wrap gap-4">
              {['Crop Tracking', 'Financial Reports', 'Weather Alerts', 'Inventory Control'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-24">
          <path d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

