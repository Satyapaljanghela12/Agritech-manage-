import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Wheat Farmer, Punjab',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80',
    text: 'FarmGrid completely changed how I manage my 50-acre farm. I can now track all my crops and expenses from my phone. My yield has improved by 18% this season.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Vegetable Grower, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80',
    text: 'The inventory alerts saved me twice this year — I almost ran out of fertilizer during a critical growth period. Now I always know what I have in stock.',
    rating: 5,
  },
  {
    name: 'Suresh Patel',
    role: 'Rice Farmer, Gujarat',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80',
    text: 'The financial tracking feature is excellent. I can see exactly where my money is going and which crops are most profitable. Very easy to use.',
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            What Farmers Say About Us
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Real feedback from farmers who use FarmGrid every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ name, role, avatar, text, rating }) => (
            <div key={name} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">"{text}"</p>
              <div className="flex items-center gap-3">
                <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-gray-800">{name}</p>
                  <p className="text-xs text-gray-500">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
