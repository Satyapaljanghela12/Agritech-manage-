import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Is FarmGrid free to use?',
    a: 'Yes, FarmGrid is completely free to get started. Create your account and start managing your farm with no upfront cost.',
  },
  {
    q: 'Do I need any technical knowledge to use it?',
    a: 'Not at all. FarmGrid is designed to be simple and intuitive. If you can use a smartphone, you can use FarmGrid.',
  },
  {
    q: 'Can I manage multiple farms or land parcels?',
    a: 'Yes. You can add as many land parcels as you need, each with its own details like area, soil type, and location.',
  },
  {
    q: 'How does the weather feature work?',
    a: 'FarmGrid uses your location to fetch real-time weather data and a 5-day forecast, helping you plan irrigation, spraying, and harvesting.',
  },
  {
    q: 'Is my farm data secure?',
    a: 'Absolutely. All your data is stored securely with encrypted connections. Only you can access your farm information.',
  },
  {
    q: 'Can I access FarmGrid on my phone?',
    a: 'Yes. FarmGrid is fully responsive and works on any device — desktop, tablet, or mobile browser.',
  },
];

export const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6 leading-tight">
              Common Questions <br /> Answered
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Have more questions? Feel free to reach out to us and we'll be happy to help you get started.
            </p>
            <img
              src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&q=80"
              alt="Farmer"
              className="rounded-2xl w-full h-56 object-cover shadow-lg"
            />
          </div>

          {/* Right — accordion */}
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800 text-sm pr-4">{q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-green-600 flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {open === i && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
