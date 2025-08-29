"use client";

import { Button } from "@/components/Dumb/Button";
import { Input } from "@/components/Dumb/Input";
import { ItemBox } from "@/components/Dumb/ItemBox";
import { Spacer } from "@/components/Dumb/Spacer";
import { useToast } from "@/context/ToastContext";
import { isBrowser } from "@/utils/browser";
import axios from "axios";
import dynamic from "next/dynamic";
import { FC, useState } from "react";

interface Props {
  onChange: (v: { lat: number; lng: number }) => void;
  value: {
    lat: number;
    lng: number;
  };
}

const Map = dynamic(() => import("@/components/Layout/RegistrationPanel/Map"), {
  ssr: false,
});

export const RegistrationPanel: FC<Props> = ({ onChange, value }) => {
  const [search, setSearch] = useState("");
  const [tempResults, setTempResults] = useState<null | any[]>([]);

  const { showToast } = useToast();

  const confirmAddress = ({ lat, lon }: { lat: string; lon: string }) => {
    onChange({ lat: Number(lat), lng: Number(lon) });
    setSearch("");
  };

  const searchAddress = async () => {
    try {
      const response = await axios(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          search
        )}&format=json&limit=3`
      );

      if (response.data.length > 0) {
        setTempResults(response.data);
      }
    } catch {
      showToast("error", "Errore");
    }
  };

  return isBrowser && Map ? (
    <div>
      <Map onChange={onChange} value={value} />
      <Spacer size={16} />
      <Input
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        placeholder="Cerca l'indirizzo"
      />
      <Spacer size={8} />
      <Button
        disabled={search.length < 5}
        onClick={(e) => {
          e.preventDefault();
          searchAddress();
        }}
      >
        Cerca
      </Button>
      {tempResults?.length ? (
        <>
          {tempResults.map((data) => (
            <>
              <Spacer size={16} />
              <ItemBox
                checked={false}
                icon="LocateIcon"
                onClick={(e) => {
                  e.preventDefault();
                  confirmAddress({ lat: data.lat, lon: data.lon });
                  setTempResults([]);
                }}
                title={data.display_name}
              />
            </>
          ))}
        </>
      ) : null}
    </div>
  ) : null;
};
