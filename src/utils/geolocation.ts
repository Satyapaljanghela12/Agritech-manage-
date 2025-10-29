export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationData {
  coordinates: Coordinates;
  city?: string;
  country?: string;
  displayName?: string;
}

export const getCurrentLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  });
};

export const reverseGeocode = async (
  coords: Coordinates
): Promise<LocationData> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
    );
    const data = await response.json();

    return {
      coordinates: coords,
      city: data.address?.city || data.address?.town || data.address?.village,
      country: data.address?.country,
      displayName: data.display_name,
    };
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return {
      coordinates: coords,
    };
  }
};

export const getLocationString = (locationData: LocationData): string => {
  if (locationData.city && locationData.country) {
    return `${locationData.city}, ${locationData.country}`;
  }
  if (locationData.displayName) {
    return locationData.displayName;
  }
  return `${locationData.coordinates.latitude.toFixed(4)}, ${locationData.coordinates.longitude.toFixed(4)}`;
};
