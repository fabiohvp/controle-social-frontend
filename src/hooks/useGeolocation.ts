"use client";
import { normalize } from "@/formatters/string";
import { useGlobalState } from "@/providers/GlobalProvider";
//reference: https://github.com/bence-toth/react-hook-geolocation#readme
import { EsferaAdministrativa } from "@/types/EsferaAdministrativa";
import { useCallback, useEffect, useState } from "react";

interface EnrichedGeolocationCoordinates
  extends Partial<GeolocationCoordinates> {
  municipio: EsferaAdministrativa;
  addresses?: google.maps.GeocoderResult[];
  timestamp?: GeolocationPosition["timestamp"];
  error?: GeolocationPositionError;
}

function useGeolocation(
  { enableHighAccuracy, maximumAge, timeout }: PositionOptions = {},
  isEnabled = true
): EnrichedGeolocationCoordinates {
  const globalState = useGlobalState();
  const googleApiKey = globalState.apis.google.key;

  const [data, setData] = useState<EnrichedGeolocationCoordinates>({
    municipio: globalState.municipio,
  });

  const updateData = useCallback(
    async ({
      coords,
      timestamp,
    }: {
      coords: GeolocationCoordinates;
      timestamp: number;
    }) => {
      if (
        coords.latitude === data.latitude &&
        coords.longitude === data.longitude
      ) {
        return;
      }
      const res = await fetch(
        `https://maps.google.com/maps/api/geocode/json?address=${coords.latitude},${coords.longitude}&key=${googleApiKey}`
      );
      const json = (await res.json()) as {
        results: google.maps.GeocoderResult[];
      };
      //TODO: add log when error

      const local = json.results?.find((o) => o.types.includes("locality"));
      let nomeCidade = local?.address_components.find((o) =>
        o.types.includes("administrative_area_level_2")
      )?.long_name;
      let municipio: EsferaAdministrativa = data.municipio;

      if (nomeCidade) {
        nomeCidade = normalize(nomeCidade);
        municipio = globalState.municipios.find(
          (o) => o.nomeNormalizado === nomeCidade
        )!;
      }

      setData({
        ...coords,
        addresses: json.results,
        municipio,
        timestamp,
      });
    },
    [googleApiKey]
  );

  const setError = useCallback((error: any) => {
    setData({
      municipio: globalState.municipio,
      error,
    });
  }, []);

  useEffect(() => {
    let watchId: number;

    if (isEnabled && navigator.geolocation) {
      //navigator.geolocation.getCurrentPosition(updateCoordinates, setError);
      watchId = navigator.geolocation.watchPosition(updateData, setError, {
        enableHighAccuracy,
        maximumAge,
        timeout,
      });
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [
    isEnabled,
    enableHighAccuracy,
    maximumAge,
    setError,
    timeout,
    updateData,
  ]);
  return data;
}

export default useGeolocation;
