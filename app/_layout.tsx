import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
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
  const [clouds, setClouds] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const kpResponse = await fetch(
          "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json",
        );
        const data = await kpResponse.json();
        const lastEntry = data[data.length - 1];
        const rawKp = lastEntry.Kp;
        setKpValue(rawKp);

        const latitude: number = 60.06;

        const getRequiredKp = (latitude: number): number => {
          if (latitude >= 66) return 1;
          if (latitude >= 64) return 3;
          if (latitude >= 60) return 4;
          if (latitude >= 58) return 5;
          if (latitude >= 55) return 6;
          if (latitude >= 52) return 7;
          return 9;
        };

        const requiredKp = getRequiredKp(latitude);

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=19.56&current=cloud_cover`,
        );
        const weatherData = await weatherResponse.json();
        setClouds(weatherData.current.cloud_cover);

        if (weatherData.current.cloud_cover > 50) {
          setChance("För mulet");
        } else if (rawKp >= requiredKp) {
          setChance(`God chans)`);
        } else if (rawKp >= requiredKp - 1) {
          setChance(`Låg aktivitet`);
        } else {
          setChance("Minimal chans");
        }

        setClouds(weatherData.current.cloud_cover);
      } catch (error) {
        console.error("Kunde inte hämta data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#f0f0f0",
          paddingBottom: 60,
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
            paddingTop: 30,
            fontWeight: "bold",
          }}
        >
          Kp {kpValue !== null ? kpValue.toFixed(1) : "..."}
        </Text>
        <Text
          style={{
            color: colorScheme === "dark" ? "#ccc" : "#666",
            fontSize: 35,
            paddingTop: 30,
            paddingBottom: 30,
          }}
        >
          {chance}
        </Text>
        <Text
          style={{
            color: colorScheme === "dark" ? "#aaa" : "#888",
            fontSize: 14,
            marginTop: 5,
          }}
        >
          ☁️ Molnighet: {clouds !== null ? `${clouds}%` : "..."}
        </Text>
      </View>
    </ThemeProvider>
  );
}
