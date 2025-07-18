import { Option } from "@/types/Option";
import { colors } from "@/utils/colors";
import { FONT } from "@/utils/text";
import { useRef } from "react";
import { isMobile } from "react-device-detect";
import Select, {
  FilterOptionOption,
  MenuPosition,
  MultiValue,
  MultiValueGenericProps,
} from "react-select";
import { softBoxShadow } from "../boxShadow.css";

const CustomMultiValue = <T,>(
  props: MultiValueGenericProps<Option<T>> & { index: number }
) => {
  const values = props.selectProps.value as Option<T>[];
  const index = props.index;

  // Render solo per il primo elemento
  if (index > 0) return null;

  const firstLabel = values?.[0]?.label ?? "";
  const extraCount = values.length - 1;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        minWidth: 0,
      }}
    >
      <span
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {firstLabel}
      </span>
      {extraCount > 0 && (
        <div
          style={{
            marginLeft: 8,
            backgroundColor: "#F0F0F0",
            borderRadius: 12,
            padding: "2px 8px",
            fontSize: 12,
            color: "#333",
            flexShrink: 0,
          }}
        >
          +{extraCount}
        </div>
      )}
    </div>
  );
};

type BaseProps<T> = {
  options: Option<T>[];
  placeholder: string;
  onInputChange?: (v: string) => void;
  filterOption?: (
    option: FilterOptionOption<Option<T>>,
    inputValue: string
  ) => boolean;
  noOptionsMessage?: string;
  disabled?: boolean;
  menuPosition?: MenuPosition;
  error?: boolean;
};

type SingleSelectProps<T> = BaseProps<T> & {
  isMulti?: false;
  value: Option<T> | null;
  onChange: (v: Option<T>) => void;
};

type MultiSelectProps<T> = BaseProps<T> & {
  isMulti: true;
  value: MultiValue<Option<T>>;
  onChange: (v: MultiValue<Option<T>>) => void;
};

export type DropdownProps<T> = SingleSelectProps<T> | MultiSelectProps<T>;

export const Dropdown = <T extends string | number | Date | null>(
  props: DropdownProps<T>
) => {
  const {
    options,
    value,
    placeholder,
    onChange,
    onInputChange,
    filterOption,
    noOptionsMessage,
    disabled,
    menuPosition = "absolute",
    error,
    isMulti,
  } = props;

  const selectRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openKeyboardAndMenu = () => {
    if (isMobile) {
      inputRef.current?.focus();
      selectRef.current?.focus();
      selectRef.current?.onMenuOpen();
    } else {
      selectRef.current?.focus();
      selectRef.current?.onMenuOpen();
    }
  };

  return (
    <div onClick={openKeyboardAndMenu} style={{ position: "relative" }}>
      <input
        ref={inputRef}
        style={{ position: "absolute", opacity: 0, height: 0, width: 0 }}
        type="text"
        inputMode="text"
      />
      <Select
        ref={selectRef}
        value={value}
        onChange={(e) => {
          if (e !== null) {
            onChange(e as any);
          }
        }}
        onInputChange={(inputValue, { action }) => {
          if (action === "input-change") {
            onInputChange?.(inputValue);
          }
        }}
        components={{ MultiValue: CustomMultiValue }}
        filterOption={filterOption}
        options={options}
        noOptionsMessage={() => noOptionsMessage}
        placeholder={placeholder}
        styles={{
          container: (styles, { isDisabled, isFocused }) => ({
            ...styles,
            border: error
              ? `1px solid ${colors.error}`
              : isFocused
              ? `1px solid ${colors.primary}`
              : `1px solid ${colors.greyLight}`,
            borderRadius: 4,
            backgroundColor: isDisabled ? colors.disabled : colors.white,
            cursor: isDisabled ? "not-allowed" : "pointer",
            fontFamily: FONT.style.fontFamily,
            fontSize: 16,
            lineHeight: "20px",
            boxShadow: softBoxShadow,
            "&:hover": {
              outline: `1px solid ${colors.primaryLight}`,
            },
          }),
          control: () => ({
            display: "flex",
          }),
          option: (styles, { isSelected, isFocused }) => ({
            ...styles,
            backgroundColor: isFocused
              ? colors.greyExtraLight
              : isSelected
              ? colors.primary
              : colors.white,
            color: isFocused
              ? colors.primary
              : isSelected
              ? colors.white
              : colors.black,
            cursor: "pointer",
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: "8px 8px 6px",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            flexWrap: "nowrap",
          }),
          input: (provided) => ({ ...provided, margin: 0 }),
          indicatorSeparator: () => ({}),
          placeholder: (provided) => ({
            ...provided,
            margin: 0,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }),
          singleValue: (provided) => ({ ...provided, margin: 0 }),
        }}
        menuPosition={menuPosition}
        isSearchable
        isDisabled={disabled}
        isMulti={isMulti}
      />
    </div>
  );
};
