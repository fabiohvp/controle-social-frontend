import { ENV } from "@/shared/env";
import { NextRequest, NextResponse } from "next/server";

// Retângulo que envolve o Espírito Santo, com folga. Fora dele não há
// município capixaba a encontrar, então nem chamamos o Google.
const LIMITES_ES = {
  latMin: -21.4,
  latMax: -17.8,
  lngMin: -42,
  lngMax: -39.5,
};

// 2 casas decimais ≈ 1 km: suficiente para achar o município e faz
// requisições vizinhas caírem na mesma entrada de cache.
const CASAS_DECIMAIS = 2;

const CACHE_HEADERS = {
  "Cache-Control": "public, max-age=3600, s-maxage=86400",
};

type GeocodeResponse = {
  status: string;
  results?: {
    address_components: { long_name: string; types: string[] }[];
  }[];
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json(
      { nomeMunicipio: null, erro: "lat e lng devem ser números" },
      { status: 400 }
    );
  }

  if (!isDentroDoEs(lat, lng)) {
    return NextResponse.json({ nomeMunicipio: null }, { headers: CACHE_HEADERS });
  }

  if (!ENV.apiGoogleMapsKey) {
    console.error("geocode: API_GOOGLE_MAPS_KEY não configurada");
    return NextResponse.json({ nomeMunicipio: null }, { status: 503 });
  }

  const latlng = `${lat.toFixed(CASAS_DECIMAIS)},${lng.toFixed(CASAS_DECIMAIS)}`;
  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  url.searchParams.set("latlng", latlng);
  url.searchParams.set("result_type", "administrative_area_level_2");
  url.searchParams.set("language", "pt-BR");
  url.searchParams.set("key", ENV.apiGoogleMapsKey);

  const res = await fetch(url);
  const json = (await res.json()) as GeocodeResponse;

  if (json.status !== "OK" && json.status !== "ZERO_RESULTS") {
    console.error(`geocode: Google respondeu ${json.status}`);
    return NextResponse.json({ nomeMunicipio: null }, { status: 502 });
  }

  return NextResponse.json(
    { nomeMunicipio: getNomeMunicipio(json) },
    { headers: CACHE_HEADERS }
  );
}

function isDentroDoEs(lat: number, lng: number) {
  return (
    lat >= LIMITES_ES.latMin &&
    lat <= LIMITES_ES.latMax &&
    lng >= LIMITES_ES.lngMin &&
    lng <= LIMITES_ES.lngMax
  );
}

function getNomeMunicipio(json: GeocodeResponse) {
  for (const result of json.results ?? []) {
    const componente = result.address_components.find((o) =>
      o.types.includes("administrative_area_level_2")
    );
    if (componente) {
      return componente.long_name;
    }
  }
  return null;
}
