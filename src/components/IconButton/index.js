import React from "react";
import { Button, Icon } from "../../index.js";
import { useUI } from "../../stylingAPI/index.js";

const sheet = {
  customAPI: props => ({
    color: props.color || "black",
  }),
  runner: _ => ({
    button: {
      //Button API
      shape: "text",
    },
    icon: {
      color: _.color,
    },
  }),
};

const IconButton = ({ children: iconComponent, ...props }) => {
  const [UI, propsCleaned] = useUI(sheet, props, []);

  return (
    <Button {...UI.button} {...propsCleaned}>
      <Icon {...UI.icon}>{iconComponent}</Icon>
    </Button>
  );
};

export default IconButton;
