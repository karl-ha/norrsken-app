export async function fetchKpData() {
  const response = await fetch(
    "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json"
  );

  const data = await response.json();
  return data[data.length - 1].Kp;
}

export async function fetchCloudCover(
  latitude: number,
  longitude: number
) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=cloud_cover`
  );

  const data = await response.json();
  return data.current.cloud_cover;
}