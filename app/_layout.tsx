import { AuroraStatus } from "@/components/ui/aurora-status";
import { useLocation } from "@/hooks/get-location";
import { useAuroraData } from "@/hooks/use-aurora-data";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { location, place, searchByPlace } = useLocation();

  const latitude = location?.coords.latitude ?? 60.06;
  const longitude = location?.coords.longitude ?? 19.56;

  const { kpValue, clouds, chance } = useAuroraData(latitude, longitude);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuroraStatus
        location={location}
        placeName={place ?? "Search location"}
        kpValue={kpValue}
        clouds={clouds}
        chance={chance}
        darkMode={colorScheme === "dark"}
        onSearch={searchByPlace}
      />
    </ThemeProvider>
  );
}
