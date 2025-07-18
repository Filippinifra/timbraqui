import { useFormikContext } from "formik";
import { Input } from "../Input";
import { FieldTitle } from "./FieldTitle";
import { useError } from "./useError";

type InputFormProps = {
  name: string;
  placeholder: string;
  title?: string;
  isRequired?: boolean;
};

export const InputForm = <T extends Record<string, any>>({
  name,
  title,
  placeholder,
  isRequired,
}: InputFormProps) => {
  const { values, setFieldValue } = useFormikContext<T>();
  const error = useError(name);

  return (
    <div style={{ width: "100%" }}>
      {title && (
        <FieldTitle title={title} error={error} isRequired={isRequired} />
      )}
      <Input
        value={values[name]}
        onChange={(v) => {
          setFieldValue(name, v.currentTarget.value);
        }}
        placeholder={placeholder}
        error={Boolean(error)}
      />
    </div>
  );
};
