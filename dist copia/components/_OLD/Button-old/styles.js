const style = {
  buttonWrapper: {
    root: {
      border: "1px solid transparent",
      backgroundColor: "transparent",
      borderRadius: "5px",
      overflow: "hidden",
      position: "relative"
    },
    text: {
      root: {
        backgroundColor: "transparent",
        color: "black",
        "&:hover": {
          backgroundColor: "black=>setAlpha(0.08)"
        }
      },
      primary: {
        backgroundColor: "transparent",
        color: "primary",
        "&:hover": {
          backgroundColor: "primary=>setAlpha(0.08)"
        }
      },
      secondary: {
        backgroundColor: "transparent",
        color: "secondary",
        "&:hover": {
          backgroundColor: "secondary=>setAlpha(0.08)"
        }
      }
    },
    outline: {
      root: {
        backgroundColor: "transparent",
        color: "black",
        borderColor: "black=>setAlpha(0.5)",
        "&:hover": {
          backgroundColor: "black=>setAlpha(0.08)",
          borderColor: "black"
        }
      },
      primary: {
        backgroundColor: "transparent",
        color: "primary",
        borderColor: "primary=>setAlpha(0.5)",
        "&:hover": {
          backgroundColor: "primary=>setAlpha(0.08)",
          borderColor: "primary"
        }
      },
      secondary: {
        backgroundColor: "transparent",
        color: "secondary",
        borderColor: "secondary=>setAlpha(0.5)",
        "&:hover": {
          backgroundColor: "secondary=>setAlpha(0.08)",
          borderColor: "secondary"
        }
      }
    },
    contained: {
      root: {
        backgroundColor: "black=>setAlpha(0.08)",
        color: "black",
        borderColor: "transparent",
        "&:hover": {
          backgroundColor: "black=>setAlpha(0.2)"
        }
      },
      primary: {
        backgroundColor: "primary",
        color: "primaryContrastText",
        "&:hover": {
          backgroundColor: "primary=>darken()"
        }
      },
      secondary: {
        backgroundColor: "secondary",
        color: "secondaryContrastText",
        "&:hover": {
          backgroundColor: "secondary=>darken()"
        }
      }
    }
  },
  buttonContent: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    paddingY: 1,
    paddingX: 2,
    pointerEvents: "none"
  }
};

const getStyle = ({
  shape,
  variant
}) => {
  return {
    buttonWrapper: {
      typoVariant: "button",
      ...style.buttonWrapper.root,
      ...style.buttonWrapper[shape].root,
      ...style.buttonWrapper[shape][variant]
    },
    buttonContent: { ...style.buttonContent
    }
  };
};

export default getStyle;