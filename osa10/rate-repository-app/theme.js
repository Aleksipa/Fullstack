import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    white: "#ffffff",
    mainBackground: "#e1e4e8",
    itemBackground: "#ffffff",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  spacing: {
    small: 5,
    medium: 10,
    large: 20,
  },
  borderRadius: {
    small: 4,
    large: 8,
  },
  layout: {
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    rowSpaceBetween: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    rowSpaceAround: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    column: {
      flexDirection: "column",
    },
    centerAll: {
      justifyContent: "center",
      alignItems: "center",
    },
    flexGrow: {
      flexGrow: 1,
    },
    flexWrap: {
      flexWrap: "wrap",
    },
  },
};

export default theme;
