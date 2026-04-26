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
        console.log("LAST ENTRY:", lastEntry);

        const rawKp = lastEntry.Kp;

        setKpValue(rawKp);

        if (rawKp >= 5) setChance("Mycket god chans");
        else if (rawKp >= 3.5) setChance("Goda chanser");
        else if (rawKp >= 2) setChance("Låg aktivitet");
        else setChance("Minimal chans");

        const weatherResponse = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=60.06&longitude=19.56&current=cloud_cover",
        );
        const weatherData = await weatherResponse.json();
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
