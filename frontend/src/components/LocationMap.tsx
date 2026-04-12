import { useEffect, useState } from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { getCurrentLocation, reverseGeocode, getLocationString, LocationData } from '../utils/geolocation';

interface LocationMapProps {
  location?: string;
  className?: string;
  useGeolocation?: boolean;
}

export const LocationMap = ({ location, className = '', useGeolocation = true }: LocationMapProps) => {
  const [mapUrl, setMapUrl] = useState('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [usingGeolocation, setUsingGeolocation] = useState(useGeolocation);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeMap();
  }, [location, usingGeolocation]);

  const initializeMap = async () => {
    setLoading(true);
    if (usingGeolocation && !location) {
      try {
        const coords = await getCurrentLocation();
        const locData = await reverseGeocode(coords);
        setLocationData(locData);
        setCoordinates({ lat: coords.latitude, lon: coords.longitude });
        generateMapUrl(coords.latitude, coords.longitude);
      } catch (err) {
        console.error('Geolocation error:', err);
        setUsingGeolocation(false);
      }
    } else if (location) {
      await geocodeLocation(location);
    }
    setLoading(false);
  };

  const generateMapUrl = (lat: number, lon: number) => {
    setMapUrl(
      `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.01},${lat - 0.01},${lon + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lon}`
    );
  };

  const geocodeLocation = async (loc: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          loc
        )}&format=json&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const coords = { lat: parseFloat(lat), lon: parseFloat(lon) };
        setCoordinates(coords);
        generateMapUrl(coords.lat, coords.lon);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  const openInMaps = () => {
    if (coordinates) {
      window.open(
        `https://www.openstreetmap.org/?mlat=${coordinates.lat}&mlon=${coordinates.lon}#map=15/${coordinates.lat}/${coordinates.lon}`,
        '_blank'
      );
    }
  };

  const handleUseCurrentLocation = () => {
    setUsingGeolocation(true);
    initializeMap();
  };

  if (!location && !usingGeolocation) {
    return (
      <div className={`bg-gray-100 rounded-xl p-6 ${className}`}>
        <div className="flex flex-col items-center justify-center h-48">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-500 mb-3">No location set</p>
          <button
            onClick={handleUseCurrentLocation}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
            title="Use your current location"
          >
            <Navigation className="w-4 h-4" />
            Use Current Location
          </button>
        </div>
      </div>
    );
  }

  if (loading || !mapUrl) {
    return (
      <div className={`bg-gray-100 rounded-xl p-6 ${className}`}>
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${className}`}>
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {locationData && usingGeolocation ? (
            <Navigation className="w-5 h-5 text-green-600" />
          ) : (
            <MapPin className="w-5 h-5 text-green-600" />
          )}
          <h3 className="font-semibold text-gray-800">
            {locationData && usingGeolocation ? 'Your Location' : 'Farm Location'}
          </h3>
        </div>
        <button
          onClick={openInMaps}
          className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 transition"
          title="Open in OpenStreetMap"
        >
          <span>Open</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
      <div className="relative h-64">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={mapUrl}
          className="absolute inset-0"
        />
      </div>
      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <p className="text-sm text-gray-700">
          {locationData && usingGeolocation ? getLocationString(locationData) : location}
        </p>
        {coordinates && (
          <p className="text-xs text-gray-500 mt-1">
            {coordinates.lat.toFixed(4)}, {coordinates.lon.toFixed(4)}
          </p>
        )}
        {!usingGeolocation && (
          <button
            onClick={handleUseCurrentLocation}
            className="mt-2 flex items-center gap-2 text-xs text-green-600 hover:text-green-700 transition"
            title="Switch to your current location"
          >
            <Navigation className="w-3 h-3" />
            <span>Use Current Location</span>
          </button>
        )}
      </div>
    </div>
  );
};
