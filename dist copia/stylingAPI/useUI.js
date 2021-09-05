import { removeProperties } from "../jshelpers/index.js";

const useUI = ({
  customAPI,
  runner
}, props, arrayOptions) => {
  try {
    const customAPIprops = customAPI && customAPI(props) || {};
    const UI = runner(customAPIprops);
    if (!arrayOptions) return [UI];
    const customAPIPropNames = [...Object.keys(customAPIprops)];
    const removeAllCustomAPIProps = removeProperties(customAPIPropNames);
    const propsCleaned = removeAllCustomAPIProps(props);
    return [UI, propsCleaned];
  } catch (error) {
    const message = "Error in styling API ";
    throw new Error(message);
  }
};

export { useUI };