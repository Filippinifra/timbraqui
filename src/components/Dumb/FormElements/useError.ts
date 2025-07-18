import { useFormikContext } from "formik";

export const useError = (name: string) => {
  const { getFieldMeta } = useFormikContext();

  const meta = getFieldMeta(name);
  const metaError = meta.error;

  const errorLabel =
    metaError && meta.touched ? `validation.${metaError}` : undefined;

  return errorLabel;
};
