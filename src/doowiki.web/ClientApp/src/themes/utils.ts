const utils = {
  // Abbreviated margin properties
  m: (value:any) => ({ margin: value }),
  mt: (value:any) => ({ marginTop: value }),
  mr: (value:any) => ({ marginRight: value }),
  mb: (value:any) => ({ marginBottom: value }),
  ml: (value:any) => ({ marginLeft: value }),
  mx: (value:any) => ({ marginLeft: value, marginRight: value }),
  my: (value:any) => ({ marginTop: value, marginBottom: value }),
  // Abbreviated padding properties
  p: (value:any) => ({ padding: value }),
  pt: (value:any) => ({ paddingTop: value }),
  pb: (value:any) => ({ paddingBottom: value }),
  pl: (value:any) => ({ paddingLeft: value }),
  pr: (value:any) => ({ paddingRight: value }),
  px: (value:any) => ({ paddingLeft: value, paddingRight: value }),
  py: (value:any) => ({ paddingTop: value, paddingBottom: value }),

  // A property for applying width/height together
  size: (value:any) => ({ width: value, height: value }),

  // A property to apply linear gradient
  linearGradient: (value:any) => ({
    backgroundImage: `linear-gradient(${value})`,
  }),

  // An abbreviated property for border-radius
  br: (value:any) => ({
    borderRadius: value,
  }),

  brRight: (value:any) => ({
    borderTopRightRadius: value,
    borderBottomRightRadius: value,
  }),

  primaryHover: () => {
    return {
      "&:hover": {
        color: "$primaryContrast",
        backgroundColor: "$teal4",
      },
    };
  },

  hoverBackground: (color:any) => {
    return {
      "&:hover": {
        backgroundColor: color,
      },
    };
  },

  primaryGradient: () => {
    return { linearGradient: `19deg, $lightPrimary 0%, $secondary 100%` };
  },

  simpleBorder: (color = "$mediumContrast") => {
    return {
      border: `1px solid ${color}`,
    };
  },

  primaryActive: (activeColor = "$primary") => {
    if (activeColor) {
      return {
        color: "$primaryContrast",
        backgroundColor: activeColor,
      };
    }
    return {};
  },
};

export default utils;
