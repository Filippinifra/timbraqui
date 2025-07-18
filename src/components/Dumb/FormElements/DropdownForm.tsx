import { Option } from "@/types/Option";
import { useFormikContext } from "formik";
import { MultiValue } from "react-select";
import { Dropdown } from "../Dropdown";
import { FieldTitle } from "./FieldTitle";
import { useError } from "./useError";

type DropdownFormProps = {
  name: string;
  placeholder: string;
  title?: string;
  options: Option<any>[];
  isMulti?: boolean;
  menuPosition: "absolute" | "fixed";
  isRequired?: boolean;
};

export const DropdownForm = <T extends Record<string, any>>({
  name,
  title,
  placeholder,
  options,
  isMulti,
  menuPosition,
  isRequired,
}: DropdownFormProps) => {
  const { values, setFieldValue } = useFormikContext<T>();
  const error = useError(name);
  const fieldValue = values[name];

  if (isMulti) {
    //check elements by values and not by reference, causing show null value when options checked
    const selectedOptions = options.filter((opt) =>
      fieldValue.some(
        (v: any) => JSON.stringify(v) === JSON.stringify(opt.value)
      )
    );

    return (
      <div style={{ width: "100%" }}>
        {title && (
          <FieldTitle title={title} error={error} isRequired={isRequired} />
        )}
        <Dropdown
          isMulti={true}
          value={selectedOptions}
          onChange={(v) => {
            const selected = (v as MultiValue<Option<any>>).map(
              (opt) => opt.value
            );
            setFieldValue(name, selected);
          }}
          placeholder={placeholder}
          error={Boolean(error)}
          options={options}
          menuPosition={menuPosition}
        />
      </div>
    );
  }

  const selectedOption =
    options.find((opt) => opt.value === fieldValue) ?? null;

  return (
    <div style={{ width: "100%" }}>
      {title && <FieldTitle title={title} error={error} />}
      <Dropdown
        value={selectedOption}
        onChange={(v) => {
          setFieldValue(name, (v as Option<any>).value);
        }}
        placeholder={placeholder}
        error={Boolean(error)}
        options={options}
        menuPosition={menuPosition}
      />
    </div>
  );
};
