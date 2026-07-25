const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    extraNodeModules: {
      '@': `${__dirname}/src`,
      '@shared': `${__dirname}/src/shared`,
      '@app': `${__dirname}/src/app`,
      '@screens': `${__dirname}/src/screens`,
      '@entities': `${__dirname}/src/entities`,
      '@features': `${__dirname}/src/features`,
      '@widgets': `${__dirname}/src/widgets`,
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);