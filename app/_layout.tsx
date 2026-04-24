import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [kpValue, setKpValue] = useState<number | null>(null);
  const [chance, setChance] = useState<string>("");

  useEffect(() => {
    async function fetchAuroraData() {
      try {
        const response = await fetch(
          "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json",
        );

        const data = await response.json();

        const lastEntry = data[data.length - 1];
        console.log("LAST ENTRY:", lastEntry);

        const rawKp = lastEntry.Kp;

        setKpValue(rawKp);

        if (rawKp >= 5) {
          setChance("Mycket god chans");
        } else if (rawKp >= 3.5) {
          setChance("Goda chanser");
        } else if (rawKp >= 2) {
          setChance("Låg aktivitet");
        } else {
          setChance("Minimal chans");
        }
      } catch (error) {
        console.error("Did not work", error);
      }
    }
    fetchAuroraData();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View
        style={{
          paddingTop: 60,
          paddingBottom: 20,
          backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#f0f0f0",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colorScheme === "dark" ? "white" : "black",
            fontSize: 16,
          }}
        >
          Mariehamn Norrsken
        </Text>
        <Text
          style={{
            color:
              kpValue && kpValue >= 4
                ? "#4ade80"
                : colorScheme === "dark"
                  ? "white"
                  : "black",
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          Kp {kpValue !== null ? kpValue.toFixed(1) : "..."}
        </Text>
        <Text
          style={{
            color: colorScheme === "dark" ? "#ccc" : "#666",
            fontSize: 14,
          }}
        >
          {chance}
        </Text>
      </View>

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Info" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
