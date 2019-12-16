// const presets = [
//   [
//     '@babel/env',
//   ],
// ];

// module.exports = { presets };

module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
    ],
  ];

  const plugins = ['@babel/plugin-proposal-object-rest-spread'];

  return {
    presets,
    plugins,
  };
};
