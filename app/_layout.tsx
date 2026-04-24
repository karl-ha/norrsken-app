import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [kpValue, setKpValue] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAuroraData() {
      try {
        // Mariehamns koordinater
        const lat = 60.093;
        const long = 19.939;

        const response = await fetch(`https://auroras.live${lat}&long=${long}`);
        const data = await response.json();

        setKpValue(data.ace.kp);
        setProbability(data.probability);

        console.log("Got data", data);
      } catch (error) {
        console.error("API did not work", error);
      }
    }
    fetchAuroraData();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
