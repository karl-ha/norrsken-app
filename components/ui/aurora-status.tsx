import * as Location from "expo-location";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./aurora-status.styles";

type Props = {
  location: Location.LocationObject | null;
  kpValue: number | null;
  clouds: number | null;
  chance: string;
  darkMode: boolean;
  placeName: string | null;
  onSearch: (place: string) => void;
};

export function AuroraStatus({
  location,
  kpValue,
  clouds,
  chance,
  darkMode,
  placeName,
  onSearch,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const theme = {
    bg: darkMode ? "#0B0E14" : "#13161a",
    card: darkMode ? "#1A1F2B" : "#231c1c",
    text: darkMode ? "#FFFFFF" : "#ffffff",
    subText: darkMode ? "#94A3B8" : "#64748B",
    input: darkMode ? "#2D3748" : "#919499",
  };

  const initialRegion = {
    latitude: location?.coords.latitude ?? 60.06,
    longitude: location?.coords.longitude ?? 19.56,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <MapView
        style={{
          height: 250,
          width: "95%",
          alignSelf: "center",
          borderRadius: 15,
          marginTop: 70,
        }}
        region={initialRegion}
        key={`${location?.coords.latitude}`}
      ></MapView>

      <SafeAreaView style={[styles.container]}>
        <View style={styles.searchContainer}>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: theme.input, color: theme.text },
            ]}
            placeholder="Search location"
            placeholderTextColor={theme.subText}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => onSearch(searchQuery)}
          />
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.placeLabel, { color: theme.subText }]}>
            Location
          </Text>
          <Text style={[styles.placeName, { color: theme.text }]}>
            {placeName ?? "Search location"}
          </Text>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: theme.text }]}>
                {kpValue?.toFixed(1) ?? "–"}
              </Text>
              <Text style={[styles.statLabel, { color: theme.subText }]}>
                KP Index
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: theme.text }]}>
                {clouds !== null ? `${clouds}%` : "–"}
              </Text>
              <Text style={[styles.statLabel, { color: theme.subText }]}>
                Cloud cover
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.chanceBadge,
              { backgroundColor: darkMode ? "#2D3748" : "#526980" },
            ]}
          >
            <Text style={[styles.chanceText, { color: theme.text }]}>
              Chance:{" "}
              <Text style={{ color: theme.text, fontWeight: "700" }}>
                {chance}
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}