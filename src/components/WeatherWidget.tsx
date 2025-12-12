import { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, MapPin, RefreshCw } from 'lucide-react';
import { getCurrentLocation, reverseGeocode, getLocationString, LocationData } from '../utils/geolocation';

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
  useGeolocation?: boolean;
}

export const WeatherWidget = ({ location, useGeolocation = true }: WeatherWidgetProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [usingGeolocation, setUsingGeolocation] = useState(useGeolocation);

  useEffect(() => {
    initializeWeather();
    const interval = setInterval(initializeWeather, 600000);
    return () => clearInterval(interval);
  }, [location, usingGeolocation]);

  const initializeWeather = async () => {
    if (usingGeolocation && !location) {
      try {
        const coords = await getCurrentLocation();
        const locData = await reverseGeocode(coords);
        setLocationData(locData);
        await fetchWeatherByCoords(coords.latitude, coords.longitude);
      } catch (err) {
        console.error('Geolocation error:', err);
        setUsingGeolocation(false);
        await fetchWeather('New York');
      }
    } else {
      await fetchWeather(location || 'New York');
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
     const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`
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

  const fetchWeather = async (loc: string) => {
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
          loc
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
      <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{error || 'Weather unavailable'}</p>
      </div>
    );
  }

  const handleRefresh = () => {
    setLoading(true);
    initializeWeather();
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">Weather</h3>
            <button
              onClick={handleRefresh}
              className="p-1 hover:bg-blue-200 dark:hover:bg-blue-800/50 rounded transition"
              title="Refresh weather data"
            >
              <RefreshCw className="w-4 h-4 text-blue-700 dark:text-blue-400" />
            </button>
          </div>
          <div className="flex items-center gap-1">
            {locationData && usingGeolocation && (
              <MapPin className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            )}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {locationData && usingGeolocation
                ? getLocationString(locationData)
                : weather.location}
            </p>
          </div>
        </div>
        {getWeatherIcon(weather.description)}
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-800 dark:text-gray-100">{Math.round(weather.temperature)}°</span>
            <span className="text-lg text-gray-600 dark:text-gray-400">C</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{weather.description}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">Feels like {Math.round(weather.feels_like)}°C</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Humidity</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{weather.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Wind</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{weather.wind_speed} km/h</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Visibility</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{weather.visibility} km</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Pressure</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{weather.pressure} mb</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
