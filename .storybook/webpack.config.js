const path = require("path");

module.exports = async ({ config, mode }) => {
  return {
    ...config,
    devtool: "source-map",
    resolve: {
      ...config.resolve,
      modules: [path.resolve(__dirname, "../src"), ...config.resolve.modules]
    }
  };
};
