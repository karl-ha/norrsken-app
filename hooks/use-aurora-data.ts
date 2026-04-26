import { fetchCloudCover, fetchKpData } from "@/services/weatherApi";
import { getAuroraChance, getRequiredKp } from "@/utils/aurora";
import { useEffect, useState } from "react";

export function useAuroraData(latitude: number, longitude: number) {
  const [kpValue, setKpValue] = useState<number | null>(null);
  const [clouds, setClouds] = useState<number | null>(null);
  const [chance, setChance] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const kp = await fetchKpData();
        const cloudCover = await fetchCloudCover(latitude, longitude);

        const requiredKp = getRequiredKp(latitude);
        const chanceText = getAuroraChance(kp, requiredKp, cloudCover);

        setKpValue(kp);
        setClouds(cloudCover);
        setChance(chanceText);
      } catch (error) {
        console.error(error);
      }
    }

    load();
  }, [latitude, longitude]);

  return { kpValue, clouds, chance };
}
