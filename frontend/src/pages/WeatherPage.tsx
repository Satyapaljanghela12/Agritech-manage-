import { useEffect, useState } from 'react';
import { 
  Cloud, 
  Sun, 
  Wind, 
  Droplets, 
  MapPin, 
  RefreshCw,
  CloudSun,
  Sunrise,
  Sunset,
  AlertTriangle,
  Leaf,
  ChevronRight
} from 'lucide-react';
import { getCurrentLocation, reverseGeocode, LocationData } from '../utils/geolocation';

interface ForecastData {
  dt: number;
  temp: number;
  description: string;
  icon: string;
}

interface WeatherDetail {
  location: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
}

export const WeatherPage = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherDetail | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadWeatherData();
  }, []);

  const loadWeatherData = async () => {
    setLoading(true);
    try {
      const coords = await getCurrentLocation();
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      
      const [currentRes, forecastRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${apiKey}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${apiKey}`)
      ]);

      if (!currentRes.ok || !forecastRes.ok) throw new Error('Weather synchronization failed');
      
      const currentJSON = await currentRes.json();
      const forecastJSON = await forecastRes.json();

      setCurrentWeather({
        location: `${currentJSON.name}, ${currentJSON.sys.country}`,
        temperature: currentJSON.main.temp,
        feels_like: currentJSON.main.feels_like,
        humidity: currentJSON.main.humidity,
        wind_speed: Math.round(currentJSON.wind.speed * 3.6),
        description: currentJSON.weather[0].description,
        icon: currentJSON.weather[0].icon,
        sunrise: currentJSON.sys.sunrise,
        sunset: currentJSON.sys.sunset,
      });

      const dailyForecast = forecastJSON.list.filter((item: any) => 
        item.dt_txt.includes('12:00:00')
      ).slice(0, 5).map((item: any) => ({
        dt: item.dt,
        temp: item.main.temp,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      }));

      setForecast(dailyForecast);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Unable to load weather data');
    } finally {
      setLoading(false);
    }
  };

  const getAgriAdvice = (temp: number, humidity: number, desc: string) => {
    const d = desc.toLowerCase();
    if (temp < 5) return "Frost risks ahead. Shield sensitive crops tonight.";
    if (temp > 35) return "High heat detected. Prioritize deeper irrigation cycles.";
    if (d.includes('rain')) return "Rain forecasted. Excellent for hydration, avoid sprays.";
    if (humidity > 80) return "High humidity. Monitor for potential fungal onset.";
    return "Optimized conditions. A great window for general field work.";
  };

  const formatTime = (ts: number) => new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] animate-pulse">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mb-4">
           <CloudSun className="text-green-600 animate-bounce" size={32} />
        </div>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Syncing with Sky...</p>
      </div>
    );
  }

  if (error || !currentWeather) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 text-center shadow-xl">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-2">Sync Error</h2>
        <p className="text-gray-500 mb-8">{error}</p>
        <button onClick={loadWeatherData} className="w-full bg-green-600 text-white py-4 rounded-2xl font-black hover:bg-green-700 transition">Retrying Connection</button>
      </div>
    );
  }

  const advice = getAgriAdvice(currentWeather.temperature, currentWeather.humidity, currentWeather.description);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in px-4 pb-12">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600 rounded-xl shadow-lg shadow-green-600/20">
               <CloudSun className="text-white" size={24} />
            </div>
            <div>
               <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white leading-none">Weather</h1>
               <div className="flex items-center gap-1.5 mt-1 text-gray-400">
                  <MapPin size={12} className="text-green-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{currentWeather.location}</span>
               </div>
            </div>
         </div>
         <button onClick={loadWeatherData} className="p-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition text-gray-400">
            <RefreshCw size={18} />
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Main Hero Bento */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-10 md:p-14 border border-gray-100 dark:border-gray-700 shadow-2xl shadow-gray-200/40 dark:shadow-none relative overflow-hidden group">
            <div className="relative z-10">
               <div className="flex items-center gap-4 mb-4">
                  <span className="px-4 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-green-100 dark:border-green-800">
                     Live Feedback
                  </span>
               </div>
               
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div>
                    <h2 className="text-[7rem] leading-none font-black text-gray-900 dark:text-white tracking-tighter">
                      {Math.round(currentWeather.temperature)}°
                    </h2>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 capitalize mt-2">
                       {currentWeather.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end text-right">
                     <img 
                        src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`} 
                        alt="weather" 
                        className="w-32 h-32 group-hover:scale-110 transition duration-700 select-none"
                     />
                     <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">
                        Real-time Data
                     </p>
                  </div>
               </div>
            </div>
          </div>

          {/* Agri Perspective - High Impact Card */}
          <div className="bg-green-600 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl shadow-green-600/30 relative overflow-hidden">
             <div className="absolute -right-4 -top-4 opacity-10">
                <Leaf size={160} />
             </div>
             <div className="relative z-10 flex items-start gap-6">
                <div className="p-4 bg-white/10 rounded-[1.5rem] backdrop-blur-md">
                   <Leaf className="text-white" size={32} />
                </div>
                <div>
                   <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-2 opacity-70">Farm Analysis</h3>
                   <p className="text-2xl font-bold leading-tight md:max-w-md">
                      {advice}
                   </p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Stack: Forecast & Sun Cycle */}
        <div className="space-y-8">
          
          {/* Minimalist 5-Day Outlook */}
          <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/20 dark:shadow-none">
             <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-6">Upcoming</h3>
             <div className="space-y-4">
                {forecast.map((day) => (
                   <div key={day.dt} className="flex items-center justify-between p-2">
                      <p className="text-xs font-black text-gray-400 uppercase w-12">
                         {new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'short' })}
                      </p>
                      <img 
                         src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
                         className="w-10 h-10"
                         alt="icon"
                      />
                      <p className="text-lg font-black text-gray-900 dark:text-white text-right w-10">
                         {Math.round(day.temp)}°
                      </p>
                   </div>
                ))}
             </div>
          </div>

          {/* Core Metrics Bento */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-[2rem] border border-blue-100 dark:border-blue-900/30">
                <Wind className="text-blue-600 mb-3" size={24} />
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-800/50 mb-1">Wind</p>
                <p className="text-lg font-black text-blue-900 dark:text-blue-100 leading-none">{currentWeather.wind_speed}km/h</p>
             </div>
             <div className="bg-cyan-50/50 dark:bg-cyan-900/10 p-6 rounded-[2rem] border border-cyan-100 dark:border-cyan-900/30">
                <Droplets className="text-cyan-600 mb-3" size={24} />
                <p className="text-[10px] font-black uppercase tracking-widest text-cyan-800/50 mb-1">Humidity</p>
                <p className="text-lg font-black text-cyan-900 dark:text-cyan-100 leading-none">{currentWeather.humidity}%</p>
             </div>
          </div>

          {/* Sun Cycle Bento */}
          <div className="bg-gray-50 dark:bg-gray-700/30 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700">
             <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col items-center">
                   <Sunrise className="text-amber-500 mb-2" size={20} />
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{formatTime(currentWeather.sunrise)}</p>
                </div>
                <div className="flex-1 border-t border-dashed border-gray-300 dark:border-gray-600 mx-4" />
                <div className="flex flex-col items-center">
                   <Sunset className="text-orange-500 mb-2" size={20} />
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{formatTime(currentWeather.sunset)}</p>
                </div>
             </div>
             <p className="text-center text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Solar Alignment</p>
          </div>

        </div>

      </div>
    </div>
  );
};
