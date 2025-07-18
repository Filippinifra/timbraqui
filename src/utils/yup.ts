export const phoneNumberTest = () =>
  ({
    name: "valid-phone-number",
    message: "phoneInvalid",
    test: (value?: string) =>
      value == null ||
      /^(\+?\d{1,4}[\s.-]?)?(\(?\d{2,4}\)?[\s.-]?)?[\d\s.-]{5,}$/.test(value),
  } as const);
