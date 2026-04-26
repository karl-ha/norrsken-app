import { useState } from "react";
import { Text, TextInput, View } from "react-native";

type Props = {
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

  return (
    <View style={{ flex: 1, padding: 20, alignItems: "center" }}>
      {/* 🔍 Sökfält */}
      <TextInput
        style={{
          height: 40,
          width: "80%",
          borderColor: darkMode ? "#fff" : "#ccc",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          marginTop: 50,
          marginBottom: 20,
          color: darkMode ? "#fff" : "#000",
        }}
        placeholder="Search location..."
        placeholderTextColor={darkMode ? "#aaa" : "#888"}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() => onSearch(searchQuery)}
      />

      <Text>{placeName ?? "..."}</Text>
      <Text>Kp {kpValue?.toFixed(1) ?? "..."}</Text>
      <Text>Northern lights? {chance}</Text>
      <Text>Cloud cover: {clouds !== null ? `${clouds}%` : "..."}</Text>
    </View>
  );
}
