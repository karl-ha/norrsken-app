import * as Location from "expo-location";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
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
          {placeName ?? "Välj plats..."}
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
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  searchContainer: { marginTop: 20, marginBottom: 30 },
  input: {
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    padding: 25,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  placeLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  placeName: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "rgba(150,150,150,0.1)",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 25,
  },
  statBox: { alignItems: "center" },
  statValue: { fontSize: 32, fontWeight: "800" },
  statLabel: { fontSize: 13, marginTop: 4 },
  chanceBadge: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  chanceText: { fontSize: 16 },
});
