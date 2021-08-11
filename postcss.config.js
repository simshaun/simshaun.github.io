module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-nested'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
    require('postcss-hash')({
      algorithm: 'sha256',
      trim: 20,
      manifest: './_site/manifest.json',
    }),
  ],
}
