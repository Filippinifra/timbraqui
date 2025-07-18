import { useDebouncedAsyncCallback } from "@/hooks/useDebounce";
import { Option } from "@/types/Option";
import { FC, useState } from "react";
import { Dropdown } from "../Dropdown";
interface Props {
  onSearch: (v: string) => Promise<Option<string>[]>;
  value: Option<string>;
  onChange: (o: Option<string>) => void;
  placeholder: string;
}

export const Autocomplete: FC<Props> = ({
  onSearch,
  onChange,
  value,
  placeholder,
}) => {
  const [options, setOptions] = useState<Option<string>[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchedYet, setFetchedYet] = useState(false);

  const debounceCallback = useDebouncedAsyncCallback(async (v: string) => {
    setFetchedYet(true);
    setLoading(true);
    const options = await onSearch(v);
    setOptions(options);
    setLoading(false);
  }, 600);

  return (
    <Dropdown
      onChange={onChange}
      options={options}
      value={value.value ? value : null}
      placeholder={placeholder}
      onInputChange={async (v) => {
        debounceCallback(v);
      }}
      filterOption={() => true}
      noOptionsMessage={
        !fetchedYet
          ? "Scrivi qualcosa per cercare"
          : loading
          ? "Caricamento.."
          : "Nessun risultato, scrivi qualcosa"
      }
    />
  );
};
