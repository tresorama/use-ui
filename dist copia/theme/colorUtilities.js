import tinycolor from "tinycolor2";
/* =================================================== 
      tinycolor from 'tinycolor2'
=================================================== */

const withTinyColor = {
  runColorMethodsChain(colorCode, methodsString) {
    const methods = methodsString.split("+").map(m => ({
      name: m.split("(")[0],
      args: m.split("(")[1].split(")")[0].split(",").map(a => a && Number(a))
    }));
    let color = tinycolor(colorCode);
    methods.forEach(method => {
      const isCustomMethod = this.isCustomMethod(method.name);

      if (isCustomMethod) {
        color = this.customMethods[method.name](color, ...method.args);
      } else {
        color = color[method.name](...method.args);
      }
    });
    return color.toString("hsl");
  },

  customMethods: {
    contrastTextColor: tinyColorColor => {
      const isDark = tinyColorColor.isDark();
      return tinycolor(isDark ? "white" : "black");
    }
  },

  isCustomMethod(targetMethodName) {
    const allCustomMethods = [...Object.keys(this.customMethods)];
    return allCustomMethods.find(methodName => methodName === targetMethodName) !== undefined;
  }

};
const COLOR_UTILITIES = withTinyColor;
export default COLOR_UTILITIES;