import * as React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, Activity, ArrowUpRight } from 'lucide-react';

export const DashboardPreview = () => {
  const cropData = [
    { name: 'Wheat', value: 35 },
    { name: 'Rice', value: 25 },
    { name: 'Corn', value: 20 },
    { name: 'Vegetables', value: 15 },
    { name: 'Others', value: 5 },
  ];

  const yieldData = [
    { month: 'Jan', yield: 45 },
    { month: 'Feb', yield: 52 },
    { month: 'Mar', yield: 48 },
    { month: 'Apr', yield: 61 },
    { month: 'May', yield: 58 },
    { month: 'Jun', yield: 70 },
  ];

  const COLORS = ['#22c55e', '#16a34a', '#4ade80', '#86efac', '#bbf7d0'];

  const stats = [
    {
      icon: Activity,
      label: 'Active Farms',
      value: '1,234',
      change: '+12%',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: TrendingUp,
      label: 'Total Yield',
      value: '55.7T',
      change: '+15.6%',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: PieChartIcon,
      label: 'Crop Types',
      value: '24',
      change: '+3',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  return (
    <section id="analytics" className="relative py-24 md:py-32 bg-gray-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-block mb-4">
            <span
              className="text-xs uppercase tracking-wider font-semibold text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-200"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Real-Time Analytics
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Visualize your farm data with
            <br />
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              interactive insights
            </span>
          </h2>
          <p
            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Make data-driven decisions with real-time analytics and comprehensive reporting tools
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-green-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p
                  className="text-gray-600 text-sm mb-1"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {stat.label}
                </p>
                <p
                  className="text-3xl font-bold text-gray-900"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-green-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <PieChartIcon className="w-5 h-5 text-green-600" />
              </div>
              <h3
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Crop Distribution
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cropData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {cropData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '2px solid #22c55e',
                    borderRadius: '12px',
                    fontFamily: 'Inter, sans-serif',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {cropData.map((crop, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-gray-700 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {crop.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-green-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Yield Trends
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" style={{ fontFamily: 'Inter, sans-serif' }} />
                <YAxis stroke="#6b7280" style={{ fontFamily: 'Inter, sans-serif' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '2px solid #22c55e',
                    borderRadius: '12px',
                    fontFamily: 'Inter, sans-serif',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="yield"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-6 flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
              <div>
                <div className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Average Yield
                </div>
                <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  55.7 tons
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Growth
                </div>
                <div className="text-2xl font-bold text-green-600 flex items-center gap-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  <ArrowUpRight className="w-5 h-5" />
                  +15.6%
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 md:mt-20"
        >
          <p
            className="text-gray-600 mb-6 text-lg"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Want to see your farm data come to life?
          </p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            View Live Demo
            <Activity className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div
        className="absolute w-full h-px bottom-0 left-0 z-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(34,197,94,0.24) 0%, rgba(34,197,94,0) 100%)",
        }}
      />
    </section>
  );
};


