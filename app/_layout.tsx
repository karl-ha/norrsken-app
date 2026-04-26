import { AuroraStatus } from "@/components/ui/aurora-status";
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

  const { kpValue, clouds, chance } = useAuroraData(60.06, 19.56);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuroraStatus
        kpValue={kpValue}
        clouds={clouds}
        chance={chance}
        darkMode={colorScheme === "dark"}
      />
    </ThemeProvider>
  );
}
