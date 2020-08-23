module.exports = {
  stories: [
    '../docs/**/*.stories.mdx',
    '../src/**/*.stories.@(mdx|js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    config.module.rules.push(
      // Add support for scss
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    );
    return config;
  },
};
