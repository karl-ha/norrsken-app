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
          setPlace(address.city || address.subregion || address.district);
        }
      } catch (error) {
        setErrorMsg("Cannot determine location");
      }
    }

    getLocation();
  }, []);

  return { location, place };
}
