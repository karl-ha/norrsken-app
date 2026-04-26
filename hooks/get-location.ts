import * as Location from "expo-location";
import { useEffect, useState } from "react";

export function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [place, setPlace] = useState<string | null>(null);

  useEffect(() => {
    async function getLocation() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Permission denied");
          return;
        }
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setLocation(currentLocation);
        const reverse = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        if (reverse.length > 0) {
          const address = reverse[0];
          setPlace(address.city || address.subregion);
        }
      } catch (error) {
        setErrorMsg("Cannot determine location");
      }
    }

    getLocation();
  }, []);

  const searchByPlace = async (cityName: string) => {
    try {
      const result = await Location.geocodeAsync(cityName);
      if (result.length > 0) {
        const { latitude, longitude } = result[0];

        setLocation({
          coords: {
            latitude,
            longitude,
          },
          timestamp: Date.now(),
        } as Location.LocationObject);

        setPlace(cityName);
      }
    } catch (error) {
      console.error("Failed search", error);
    }
  };

  return { location, place, searchByPlace };
}
