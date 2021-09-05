import React, { createContext, useState } from "react";
const ThemeModeContext = /*#__PURE__*/createContext();

const ThemeModeContextProvider = props => {
  // debugger;
  const [state, setState] = useState({
    mode: "light",
    isDark: false
  });

  const toggleMode = () => {
    // debugger;
    const mode = state.mode === "light" ? "dark" : "light";
    const isDark = mode === "dark";
    setState({ ...state,
      mode,
      isDark
    });
  };

  return /*#__PURE__*/React.createElement(ThemeModeContext.Provider, {
    value: { ...state,
      toggleMode
    }
  }, props.children);
};

export { ThemeModeContext, ThemeModeContextProvider };