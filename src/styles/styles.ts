const theme = {
  p: {
    x: {
      xs: "sm:px-14 px-4",
      sm: "sm:px-18 px-8",
      md: "sm:px-22 px-12",
      lg: "sm:px-26 px-16",
      xl: "sm:px-34 px-24",
      xxl: "sm:px-58 px-48",
    },
    y: {},
    xy: {},
  },
  m: {},
  h: {
    navbar: "h-[48px]",
    content: "h-[calc(100vh-48px)]",
  },
  w: {},
  top: {
    content: "mt-[48px]",
  },
  rounded: {
    cardBorder: "",
    utilityCardBorder: "rounded-md",
  },
  font: {
    color: {
      primary: "text-slate-100",
      keyword: "text-red-200",
      navbarForeground: "text-white",
      fieldInputPlaceholderTextColor: "",
    },
    customTypography: {
      heroHeaderText: "",
      heroSubText: "",
      sectionHeaderText: "",
      sectionSubText: "",
    },
  },
  bg: {
    primary: "bg-stone-950",
    navbarBackground: "bg-red-200",
    cardBackground: "",
    utilityCardBackground: "bg-zinc-700",
    // contactModalBackground: "bg-red-200",
    headerBarBackground: "",
    fieldInputBackground: "",
  },
  btn: {
    rounded: {
      default: "",
    },
    pill: {
      default: "",
    },
    outline: {
      default: "",
    },
    disabled: {
      default: "",
    },
    customBtn: {},
  },
};

export default theme;
