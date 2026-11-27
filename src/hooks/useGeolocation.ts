"use client";
import { normalize } from "@/formatters/string";
import { useGlobalState } from "@/providers/GlobalProvider";
//reference: https://github.com/bence-toth/react-hook-geolocation#readme
import { EsferaAdministrativa } from "@/types/EsferaAdministrativa";
import { useCallback, useEffect, useState } from "react";

interface EnrichedGeolocationCoordinates
  extends Partial<GeolocationCoordinates> {
  municipio: EsferaAdministrativa;
  timestamp?: GeolocationPosition["timestamp"];
  error?: GeolocationPositionError;
}

function useGeolocation(
  { enableHighAccuracy, maximumAge, timeout }: PositionOptions = {},
  isEnabled = true
): EnrichedGeolocationCoordinates {
  const globalState = useGlobalState();

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
      // A chave do Google fica no servidor: ver src/app/api/geocode/route.ts
      const res = await fetch(
        `/api/geocode?lat=${coords.latitude}&lng=${coords.longitude}`
      );
      const json = (await res.json()) as { nomeMunicipio: string | null };
      let municipio: EsferaAdministrativa = data.municipio;

      if (json.nomeMunicipio) {
        const nomeNormalizado = normalize(json.nomeMunicipio);
        municipio =
          globalState.municipios.find(
            (o) => o.nomeNormalizado === nomeNormalizado
          ) ?? municipio;
      }

      setData({
        ...coords,
        municipio,
        timestamp,
      });
    },
    []
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
