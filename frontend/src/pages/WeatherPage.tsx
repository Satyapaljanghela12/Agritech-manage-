import { useEffect, useState } from 'react';
import { Wind, Droplets, MapPin, RefreshCw, CloudSun, Sunrise, Sunset, AlertTriangle, Leaf } from 'lucide-react';
import { getCurrentLocation } from '../utils/geolocation';

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

  useEffect(() => { loadWeatherData(); }, []);

  const loadWeatherData = async () => {
    setLoading(true);
    try {
      const coords = await getCurrentLocation();
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

      const [currentRes, forecastRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${apiKey}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${apiKey}`)
      ]);

      if (!currentRes.ok || !forecastRes.ok) throw new Error('Failed to load weather data');

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

      setForecast(
        forecastJSON.list
          .filter((item: any) => item.dt_txt.includes('12:00:00'))
          .slice(0, 5)
          .map((item: any) => ({
            dt: item.dt,
            temp: item.main.temp,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
          }))
      );
      setError('');
    } catch (err: any) {
      setError(err.message || 'Unable to load weather data');
    } finally {
      setLoading(false);
    }
  };

  const getAgriAdvice = (temp: number, humidity: number, desc: string) => {
    const d = desc.toLowerCase();
    if (temp < 5) return 'Frost risk ahead. Protect sensitive crops tonight.';
    if (temp > 35) return 'High heat. Prioritize deep irrigation cycles today.';
    if (d.includes('rain')) return 'Rain expected. Great for crops — avoid spraying.';
    if (humidity > 80) return 'High humidity. Watch for signs of fungal disease.';
    return 'Good conditions. A great window for general field work.';
  };

  const formatTime = (ts: number) =>
    new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-4">
          <CloudSun className="text-green-600 animate-bounce" size={28} />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Loading weather data...</p>
      </div>
    );
  }

  if (error || !currentWeather) {
    return (
      <div className="max-w-md mx-auto mt-16 p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 text-center shadow-lg">
        <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Could not load weather</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{error}</p>
        <button
          onClick={loadWeatherData}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  const advice = getAgriAdvice(currentWeather.temperature, currentWeather.humidity, currentWeather.description);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">

      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-600 rounded-xl">
            <CloudSun className="text-white" size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">Weather</p>
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin size={11} className="text-green-500" />
              <span className="text-xs">{currentWeather.location}</span>
            </div>
          </div>
        </div>
        <button
          onClick={loadWeatherData}
          className="p-2.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition text-gray-500"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

        {/* Left — main weather card */}
        <div className="md:col-span-2 space-y-5">

          {/* Current temp card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-7 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 px-3 py-1 rounded-full">
                Live Data
              </span>
              <span className="text-xs text-gray-400 font-medium capitalize">{currentWeather.description}</span>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-8xl font-bold text-gray-900 dark:text-white leading-none">
                  {Math.round(currentWeather.temperature)}°
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Feels like {Math.round(currentWeather.feels_like)}°C
                </p>
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt="weather icon"
                className="w-28 h-28"
              />
            </div>
          </div>

          {/* Farm advice card */}
          <div className="bg-green-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
              <Leaf size={120} />
            </div>
            <div className="relative z-10 flex items-start gap-4">
              <div className="p-3 bg-white/15 rounded-xl flex-shrink-0">
                <Leaf className="text-white" size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold text-green-200 uppercase tracking-wider mb-1">Farm Advice</p>
                <p className="text-lg font-semibold leading-snug">{advice}</p>
              </div>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(currentWeather.feels_like)}°</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Feels Like</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentWeather.humidity}%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Humidity</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentWeather.wind_speed}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">km/h Wind</p>
            </div>
          </div>

          {/* Farming tips based on weather */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">Today's Farming Tips</p>
            <div className="space-y-2">
              {[
                { icon: '💧', tip: currentWeather.humidity > 70 ? 'Skip irrigation — humidity is high.' : 'Good time to irrigate in the morning.' },
                { icon: '🌱', tip: currentWeather.temperature > 30 ? 'High temps — check soil moisture levels.' : 'Ideal temperature for field work and planting.' },
                { icon: '🌾', tip: currentWeather.wind_speed > 20 ? 'Strong winds — postpone spraying.' : 'Low wind — suitable for spraying.' },
              ].map(({ icon, tip }, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <span className="text-base flex-shrink-0">{icon}</span>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — forecast + metrics */}
        <div className="space-y-5">

          {/* 5-day forecast */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">5-Day Forecast</p>
            <div className="space-y-3">
              {forecast.map((day) => (
                <div key={day.dt} className="flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 w-10">
                    {new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'short' })}
                  </p>
                  <img src={`https://openweathermap.org/img/wn/${day.icon}.png`} className="w-9 h-9" alt="icon" />
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 w-10 text-right">
                    {Math.round(day.temp)}°
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Wind & Humidity */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30">
              <Wind className="text-blue-600 mb-2" size={20} />
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-0.5">Wind</p>
              <p className="text-base font-bold text-blue-900 dark:text-blue-100">{currentWeather.wind_speed} km/h</p>
            </div>
            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-2xl border border-cyan-100 dark:border-cyan-900/30">
              <Droplets className="text-cyan-600 mb-2" size={20} />
              <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium mb-0.5">Humidity</p>
              <p className="text-base font-bold text-cyan-900 dark:text-cyan-100">{currentWeather.humidity}%</p>
            </div>
          </div>

          {/* Sunrise / Sunset */}
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4">Sun Schedule</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center gap-1">
                <Sunrise className="text-amber-500" size={20} />
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{formatTime(currentWeather.sunrise)}</p>
                <p className="text-[10px] text-gray-400">Sunrise</p>
              </div>
              <div className="flex-1 border-t border-dashed border-gray-300 dark:border-gray-600 mx-4" />
              <div className="flex flex-col items-center gap-1">
                <Sunset className="text-orange-500" size={20} />
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{formatTime(currentWeather.sunset)}</p>
                <p className="text-[10px] text-gray-400">Sunset</p>
              </div>
            </div>
          </div>

          {/* Best farming hours */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">Best Farming Hours</p>
            <div className="space-y-2">
              {[
                { time: '6–9 AM',   desc: 'Planting & seeding',    dot: 'bg-green-500' },
                { time: '9 AM–12',  desc: 'Irrigation & inspection', dot: 'bg-blue-500'  },
                { time: '4–7 PM',   desc: 'Spraying & harvesting',  dot: 'bg-amber-500' },
              ].map(({ time, desc, dot }) => (
                <div key={time} className="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 w-16 flex-shrink-0">{time}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
