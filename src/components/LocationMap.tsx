import { useEffect, useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

interface LocationMapProps {
  location: string;
  className?: string;
}

export const LocationMap = ({ location, className = '' }: LocationMapProps) => {
  const [mapUrl, setMapUrl] = useState('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    if (location) {
      geocodeLocation(location);
    }
  }, [location]);

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
        setCoordinates({ lat: parseFloat(lat), lon: parseFloat(lon) });
        setMapUrl(
          `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.01},${lat - 0.01},${
            lon + 0.01
          },${lat + 0.01}&layer=mapnik&marker=${lat},${lon}`
        );
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

  if (!location) {
    return (
      <div className={`bg-gray-100 rounded-xl p-6 ${className}`}>
        <div className="flex items-center justify-center h-48">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No location set</p>
          </div>
        </div>
      </div>
    );
  }

  if (!mapUrl) {
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
          <MapPin className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-gray-800">Farm Location</h3>
        </div>
        <button
          onClick={openInMaps}
          className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 transition"
        >
          <span>Open in Maps</span>
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
        <p className="text-sm text-gray-700">{location}</p>
        {coordinates && (
          <p className="text-xs text-gray-500 mt-1">
            {coordinates.lat.toFixed(4)}, {coordinates.lon.toFixed(4)}
          </p>
        )}
      </div>
    </div>
  );
};
