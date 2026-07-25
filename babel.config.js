module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@shared': './src/shared',
          '@app': './src/app',
          '@screens': './src/screens',
          '@entities': './src/entities',
          '@features': './src/features',
          '@widgets': './src/widgets',
        },
      },
    ],
  ],  
};
