const extractAdditionalProps = (props) => {
  const { theme } = props;
  const names = ["PRESETS", "TYPO"];

  let additionalProps = {};
  names.forEach((name) => {
    if (!props[name]) return;
    const values = ((a) => [...(Array.isArray(a) ? a : [a])])(props[name]);
    values.forEach((value) => {
      try {
        additionalProps = {
          ...additionalProps,
          ...theme[name][value],
        };
      } catch (error) {
        throw new Error(
          `${name}=${value} is not supported by theme, maybe it's a typo error!!`
        );
      }
    });
  });

  return additionalProps;
};
export default extractAdditionalProps;
