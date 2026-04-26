export function getRequiredKp(latitude: number): number {
  if (latitude >= 66) return 1;
  if (latitude >= 64) return 3;
  if (latitude >= 60) return 4;
  if (latitude >= 58) return 5;
  if (latitude >= 55) return 6;
  if (latitude >= 52) return 7;
  return 9;
}

export function getAuroraChance(
  kp: number,
  requiredKp: number,
  cloudCover: number,
): string {
  if (cloudCover > 50) return "Too cloudy";
  if (kp >= requiredKp) return "Good chance";
  if (kp >= requiredKp - 1) return "Low activity";
  return "Minimal chance";
}
