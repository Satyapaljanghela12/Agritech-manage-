import { FileX, Database, TrendingDown, AlertCircle } from 'lucide-react';

export const ProblemSection = () => {
  const problems = [
    {
      icon: FileX,
      title: 'Manual Record Keeping',
      description: 'Paper-based systems lead to data loss, errors, and inefficiency in farm management.',
      stat: '70%',
      statLabel: 'Time Wasted',
    },
    {
      icon: Database,
      title: 'No Centralized System',
      description: 'Scattered information across multiple sources makes it difficult to get a complete picture.',
      stat: '45%',
      statLabel: 'Data Lost',
    },
    {
      icon: TrendingDown,
      title: 'Poor Resource Management',
      description: 'Without proper tracking, resources are wasted and productivity suffers.',
      stat: '30%',
      statLabel: 'Resources Wasted',
    },
    {
      icon: AlertCircle,
      title: 'Lack of Insights',
      description: 'No data analysis means missed opportunities for optimization and growth.',
      stat: '60%',
      statLabel: 'Missed Opportunities',
    },
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #22c55e 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-50 border border-green-200 rounded-full mb-6 shadow-sm">
            <AlertCircle className="w-4 h-4 text-green-600" />
            <span className="text-green-700 font-bold text-sm tracking-wider uppercase" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              The Challenge
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <span className="text-gray-900">Traditional</span>{' '}
            <span className="text-gray-900">Farming</span>
            <br />
            <span className="relative inline-block mt-2">
              <span className="text-green-600">Challenges</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10C50 5 100 2 198 10" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <p
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Modern agriculture faces critical challenges that hinder productivity and growth
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-lg p-5 border-2 border-gray-200 hover:border-green-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 aspect-square flex flex-col"
            >
              {/* Number Badge */}
              <div className="absolute -top-2 -left-2 w-10 h-10 bg-gradient-to-br from-gray-900 to-black rounded-lg flex items-center justify-center shadow-lg group-hover:from-green-600 group-hover:to-green-700 transition-all duration-300 border-2 border-white">
                <span className="text-white font-black text-base" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Icon */}
              <div className="mb-4 relative">
                <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:from-green-100 group-hover:to-green-200 transition-all duration-300">
                  <problem.icon className="w-6 h-6 text-green-600 group-hover:text-green-700" />
                </div>
                {/* Decorative Circle */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-200 rounded-full opacity-50 group-hover:scale-150 group-hover:bg-green-300 transition-all duration-300"></div>
              </div>

              {/* Content */}
              <h3
                className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors leading-tight"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {problem.title}
              </h3>
              <p
                className="text-gray-600 leading-snug mb-auto text-xs"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {problem.description}
              </p>

              {/* Stat */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                <div>
                  <div className="text-3xl font-black text-gray-900 group-hover:text-green-600 transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {problem.stat}
                  </div>
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {problem.statLabel}
                  </div>
                </div>
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-green-50 transition-colors">
                  <AlertCircle className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors" />
                </div>
              </div>

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-lg"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
            Ready to solve these challenges?
          </p>
          <a
            href="#features"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all hover:scale-105 font-bold text-lg shadow-xl hover:shadow-2xl"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            See Our Solutions
            <AlertCircle className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};


