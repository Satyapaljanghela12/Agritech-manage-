import { MapPin, Wheat, Package, BarChart3, CloudSun, Wrench } from 'lucide-react';

const services = [
  {
    icon: Wheat,
    label: 'Crop Management',
    desc: 'Track planting, growth and harvest cycles with precision.',
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    border: 'hover:border-amber-300',
    img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80',
  },
  {
    icon: MapPin,
    label: 'Land Parcels',
    desc: 'Organize and monitor all your land areas and soil types.',
    color: 'from-green-400 to-emerald-600',
    bg: 'bg-green-50',
    iconColor: 'text-green-600',
    border: 'hover:border-green-300',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80',
  },
  {
    icon: Package,
    label: 'Inventory',
    desc: 'Manage seeds, fertilizers and supplies in real-time.',
    color: 'from-blue-400 to-cyan-500',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    border: 'hover:border-blue-300',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
  },
  {
    icon: CloudSun,
    label: 'Weather Alerts',
    desc: 'Real-time forecasts to plan every farming activity.',
    color: 'from-sky-400 to-blue-500',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    border: 'hover:border-sky-300',
    img: 'https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=400&q=80',
  },
  {
    icon: BarChart3,
    label: 'Financial Tracking',
    desc: 'Monitor income, expenses and net profit effortlessly.',
    color: 'from-purple-400 to-violet-600',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    border: 'hover:border-purple-300',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
  },
  {
    icon: Wrench,
    label: 'Equipment',
    desc: 'Track tools, schedule maintenance and reduce downtime.',
    color: 'from-rose-400 to-red-500',
    bg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    border: 'hover:border-rose-300',
    img: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&q=80',
  },
];

export const ServicesStrip = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-green-200 mb-4">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Everything Your Farm <br />
            <span className="text-green-600">Needs in One Place</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
            Powerful tools designed for modern agriculture, simple, smart, and built for every farmer.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, label, desc, color, bg, iconColor, border, img }, i) => (
            <div
              key={label}
              className={`group relative rounded-2xl border border-gray-100 ${border} bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-default`}
            >
              {/* Image with gradient overlay */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={img}
                  alt={label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-60`} />

                {/* Icon on image */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center shadow-lg">
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>

                {/* Number badge */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40">
                  <span className="text-white text-xs font-black">0{i + 1}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-1.5">{label}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>

                {/* Bottom accent bar */}
                <div className={`mt-4 h-1 w-10 rounded-full bg-gradient-to-r ${color} group-hover:w-full transition-all duration-500`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <a
            href="/register"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-green-600/20"
          >
            Get Started Free →
          </a>
        </div>
      </div>
    </section>
  );
};
