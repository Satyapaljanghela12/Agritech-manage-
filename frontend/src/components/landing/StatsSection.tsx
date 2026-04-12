import { Users, Wheat, TrendingUp, Database } from 'lucide-react';

export const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: '1200+',
      label: 'Active Farmers',
    },
    {
      icon: Wheat,
      value: '45+',
      label: 'Crop Types',
    },
    {
      icon: TrendingUp,
      value: '20%',
      label: 'Productivity Increase',
    },
    {
      icon: Database,
      value: '10K+',
      label: 'Records Managed',
    },
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <div
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                {stat.value}
              </div>
              <div
                className="text-gray-400 font-medium"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


