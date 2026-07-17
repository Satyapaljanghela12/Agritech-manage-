import { useState } from 'react';
import { Wheat, BarChart3, CloudSun, Package, Wrench, Bell, ArrowRight } from 'lucide-react';

const features = [
  {
    id: 'crops',
    icon: Wheat,
    label: 'Crops',
    headline: 'From Seed to Harvest',
    sub: "Track every crop's full lifecycle — planting dates, growth stages, expected yield, and harvest schedule. All in one view.",
    color: '#f59e0b',
    bg: 'bg-amber-500',
    img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=900&q=80',
    points: ['Planting & harvest dates', 'Growth stage tracking', 'Yield forecasting'],
  },
  {
    id: 'finance',
    icon: BarChart3,
    label: 'Finance',
    headline: 'Know Your Numbers',
    sub: 'Log every rupee in and out. See real-time profit and loss, filter by crop or category, and plan your next season.',
    color: '#8b5cf6',
    bg: 'bg-violet-500',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80',
    points: ['Income & expense logs', 'Profit / Loss summary', 'Category filters'],
  },
  {
    id: 'weather',
    icon: CloudSun,
    label: 'Weather',
    headline: 'Plan Around Nature',
    sub: "Live weather data and a 5-day forecast at your fingertips. Know when to irrigate, spray, or harvest before it is too late.",
    color: '#0ea5e9',
    bg: 'bg-sky-500',
    img: 'https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=900&q=80',
    points: ['Real-time conditions', '5-day outlook', 'Farm-specific advice'],
  },
  {
    id: 'inventory',
    icon: Package,
    label: 'Inventory',
    headline: 'Never Run Short',
    sub: 'Track every bag of seeds, drum of fertilizer, and box of pesticide. Get notified automatically before you run out.',
    color: '#3b82f6',
    bg: 'bg-blue-500',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80',
    points: ['Stock level tracking', 'Low-stock alerts', 'Supplier records'],
  },
  {
    id: 'equipment',
    icon: Wrench,
    label: 'Equipment',
    headline: 'Keep Machines Running',
    sub: 'Log all your tools and machinery. Schedule maintenance, track condition, and never let a breakdown surprise you.',
    color: '#f43f5e',
    bg: 'bg-rose-500',
    img: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=900&q=80',
    points: ['Maintenance scheduling', 'Condition tracking', 'Service history'],
  },
  {
    id: 'alerts',
    icon: Bell,
    label: 'Alerts',
    headline: 'Always Stay Informed',
    sub: 'Get smart notifications for harvest deadlines, low stock, and equipment maintenance — so nothing slips through the cracks.',
    color: '#10b981',
    bg: 'bg-emerald-500',
    img: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=900&q=80',
    points: ['Harvest reminders', 'Stock & maintenance alerts', 'Priority levels'],
  },
];

export const FeaturesGrid = () => {
  const [active, setActive] = useState(features[0]);

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-green-200 mb-4">
            Our Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Everything you need,{' '}
            <span className="text-green-600">nothing you don't</span>
          </h2>
          <p className="text-gray-400 text-lg">Click a feature to explore it.</p>
        </div>

        {/* Interactive showcase */}
        <div className="grid lg:grid-cols-5 gap-6 items-stretch">

          {/* Left — tab list */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            {features.map((f) => {
              const Icon = f.icon;
              const isActive = active.id === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActive(f)}
                  className={`group flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-200 border ${
                    isActive
                      ? 'bg-green-700 border-green-700 shadow-xl'
                      : 'bg-white border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: isActive ? f.color + '33' : '#f3f4f6' }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: isActive ? f.color : '#6b7280' }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm ${isActive ? 'text-white' : 'text-gray-700'}`}>
                      {f.headline}
                    </p>
                    <p className={`text-xs mt-0.5 truncate ${isActive ? 'text-gray-400' : 'text-gray-400'}`}>
                      {f.label}
                    </p>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${
                      isActive ? 'text-white translate-x-0' : 'text-gray-300 -translate-x-1 group-hover:translate-x-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right — preview panel */}
          <div className="lg:col-span-3 relative rounded-3xl overflow-hidden min-h-[480px] shadow-2xl">
            {/* Photo */}
            <img
              key={active.id}
              src={active.img}
              alt={active.headline}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

            {/* Color accent top bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: active.color }}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              {/* Icon + label */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: active.color + '33', border: `1px solid ${active.color}55` }}
                >
                  <active.icon className="w-5 h-5" style={{ color: active.color }} />
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ backgroundColor: active.color + '22', color: active.color }}
                >
                  {active.label}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{active.headline}</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">{active.sub}</p>

              {/* Bullet points */}
              <div className="flex flex-wrap gap-2">
                {active.points.map((p) => (
                  <span
                    key={p}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-sm"
                  >
                    ✓ {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
