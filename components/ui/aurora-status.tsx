import { Text, View } from "react-native";

type Props = {
  kpValue: number | null;
  clouds: number | null;
  chance: string;
  darkMode: boolean;
};

export function AuroraStatus({ kpValue, clouds, chance, darkMode }: Props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Kp {kpValue?.toFixed(1) ?? "..."}</Text>
      <Text>{chance}</Text>
      <Text>Molnighet: {clouds !== null ? `${clouds}%` : "..."}</Text>
    </View>
  );
}
