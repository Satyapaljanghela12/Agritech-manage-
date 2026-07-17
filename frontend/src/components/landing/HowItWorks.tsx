import { UserPlus, Settings, BarChart3, TrendingUp, LucideIcon } from 'lucide-react';

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  tag: string;
  accent: string;
  img?: string;
}

const steps: Step[] = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Create Your Account',
    desc: 'Sign up free in minutes. Add your farm name, location and basic details.',
    tag: 'Free forever',
    accent: '#16a34a',
    img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
  },
  {
    number: '02',
    icon: Settings,
    title: 'Set Up Your Farm',
    desc: 'Add land parcels, crops, inventory and equipment to your digital farm.',
    tag: '5 min setup',
    accent: '#2563eb',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
  },
  {
    number: '03',
    icon: BarChart3,
    title: 'Track Everything',
    desc: 'Monitor crops, log expenses and manage stock from one dashboard.',
    tag: 'Real-time data',
    accent: '#7c3aed',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Grow Smarter',
    desc: 'Use insights to cut waste, boost yields and grow more profitably.',
    tag: '+20% yield',
    accent: '#d97706',
    img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
  },
];

export const HowItWorks = () => {
  const s0 = steps[0]; const I0 = s0.icon;
  const s1 = steps[1]; const I1 = s1.icon;
  const s2 = steps[2]; const I2 = s2.icon;
  const s3 = steps[3]; const I3 = s3.icon;

  return (
    <section id="how-it-works" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-green-200 mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Four steps to a <span className="text-green-600">smarter farm</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            No technical knowledge needed. Up and running in minutes.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-12 gap-4" style={{ gridTemplateRows: '280px 280px' }}>

          {/* Step 01 — tall left, spans 2 rows */}
          <div className="col-span-12 md:col-span-5 row-span-2 relative rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-300">
            <img src={s0.img} alt={s0.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-5 left-5">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: s0.accent }}>{s0.tag}</span>
            </div>
            <span className="absolute top-5 right-5 text-7xl font-black text-white/30 leading-none select-none">{s0.number}</span>
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: s0.accent }}>
                <I0 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{s0.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{s0.desc}</p>
            </div>
          </div>

          {/* Step 02 — top right wide */}
          <div className="col-span-12 md:col-span-7 row-span-1 relative rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-300">
            <img src={s1.img} alt={s1.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute top-5 left-5">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: s1.accent }}>{s1.tag}</span>
            </div>
            <span className="absolute top-5 right-5 text-7xl font-black text-white/30 leading-none select-none">{s1.number}</span>
            <div className="absolute bottom-0 left-0 p-6 flex items-end gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s1.accent }}>
                <I1 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{s1.title}</h3>
                <p className="text-gray-300 text-sm">{s1.desc}</p>
              </div>
            </div>
          </div>

          {/* Step 03 — bottom middle */}
          <div className="col-span-12 md:col-span-4 row-span-1 relative rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-300">
            <img src={s2.img} alt={s2.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: s2.accent }}>{s2.tag}</span>
            </div>
            <span className="absolute top-4 right-4 text-6xl font-black text-white/30 leading-none select-none">{s2.number}</span>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: s2.accent }}>
                <I2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{s2.title}</h3>
              <p className="text-gray-300 text-xs leading-relaxed">{s2.desc}</p>
            </div>
          </div>

          {/* Step 04 — solid colored box with full-width image */}
          <div className="col-span-12 md:col-span-3 row-span-1 relative rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-300">
            {/* Full background image */}
            <img src={s3.img} alt={s3.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-white/10" />
            <div className="relative z-10 flex flex-col justify-between h-full p-7">
              <div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: s3.accent }}>{s3.tag}</span>
              </div>
              <span className="absolute top-4 right-5 text-7xl font-black text-white/30 leading-none select-none">{s3.number}</span>
              <div>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: s3.accent }}>
                  <I3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{s3.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{s3.desc}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
