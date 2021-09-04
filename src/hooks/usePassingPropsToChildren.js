import React from "react";
import { inArray } from "../jshelpers/index";

export const usePassingPropsToChildren = (children, propsToPass, componentsNamesAllowed) => {
  const allChildrenNeedProps = componentsNamesAllowed.length === 0;

  const childrenWithProps = React.Children.map(children, (child, index) => {
    const heNeedProps = !allChildrenNeedProps && inArray(componentsNamesAllowed, child.type.name);
    if (!heNeedProps) return child;
    return React.cloneElement(child, propsToPass);
  });

  return childrenWithProps;
};
