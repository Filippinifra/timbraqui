export const colors = {
  primary: "#2563eb",
  primaryLight: "#93c5fd",
  primaryDark: "#1e40af",
  secondary: "#e0e7ff",

  disabled: "#F5F5F5",
  disabledDark: "#C2C2C2",

  background: "white",

  error: "#ef4444",
  errorDark: "#b91c1c",
  errorLight: "#fee2e2",
  success: "#10b981",
  successDark: "#047857",
  successLight: "#d1fae5",
  warning: "#f59e0b",
  warningLight: "#fef3c7",
  info: "#60a5fa",
  infoLight: "#eff6ff",

  delete: "#B20000",

  white: "#ffffff",
  black: "#000000",
  greysBlack: "#232323",
  graySemiLight: "#D7D7D7",
  darkerHue: "#98989A",
  grey: "#adadad",
  greyLight: "#eaeaea",
  greyExtraLight: "#FaFaFa",

  badge: {
    text: {
      purple: "#3B25A8",
      red: "#B20000",
      blue: "#0065C1",
      green: "#007505",
      yellow: "#E5C100",
      orange: "#C05B00",
      white: "#000000",
    },
    bg: {
      purple: "#F6F4FF",
      red: "#FBEFEF",
      blue: "#F0F8FF",
      green: "#EBF8EC",
      yellow: "#FAF7E6",
      orange: "#FDF2e1",
      white: "#ffffff",
    },
  },
};

export const softCardColors = [
  "#F3E8FF",
  "#FFE4E1",
  "#E0F7FA",
  "#F1FFF0",
  "#FFF1E6",
  "#FFEAD0",
  "#DDECF9",
  "#E3F2E1",
  "#EDE7F6",
  "#F5F7FA",
  "#FFF8E7",
  "#E6F7FF",
  "#F9EBFF",
  "#FDF6F0",
  "#F0FAF1",
  "#FAF0FF",
  "#F2F6FF",
  "#FFF0F5",
  "#F3FDFE",
  "#FFF5E1",
];

export const getRandomUserColor = (input: string) => {
  const colors = [
    "#D6E6FF", // Azzurro chiaro
    "#F4D6FF", // Lilla chiaro
    "#D6FFD8", // Verde menta chiaro
    "#FFEFDA", // Pesca tenue
    "#FFD6D6", // Rosa pallido
    "#D6F4FF", // Celeste delicato
    "#FFE6D6", // Arancione crema
    "#D8FFD6", // Verde pastello
    "#FFFAD6", // Giallo tenue
    "#D6FFFA", // Turchese chiaro
    "#E6D6FF", // Viola chiaro
    "#FFE6F3", // Rosa confetto
    "#D6FFEE", // Verde acqua delicato
    "#FFDAD6", // Rosato tenue
    "#D6FAFF", // Azzurro ghiaccio
    "#FFEDD6", // Beige caldo
    "#F6D6FF", // Magenta chiarissimo
    "#E8FFD6", // Verde lime molto chiaro
  ];

  // Calcola un hash dalla stringa
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash); // Hash semplice
  }
  // Usa il modulo per ottenere un indice nella palette
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};
