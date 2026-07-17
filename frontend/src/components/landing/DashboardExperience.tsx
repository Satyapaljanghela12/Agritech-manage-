import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', yield: 4000, efficiency: 2400 },
  { name: 'Tue', yield: 3000, efficiency: 1398 },
  { name: 'Wed', yield: 2000, efficiency: 9800 },
  { name: 'Thu', yield: 2780, efficiency: 3908 },
  { name: 'Fri', yield: 1890, efficiency: 4800 },
  { name: 'Sat', yield: 2390, efficiency: 3800 },
  { name: 'Sun', yield: 3490, efficiency: 4300 },
];

export const DashboardExperience = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            A Dashboard built for the <span className="text-green-600">Modern Farmer</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto font-light"
          >
            Experience pure clarity with our intuitive data visualization layer.
          </motion.p>
        </div>

        <div className="relative">
          {/* Main Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-gray-50 rounded-3xl p-4 md:p-8 shadow-2xl border border-gray-100 relative z-10"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm min-h-[400px]">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Crop Health Performance</h3>
                  <p className="text-sm text-gray-500">Weekly efficiency report</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="w-3 h-3 rounded-full bg-green-200" />
                </div>
              </div>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="yield" 
                      stroke="#22c55e" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorYield)" 
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Floating Badges */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute left-2 md:-left-12 top-1/4 z-20 bg-white p-4 rounded-2xl shadow-xl border border-green-50 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Efficiency</p>
              <p className="text-xl font-bold">+12.5%</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute right-2 md:-right-12 bottom-1/4 z-20 bg-white p-4 rounded-2xl shadow-xl border border-green-50 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Storage</p>
              <p className="text-xl font-bold">84% Full</p>
            </div>
          </motion.div>

          {/* Background layers */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.05),transparent_70%)] -z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
