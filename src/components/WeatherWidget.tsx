import { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  description: string;
  icon: string;
  visibility: number;
  pressure: number;
}

interface WeatherWidgetProps {
  location?: string;
}

export const WeatherWidget = ({ location = 'New York' }: WeatherWidgetProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, [location]);

  const fetchWeather = async () => {
    try {
      const apiKey = 'bd5e9d45dbfd4c539f014746252910';
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
          location
        )}&aqi=no`
      );

      if (!response.ok) throw new Error('Failed to fetch weather');

      const data = await response.json();
      setWeather({
        location: data.location.name + ', ' + data.location.country,
        temperature: data.current.temp_c,
        feels_like: data.current.feelslike_c,
        humidity: data.current.humidity,
        wind_speed: data.current.wind_kph,
        description: data.current.condition.text,
        icon: data.current.condition.icon,
        visibility: data.current.vis_km,
        pressure: data.current.pressure_mb,
      });
      setError('');
    } catch (err) {
      setError('Unable to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('rain') || desc.includes('drizzle')) {
      return <CloudRain className="w-12 h-12 text-blue-500" />;
    } else if (desc.includes('cloud') || desc.includes('overcast')) {
      return <Cloud className="w-12 h-12 text-gray-500" />;
    } else if (desc.includes('clear') || desc.includes('sunny')) {
      return <Sun className="w-12 h-12 text-yellow-500" />;
    }
    return <Cloud className="w-12 h-12 text-gray-500" />;
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
        <p className="text-sm text-gray-600 text-center">{error || 'Weather unavailable'}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl p-6 border border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">Weather</h3>
          <p className="text-sm text-gray-600">{weather.location}</p>
        </div>
        {getWeatherIcon(weather.description)}
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-800">{Math.round(weather.temperature)}°</span>
            <span className="text-lg text-gray-600">C</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{weather.description}</p>
          <p className="text-xs text-gray-500">Feels like {Math.round(weather.feels_like)}°C</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-blue-200">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs text-gray-600">Humidity</p>
              <p className="text-sm font-semibold text-gray-800">{weather.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs text-gray-600">Wind</p>
              <p className="text-sm font-semibold text-gray-800">{weather.wind_speed} km/h</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs text-gray-600">Visibility</p>
              <p className="text-sm font-semibold text-gray-800">{weather.visibility} km</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs text-gray-600">Pressure</p>
              <p className="text-sm font-semibold text-gray-800">{weather.pressure} mb</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
